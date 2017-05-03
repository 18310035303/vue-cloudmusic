<template>
	<div class="djradio">
        <div class="item" v-for="item in list.djRadios">
        	<img :src="item.picUrl" alt="">
        	<p>{{ item.name }}</p>
        	<p>by{{ item.dj.nickname }}</p>
        </div>
    </div>
</template>
<script>
/*eslint-disable */
export default {
	props: ['list'],
	data () {
		return {

		}
	}
}

</script>
<style scoped>
.djradio{
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding-top: 10px;
}
.djradio .item{
	height: 200px;
	width: 18%;
}
.item>img{
	/*height: 90px;*/
	width: 100%;
}
.item>p{
	font-size: 14px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
</style>