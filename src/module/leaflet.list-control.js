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
  initialize: function (env, options) {
    this._env = env
    L.Control.prototype.initialize.call(options)
    this._initList()
  },
  onAdd: function (map) {
    return this._initLayout()
  },
  setList (list) {
    this.update(list)
  },
  setColor (color) {
    this._container.querySelector('h4').style.background = color
    this._container.querySelector('h4 a').style.background = color
  },
  _initLayout: function () {
    var className = 'leaflet-bar leaflet-control leaflet-list'
    var container = L.DomUtil.create('div', className)

    // create collapse button
    if (this.options.collapsed) {
      var h4 = L.DomUtil.create('h4', '', container)
      var link = L.DomUtil.create('a', className + '-toggle', h4)
      link.href = '#'
      link.title = 'Liste des sous fauchées'
      link.innerHTML = '&#9776;'
      var span = L.DomUtil.create('span', '', h4)
      span.innerHTML = 'Liste'
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
  _addItem: function (index) {
    var div = L.DomUtil.create('div', 'leaflet-item')
    var checkbox = L.DomUtil.create('input', '', div)
    checkbox.type = 'checkbox'
    checkbox.checked = true
    var span = L.DomUtil.create('span', '', div)
    span.innerHTML = 'Sous-fauchée N°' + (index + 1)
    var _this = this
    L.DomEvent.on(div, 'mouseover', function () { _this._env.showSsfauche(index) }, div)
    L.DomEvent.on(div, 'mouseout', function () { _this._env.hideSsfauche(index) }, div)
    L.DomEvent.on(checkbox, 'click', function () { _this._env.toggleGeotiff(index, this.checked) }, checkbox)
    this._content.append(div)
  },
  _removeContent: function () {
    var nodes = this._content.querySelectorAll('div')
    nodes.forEach(function (div) {
      L.DomEvent.off(div, 'mouseover', function () { _this._env.showSsfauche(index) }, div)
      L.DomEvent.off(div, 'mouseout', function () { _this._env.hideSsfauche(index) }, div)
      var checkbox = div.querySelector('input')
      L.DomEvent.off(checkbox, 'click', function () { _this._env.toggleGeotiff(index, this.checked) }, checkbox)
    })
    this._content.innerHTML = ''
  },
  _initContent: function () {
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
    this._env.geotiffs.forEach(function (geotiff) {
      list.push(geotiff.getURL())
    })
    this._list = list
  },
  update: function () {
    this._initList()
    this._initContent()
  }
})

module.exports = L.Control.ListControl
