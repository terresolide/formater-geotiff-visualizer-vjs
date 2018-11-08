/**
 * A control layer to see sub-swath list
 * @author epointal
 * @module L.Control.ModeControl
 * @requires leaflet
 */
/* eslint no-undef: 0 */
L.Control.ListControl = L.Control.extend({
  options: {
    collapsed: true,
    position: 'topleft',
    autoZIndex: true
  },
  _color: '#000',
  defaultLang: 'en',
  translation: {
    alt: {
      'fr': 'Liste des sous-fauchées',
      'en': 'Subswath list'
    },
    title: {
      'fr': 'Liste',
      'en': 'List'
    },
  },
  initialize: function (env, options) {
    this._env = env
    if (['fr', 'en'].indexOf(env.lang) > -1) {
      this.lang = env.lang
    } else {
      this.lang = this.defaultLang
    }
    L.Control.prototype.initialize.call(options)
    this._initList()
  },
  onAdd: function (map) {
    return this._initLayout()
  },
  setLang (lang) {
      if (['fr', 'en'].indexOf(lang) > -1) {
        this.lang = lang
        this._initContent()
        this._resetTitle()
      }
   },
  setColor (color) {
    this._container.querySelector('h4').style.background = color
    this._container.querySelector('h4 a').style.background = color
  },
  _resetTitle () {
	var h4 = this._container.querySelector('h4')
    var link =  h4.querySelector('a')
    var span = h4.querySelector('span')

    link.title = this.translation.alt[this.lang]
    span.innerHTML = this.translation.title[this.lang]
  },
  _initLayout: function () {
	var className = 'leaflet-bar leaflet-control leaflet-list'
    var container = L.DomUtil.create('div', className)

    // create collapse button
    if (this.options.collapsed) {
      var h4 = L.DomUtil.create('h4', '', container)
      var link = L.DomUtil.create('a', className + '-toggle', h4)
      link.href = '#'
      link.title = this.translation.alt[this.lang]
      link.innerHTML = '&#9776;'
      var span = L.DomUtil.create('span', '', h4)
      span.innerHTML = this.translation.title[this.lang]
      L.DomEvent.on(link, 'click', this._toggle, this)
      container.append(h4)
    }
    this._content = L.DomUtil.create('div', 'content')
    container.append(this._content)
    this._initContent()
    L.DomEvent.disableClickPropagation(container)
    L.DomEvent.on(container, 'wheel', L.DomEvent.stopPropagation)
    this._container = container
    return container
  },
  _addItem: function (i) {
    var div = L.DomUtil.create('div', 'leaflet-item')
    var checkbox = L.DomUtil.create('input', '', div)
    checkbox.type = 'checkbox'
    checkbox.checked = this._list[i].checked
    var index = this._list[i].index
    var span = L.DomUtil.create('span', '', div)
    span.innerHTML = this._env.getSubswathName(index)
    var _this = this
    L.DomEvent.on(div, 'mouseover', function () { _this._env.showSsfauche(index) }, div)
    L.DomEvent.on(div, 'mouseout', function () { _this._env.hideSsfauche(index) }, div)
    L.DomEvent.on(checkbox, 'click', function () {
      _this._list[i].checked = this.checked
      _this._env.toggleGeotiff(index, this.checked)
    }, checkbox)
    this._content.append(div)
  },
  _removeContent: function () {
	if (typeof this._content === 'undefined') {
		return
	}
//    var nodes = this._content.querySelectorAll('div')
//    nodes.forEach(function (div) {
//      L.DomEvent.off(div, 'mouseover', function () { _this._env.showSsfauche(index) }, div)
//      L.DomEvent.off(div, 'mouseout', function () { _this._env.hideSsfauche(index) }, div)
//      var checkbox = div.querySelector('input')
//      L.DomEvent.off(checkbox, 'click', function () { _this._env.toggleGeotiff(index, this.checked) }, checkbox)
//    })
    this._content.innerHTML = ''
  },
  _initContent () {
    this._removeContent()
    if (this._list.length === 0) {
      return null
    }
    for (var i = 0; i < this._list.length; i++) {
      this._addItem(i)
    }
    return this._content
  },
  _collapse: function () {
    this.setColor('#fff')
    this._container.className = this._container.className.replace(' leaflet-control-expanded', '')
  },
  _expand: function () {
    L.DomUtil.addClass(this._container, 'leaflet-control-expanded')
    if (this._color) {
      this.setColor(this._color)
    }
  },
  _toggle: function (evt) {
    if (this._container.className.indexOf('leaflet-control-expanded') >= 0) {
      this._collapse()
    } else {
      this._expand()
    }
    L.DomEvent.preventDefault(evt)
  },
  _initList: function () {
    var list = []
    this._env.geotiffs.forEach(function (geotiff, index) {
      list.push({ index: index, 'url': geotiff.getURL(), 'checked': true})
    })
    this._list = list
  },
  update: function () {
    this._initList()
    this._initContent()
  }
})

module.exports = L.Control.ListControl
