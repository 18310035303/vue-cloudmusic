<template>
	<div class="album">
        <div class="item" v-for="item in list.playlists">
        	<img :src="item.coverImgUrl" alt="">
        	<span class="name">{{ item.name }}</span>
        	<span class="count">{{ item.trackCount }}首</span>
        	<span class="creator">by{{ item.creator.nickname }}</span>
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
}
.item:nth-child(even){
	background-color: rgba(255, 255, 255, 0.02);
}
.item>span{
	display: inline-block;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
span.name{
	width: 50%;
	padding-left: 10px;
}
.item>img{
	height: 40px;
	width: 40px;
	vertical-align: super;
}

.count{
	width: 20%;
}

</style>