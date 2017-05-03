<template>
  <div id="app">
    <headers></headers>
    <mains></mains>
    <footers></footers>
  </div>
</template>

<script>
import headers from './components/headers'
import mains from './components/mains'
import footers from './components/footers'
export default {
  name: 'app',
  components: {
    headers,
    mains,
    footers
  }
}
</script>


<style>
*{
  padding:0;
  margin:0;
  box-sizing: border-box;
  outline: none;
  user-select: none;
}
body{
  margin:0;
  padding: 0;
  color:#fff;
}
a{
  text-decoration: none;
  color:#DCDDE3;
}
li{
  list-style: none;
}
#app {
  font-family: 'microsoft yahei',sans-serif;
  width: 1022px;
  margin: 0 auto;
  background-color: #222225;
  position: relative;

}
::-webkit-scrollbar {
    width: 8px;
    /*background-color: #191B1F;*/
}

::-webkit-scrollbar-track {
    /*-webkit-box-shadow: inset 0 0 6px transparent;*/
    border-radius: 8px;
    /*background-color: #191B1F;*/
}

::-webkit-scrollbar-thumb {
    border-radius: 8px;
    /*-webkit-box-shadow: inset 0 0 6px #e1e1e2;*/
    background-color: #2F3134;
}
</style>
