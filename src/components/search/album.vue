<template>
	<div class="album">
        <div class="item" v-for="item in list.albums">
        	<div class="album-name">
        		<img :src="item.picUrl" alt="">
        		<span>{{ item.name }}</span>
        	</div>
        	<div class="artist-name">
        		<span>{{ item.artist.name }}</span>
        	</div>
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
.item{
	height: 50px;
	width: 100%;
	line-height: 50px;
	display: flex;
	justify-content: space-between;
}
.item:nth-child(even){
	background-color: rgba(255, 255, 255, 0.02);
}
.item>div{
	width: 50%;
}
.album-name>img{
	height: 40px;
	width: 40px;
	vertical-align: middle;
}
.album-name>span{
	padding-left: 10px;
}
</style>