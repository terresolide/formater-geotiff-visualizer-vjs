require("exports-loader?!./l.min.js")

import Vue from 'vue'

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);

//pour la traduction 
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

import VueResource from 'vue-resource'
Vue.use(VueResource);

import GeotiffVisualizer from './formater-geotiff-visualizer.vue'
// import FormaterAttribution from './formater-attribution.vue'
// import AlertMessage from './elements/formater-alert-message.vue'
// import DoubleRange from './elements/formater-double-range.vue'
// import LanguageSwitcher from './elements/language-switcher.vue'

// Add aeris-theme from other local repository!
// import AerisTheme from '../../aeris-commons-components-vjs/src/aeris-theme/aeris-theme.vue'

Vue.filter('number', function (value) {
	  if (value.toFixed) {
	    value = value.toFixed(2).toString().replace('.', ',').replace('-', '- ')
	  }
	  return value
	})

ljs.addAliases({
    dep: [
 
       //leaflet css
       //------------
       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css',
       // leaflet draw
       //---------------
       'https://api.poleterresolide.fr/lib/leaflet.draw/leaflet.draw.css',
       //regiter element
       //-------------
       'https://cdnjs.cloudflare.com/ajax/libs/document-register-element/1.4.1/document-register-element.js',
       'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min.js',
       'https://cdnjs.cloudflare.com/ajax/libs/moment-range/3.0.3/moment-range.min.js'
      ]
})
ljs.load('dep', function() {

//  Vue.customElement('formater-attribution', FormaterAttribution)
//  Vue.customElement('formater-alert-message', AlertMessage)
//  Vue.customElement('formater-double-range', DoubleRange)
  Vue.customElement('geotiff-visualizer', GeotiffVisualizer) 
//  Vue.customElement('language-switcher', LanguageSwitcher)
})

