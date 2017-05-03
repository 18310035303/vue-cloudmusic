<template>
	<div class="mv">
        <div class="item" v-for="item in list.mvs">
        	<img :src="item.cover" alt="">
        	<p>{{ item.name }}</p>
        	<p>{{ item.artistName }}</p>
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
.mv{
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.mv .item{
	height: 160px;
	width: 23%;
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