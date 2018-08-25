/**
 * Pour changer de langue
 */
<i18n>
{
  "en": {
     "name": "english"
  },
  "fr": {
     "name": "français"
  }
}
</i18n>
<template>
 <span class="language-switcher">
   <div>
    <a  class="link">
       <img :src="languages[current].img" :title="$t('name')" :alt="$t('name')">
       <span style="margin-left:0.3em;">{{$t('name')}}</span>
    </a>
    <ul class="sub-menu"> 
       <li v-for="(language, key) in languages" v-if="key !== current">
       <span  @click="changeLanguage(key)"><img :src="language.img"> {{language.name}}</span>
       </li>
    </ul>
   </div>
 </span>
</template>
<script>

export default {
  name: 'LanguageSwitcher',
  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },
  data () {
    return {
      current: 'en',
      languages: {
        fr: {name: 'français', img: require('../assets/images/fr.png')},
        en: {name: 'english', img: require('../assets/images/en.png')}
      }
    }
  },
  created () {
	  this.$i18n.locale = this.lang
  },
  destroyed () {
    console.log('destroyed')
  },
  methods: {
    changeLanguage (key) {
      this.$i18n.locale = key
      
      this.current = key
      var event = new CustomEvent('languageChange', {detail: key})
      document.dispatchEvent(event)
      // emit event language change for DrawLocal
      // this.$emit('languageChange', key)
    }
  }
}
</script>
<style scoped>
   .language-switcher > div {
      position: absolute;
      display: inline-block;
   }
   .language-switcher ul.sub-menu {
        position:absolute;
        padding:2px 0 0 0;
        width:130px;
        display:none;
        margin: 0;
        background:white;
        z-index:1000;
        border: 1px dotted grey;
    }
    .language-switcher a {
    	padding-left: 8px;
    	cursor: pointer;
    }
    .language-switcher div:hover > ul.sub-menu {
        display:block;
        height:auto;
        list-style:none;
    }
    .language-switcher span{
       text-transform: capitalize;
    }
    ul.sub-menu li{
        float: left;
        position: relative;
        padding: 3px 3px 3px 8px;
        margin-left:0;
        line-height:1;
        text-align: left;
        color: #1c1c1c;
        opacity:0.7;
				font-size: 0.9em;
				cursor:pointer;
    }
    ul.sub-menu li:hover{
       opacity:1;
       text-decoration:underline;
    }
</style>
