<template>
	<div class="recommend">
		<div class="navigation">
		    <dl>
		      <router-link to='/find/recommend' :class="{choosed: hash=='find/recommend'}"><dd>个性推荐</dd></router-link>
		      <router-link to='/find/songs' :class="{choosed: hash=='find/songs'}"><dd>歌单</dd></router-link>
		      <router-link to='/find/radio' :class="{choosed: hash=='find/radio'}"><dd>主播电台 </dd></router-link>
		      <router-link to='/find/rank' :class="{choosed: hash=='find/rank'}"><dd>排行榜 </dd></router-link>
		      <router-link to='/find/singer' :class="{choosed: hash=='find/singer'}"><dd>歌手 </dd></router-link>
		      <router-link to='/find/latest' :class="{choosed: hash=='find/latest'}"><dd>最新音乐 </dd></router-link>
		    </dl>
		</div>
	    <router-view></router-view>
	</div>
</template>

<script>
/*eslint-disable */
export default {
	props: ['hash'],
	data(){
		return{
			app:''
		}
	}
}
</script>
<style scoped>
.recommend{
	height: 100%;
	overflow: auto;
}
.navigation{
	width: 100%;
	text-align: center;
	border-bottom: 1px solid #26282d;
}
.navigation dl {
	width: 60%;
	margin:0 auto;
	overflow: hidden;
}
.choosed{
	color:#fff;
	border-bottom: 2px solid #5C5E61;
}
.navigation dd{
	display: inline;
}
.navigation a {
	display: inline-block;
	height: 40px;
	width: 16.6%;
	text-align: center;
	line-height: 40px;
	color:#DCDDE3;
	float: left;
	font-size: 15px;
}
</style>