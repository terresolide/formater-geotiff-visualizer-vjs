/* global L */
/* eslint no-undef: 0 */

L.Control.ResetControl = L.Control.extend({
  options: {
    position: 'topleft'
  },
  _center: null,
  _zoom: 13,
  initialize: function (bounds, options) {
    this._bounds = bounds
    if (!options) {
      options = {}
    }
    L.Control.prototype.initialize.call(options)
  },
  setBounds: function (bounds) {
    this._bounds = bounds
  },
  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-reset')
    var a = L.DomUtil.create('a', 'fa fa-undo')
    container.append(a)
    var bounds = this._bounds
    a.onclick = function () {
      map.fitBounds(bounds)
    }
    return container
  }
})

module.exports = L.Control.ResetControl
