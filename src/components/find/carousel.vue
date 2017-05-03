<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in src" :key="item.id">
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
  export default {
    data () {
      return {
        src: [
          '../../../static/1.png',
          '../../../static/2.png',
          '../../../static/3.png',
          '../../../static/4.png',
          '../../../static/5.png',
          '../../../static/6.png',
          '../../../static/7.png',
          '../../../static/8.png'
        ]
      }
    }
  }
</script>
<style>
  .el-carousel__item img {
    width: 100%;
    height: 100%;
  }
  .el-carousel__item--card.is-active {
    width: 69%;
    left: -70px;
  }
  .el-carousel__item>.el-carousel__mask{
    background-color: #000;
  }
  /*.el-carousel__item:nth-child(3) {*/
    /*background-color: #99a9bf;*/
  /*}*/
  
  /*.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }*/
</style>
