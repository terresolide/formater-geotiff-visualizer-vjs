<i18n>
{
    "en": {
      "parameters_and_search": "Parameters and search",
      "client_file": "Your file | Your files",
      "band_raster": "band / raster",
      "no_raster": "No raster",
      "image_parameters": "Picture parameters",
      "raster": "raster",
      "opacity": "opacity",
      "colorscale": "colors scale",
      "colorscale_optima": "min and max on colors scale",
      "values_to_display": "Values to display",
      "display_inferior": "Display values less than",
      "display_superior": "Display values greater than",
      "reset": "Reset",
      "search": "Search",
      "overall_optima": "Minimum and maximum overall",
      "search_optima": "Search optima",
      "sub_swath": "Subswath",
      "file": "File",
      "view_in_map": "View minimum and maximum on the map",
      "profile": "profile",
      "click_on": "Click on",
      "picture_to_obtain_values": "picture to obtain values on this point",
      "to_start_new_path": "to start a new path",
      "then_click_on_map": "Then click on the map to create it, and do not forget to save it",
      "to_update_paths": "to update paths",
      "to_remove_paths": "to remove paths",
      "download": "download",
      "download_geotiff": "Dowload geotiff files",
      "publish": "Publish",
      "no_selected_processing": "No selected processing",
      "searching": "Searching",
      "error_dir": "No subswath found. <br />The directory has been deleted or it is unreachable",
      "dir_reading": "Reading subswath directory",
      "this_sub_swath_could_not_be_found": "The subswath N°{num} could not be found",
      "loading_sub_swath": "Loading subswath N°{num}",
      "loading_file": "Loading file {name}",
      "sub_swath_loaded": "Subswath N°{num} loaded",
      "file_loaded": "File {name} loaded",
      "values_along_the_line": "Values along the line for the raster N°{raster}",
      "no_selected_file": "No selected file",
      "files_list_not_found": "The file list was not found",
      "component": "Component",
      "no_subswath": "No subswath found with this token",
      "subswath_not_found": "subswath N° {num} not found",
      "no_subswath_found": "No subswath found!",
      "result_directory": "Result directory"
    },
    "fr": {
      "parameters_and_search": "Paramètres et recherche",
      "client_file": "Votre fichier | Vos fichiers",
      "band_raster": "bande / raster",
       "no_raster": "Aucun raster",
      "image_parameters": "Paramètres de l'image",
      "raster": "Bande",
      "opacity": "opacité",
      "colorscale": "échelle de couleurs",
      "colorscale_optima": "Minimum et maximum sur l'échelle de couleur",
      "values_to_display": "Valeurs à afficher",
      "display_inferior": "Afficher les valeurs inférieures à",
      "display_superior": "Afficher les valeurs supérieures à",
      "reset": "Initialiser",
      "search": "Recherche",
      "overall_optima": "minimum et maximum globaux",
      "search_optima": "Rechercher les optima",
      "sub_swath": "Sous-fauchée",
      "file": "File",
      "view_in_map": "Visualiser les optima sur la carte",
      "profile": "profile",
      "click_on": "Cliquez sur",
      "picture_to_obtain_values": "l'image afin d'obtenir les valeurs en ce point",
      "to_start_new_path": "pour commencer un nouveau chemin",
      "then_click_on_map": "Puis cliquez sur la carte pour le tracer, et n'oubliez pas d'enregistrer",
      "to_update_paths": "pour modifier les chemins existants",
      "to_remove_paths": "pour supprimer des chemins existants",
      "download": "téléchargements",
      "download_geotiff": "télécharger les fichiers geotiffs",
      "publish": "Publier",
      "no_selected_processing": "Aucun calcul n'a été sélectionné",
      "searching": "Recherche en cours",
      "error_dir": "Aucune sous-fauchée trouvée. <br />Le répertoire a été supprimé ou est inaccessible",
      "dir_reading": "Lecture du dossier des sous-fauchées",
      "this_sub_swath_could_not_be_found": "La sous-fauchée N°{num} est introuvable",
      "loading_sub_swath": "Chargement de la sous-fauchée N°{num} en cours",
      "loading_file": "Chargement du fichier {name} en cours",
      "sub_swath_loaded": "Sous-fauchée N°{num} chargée",
      "file_loaded": "Ficher {name} chargé",
      "values_along_the_line": "Valeurs le long de la ligne pour la bande N°{raster}",
      "no_selected_file": "Aucun fichier sélectionné",
      "files_list_not_found": "La liste des fichiers est introuvable",
      "component": "Composant",
      "no_subswath": "Aucun sous-fauchée trouvée pour ce token",
      "subswath_not_found": "Sous-fauchée N° {num} introuvable",
      "no_subswath_found": "Aucune sous-fauchée trouvée!",
      "result_directory": "Répertoire des résultats"
    }
  }
</i18n>
<template>
  <div>
    <div id="container" class="geotiff-viewer">
    <!-- avant formater alert -->
      <formater-alert-message ref="alert" :msg="JSON.stringify(messages)" :playing="playing" :lang="lang"></formater-alert-message>
      <!-- après formater -->
      <!--  <div id="alert" v-show="alert.msg.length > 0">
          <div>
            <span class="close" @click="stopAlert()" v-show="!alert.playing">&#x2716;</span>
            <div v-html="alert.html"></div>
          </div>
      </div> -->
     <!--   <header style="position:relative;" v-if="header !== {}">
      <a style="float:right;margin-right:10px;" :href="header.html" target="_blank"><img :src="header.badge" /></a>
      <h1 style="margin:0">{{header.title}}</h1>
      </header> -->
      <div id="form"  style="position:relative;">
       <formater-attribution :lang="currentLang" :name="$t('component')" color="#000000" linkcolor="#8c0209" position="BL" url="https://github.com/terresolide/formater-geotiff-visualizer-vjs" v-if="attribution"></formater-attribution>
      <div class="form-content">
      <h2>{{$t('parameters_and_search')}}</h2>
        <div id="search">
          <div class="form-group" v-if="free">
               <h3 :class="extend5 ? 'extend' : ''" @click="extend5 = !extend5">{{$tc('client_file', maxFiles)}}</h3>
               <div class="group-content">
                   <div class="input-group" style="margin-left:2px;">
                     <dragdrop-file ext="tif,tiff" :lang="currentLang" color="#707070" :max-files="maxFiles" @change="changeFiles" ></dragdrop-file>
                   </div>
               </div>
          </div>
          
          <div class="form-group" :class="{disabled:disabled}">
               <h3 :class="extend0 ? 'extend' : ''" @click="extend0 = !extend0">{{$t('band_raster')}}</h3>
               <div class="group-content">
                   <div class="input-group">
                       <select v-if="rasters.length>0" v-model="raster" @change="changeRaster">
                            <option v-for="raster in rasters" :value="raster.index">{{raster.text}}</option>
                       </select>
                       <div v-else>{{$t('no_raster')}}</div>
                   </div>
               </div>
          </div>
          <div class="form-group" :class="{disabled:disabled}">
              <h3 :class="extend1 ? 'extend' : ''" @click="extend1 = !extend1">{{$t('image_parameters')}}</h3>
              <div class="group-content">
                  <div class="input-group">
                    <h4>{{$t('opacity')}}</h4>
                     <input type="range" min="0" max="1" step="0.1" v-model="opacity" @change="changeOpacity" :disabled="disabled"/>
                  </div>
                  <div class="input-group">
                    <h4>{{$t('colorscale')}}</h4>
                     <select class="select-color-scale" v-model="colorScale" @change="changeColorScale" :disabled="disabled">
                      <option v-for="(item, index) in colorScales" :key="index">{{item}}</option>
                     </select>
                  </div>
                  <div class="input-group">
                    <h4>{{$t('colorscale_optima')}}</h4>
                    <formater-double-range ref="doubleRange" :lang="currentLang" :disabled="disabled" :colorscale="colorScale" :width="250" :min="rangeScale.min" :max="rangeScale.max"  :defaultmin="defaultRange.min" :defaultmax="defaultRange.max" @change="changeMinMax"></formater-double-range>
                  </div>
                  <div class="input-group">
                    <h4>{{$t('values_to_display')}}</h4>
                    <div>
                        <input type="checkbox" v-model="clamp.low" @change="changeClamp" :disabled="disabled">
                        <label>{{$t('display_inferior')}} {{displayed ? displayed.min.toPrecision(3) : defaultRange.min}}</label>
                    </div>
                    <div>
                        <input type="checkbox" v-model="clamp.high" @change="changeClamp" :disabled="disabled">
                        <label>{{$t('display_superior')}} {{displayed ? displayed.max.toPrecision(3) : defaultRange.max}}</label>
                    </div>
                  </div>
                  <div class="input-group">
                    <h4>{{$t('reset')}}</h4>
                    <div>
                        <input type="button"  :disabled="disabled" @click="resetForm" :value="$t('reset')">
                    </div>
                  </div>
              </div>
         </div>
         <div class="form-group" :class="{disabled:disabled}">
             <h3 :class="extend2 ? 'extend' : ''" @click="extend2 = !extend2">{{$t('search')}}</h3>
               <div class="group-content">
                 <div class="input-group">
                  <h4>{{$t('overall_optima')}}</h4>
                  <input type="button" :value="$t('search_optima')" :disabled="(disabled || optima.min != null)" @click="searchOptima">
                  <ul>
                    <li><span class="label">Minimum</span>: {{(optima.min == null) ? '--' : optima.min | number}}</li>
                    <li><span class="label">Maximum</span>: {{(optima.max == null) ? '--' : optima.max | number}}</li>
                  </ul>
                  <div class="formater-ssfauche-optima" v-if="optima.list && typeof value !== 'undefined'" v-for="(value, index) in optima.list" @mouseover="showSsfauche(index)" @mouseout="hideSsfauche(index)">
                  <h5><span :style="'color: ' + graphColors[index % graphColors.length] + ';'">&#9642;</span>{{getSubswathName(index)}}</h5>
                  <ul>
                    <li><span class="label">Minimum</span>: {{(value.min == null) ? '--' : value.min | number}}</li>
                    <li><span class="label">Maximum</span>: {{(value.max == null) ? '--' : value.max | number}}</li>
                  </ul>
                  </div>
                   <div v-show="optima.min != null">
                    <input type="checkbox"  v-model="showMarkers" @change="toggleMarkers">
                    <label>{{$t('view_in_map')}}</label>
                  </div>
                 </div>
                 <div class="input-group">
                    <h4>Mode</h4>
                    <div>
                    <input type="radio" v-model="mode" value="point" :disabled="disabled" @change="changeMode"><label>Point</label>
                    <input type="radio" v-model="mode" value="profile" :disabled="disabled" @change="changeMode"><label>{{$t('profile')}}</label>
                    </div>
                    <div class="instruction" v-if="mode == 'point'">{{$t('click_on')}} {{$t('picture_to_obtain_values')}}</div>
                    <div class="instruction" v-else>
                      <div class="leaflet-draw-toolbar leaflet-bar">
                      <ul>
                      <li>{{$t('click_on')}} <a class="leaflet-draw-draw-polyline"></a>, {{$t('to_start_new_path')}}. <br />
                      {{$t('then_click_on_map')}}.</li>
                      <li>{{$t('click_on')}} <a class="leaflet-draw-edit-edit"></a> {{$t('to_update_paths')}}</li>
                      <li>{{$t('click_on')}} <a class="leaflet-draw-edit-remove"></a> {{$t('to_remove_paths')}}</li>
                      </ul>
                    </div></div>
                 </div>
               </div>
            </div>
            <div class="form-group" :class="{disabled:disabled}" v-if="token || jsonurl">
              <h3 :class="extend3 ? 'extend' : ''" @click="extend3 = !extend3">{{$t('download')}}</h3>
               <div class="group-content">
                 <div class="input-group">
                   <h4>{{$t('download_geotiff')}}</h4>
                   <div>
                   <ul class="list-geotiff">
                     <li v-for="(geotiff, index) in geotiffs" :key="index">
                       <a v-if="geotiff" class="geotiff-url" :href="geotiff.options.tiff" @mouseover="showSsfauche(index)" @mouseout="hideSsfauche(index)" download>{{getSubswathName(index)}}</a>
                    </li>
                 </ul>
                 </div>
                 </div>
                 <div class="input-group" v-if="dirurl">
                    <h4>Publication</h4>
                    <div>
                    <input type="button"  :value="$t('publish')" disabled="disabled">
                    </div>
                 </div>
              </div>
            </div>
            <div class="form-group" v-if="dirurl || temporal || zenodo">
              <h3 :class="extend4 ? 'extend' : ''" @click="extend4 = !extend4">INFOS</h3>
               <div class="group-content">
                 <div class="input-group" v-if="dirurl">
                      <label>{{$t('result_directory')}}:</label>
                      <div><a :href="dirurl+token" target="_blank"> {{dirurl}}{{token}}</a></div>
                 </div>
                 <div class="input-group" v-if="temporal">
                      <label>Dates:</label>
                      <div>["{{temporal.begin}}", "{{temporal.end}}"]</div>
                 </div>
                 <div class="input-group" v-for="(item, index) in metadata" v-if="zid">
                   <label>{{index}}</label>
                   <span>{{item}}</span>
                 </div>
                 <div class="input-group" v-for="(item,index) in metadata" v-else>
                   <label>{{item.name}}:</label>
                   <span>{{item.value}}</span>
                 </div>
              </div>
            </div>
          </div>
       </div>
      </div>
      <div id="mapTiff">
        <div class="map" @mouseover="hideMarker"></div>
        <div  v-show="hasChart" class="hasChart">
            <div class="chart-container" style="width:80%;margin:auto;background:white;">
                <div class="close" style="" @click="closeGraph">&#x2716;</div>
                <div id="chart"></div>
            </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
/* eslint no-unused-vars: "off" */
 // import config from './config.js'
  var L = require('./module/leaflet.extends.js')
  import FormaterDoubleRange from './elements/formater-double-range.vue'
  import {FormaterAlertMessage, FormaterAttribution, DragdropFile} from 'formater-commons-components-vjs'
  require('leaflet-draw')
  var plotty = require('plotty')

  let icon = new L.Icon({
    iconUrl: require('./assets/images/marker-icon.png'),
    iconRetinaUrl: require('./assets/images/marker-icon-2x.png'),
    shadowUrl: require('./assets/images/marker-shadow.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  })
  var Highcharts = require('highcharts')

  export default {
    name: 'GeotiffVisualizer',
    components: {
      FormaterDoubleRange,
      FormaterAlertMessage,
      FormaterAttribution,
      DragdropFile
    },
    props: {
      lang: {
        type: String,
        default: 'en'
      },
      jsonurl: {
        type: String,
        default: null
      },
      zenodo: {
        type: String,
        default: null
      },
      token: {
        type: String,
        default: null
      },
      dirurl: {
        type: String,
        default: null
      },
      attribution: {
        type: Boolean,
        default: true
      },
      band: {
        type: Number,
        default: 1
      },
      maxFiles: {
         type: Number,
         default: 3
      },
      infos: {
         type: Array,
         default: () => []
      }
    },
    data () {
      return {
        extend5: true,
        extend0: false,
        extend1: false,
        extend2: false,
        extend3: false,
        extend4: false,
        disabled: true,
        messages: [],
        playing: false,
        map: null,
        renderer: [],
        geotiffs: [],
        rasters: [{index: 0, text: 'Raster 1'}],
        // index du raster courant
        raster: 1,
        rangeScale: {
          min: -200,
          max: 200
        },
        // default displayMin displayMax
        defaultRange: {
          min: -50,
          max: 50
        },
        opacity: 0.7,
        // current displayMin and displayMax
        displayed: null,
        // formated current displayMin and displayMax
        displayedToStr: null,
        colorScale: 'rdbu',
        clamp: {
          low: true,
          high: true
        },
        // current optima
        optima: {
          min: null,
          max: null
        },
        // optima for each raster
        optimas: [],
        mode: 'point',
        // nombre de répertoires de sous fauchées avec 1 fichier geotiff small.tif dedans
        ntiffs: 0,
        loadedTiffs: 0,
        colorScales: Object.keys(plotty.colorscales).sort(),
        resizeListener: null,
        editableLayers: null,
        status: 'FREE',
        hasChart: false,
        chart: null,
        marker: null,
        // graphColors[raster][ssfauche]
        graphColors: ['#e67000', '#00b38f', '#751aff', '#990033', '#31639c'],
        selectedLayer: null,
        listControl: null,
        defaultColor: '#0000FF',
        selectedColor: '#ff0000',
        processToken: '',
        urlResultat: '',
        bounds: null,
        valuesInPoint: null,
        popup: null,
        showMarkers: true,
        minMaxMarkers: [],
        resetControl: null,
        files: [],
        currentLang: 'en',
        languageChangeListener: null,
        free: false,
        temporal: null,
        title: null,
        metadata: [],
        header: {},
        zid: null
      }
    },
     watch: {
       token (newvalue) {
         console.log(newvalue)
         if (newvalue && this.dirurl) {
           this.urlResultat = this.dirurl + newvalue + '/'
           this.searchUrlTiffs()
         }
       },
       lang (newvalue) {
         this.changeLanguage(newvalue)
       }
    },
    created () {
      this.raster = this.band - 1
      this.currentLang = this.lang
      this.$i18n.locale = this.lang
      this.metadata = this.infos
      if (this.lang === 'fr') {
        L.drawLocal = require('./module/leaflet.draw.fr.js')
      }
      this.languageChangeListener = this.changeLanguage.bind(this)
      document.addEventListener('languageChange', this.languageChangeListener)
      var event = new CustomEvent('languageRequest')
      document.dispatchEvent(event)
    },
    mounted () {
      var _this = this
      this.initDefault()
      this.initMap()
      this.resizeListener = this.handleResize.bind(this)
      window.addEventListener('resize', this.resizeListener)

      if (this.token && this.dirurl) {
        this.raster = 1
        this.free = false
        this.urlResultat = this.dirurl + this.token + '/'
        this.searchUrlTiffs()
      } else if (this.jsonurl) {
        this.free = false
        this.readList (this.jsonurl, true)
      } else if (this.zenodo ){
        this.zid = this.zenodo
        this.readList (config.zenodoApi + this.zenodo, false)
      } else {
        var url = new URL(window.location.href)
        this.zid = url.searchParams.get('zid')
        if (this.zid) {
          this.readList(config.zenodoApi + this.zid, false)
        } else {
          this.free = true
        }
      }
    },
    destroyed () {
      window.removeEventListener('resize', this.resizeListener)
      this.resizeListener = null
      document.removeEventListener('languageChangeListener', this.changeLanguage)
      this.languageChangeListener = null
      this.removeAllFiles();
      this.editableLayers = null
      if (this.drawControl) {
        this.drawControl.remove()
        this.drawControl = null
      }
      if (this.listControl) {
        this.listControl.remove()
        this.listControl = null
      }
     
    },
    methods: {
      initDefault () {
        this.reset()
        this.defaultRange = {
          min: -50,
          max: 50
        }
       // this.resetForm()
      },
      /* Initialise la carte
       */
      initMap: function () {
        var container = this.$el.querySelector('div.map')
        var _this = this
        this.map = L.map(container).setView([0, 0], 2)
        L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          {
            attribution: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
            maxZoom: 18,
            minZoom: 2
          }).addTo(this.map)

        this.map.on('click', function (event) {
          _this.searchOnGeotiffLayer(event)
        })
        this.initDraw()
        this.popup = L.popup()
        this.handleResize()
      },
      initDraw () {
        var _this = this
        this.editableLayers = new L.FeatureGroup()

        this.drawControl = new L.Control.Draw({
          draw: {
            polyline: {
              allowIntersection: false,
              shapeOptions: {
                interactive: true,
                color: _this.selectedColor,
                opacity: 1,
                weight: 4
              },
              interactive: true
            },
            marker: false,
            circle: false,
            circlemarker: false,
            polygon: false,
            rectangle: false},
          edit: {
            featureGroup: _this.editableLayers
          }
        })
        this.map.on('draw:drawstart draw:editstart draw:deletestart', function (e) {
          _this.status = 'DRAWING'
          _this.hasChart = false
          _this.closeGraph()
        })
        this.map.on('draw:drawstop draw:editstop draw:deletestop', function (e) {
          _this.status = 'FREE'
        })
        this.map.on('draw:deleted', function (e) {
          e.layers.eachLayer(function (layer) {
            layer.resetValues()
          })
        })
        this.map.on('draw:edited', function (e) {
          _this.editableLayers.eachLayer(function (layer) {
            layer.resetValues()
            _this.layerToChart(layer)
          })
        })
        this.map.on('draw:created', function (e) {
          // A METTRE AILLEURS FUNCTION DE L.Map??
          var layer = e.layer
          layer.resetValues()
          var path = layer.getLatLngs()
         // _this.pathTreatment(path)
          _this.editableLayers.addLayer(layer)
          layer.options.interactive = true
          layer.on('click', function (event) {
            console.log('click on layer')
            if (_this.status === 'FREE') {
              // var data = this.prepareData()
              _this.layerToChart(layer)
              _this.createChart(this)
            }
          })
          _this.layerToChart(layer)
          _this.createChart(layer)
        })
        // le marqueur pour suivre le graphique
        this.marker = L.marker([0, 0], {icon: icon})
        this.marker.addTo(this.map)
        this.marker.setOpacity(0)
      },
     
      searchUrlTiffs () {
        this.messages.push(this.$i18n.t('searching'))
        this.playing = true
        this.tiffs = []
        var _this = this
        this.ntiffs = 0
        this.$http.get(this.urlResultat).then(
          response => { _this.findListSousFauche(response) },
          response => { _this.handleError(null, _this.$i18n.t('error_dir')) }
        )
      },
      findListSousFauche (response) {
        var parser = new DOMParser()
        var html = parser.parseFromString(response.body, 'text/html')
        var links = html.querySelectorAll('a')
        this.messages.push(this.$i18n.t('dir_reading'))
        var _this = this
        links.forEach(function (link) {
          var ssfauche = link.getAttribute('href').match(/iw([1-3])\//)
          if (ssfauche) {
            _this.ntiffs += 1
            var url = _this.urlResultat + link.getAttribute('href')
            _this.searchSousFaucheTiff(parseInt(ssfauche[1] - 1), url)
          }
        })
        if (this.ntiffs === 0) {
        	this.handleError(null, this.$i18n.t('no_subswath'))
        }
      },
      searchSousFaucheTiff (number, url) {
        var _this = this
        this.$http.get(url).then(
          response => { _this.findTiff(url, number, response) },
          response => { _this.handleError(number, _this.$i18n.t('this_sub_swath_could_not_be_found', {num: number + 1})) }
        )
      },
      findTiff (url, number, response) {
        var parser = new DOMParser()
        var html = parser.parseFromString(response.body, 'text/html')
        var links = html.querySelectorAll('a')
        var _this = this
        var urlsmall = null
        var urlbig = null
        links.forEach(function (link) {
         var smalltif = link.getAttribute('href').match(/.*_small.tif{1,2}/)
          if (smalltif) {
            urlsmall = url + link.getAttribute('href')
          } else {
            var bigtiff = link.getAttribute('href').match(/.*.tif{1,2}/)
            if (bigtiff) {
              urlbig = url + link.getAttribute('href')
            } 
          }
          
        })
        if (urlsmall) {
          if (!urlbig) {
            urlbig = urlsmall
          }
          var numMessage = this.messages.push(this.$i18n.t('loading_sub_swath', {num: number + 1}))
          this.loadGeotiff(number, urlsmall, numMessage - 1, urlbig)
        } else {
            this.ntiffs -= 1
        	this.changeMessage(number, this.$i18n.t('subswath_not_found', {num: number + 1}))
        }
      },
      readList (url, custom) {
        var _this = this
        this.$http.get(url).then(
            response => { _this.loadFiles(response, custom) },
            response => { _this.handleError(null, _this.$i18n.t('files_list_not_found')) }
          )
      },
  
      resetOptima () {
        this.removeMarkers()
        this.optima = {min: null, max: null}
        this.optimas = []
      },
      loadFiles (response, custom) {
        if (custom) {
          // read json that contains files list
          this.files = response.body
        } else {
         // console.log(response.body)
          this.extractZenodoData(response.body)
        }
        var _this = this
        this.ntiffs = this.files.length
        this.files.forEach(function (file, number) {
          if (file.smalltiff) {
          var numMessage = _this.messages.push(_this.$i18n.t('loading_sub_swath', {num: number + 1}))
          _this.loadGeotiff(number, file.smalltiff, numMessage - 1, file.bigtiff)
          } else {
            _this.loadedTiffs += 1
          }
        })
      },
      extractZenodoData (data) {
        this.metadata = data.metadata
        this.header = {}
        this.header.title = data.title
        for(var item in data.links) {
          switch(item) {
          case 'badge':
          case 'html':
            console.log(item)
             this.header[item] = data.links[item]
          } 
        }
        data.files.forEach(function (file) {
          //@todo peut-être si les fichiers sont trop lourds
        })
        this.files.push({
            smalltiff: 'https://sandbox.zenodo.org/api/files/5de813f8-bfca-4425-9d50-27d21d3addbf/GDM_geo_20170627-20170703_sd_era_atmo_4rlks.unw.tiff',
            bigtiff: 'https://sandbox.zenodo.org/api/files/5de813f8-bfca-4425-9d50-27d21d3addbf/GDM_geo_20170627-20170703_sd_era_atmo_4rlks.unw.tiff'
        })
      },
      receiveFile (event) {
        this.$set(this.files, event.index, event.file.name)
        this.ntiffs++
        this.resetOptima()
        this.closeGraph()
        var numMessage = this.messages.push(this.$i18n.t('loading_file', {name: event.file.name}))
        this.loadGeotiff(event.index, event.file, numMessage - 1, null)
      },
      removeFile (event) {
        var index = event.index
        this.geotiffs[index].remove()
        delete this.geotiffs[index]
        delete this.files[index]
        this.ntiffs--
        this.loadedTiffs--
        this.renderer[index] = null
        delete this.renderer[index]
        this.resetBounds()
        this.resetOptima()
        this.removeChart()
        if (this.ntiffs <= 0) {
          // remove path on map
          if (this.mode === 'profile') {
			this.editableLayers.clearLayers() 
          }
        }
        this.afterLoad()
        // this.renderer
        
      },
      removeAllFiles() {
        var _this = this
        this.geotiffs.forEach(function (geotiff, index) {
          geotiff.remove()
          _this.renderer[index] = null
        })
        this.geotiffs = []
        this.renderer = []
        this.files = []
        this.ntiffs = 0
        this.loadedTiffs = 0
        this.resetBounds()
        this.resetOptima()
        this.removeChart()
        this.editableLayers.clearLayers()
      },
      afterLoad () {
//         var count = 0
//         this.geotiffs.forEach(function (geotiff) {
//           count++
//         })
        console.log('after load')
        if (this.ntiffs === this.loadedTiffs) {
          this.initRasters()
          this.initDoubleRange()
          this.disabled = false
          this.changeOpacity()
          if (this.bounds) {
            this.map.fitBounds(this.bounds)
          } else {
            this.map.fitBounds( L.latLngBounds([-90,-180], [90, 180]))
          }
          if (!this.resetControl) {
            this.resetControl = new L.Control.ResetControl(this.bounds, this.lang)
            this.map.addControl(this.resetControl)
          } else {
            this.resetControl.setBounds(this.bounds)
          }
          this.messages = []
          this.playing = false
          if (!this.listControl) {
            this.listControl = new L.Control.List(this, {})
            this.listControl.addTo(this.map)
          } else {
            this.listControl.update(this)
          }
          if (this.ntiffs === 0) {
            this.listControl.remove()
            this.listControl = null
            this.disabled = true
            this.extend0 = false
            this.extend1 = false
            this.extend2 = false
            this.extend3 = false
            this.extend4 = false
          }
        }
      },
      handleError (ssfauche, msg) {
        // nombre d'introuvable
        if (['1', '2', '3'].indexOf(ssfauche) >= 0) {
          this.ntiffs -= 1
          this.messages.push(msg)
        } else {
          this.messages = []
          this.messages.push(msg)
        }
        this.playing = false
      },
      initRenderer (ssfauche) {
        var options = {
          clampLow: this.clamp.low,
          clampHigh: this.clamp.high,
          colorScale: this.colorScale
        }
        var opacity = this.opacity
        this.renderer[ssfauche] = new L.LeafletGeotiff.Plotty(options)
      },
      /**
      * Load the geotiff "filepath"  and add it to the map
      * With the colorScale in this.colorScale
      * displayMin
      * @param String filepath file url
      */
      loadGeotiff (ssfauche, url, numMessage, bigtiff) {
        // search date begin and date end
        var pattern = /([0-9}]{8})\-([0-9]{8})/
        var match = url.match(pattern)
        function toDate (str) {
          return str.substr(0,4)+'-' + str.substr(4,2) + '-' + str.substr(6,2)
        }
        if (match.length > 2) {
          this.temporal = {
              begin: toDate(match[1]),
              end: toDate(match[2])
          }
        }
        console.log(this.temporal)
        // end dates
        this.initRenderer(ssfauche)
        var options = {
          renderer: this.renderer[ssfauche],
          band: this.raster,
          color: this.graphColors[ssfauche % this.graphColors.length]
        }
        if (bigtiff) {
          options.tiff = bigtiff
        }
        this.geotiffs[ssfauche] = L.leafletGeotiff(url, options)
        var _this = this
        this.geotiffs[ssfauche].once('parsed', function () {
          if (numMessage) {
            
            _this.changeMessage(numMessage, _this.getSubswathName(ssfauche))
           }
          _this.loadedTiffs += 1
          _this.initGeotiff(ssfauche)
        })
//         this.geotiffs[ssfauche].on('click', function () {
//           console.log('click on geotiff')
//         })
        this.geotiffs[ssfauche].addTo(this.map)
        // this.renderer.setColorScale(this.colorScale)
      },
      initGeotiff (ssfauche) {
        this.addBoundsFromGeotiff(ssfauche)
        this.afterLoad()
      },
      addBoundsFromGeotiff (ssfauche) {
        var bounds = this.geotiffs[ssfauche].getBounds()
        // var count = this.geotiffs[ssfauche].getRastersCount()
        if (!this.bounds) {
          this.bounds = L.latLngBounds(bounds.getSouthWest(), bounds.getNorthEast())
        } else {
          this.bounds.extend(bounds)
        }
      },
      resetBounds () {
        this.bounds = null
        var _this = this
        this.geotiffs.forEach(function (geotiff, ssfauche) {
          _this.addBoundsFromGeotiff(ssfauche)
        })
      },
      showSsfauche (index) {
        this.geotiffs[index].rectangle.setStyle({fillOpacity: 0.3})
      },
      hideSsfauche (index) {
        this.geotiffs[index].rectangle.setStyle({fillOpacity: 0})
      },
      toggleGeotiff (index, checked) {
        this.geotiffs[index].toggle(checked, this.opacity)
      },
      chartWidth () {
        return  this.$el.querySelector('#mapTiff').offsetWidth * 0.8 - 50
      },
      getSubswathName (index) {
        if (this.free) {
         return this.files[index]
        } else {
         return this.$i18n.t('sub_swath') + '' + (index + 1)
        }
      },
      createChart (layer) {
        this.hasChart = true
        var container = this.$el.querySelector('#chart')
        var width = this.chartWidth()
        var series = []
        var _colors = this.graphColors
        var _this = this
        layer.prepareDistanceToLatLng()
        this.geotiffs.forEach(function (geotiff, ssfauche) {
          var data = layer.prepareData(_this.raster, ssfauche)
          var serie = {
            name: _this.getSubswathName(ssfauche),
            color: _colors[ssfauche],
            data: data
          }
          series.push(serie)
        })
        var _layer = layer
        this.setSelectedLayer(layer)
        var _marker = this.marker
        var formatter = function () {
          // rechercher la position pour la distance this.x
          var latlng = _layer.getLatLngFromDistance(this.x)
          _marker.setOpacity(1)
          _marker.setLatLng(latlng)
          var s = 'Distance: ' + this.x.toFixed(1) + 'km'
          this.points.forEach(function (point, index) {
            s += '<br /><span style="color:' + point.color + '">\u25CF</span> '
            s += point.series.name + ': ' + point.y.toFixed(3)
          })
          return s
        }
        this.chart = Highcharts.chart(container, {
          chart: {
            height: 200,
            marginBottom: 20,
            width: width
          },
          credits: {
            enabled: false
          },
          title: {
            text: _this.$i18n.t('values_along_the_line', {raster: _this.raster + 1})
          },
          xAxis: {
            title: {
              enabled: true,
              text: 'distance'
            },
            labels: {
              format: '{value} km'
            },
            crosshair: true,
            maxPadding: 0.05,
            howLastLabel: true
          },
          yAxis: {
            title: {
              text: ''
            },
            labels: {
              format: '{value:,.0f}'
            },
            lineWidth: 2
          },
          legend: {
            enabled: false
          },
          tooltip: {
            shared: true,
            formatter: formatter
           // headerFormat: '<b>{series.name}</b><br/>',
           // pointFormat: '{point.x} km: {point.y)}'
          },
          plotOptions: {
            spline: {
              marker: {
                enable: false
              }
            }
          },
          series: series
        })
      },
      layerToChart (layer) {
        // pour le moment on recalcule à chaque fois
        // même quand on change de raster et qu'on a déjà les valeurs
        // du coup, on écrase à chaque fois les anciennes valeurs
        var edges = layer.stitchEdges()
        var values = layer.getValues()
        var bounds = []
        this.geotiffs.forEach(function (geotiff, ssfauche) {
          bounds[ssfauche] = geotiff.getBounds()
        })
        var _this = this
        edges.forEach(function (edge) {
          edge.forEach(function (latlng) {
            _this.geotiffs.forEach(function (geotiff, ssfauche) {
              if (!latlng.value) {
                latlng.value = []
              }
              if (!latlng.value[_this.raster]) {
                latlng.value[_this.raster] = []
              }
           // on controle que bien dans les bounds, sinon on met 0 comme valeur
              if (bounds[ssfauche].contains([latlng.lat, latlng.lng])) {
                var value = geotiff.getValueAtLatLng(latlng.lat, latlng.lng)
                latlng.value[_this.raster][ssfauche] = value
              } else {
                // latlng.value[_this.raster][ssfauche] = 0
              }
              values.push(latlng)
            })
          })
        })
        layer.setValues(values)
      },
      removeChart () {
        // remove chart
        for (var i = 0; i < Highcharts.charts.length; i++) {
          if (typeof Highcharts.charts[i] !== 'undefined') {
            Highcharts.charts[i].destroy()
          }
        }
        this.closeGraph()
      },
      closeGraph () {
        this.hasChart = false
        this.marker.setOpacity(0)
        this.setSelectedLayer(null)
      },
      updateRasters (count) {
        this.rasters = []
        for (var i = 0; i < count; i++) {
          this.rasters.push({index: i, text: this.$i18n.t('raster') + ' ' + (i + 1)})
        }
      },
      initRasters () {
        var count = -1
        this.geotiffs.forEach(function (geotiff) {
          if (count < 0) {
            count = geotiff.getRastersCount()
          } else {
            var count0 = geotiff.getRastersCount()
            count = Math.min(count, count0)
          }
        })
        this.updateRasters(count)
        for (var i = 0; i < count; i++) {
          this.minMaxMarkers[i] = L.layerGroup()
          if (count === this.raster && this.showMarkers) {
            this.minMaxMarkers[i].addTo(this.map)
          }
        }
      },
      initDoubleRange () {
        // init bounds value
       // if (this.geotiffs && this.geotiffs.length > 0) {
          // this.rangeScale = this.geotiffs[1].getRange()
        var _this = this
        var min = null
        var max = null
        this.geotiffs.forEach(function (geotiff) {
          var range = geotiff.getRange()
          if (typeof range !== 'undefined') {
            if (min === null) {
              min = range.min
              max = range.max
            } else {
              if (min > range.min) {
                min = range.min
              }
              if (max < range.max) {
                max = range.max
              }
            }
          }
        })
        if (min !== null) {
          this.rangeScale.min = min
          this.rangeScale.max = max
        }
        this.defaultRange = {
          min: this.rangeScale.min + 0.3 * (this.rangeScale.max - this.rangeScale.min),
          max: this.rangeScale.max - 0.3 * (this.rangeScale.max - this.rangeScale.min)
        }
        this.displayed = this.defaultRange
        this.displayedToStr = this.displayed
      },
      changeFiles (event) {
        switch(event.type) {
        case 'add':
          this.receiveFile(event)
          break;
        case 'remove':
          this.removeFile(event);
          break;
        } 
      },
      changeLanguage (event) {
    	  this.currentLang = event.detail
    	  if (this.$i18n)
    	    this.$i18n.locale = event.detail
    	  if (this.resetControl) {
    		  this.resetControl.setLang(event.detail)
    	  }
    	  if (this.listControl) {
    		  this.listControl.setLang(event.detail)
    	  }
    	  if (this.currentLang === 'fr') {
    	    L.drawLocal = require('./module/leaflet.draw.fr.js')
    	  } else {
    		  L.drawLocal = require('./module/leaflet.draw.en.js')
    	  }
      },
      changeColorScale: function () {
        var _this = this
        this.renderer.forEach(function (renderer) {
          renderer.setColorScale(_this.colorScale)
        })
      },
      changeOpacity: function () {
        var _this = this
        this.geotiffs.forEach(function (geotiff) {
          geotiff.setOpacity(_this.opacity)
        })
        // this.geotiffs.setOpacity(this.opacity)
      },
      changeMessage (index, msg) {
        // changement pas détecté par vuejs :
        this.messages[index] = msg
        
        if (this.ntiffs === 0) {
          this.handleError(null, this.$i18n.t('no_subswath_found'))
        } else {
          // changements détectés !!!!:
          this.messages.push('')
          this.messages.pop()
        }
      },
      changeMinMax: function (event) {
    	  if (!event.displayed && (!event.displayed.min || event.displayed.min === null)) {
    	    return
    	  }
        this.displayed =  event.displayed
        this.displayedToStr =  event.str
        var _this = this
        this.renderer.forEach(function (renderer) {
          renderer.setDisplayRange(_this.displayed.min, _this.displayed.max)
        })
        // this.renderer.setDisplayRange(this.displayed.min, this.displayed.max)
        // this.geotiff.options.renderer = this.renderer
      },
      changeMode (event) {
        switch (this.mode) {
          case 'point':
            this.editableLayers.remove()
            this.drawControl.remove()
            this.removeChart()
            break
          case 'profile':
            var map = this.map
            this.map.closePopup()
            this.editableLayers.addTo(map)
            var _this = this
            var count = 0
             this.editableLayers.eachLayer(function (layer) {
              layer.on('click', function (e) {
                if (_this.status === 'FREE') {
                  // var data = this.prepareData(_this.raster)
                  _this.createChart(this)
                }
              })
            }) 
            this.drawControl.addTo(map)
            this.marker.setOpacity(0)
            this.editableLayers.bringToFront()
            break
        }
      },
      changeClamp: function () {
        var _this = this
        this.renderer.forEach(function (renderer) {
          renderer.setClamp(_this.clamp.low, _this.clamp.high)
        })
        // this.renderer.setClamp(this.clamp.low, this.clamp.high)
      },
      changeRaster () {
        if (this.optimas[this.raster]) {
          this.optima = this.optimas[this.raster]
        } else {
          this.optima = {
            min: null,
            max: null
          }
        }
        // change min max markers
        this.toggleMarkers()

        var _this = this
        this.geotiffs.forEach(function (geotiff) {
          geotiff.setBand(_this.raster, true)
        })
       //  this.geotiff.setBand(this.raster, true)
        this.initDoubleRange()
        this.closeGraph()
      },
      handleResize () {
    	var h = 0
    	if (document.querySelector('#menu')) {
          var h = document.querySelector('#menu').offsetHeight + 5
    	} else {
    	  var pos = this.$el.getBoundingClientRect()
    	  var h = pos.top + 5
    	}
        this.$el.querySelector('#container').style.height = Math.max(window.innerHeight - h, 500) + 'px'
        if (this.map) {
          this.map.invalidateSize()
        }
        if (this.hasChart) {
          var width = this.chartWidth()
          var height = this.chart.height
          this.chart.setSize(width, null, true)
        }
      },
      hideMarker () {
        this.marker.setOpacity(0)
      },
      resetForm () {
        this.colorScale = 'rdbu'
        this.initDoubleRange()
        this.displayed = null
        this.strDisplayed = null
        // this.$refs.doubleRange.reset()
        this.optima.min = null
        this.optima.max = null
        this.clamp = {
          low: true,
          high: true
        }
        this.opacity = 0.7
        if (this.renderer.length > 0) {
          var options = {
            colorScale: this.colorScale,
            displayMin: this.defaultRange.min,
            displayMax: this.defaultRange.max,
            clampLow: this.clamp.low,
            clampHigh: this.clamp.high
          }
          var _this = this
          this.renderer.forEach(function (renderer) {
            renderer.setOptions(options)
          })
          this.changeOpacity()
        }
      },
      reset () {
        this.renderer = []
        this.geotiffs.forEach(function (geotiff) {
          geotiff.remove()
          geotiff = null
        })
        this.geotiffs = []
        if (this.editableLayers) {
          this.editableLayers.clearLayers()
        }
        this.resetForm()
        this.disabled = true
      },
      searchValueAtLatLng (latlng) {
        var values = []
        this.geotiffs.forEach(function (geotiff, index) {
          values[index] = geotiff.getValueAtLatLng(latlng.lat, latlng.lng)
        })
        return values
      },
      searchOnGeotiffLayer: function (event) {
        switch (this.mode) {
          case 'point':
            this.valuesInPoint = this.searchValueAtLatLng(event.latlng)
            var values = []
            var content = null
            var _this = this
            var count = 0
            var container = L.DomUtil.create('div', 'formater-popup')
            this.valuesInPoint.forEach(function (value, index) {
              if (value !== 'out') {
                var div = _this.createPopupValue(index, value, container)
                count++
              }
            })
            if (count > 0) {
              this.popup.setContent(container).setLatLng(event.latlng)
              this.popup.openOn(this.map)
            }
            break
          case 'profile':
            break
        }
      },
      createPopupValue (index, value, container) {
        var div = L.DomUtil.create('div', 'formater-popup-item', container)
        var span = L.DomUtil.create('span', 'bullet', div)
        span.innerHTML = '&#9642; '
        span.style.color = this.graphColors[index % this.graphColors.length]
        var strong = L.DomUtil.create('strong', '', div)
        strong.textContent = this.getSubswathName(index) + ' : '
        var text = L.DomUtil.create('span', '', div)
        text.textContent = value.toFixed(2).replace('.', ',').replace('-', '- ')
        // Add listeners mouseover mouseout
        var _this = this
        L.DomEvent.on(div, 'mouseover', function () { _this.showSsfauche(index) }, div)
        L.DomEvent.on(div, 'mouseout', function () { _this.hideSsfauche(index) }, div)
        return div
      },
      searchOptima: function () {
        if (!this.optimas[this.raster]) {
          var _this = this
          var max = null
          var min = null
          var ptMin = null
          var ptMax = null
          var aux = null
          var optimaList = []
          var map = this.map
          this.geotiffs.forEach(function (geotiff, index) {
            aux = geotiff.getMinMaxValues()
            if (min == null || min > aux.min) {
              min = aux.min
            }
            if (max == null || max < aux.max) {
              max = aux.max
            }
            optimaList[index] = aux
            // optimaList[index].minMarker = L.marker(aux.ptMin)
            var latlng = null
            if (aux.imin !== null) {
              latlng = geotiff.index2LatLng(aux.imin)
              _this.addMaxMinMarker(index, latlng, aux.min, 'min')
            }
            if (aux.imax !== null) {
              latlng = geotiff.index2LatLng(aux.imax)
              _this.addMaxMinMarker(index, latlng, aux.max, 'max')
            }
            // optimaList[index].minMarker.addTo(map)
          })
          this.optimas[this.raster] = {min: min, max: max, list: optimaList}
          this.toggleMarkers()
        }
        this.optima = this.optimas[this.raster]
      },
      addMaxMinMarker (index, latlng, value, type) {
        var iconMaxMin = L.divIcon({
          className: 'markerIcon',
          iconAnchor: [12, 30],
          labelAnchor: [-6, 0],
          popupAnchor: [2, -24],
          html: '<span style="background:' + this.graphColors[index % this.graphColors.length] + ';"><span>' + type + '</span></span>'
        })
        var marker = L.marker(latlng, {icon: iconMaxMin, value: value, index:index})
        var popup = this.createPopupValue(index, value, null)
        marker.bindPopup(popup)
        // this.markers[this.rasters][index][type] = marker
        this.minMaxMarkers[this.raster].addLayer(marker)
      },
      toggleMarkers () {
        var _this = this
        this.minMaxMarkers.forEach(function (groupLayer, raster) {
          if (_this.raster === raster && _this.showMarkers) {
            groupLayer.addTo(_this.map)
          } else {
            groupLayer.remove()
          }
        })
      },
      removeMarkers () {
        this.minMaxMarkers.forEach(function (groupLayer, raster) {
          groupLayer.remove()
        })
        this.minMaxMarkers = []
      },
      setSelectedLayer: function (layer) {
        if (this.selectedLayer) {
          this.selectedLayer.setStyle({color: this.defaultColor})
        }
        this.selectedLayer = layer
        if (layer) {
          this.selectedLayer.setStyle({color: this.selectedColor})
        }
      }
    }
  }
</script>


<style>

div[id="mapTiff"] .leaflet-control-container .leaflet-top.leaflet-left{
    pointer-events:none;
}
div[id="mapTiff"] .leaflet-container .leaflet-draw-section a{
    color: #fff;
    font-weight: 700;
}
div[id="mapTiff"] .leaflet-draw-tooltip {
    display: none;
}
div[id="mapTiff"] .leaflet-draw-actions li {
    display: block;
    margin: 0 0 1px 0;
    border-radius: 0;
}
div[id="mapTiff"] .leaflet-draw-actions {
    background: #555;
    margin-left:5px;
    padding: 2px;
    -webkit-border-radius: 0 4px 4px 4px;
    border-radius: 0 4px 4px 4px;
}
div[id="mapTiff"] .leaflet-draw-actions li:first-child a{
    -webkit-border-radius: 0 4px 0 0;
    border-radius: 0 4px 0 0;
}
div[id="mapTiff"] .leaflet-draw-actions li:last-child a{
    -webkit-border-radius: 0 0px 4px 4px;
    border-radius: 0 0px 4px 4px;
}
 /** css pour list control*/
 /** css leaflet.list-control.js **/
div[id="mapTiff"] .leaflet-control.leaflet-list h4{
  margin:0;
  padding:0;
  background: white;
  color:black;
  min-height:30px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}
div[id="mapTiff"] .leaflet-control.leaflet-list a.leaflet-list-toggle{
    margin: 0;
    border: none;
    font-size: 18px;
}
div[id="mapTiff"] .leaflet-control.leaflet-list a.leaflet-list-toggle:hover {
  cursor: pointer;
  font-weight: 800;
  border: none;
}
div[id="mapTiff"] .leaflet-control.leaflet-list a.leaflet-list-toggle:active,
div[id="mapTiff"] .leaflet-control.leaflet-list a.leaflet-list-toggle:visited {
  border: none;
}
div[id="mapTiff"] .leaflet-control.leaflet-list div.content{
 background:white;
 margin:0;
 border:none;
}
div[id="mapTiff"] .leaflet-control.leaflet-list h4 span{
  display:none;
  margin-left:5px;
}
div[id="mapTiff"] .leaflet-control.leaflet-list div.content{
  display:none;
}
div[id="mapTiff"] .leaflet-control.leaflet-list.leaflet-control-expanded h4,
div[id="mapTiff"] .leaflet-control.leaflet-list.leaflet-control-expanded h4 a {
  background: black;
  color:white;
}
div[id="mapTiff"] .leaflet-control.leaflet-list.leaflet-control-expanded h4 span{
  display:inline-block;
   margin-left:5px;
  margin-top: 5px;
}
div[id="mapTiff"] .leaflet-control.leaflet-list.leaflet-control-expanded div.content{
  display:block;
}
div[id="mapTiff"] div.leaflet-item{
  background: #f0f0f0;
  cursor: pointer;
  margin: 1px 0;
  padding: 1px 5px;
}
div[id="mapTiff"] div.leaflet-item input,
#mapTiff div.leaflet-item span{
  vertical-align: middle;
}
div[id="mapTiff"] div.leaflet-item:hover{
  background:#e8e8e8;
  border: 1px dotted grey;
}
/** css for control reset **/
div[id="mapTiff"] .leaflet-reset {
  font-size: 24px;
  cursor: pointer;
}
/** css for popup **/
div[id="mapTiff"] .formater-popup-item span.bullet{
   font-size: 30px;
   vertical-align:middle;
}
div[id="mapTiff"] .markerIcon {
   font-size:12px;
}
div[id="mapTiff"] .markerIcon span{
  width: 24px;
  height: 24px;
  display: block;
  left: 0px;
  top: 0px;
  position: relative;
  padding: 2px;
  color:#fff;
  text-align: center;
  border-radius: 24px 24px 0;
  transform: rotate(45deg);
 }
div[id="mapTiff"] .markerIcon span > span {
   transform: rotate(-45deg);
 }
</style>
<style scoped>
  @import "./assets/css/fontello.css"; 
/* @import "../node_modules/leaflet-draw/dist/leaflet.draw.css";
 @import "../node_modules/leaflet/dist/leaflet.css";
 @import "./assets/css/fontello.css";*/
 .geotiff-viewer{
    font-family: 'Roboto', sans-serif;
    position: relative;
    width: 100%;
    min-height:500px;
    display:block;
  }
  .geotiff-viewer div[id="form"] h2 {
    border-bottom: 1px solid grey;
    margin: 0;
    padding: 25px 0 20px 10px;
    box-shadow: 0px 1px 5px #888888;
    font-size:1.5em;
    text-transform: uppercase;
  }
  div[id="form"] h3 {
    font-weight:800;
    font-size:1.15em;
    text-transform: uppercase;
    letter-spacing: .01em;
  }
  div[id="form"] h4{
    font-weight:800;
    font-size:1em;
    letter-spacing: .01em;
  }
  div[id="form"] h4::first-letter,
  div[id="form"] label::first-letter {
    text-transform: uppercase;
  }
 .geotiff-viewer div[id="mapTiff"]{
    margin-left:385px;
    margin-right:10px;
    position:relative;
    height: 100%;
    box-sizing: border-box;
    z-index:0;
  }
  div[id="mapTiff"] div.map {
    position: absolute;
    height:100%;
    width:100%;
  }
  div[id="form"] {
    display: block;
    width: 20%;
    background-color: #f0f0f0;
    float: left;
    min-width:360px;
    width: 360px;
    height:100%;
    padding:0px;
    margin-left: 8px;
    overflow:hidden;
    font-size:14px;
    letter-spacing: .01em;
  }
  div[id="form"] .form-content{
    height: 95%;
    overflow: hidden;
    padding:0;
    margin:0;
  }
  div[id="search"]{
   max-height:90%;
   overflow-y:auto;
  }
  .input-group select,
  .input-group input[type="range"]{
   width: 250px;
   margin-left: 20px;
  }
 .input-group{
   margin: 20px 0 20px 15px;
   clear: both;
  }
 .input-group h4{
   margin-bottom:10px;
 }
 .form-group{
   border-bottom: 1px solid grey;
   padding-bottom: 15px;
 }
 span.label{
   font-weight: 500;
   color:#000;
 }
 div[id="search"] h3{
   cursor: pointer;
   color:#000;
   pointer-events:auto;
 }
 div[id="search"] .form-group.disabled h3{
   pointer-events:none;
   color:grey;
 }
 .geotiff-viewer h3::before{
   content: "\25B6";
   font-size:1.2em;
   padding-right: 5px;
 }
 h3.extend::before{
   content: "\25BC";
 }
 h3 + .group-content{
   max-height:0px;
   height:auto;
   overflow:hidden;
   transition: max-height .5s ease;
 }
 h3.extend + .group-content{
   max-height:600px;
   transition: max-height .5s ease;
 }
 .geotiff-viewer div.instruction{
   padding: 5px 10px;
   line-height:1;
   color: grey;
 }
 .geotiff-viewer div.instruction div.leaflet-draw-toolbar.leaflet-bar {
   box-shadow: none;
 }
 .geotiff-viewer div.instruction div.leaflet-draw-toolbar.leaflet-bar a{
   display: inline-block;
   vertical-align: middle;
 }
 .geotiff-viewer div.instruction ul{
  list-style-type: square
 }
 .geotiff-viewer div.instruction ul li{
    padding-left:-30px;
 }
 .geotiff-viewer div.instruction ul li::before{
   content:'\2192 ';
 }
 .geotiff-viewer .chart-container{
   width:80%;
   margin: auto;
   position:relative;
   background:white;
   box-shadow: 0px 1px 5px #888888;
 }
 .geotiff-viewer .chart-container .close {
  font-family: Arial;
  position:absolute;
  right:3px;
  top:3px;
  cursor:pointer;
  color: #333;
  border: 1px solid #fff;
  border-radius: 30px;
  font-size: 22px;
  font-weight: bold;
  display: inline-block;
  z-index:800;
 }
 .geotiff-viewer .chart-container .close:hover{
   close: #000;
 }
 .geotiff-viewer .hasChart {
   position:absolute;
   z-index:5000;
   width:100%;
   height:250px;
   bottom:0;
   left:0;
   text-align:center;
 }
 .geotiff-viewer .blue{
   color: blue;
   cursor: pointer;
 }
 .geotiff-viewer div[id="chart"]{
   width:100%;
   margin:auto;
   padding:15px;
 }
 .geotiff-viewer .list-geotiff li{
   margin: 3px 3px;
 }

 .geotiff-viewer a.geotiff-url {
   display: inline-block;
   margin: 0px 7px 3px 0;
   padding: 3px 12px;
   height: auto;
   line-height: 1.43;
   white-space: normal;
   text-align: center;
   background: #ececea;
   border-width: 1px;
   border-style: solid;
   border-radius: 3px;
   border-color: #ffffff #d4d4cf #d4d4cf;
   color: #000;
   text-decoration: none;
   /* text-shadow: 0 -1px 1px #bcbcb4, 1px 0 1px #d4d4cf, 0 1px 1px #d4d4cf, -1px 0 1px #bcbcb4; */
   vertical-align: top;
   cursor: pointer;
   pointer-events: auto;
   box-sizing: border-box;
   box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
  }
 
  .geotiff-viewer a.geotiff-url:hover{
   background: #f0f0e6;
   text-decoration: none;
  }
  .geotiff-viewer a.geotiff-url:disabled{
    color: #999;
    pointer-events: none;
  }
 .geotiff-viewer .formater-ssfauche-optima{
   margin: 5px 0 0 10px;
 }
 .geotiff-viewer.formater-ssfauche-optima h5{
   margin: 0;
  }
 .geotiff-viewer .formater-ssfauche-optima h5 span{
   width:15px;
   display:inline-block;
 }
 .geotiff-viewer .formater-ssfauche-optima ul{
   margin: 0 8px;
   font-size:0.9em;
 }
 .geotiff-viewer .formater-ssfauche-optima ul li{
   margin: 0 5px;
   min-width: 130px;
 }
 .geotiff-viewer h1, 
 .geotiff-viewer h2 {
    font-weight: normal;
  }

  .geotiff-viewer ul {
    list-style-type: none;
    padding: 0;
  }

  .geotiff-viewer li {
    display: inline-block;
    margin: 0 10px;
  }

  .geotiff-viewer a {
    color: #42b983;
  }


  .geotiff-viewer a.link {
    color: #1c1c1c;
    text-decoration: none;
    font-size: 0.8rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
  }

  .geotiff-viewer .link.router-link-active{
    border-bottom: 2px solid orange;
    padding-bottom: 15px;
  }

  .geotiff-viewer .link{
    float: right;
    border-bottom: none;
    display: inline;
    list-style: none;
    margin: 10px;
    cursor: pointer;
    font-family: inherit;
    font-size: 1rem;
    line-height: 1.6;
    list-style-position: outside;
    margin-bottom: 1.25rem;
  }
  .geotiff-viewer button,
  .geotiff-viewer input[type="button"]{
   display: inline-block;
   margin: 0px 7px 3px 0;
   padding: 3px 12px;
   height: auto;
   line-height: 1.43;
   white-space: normal;
   text-align: center;
   background: #ececea;
   border-width: 1px;
   border-style: solid;
   border-radius: 3px;
   border-color: #ffffff #d4d4cf #d4d4cf;
   color: #000;
   text-decoration: none;
  /* text-shadow: 0 -1px 1px #bcbcb4, 1px 0 1px #d4d4cf, 0 1px 1px #d4d4cf, -1px 0 1px #bcbcb4;*/
   vertical-align: top;
   cursor: pointer;
   pointer-events: auto;
   box-sizing: border-box;
   box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
  }
  .geotiff-viewer button:hover,
  .geotiff-viewer input[type="button"]:hover{
   background: #f0f0e6;
   text-decoration: none;
 }
  .geotiff-viewer button:disabled,
  .geotiff-viewer input[type="button"]:disabled{
    color: #999;
    pointer-events: none;
  }
  .geotiff-viewer .input-group label{
    font-weight: bold;
    text-transform: uppercase;
    font-size:0.8em;
  }
   .geotiff-viewer .input-group label + span{
    font-size:0.9em;
  }

</style>
