/**
 * pour afficher des messages
 */
<template>
 <span class="formater-alert" v-show="message.length > 0">
  <div>
          <div>
            <span class="close" @click="close()" v-show="!playing">&#x2716;</span>
            <div v-html="html"></div>
          </div>
      </div>
 </span>
</template>
<script>

export default {
  name: 'FormaterAlertMessage',
  props: {
    msg: {
      type: String,
      default: ''
    },
    playing: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    msg (newvalue) {
      this.createHTML(newvalue)
    },
    playing (newvalue) {
      if (newvalue) {
        this.start()
      } else {
        this.stop()
      }
    }
  },
  data () {
    return {
      html: '',
      message: [],
      count: 0,
      timer: null
    }
  },
  created () {
    console.log('alert is created')
  },
  mounted () {
    // this.createHTML(this.msg)
    // this.start()
  },
  destroyed () {
    this.stop()
  },
  methods: {
    createHTML (newvalue) {
      this.message = JSON.parse(newvalue.replace(/'/g, '"'))
      this.html = this.message.join('<br />')
    },
    play () {
      if (this.message.length === 0) {
        this.stop()
      } else {
        this.count = this.count + 1
        this.html = this.message.join('<br />') + ' ' + '.'.repeat(this.count % 4)
      }
    },
    start () {
      if (!this.timer) {
        var _this = this
        this.count = 0
        this.timer = setInterval(_this.play, 800)
      }
    },
    stop () {
      clearInterval(this.timer)
      this.count = 0
      this.playing = false
    },
    close () {
      this.message = []
    }
  }
}
</script>
<style>
  .formater-alert {
      position: absolute;
      top:50px;
      left: 0;
      width:100%;
      text-align:center;
      z-index:1000;
  }
  .formater-alert > div {
      margin: auto;
      width: 450px;
    position:relative;
    background:white;
    box-shadow: 0px 1px 5px #888888;
    border-radius:5px;
    color: darkred;
    line-height:1.2;
    font-size: 1.2rem;
    padding:20px 15px;
  }
  .formater-alert > div .close {
     position: absolute;
     right: 2px;
     top: 2px;
     cursor: pointer;
  }
  .formater-alert > div {
      text-align: left;
  }
</style>
