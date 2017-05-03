<template>
	<div class="singer">
        <!-- singer {{this.$route.params.search}} -->
        <div class="item" v-for="item in list.artists">
        	<img :src="item.img1v1Url" alt="">
        	<span>{{ item.name }}</span>
        </div>
    </div>
</template>
<script>
/*eslint-disable */
import axios from 'axios'
export default {
	props: ['list'],
	data () {
		return {

		}
	},
	watch:{
		// 演示用，正常页面点击流程不会触发这里
		'$route': function () {
      // console.log('singer.vue $route changed: ' + this.$route.params.search)
      }
	},
	mounted(){
		// console.log('singer.vue mounted: ' + this.$route.params.search)
		console.log(this.list)

	}
}

</script>
<style scoped>
.item{
	width: 100%;
	height: 50px;
	line-height: 50px;
}
.item:nth-child(even){
	background-color: rgba(255, 255, 255, 0.02);
}
.item>img{
	height: 40px;
	width: 40px;
	vertical-align: super;
}
.item span{
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: inline-block;
	width: 80%;
	padding-left: 10px;
}
</style>