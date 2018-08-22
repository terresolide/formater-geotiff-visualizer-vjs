<i18n>
{
  "en": {
    "developed_by": "developed by",
    "formater_uri": "https://en.poleterresolide.fr"
  },
  "fr": {
   "developed_by": "développé par",
    "formater_uri": "https://www.poleterresolide.fr"
  }
}
</i18n>
<template>
<span class="formater-attribution">
<a :href="url" v-if="url" target="_blank">{{name}}</a>
<span v-else>{{name}}</span> 
 {{$t('developed_by')}} <a :href="$t('formater_uri')" target="_blank">ForM@Ter</a>
</span>
</template>
<script>
export default {
  props:{
    name: {
      type: String,
      default: 'Component'
    },
    lang: {
    	type: String,
    	default: 'en'
    },
    url: {
      type: String,
      default: null
    },
    linkcolor: {
    	type: String,
    	default: '#c8ad7f'
    },
    color: {
    	type: String,
    	default: '#00000'
    },
    position: {
      type: String,
      default: 'BR'
    }
  },
  created () {
	  this.$i18n.locale = this.lang
  },
  mounted () {
	  this.$el.style.color = this.color
	  if (typeof this.$el.querySelector === 'function') {
		  var nodes = this.$el.querySelectorAll('a')
		  var _this = this
		  nodes.forEach(function (node) {
			  node.style.color = _this.linkcolor
		  })
	  }
	  switch (this.position) {
	  case 'BR':
	    this.$el.style.bottom = '2px'
	    this.$el.style.right = '5px'
	    break;
	  case 'BL':
	    this.$el.style.bottom = '2px'
		this.$el.style.left = '5px'
	    break;
	  case 'TR':
	    this.$el.style.top = '2px'
		this.$el.style.right = '5px'
	    break;
	  case 'TL':
	    this.$el.style.top = '2px'
	    this.$el.style.left = '5px'
	    break;
	  }
  }
}
</script>
<style>
.formater-attribution{
    font-family: Roboto, sans-serif;
	position:absolute;
	/*bottom:2px;
	right:5px;*/
	z-index:2000;
	min-width:150px;
	color:white;
	padding:2px;
	height:14px;
	display:inline-block;
	font-size: 8px;
    opacity: .8;
}
.formater-attribution a,
.formater-attribution a:active,
.formater-attribution a:visited{
  color: #c8ad7f;
  text-decoration: none;
}
.formater-attribution a:hover{
  color: #842e1b;
  text-decoration: underline;
}
</style>