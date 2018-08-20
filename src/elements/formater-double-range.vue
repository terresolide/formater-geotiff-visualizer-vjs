/**
 * ben quoi
 */
 <i18n>
 {
   "en": {
     "synchronised_cursors": "Synchronised cursors"
   },
   "fr": {
     "synchronised_cursors": "curseurs synchronisés HH"
   }
 }
 </i18n>
<template>
 <span class="double-range" @mousemove="drag" :class="disabled ? 'disabled' : ''">
   <div class="range-value range-min">{{valueToString(min)}}</div>
   <div class="range-value range-max">{{valueToString(max)}}</div>
   <div class="barre">
       <canvas id="colorScaleLegend" width="256" height="1" ></canvas>
       <div id="begin-slider" class="range-slider"  @mousedown="dragStart"></div>
       <div class="step-value step-begin" v-show="displayed.min">{{valueToString(displayed.min)}}</div>
    <div id="end-slider" class="range-slider"  @mousedown="dragStart"></div>
    <div class="step-value step-end" v-show="displayed.max">{{valueToString(displayed.max)}}</div>
   </div>
   <div class="linked">
     <input type="checkbox" v-model="linkedCursors">
     <label>{{$t('synchronised_cursors')}}</label>    
   </div>
 </span>
</template>
<script>
var plotty = require('plotty')
// let messages = {
//   en: {
//     synchronised_cursors: 'Synchronised cursors'
//   },
//   fr: {
//     synchronised_cursors: 'Synchronised cursors'
//   }
// }
export default {
  name: 'FormaterDoubleRange',
  props: {
    lang: {
      type: String,
      default: 'en'
    },
    min: {
      type: Number,
      default: -100
    },
    max: {
      type: Number,
      default: 100
    },
    width: {
      type: Number,
      default: 200
    },
    defaultmin: {
      type: Number,
      default: -80
    },
    defaultmax: {
      type: Number,
      default: 80
    },
    colorscale: {
      type: String,
      default: 'viridis'
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    defaultmin (newvalue, oldvalue) {
      console.log(newvalue)
      this.placeSliders()
    },
    colorscale (newvalue) {
      this.initColorScale()
    }
  },
  data () {
    return {
      displayed: {
        min: null,
        max: null
      },
      mouseupListener: null,
      selectedSlider: null,
      w0: 10,
      linkedCursors: true,
      barreWidth: 200,
      pow3: 0
      // rate: 1
    }
  },
  computed: {
    rate () {
      return (this.barreWidth + 2) / (this.max - this.min)
    }
  },
  created () {
    this.mouseupListener = this.dragEnd.bind(this)
    document.addEventListener('mouseup', this.mouseupListener)
  },
  mounted () {
    console.log(this.lang)
    console.log(this.$i18n)
    this.$i18n.locale = this.lang
    this.$el.querySelector('.barre').style.width = this.width + 'px'
    this.w0 = this.$el.querySelector('.range-slider').offsetWidth
    this.barreWidth = this.width
    this.placeSliders()
    this.initColorScale()
  },
  destroyed () {
    document.removeEventListener('mouseup', this.mouseupListener)
    this.mouseupListener = null
  },
  methods: {
    initColorScale () {
      var canvas = this.$el.querySelector('#colorScaleLegend')
      plotty.renderColorScaleToCanvas(this.colorscale, canvas)
    },
//     rate () {
//       var rate = (this.barreWidth + 2) / (this.max - this.min)
//       return rate
//     },
    // placeSliders when defaultrange change
    placeSliders () {
      console.log(this.defaultrange)
      if (this.defaultmin) {
        this.displayed.min = this.defaultmin
        this.displayed.max = this.defaultmax
      }
      this.middle = (this.max + this.min) / 2
      var begin = this.$el.querySelector('#begin-slider')
      var end = this.$el.querySelector('#end-slider')
      var inside = this.$el.querySelector('#colorScaleLegend')
      this.posL = Math.round((this.displayed.min - this.min) * this.rate)
      begin.style.left = (this.posL - this.w0) + 'px'
      this.posR = Math.ceil((this.displayed.max - this.min) * this.rate)
      // ordre de grandeur du displayed.max, puissance de 10
      this.ordreGrandeur = Math.ceil(Math.log(this.max) / Math.log(10)) - 1
      // nombre de puissance 10^3
      this.pow3 = Math.ceil((this.ordreGrandeur + 1) / 3) - 1
      this.searchUnitLetter()
      end.style.left = this.posR + 'px'
      inside.style.left = this.posL + 'px'
      inside.style.width = (this.posR - this.posL) + 'px'
      this.$el.querySelector('.step-value.step-begin').style.left = (this.posL - this.w0 / 2 - 15) + 'px'
      this.$el.querySelector('.step-value.step-end').style.left = (this.posR - 15 + this.w0 / 2) + 'px'
    },
    searchUnitLetter () {
      switch (this.pow3) {
        case -4:
          this.letter = 'p'
          break
        case -3:
          this.letter = 'n'
          break
        case -2:
          this.letter = '&micro;'
          break
        case -1:
          this.letter = 'm'
          break
        case 0:
          this.letter = ''
          break
        case 1:
          this.letter = 'K'
          break
        case 2:
          this.letter = 'M'
          break
        case 3:
          this.letter = 'G'
          break
        case 4:
          this.letter = 'T'
          break
        default:
          this.letter = '?'
          break
      }
      return this.letter
    },
    valueToString (value) {
      var radical = value / Math.pow(10, 3 * this.pow3)
      return radical.toPrecision(3) + this.letter
    },
    dragStart (event) {
      this.selectedSlider = event.target
    },
    drag (event) {
      if (!this.selectedSlider) {
        return
      }
      var position = this.$el.querySelector('.barre').getBoundingClientRect()
      switch (this.selectedSlider.id) {
        case 'begin-slider':
          this.dragBeginSlider(event.clientX, position.left)
          break
        case 'end-slider':
          this.dragEndSlider(event.clientX, position.left)
          break
      }
    },
    dragBeginSlider (x, left) {
      var posL = Math.round(x - left + this.w0 / 2)
      if ((posL > -this.w0 / 2) &&
        ((posL - this.w0 / 2 < this.posR && !this.linkedCursors) ||
        (posL < this.barreWidth / 2 && this.linkedCursors))) {
        this.posL = posL
        this.$el.querySelector('#begin-slider').style.left = (this.posL - this.w0) + 'px'
        this.$el.querySelector('.step-value.step-begin').style.left = (this.posL - this.w0 / 2 - 15) + 'px'
        this.displayed.min = (this.posL / this.rate + this.min)
        if (this.linkedCursors) {
          this.posR = this.barreWidth - this.posL
          this.$el.querySelector('#end-slider').style.left = this.posR + 'px'
          this.$el.querySelector('.step-value.step-end').style.left = (this.posR - 15 + this.w0 / 2) + 'px'
          if (this.displayed.min === this.middle) {
            this.displayed.min = this.middle - 0.1
          }
          this.displayed.max = 2 * this.middle - this.displayed.min
        }
        var inside = this.$el.querySelector('#colorScaleLegend')
        inside.style.left = Math.max(this.posL, 0) + 'px'
        inside.style.width = (this.posR - this.posL) + 'px'
      }
    },
    dragEndSlider (x, left) {
      var posR = Math.round(x - left)
      if ((posR < this.barreWidth) &&
        ((posR > this.posL && !this.linkedCursors) ||
        (posR > this.width / 2 && this.linkedCursors))) {
        this.posR = posR
        this.$el.querySelector('#end-slider').style.left = this.posR + 'px'
        this.$el.querySelector('.step-value.step-end').style.left = (this.posR - 15 + this.w0 / 2) + 'px'
        this.displayed.max = this.posR / this.rate + this.min
        if (this.linkedCursors) {
          this.posL = this.barreWidth - this.posR
          this.$el.querySelector('#begin-slider').style.left = (this.posL - this.w0) + 'px'
          this.$el.querySelector('.step-value.step-begin').style.left = (this.posL - this.w0 / 2 - 15) + 'px'
          if (this.displayed.max === 0) {
            this.displayed.max = 0.1
          }
          this.displayed.min = 2 * this.middle - this.displayed.max
        }
        var inside = this.$el.querySelector('#colorScaleLegend')
        inside.style.left = Math.max(this.posL, 0) + 'px'
        inside.style.width = (this.posR - this.posL) + 'px'
      }
    },
    dragEnd (event) {
      this.selectedSlider = null
      this.emitInput()
    },
    emitInput () {
    //  this.$emit('change', this.displayed)
      this.$emit('change', {
        displayed: this.displayed,
        str: {
          min: this.valueToString(this.displayed.min),
          max: this.valueToString(this.displayed.max)
        }
      })
    },
    reset () {
      console.log('reset child')
      console.log(this.defaultmin)
      this.displayed.min = this.defaultmin
      this.displayed.max = this.defaultmax
      this.placeSliders()
    }
  }
}
</script>
<style>
.double-range {
  display: inline-block;
}
.double-range .barre{
   position: relative;
   margin-left:20px;
   margin-right:20px;
   padding: 12px 15px;
   clear:both;
   opacity:1;
    /* Styles */
   background: #fff;
   border-radius: 5px;
   border: 1px solid grey;
   box-shadow: 0 1px 0 rgba(0,0,0,0.2);
   outline: none;
}
.double-range.disabled{
  opacity:0.8;
}
.double-range .inside-range,
#colorScaleLegend{
    position:absolute;
    background: green;
    height:100%;
    top:0;
    left:0;
    max-width:100%;
}
.barre .range-slider{
    position:absolute;
    width:10px;
    top:-3px;
    bottom:-3px;
    background: #b5bdc8; /* Old browsers */
    background: -moz-linear-gradient(top, #b5bdc8 0%, #828c95 71%, #28343b 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, #b5bdc8 0%,#828c95 71%,#28343b 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, #b5bdc8 0%,#828c95 71%,#28343b 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    border: 1px solid rgba(0,0,0,0.6);
    box-shadow: 0 1px 0 rgba(0,0,0,0.2);
    pointer-events:auto;
    cursor:pointer;
}
.double-range.disabled .range-slider {
  cursor:none;
  pointer-events:none;
}
[id="begin-slider"]{
    left:-10px;
}
[id="end-slider"]{
    right:-10px;
}
.barre .step-value{
    position: absolute;
    font-size:0.8rem;
    font-weight:900;
    width: 30px;
    text-align: center;
    top:-22px;
    height:20px;
    background: rgba(240, 240, 240, 0.5)   
}
.range-value{
    font-size:0.8em;
    width: 40px;
    text-align:center;
}
.range-value.range-min{
    float:left;
}
.range-value.range-max{
    float:right;
}
.double-range .linked{
  font-size:0.8em;
  text-align:center;
  margin-top: 5px;
}
</style>
