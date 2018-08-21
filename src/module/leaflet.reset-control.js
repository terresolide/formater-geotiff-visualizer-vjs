/**
 * A control to reset map to bounds
 * style is add in parent for the moment
 * @author epointal
 * @module L.Control.ResetControl
 * @requires leaflet
 */

/* Glogal L */


L.Control.ResetControl = L.Control.extend({
    options: {
        position: 'topleft',
    },
    title: {
      'fr': 'Recentrer',
      'en': 'Reset'
    },
    defaultLang: 'en',
    initialize: function (bounds, lang, options) {
      if (['fr', 'en'].indexOf(lang) > -1) {
        this.lang = lang
      } else {
        this.lang = this.defaultLang
      }
      this._bounds = bounds
      if (!options) {
    	options = {}
      }
      L.Control.prototype.initialize.call(options)
    },
    setBounds: function (bounds) {
      this._bounds = bounds
    },
    onAdd : function(map){
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-reset');
        var a = L.DomUtil.create('a')
        a.innerHTML = '&#8634;'
        container.append(a)
        var bounds = this._bounds;
        a.setAttribute('title', this.title[this.lang])
        a.onclick = function(){
            map.fitBounds(bounds);
        }
        return container
    }
})

module.exports = L.Control.ResetControl;
