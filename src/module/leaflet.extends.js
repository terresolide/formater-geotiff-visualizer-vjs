var L = require('leaflet')
L.LeafletGeotiff = require('./leaflet-geotiff.js')
L.LeafletGeotiff.Plotty = require('./leaflet-geotiff-plotty.js')
L.Control.List = require('./leaflet.list-control.js')
L.Control.ResetControl = require('./leaflet.reset-control.js')

L.Custom = {}
L.Custom.maxPointInGraph = 300
L.Custom.step = 0.01
L.Custom.distance = function (origin, destination) {
  // return distance in meters
  var lon1 = toRadian(origin.lng)
  var lat1 = toRadian(origin.lat)
  var lon2 = toRadian(destination.lng)
  var lat2 = toRadian(destination.lat)
  var deltaLat = lat2 - lat1
  var deltaLon = lon2 - lon1
  var a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2)
  var c = 2 * Math.asin(Math.sqrt(a))
  var EARTH_RADIUS = 6371
  return c * EARTH_RADIUS * 1000
}
L.Custom.stitchEdge = function (origin, destination, cumul) {
  var a = destination.lng - origin.lng
  var b = destination.lat - origin.lat
  var d = Math.sqrt(a * a + b * b)
  var steplng = L.Custom.step * a / d
  var steplat = L.Custom.step * b / d
  var i = 0
  var sens = a / Math.abs(a)
  var lng = origin.lng
  var lat = origin.lat
  var latlngs = []
  latlngs.push({lat: lat, lng: lng, distance: cumul})
  var distance = 0
  while (i < 10000 && (destination.lng - lng - steplng) * sens > 0) {
    lng += steplng
    lat = lat + steplat
    if (distance === 0) {
      distance = L.Custom.distance(origin, {lat: lat, lng: lng})
    }
    cumul += distance
    latlngs.push({lat: lat, lng: lng, distance: cumul, value: []})
    i++
  }
  return latlngs
}
function toRadian (degree) {
  return degree * Math.PI / 180
}
L.Polyline.include({
  values: [],
  graphData: [],
  distanceToLatLng: [],
  edges: [],
  stitchEdges () {
    if (this.edges > 0) {
      return this.edges
    }
    this.values = []
    var latlngs = this.getLatLngs()
    var edges = []
    var edge = null
    var cumul = 0
    for (var i = 0; i < latlngs.length - 1; i++) {
      // Add point on edge
      edge = L.Custom.stitchEdge(latlngs[i], latlngs[i + 1], cumul)
      cumul = edge[edge.length - 1].distance
      // ajout distance du dernier point au premier point du suivant
      cumul += L.Custom.distance(edge[edge.length - 1], latlngs[i + 1])
      edges.push(edge)
    }
    // this.values = edges
    this.edges
    this.prepareDistanceToLatLng()
    return edges
  },
  setValues (values) {
    this.values = values
  },
  getValues () {
    return this.values
  },
  getLatLngFromDistance (distance) {
    if (this.distanceToLatLng[distance] !== 'undefined') {
      return this.distanceToLatLng[distance]
    } else {
      return null
    }
  },
  prepareDistanceToLatLng () {
    var distanceToLatLng = []
    this.values.forEach(function (obj) {
      distanceToLatLng[obj.distance.toFixed(3) / 1000] = [obj.lat, obj.lng]
     // values.push(obj.value)
    })
    this.distanceToLatLng = distanceToLatLng
  },
  prepareData (raster, ssfauche) {
    var distance = []
    // var values = []
    this.values.forEach(function (obj) {
      distance.push([obj.distance.toFixed(3) / 1000, obj.value[raster][ssfauche]])
      // distanceToLatLng[obj.distance.toFixed(3) / 1000] = [obj.lat, obj.lng]
     // values.push(obj.value)
    })
    this.graphData = distance
    return this.graphData
  },
  resetValues () {
    this.values = []
    this.graphData = []
    this.distanceToLatLng = []
  }
//  _pointsByEdge () {
//    var latlngs = this.getLatLngs()
//    var cumul = 0
//    var dist = []
//    var max = 0
//    for (var i = 0; i < latlngs.length - 1; i++) {
//      dist[i] = L.Custom.distance(latlngs[i], latlngs[i + 1])
//      if (max < dist[i]) {
//        max = dist[i]
//      }
//      cumul += dist[i]
//    }
//    console.log(dist)
//    for (i = 0; i < dist.length; i++) {
//      dist[i] = Math.round(dist[i] * L.Custom.maxPointInGraph / cumul)
//    }
//    return dist
//  }
})
module.exports = L
