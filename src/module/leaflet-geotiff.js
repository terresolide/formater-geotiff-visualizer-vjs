// Ideas from:
// https://github.com/ScanEx/Leaflet.imageTransform/blob/master/src/L.ImageTransform.js
// https://github.com/BenjaminVadant/leaflet-ugeojson

// Depends on:
// https://github.com/constantinius/geotiff.js

// Note this will only work with ESPG:4326 tiffs

// var L = require('leaflet')
/* eslint no-undef: 0 */
var GeoTIFF = require('geotiff')

L.LeafletGeotiff = L.ImageOverlay.extend({

  options: {
    arrowSize: 20,
    band: 0,
    image: 0,
    opacity: 1,
    renderer: null,
    clip: false
  },
  rastersCount: 0,
  initialize: function (url,options) {
    if (typeof (GeoTIFF) === 'undefined') {
      throw new Error('GeoTIFF not defined')
    };
    this.range = []
    this.optima = []
    this._url = url
    this.raster = {}
    this.rectangle = null
    this.visible = true
    L.setOptions(this, options)

    if (this.options.bounds) {
      this._rasterBounds = L.latLngBounds(options.bounds)
    }
    if (this.options.renderer) {
      this.options.renderer.setParent(this)
    }
    if (typeof url === 'string') {
      this._url = url
      this._getData()
    } else {
      this._filename = url.name
      this._getFromBlob(url)
    }
   
  },
  getURL: function () {
    return this._url
  },
  setURL: function (newURL) {
    this._url = newURL
    this._getData()
  },
  onAdd: function (map) {
    this._map = map
    if (!this._image) {
      this._initImage()
    }
   // this.rectangle = L.rectangle(this.getBounds())
   // this.rectangle.addTo(map)
    map._panes.overlayPane.appendChild(this._image)

    map.on('moveend', this._reset, this)

    if (map.options.zoomAnimation && L.Browser.any3d) {
      map.on('zoomanim', this._animateZoom, this)
    }
    this._reset()
  },
  onRemove: function (map) {
    this.rectangle.remove()
    this.rectangle = null
    map.getPanes().overlayPane.removeChild(this._image)

    map.off('moveend', this._reset, this)

    if (map.options.zoomAnimation) {
      map.off('zoomanim', this._animateZoom, this)
    }
  },
  _getFromBlob (file) {
    var arrayBuffer = new Promise((resolve, reject) => {
      
      const reader = new FileReader()
      var _this = this
      reader.addEventListener("load", function (event) {
        _this._parseTIFF(event.target.result)
      }, false)
      reader.readAsArrayBuffer(file);
    });
     
  },
  _getData: function () {
    var self = this
    var request = new XMLHttpRequest()
    request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
        self._parseTIFF(this.response)
      } // TODO else handle error
    }
    request.open('GET', this._url, true)
    request.responseType = 'arraybuffer'
    request.send()
  },
  _parseTIFF: function (arrayBuffer) {
    this.tiff = GeoTIFF.parse(arrayBuffer)
    this.setBand(this.options.band, true)
    if (!this.options.bounds) {
      var image = this.tiff.getImage(this.options.image)
      var meta = image.getFileDirectory()
      var xMin = meta.ModelTiepoint[3]
      var xMax = xMin + meta.ModelPixelScale[0] * meta.ImageWidth
      var yMin = meta.ModelTiepoint[4]
      var yMax = yMin - meta.ModelPixelScale[1] * meta.ImageLength
      this.rastersCount = meta.SamplesPerPixel
      this._rasterBounds = L.latLngBounds([[yMin, xMin], [yMax, xMax]])
      this._reset()
      this.fire('parsed')
    }
  },
  _computeRange: function () {
    if (!this.range[this.options.band]) {
      var bounds = this.getMinMaxValues()
      // cas de valeurs très grandes que d'un côté?
      var max = bounds.max
      var min = bounds.min

      var rate = (bounds.average - bounds.min) / (bounds.max - bounds.average)
      if (rate > 900) {
        max = bounds.max
        min = 2 * bounds.average - bounds.max
      } else if (rate < 0.002) {
        min = bounds.min
        max = 2 * bounds.average - bounds.min
      } else {
        max = Math.max(Math.abs(bounds.min), Math.abs(bounds.max))
        min = -max
        bounds.average = 0
      }
     // var max = Math.max(Math.abs(bounds.min), Math.abs(bounds.max))
      var precision = Math.ceil(Math.log(max - bounds.average) / Math.log(10)) - 1
      var p = Math.pow(10, precision - 1)
      max = Math.ceil(max / p) * p
      min = Math.ceil((min - 1) / p) * p
      if (bounds.average === 0) {
        min = -max
      }
      this.range[this.options.band] = {min: min, max: max, precision: precision}
    }
//    if (!this.range[this.options.band]) {
//      var bounds = this.getMinMaxValues()
//      var max = Math.max(Math.abs(bounds.min), Math.abs(bounds.max))
//      var precision = Math.ceil(Math.log(max) / Math.log(10)) - 1
//      var p = Math.pow(10, precision - 1)
//      max = Math.ceil(max / p) * p
//      this.range[this.options.band] = {min: -max, max: max, precision: precision}
//    }
  },
  setBand: function (band, firstDraw) {
    this.options.band = band
    if (this.rectangle) {
      this.rectangle.setStyle({color: this.options.color})
    }
    var image = this.tiff.getImage(this.options.image)
    this.raster.data = image.readRasters({samples: [band]})[0]
    this.raster.width = image.getWidth()
    this.raster.height = image.getHeight()
    this._computeRange()
    if (firstDraw) {
      var min = this.range[this.options.band].min + 0.3 * (this.range[this.options.band].max - this.range[this.options.band].min)
      var max = this.range[this.options.band].max - 0.3 * (this.range[this.options.band].max - this.range[this.options.band].min)
      this.options.renderer.setDisplayRange(min, max)
    }
    this._reset()
  },
  getRastersCount () {
    return this.rastersCount
  },
  getRange: function () {
    return this.range[this.options.band]
  },
  getRasterArray: function () {
    return this.raster.data
  },
  getRasterCols: function () {
    return this.raster.width
  },
  getRasterRows: function () {
    return this.raster.height
  },
  index2LatLng: function (i) {
    var row = Math.floor(i / this.raster.width)
    var col = i - row * this.raster.width
    if (this._rasterBounds) {
      var lat = this._rasterBounds._southWest.lat + (this.raster.height - row) * (this._rasterBounds._northEast.lat - this._rasterBounds._southWest.lat) / this.raster.height
      var lng = this._rasterBounds._southWest.lng + col * (this._rasterBounds._northEast.lng - this._rasterBounds._southWest.lng) / this.raster.width
      return [lat, lng]
    } else {
      return null
    }
  },
  getValueAtLatLng: function (lat, lng) {
    if (lat < this._rasterBounds._southWest.lat || lat > this._rasterBounds._northEast.lat) {
      return 'out'
    }
    if (lng < this._rasterBounds._southWest.lng || lng > this._rasterBounds._northEast.lng) {
      return 'out'
    }
    try {
      var x = Math.floor(this.raster.width * (lng - this._rasterBounds._southWest.lng) / (this._rasterBounds._northEast.lng - this._rasterBounds._southWest.lng))
      var y = this.raster.height - Math.ceil(this.raster.height * (lat - this._rasterBounds._southWest.lat) / (this._rasterBounds._northEast.lat - this._rasterBounds._southWest.lat))
      var i = y * this.raster.width + x
      return this.raster.data[i]
    } catch (err) {
      return undefined
    }
  },
  getMinMaxValues: function () {
    /* eslint no-unused-vars: 0 */
    if (!this.optima[this.options.band]) {
      var data = this.getRasterArray()
      var min = null
      var imin = null
      var imax = null
      var max = null
      var sum = 0
      var nb = 0
      for (var i = 0; i < data.length; i++) {
        if (data[i] !== 0) {
          if (min === null || min > data[i]) {
            min = data[i]
            imin = i
          } else if (max === null || max < data[i]) {
            max = data[i]
            imax = i
          }
          sum += data[i]
          nb++
        }
      }
      this.optima[this.options.band] = {
        min: min,
        imin: imin,
        max: max,
        imax: imax,
        average: (sum / nb)
      }
    }
    return this.optima[this.options.band]
    /* eslint no-unused-vars: 1 */
  },
  getBounds: function () {
    return this._rasterBounds
  },
  toggle (visible, opacity) {
    this.visible = visible
    if (this.visible) {
      this.setOpacity(opacity)
    } else {
      this.setOpacity(0)
    }
  },
  _animateZoom: function (e) {
    var scale = 0
    if (L.version >= '1.0') {
      scale = this._map.getZoomScale(e.zoom)
      var offset = this._map._latLngBoundsToNewLayerBounds(this._map.getBounds(), e.zoom, e.center).min
      L.DomUtil.setTransform(this._image, offset, scale)
    } else {
      scale = this._map.getZoomScale(e.zoom)
      var nw = this._map.getBounds().getNorthWest()
      // var se = this._map.getBounds().getSouthEast()
      var topLeft = this._map._latLngToNewLayerPoint(nw, e.zoom, e.center)
      // var size = this._map._latLngToNewLayerPoint(se, e.zoom, e.center)._subtract(topLeft)
      this._image.style[L.DomUtil.TRANSFORM] =
                L.DomUtil.getTranslateString(topLeft) + ' scale(' + scale + ') '
    }
  },
  _simpleReset: function () {
    this._reset(false)
  },
  _reset: function () {
    if (this.hasOwnProperty('_map')) {
      if (this._rasterBounds) {
        var topLeft = this._map.latLngToLayerPoint(this._map.getBounds().getNorthWest())
        var size = this._map.latLngToLayerPoint(this._map.getBounds().getSouthEast())._subtract(topLeft)

        L.DomUtil.setPosition(this._image, topLeft)
        this._image.style.width = size.x + 'px'
        this._image.style.height = size.y + 'px'

        this._drawImage()
      };
    };
  },
  setClip: function (clipLatLngs) {
    this.options.clip = clipLatLngs
    this._reset()
  },
  _clipMaskToPixelPoints: function () {
    if (this.options.clip) {
      var topLeft = this._map.latLngToLayerPoint(this._map.getBounds().getNorthWest())
      var pixelClipPoints = []
      for (var p = 0; p < this.options.clip.length; p++) {
        var mercPoint = this._map.latLngToLayerPoint(this.options.clip[p])
        var pixel = L.point(mercPoint.x - topLeft.x, mercPoint.y - topLeft.y)
        pixelClipPoints.push(pixel)
      }
      this._pixelClipPoints = pixelClipPoints
    } else {
      this._pixelClipPoints = undefined
    }
  },
  _drawImage: function () {
    if (this.raster.hasOwnProperty('data')) {
      var args = {}
      var plotCanvas = null
      var ctx = null
      var topLeft = this._map.latLngToLayerPoint(this._map.getBounds().getNorthWest())
      var size = this._map.latLngToLayerPoint(this._map.getBounds().getSouthEast())._subtract(topLeft)
      args.rasterPixelBounds = L.bounds(this._map.latLngToContainerPoint(this._rasterBounds.getNorthWest()), this._map.latLngToContainerPoint(this._rasterBounds.getSouthEast()))
      args.xStart = (args.rasterPixelBounds.min.x > 0 ? args.rasterPixelBounds.min.x : 0)
      args.xFinish = (args.rasterPixelBounds.max.x < size.x ? args.rasterPixelBounds.max.x : size.x)
      args.yStart = (args.rasterPixelBounds.min.y > 0 ? args.rasterPixelBounds.min.y : 0)
      args.yFinish = (args.rasterPixelBounds.max.y < size.y ? args.rasterPixelBounds.max.y : size.y)
      args.plotWidth = args.xFinish - args.xStart
      args.plotHeight = args.yFinish - args.yStart

      if ((args.plotWidth <= 0) || (args.plotHeight <= 0)) {
        console.log(this.options.name, ' is off screen.')
        plotCanvas = document.createElement('canvas')
        plotCanvas.width = size.x
        plotCanvas.height = size.y
        ctx = plotCanvas.getContext('2d')
        ctx.globalAlpha = this.options.opacity
        ctx.clearRect(0, 0, plotCanvas.width, plotCanvas.height)
        this._image.src = plotCanvas.toDataURL()
        return
      }

      args.xOrigin = this._map.getPixelBounds().min.x + args.xStart
      args.yOrigin = this._map.getPixelBounds().min.y + args.yStart
      args.lngSpan = (this._rasterBounds._northEast.lng - this._rasterBounds._southWest.lng) / this.raster.width
      args.latSpan = (this._rasterBounds._northEast.lat - this._rasterBounds._southWest.lat) / this.raster.height

      // Draw image data to canvas and pass to image element
      plotCanvas = document.createElement('canvas')
      plotCanvas.width = size.x
      plotCanvas.height = size.y
      ctx = plotCanvas.getContext('2d')
      ctx.globalAlpha = this.options.opacity
      ctx.clearRect(0, 0, plotCanvas.width, plotCanvas.height)

      this.options.renderer.render(this.raster, plotCanvas, ctx, args)

      // Draw clipping polygon
      if (this.options.clip) {
        this._clipMaskToPixelPoints()
        ctx.globalCompositeOperation = 'destination-out'
        ctx.rect(args.xStart - 10, args.yStart - 10, args.plotWidth + 20, args.plotHeight + 20)
        // Draw vertices in reverse order
        for (var i = this._pixelClipPoints.length - 1; i >= 0; i--) {
          var pix = this._pixelClipPoints[i]
          ctx['lineTo'](pix.x, pix.y)
        }
        ctx.closePath()
        ctx.fill()
      }
      if (!this.rectangle) {
        var bounds = this.getBounds()
        this.rectangle = L.rectangle(bounds, {color: this.options.color, opacity: 0, fillOpacity: 0})
        this.rectangle.addTo(this._map)
      }

      this._image.src = String(plotCanvas.toDataURL())
    }
  },

  transform: function (rasterImageData, args) {
    // Create image data and Uint32 views of data to speed up copying
    var imageData
    try {
      imageData = new ImageData(args.plotWidth, args.plotHeight)
    } catch (e) { // For IE
      imageData = document.createElement('canvas').getContext('2d').createImageData(args.plotWidth, args.plotHeight)
    }
    var outData = imageData.data
    var outPixelsU32 = new Uint32Array(outData.buffer)
    var inData = rasterImageData.data
    var inPixelsU32 = new Uint32Array(inData.buffer)

    var zoom = this._map.getZoom()
    var scale = this._map.options.crs.scale(zoom)
    var d = 57.29577951308232 // L.LatLng.RAD_TO_DEG;

    var transformationA = this._map.options.crs.transformation._a
    var transformationB = this._map.options.crs.transformation._b
    var transformationC = this._map.options.crs.transformation._c
    var transformationD = this._map.options.crs.transformation._d
    if (L.version >= '1.0') {
      transformationA = transformationA * this._map.options.crs.projection.R
      transformationC = transformationC * this._map.options.crs.projection.R
    }

    for (var y = 0; y < args.plotHeight; y++) {
      var yUntransformed = ((args.yOrigin + y) / scale - transformationD) / transformationC
      var currentLat = (2 * Math.atan(Math.exp(yUntransformed)) - (Math.PI / 2)) * d
      var rasterY = this.raster.height - Math.ceil((currentLat - this._rasterBounds._southWest.lat) / args.latSpan)

      for (var x = 0; x < args.plotWidth; x++) {
        // Location to draw to
        var index = (y * args.plotWidth + x)

        // Calculate lat-lng of (x,y)
        // This code is based on leaflet code, unpacked to run as fast as possible
        // Used to deal with TIF being EPSG:4326 (lat,lon) and map being EPSG:3857 (m E,m N)
        var xUntransformed = ((args.xOrigin + x) / scale - transformationB) / transformationA
        var currentLng = xUntransformed * d
        var rasterX = Math.floor((currentLng - this._rasterBounds._southWest.lng) / args.lngSpan)

        var rasterIndex = (rasterY * this.raster.width + rasterX)

        // Copy pixel value
        outPixelsU32[index] = inPixelsU32[rasterIndex]
      }
    }
    return imageData
  }

})

L.LeafletGeotiffRenderer = L.Class.extend({

  initialize: function (options) {
    L.setOptions(this, options)
  },

  setParent: function (parent) {
    this.parent = parent
  },

  render: function (raster, canvas, ctx, args) {
    throw new Error('Abstract class')
  }

})

L.leafletGeotiff = function (url, options) {
  return new L.LeafletGeotiff(url, options)
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = L.LeafletGeotiff
}
