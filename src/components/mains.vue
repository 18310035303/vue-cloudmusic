<template>
  <div class="mains">
    <self-scene :hash="choose"></self-scene>
    
    <player-interface></player-interface>
   
    <div class="contents">
        <router-view :hash="choose"></router-view>
    </div>
  </div>
</template>

<script>
import selfScene from './self-scene'
import playerInterface from './player-interface'
export default {
  name: 'mains',
  components: {
    selfScene,
    playerInterface
  },
  data () {
    return {
      app: ''
    }
  },
  computed: {
    choose: function () {
      let path = this.$route.path
      path = path.substr(path.indexOf('/') + 1)
      return path
    }
  }
}
</script>

<style scoped>
.mains{
  height: 530px;
  width: 100%;
  overflow: hidden;
  position: relative;
  top: -4px;
}
.contents{
  width: 80%;
  height: 100%;
  float: right;
}

</style>
