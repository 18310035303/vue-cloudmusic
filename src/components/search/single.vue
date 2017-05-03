<template>
	<div class="single">
	<!-- {{this.$route.params.search}} -->
        <ul class="songlist">
            <li class="head">
                <div></div>
                <div>操作</div>
                <div>音乐标题</div>
                <div>歌手</div>
                <div>专辑</div>
                <div>时长</div>
            </li>
            <li class="music-item" v-for='(everyone,index) in searchlist.single' @dblclick='playNow(index)'>
                <div>{{ index+1 }}</div>
                <div><i class="ion-heart"></i></div>
                <div>{{ everyone.name }}</div>
                <div>{{ everyone.artists[0].name||'未知' }}</div>
                <div>{{ everyone.album.name||'未知' }}</div>
                <div>{{ everyone.duration/1000|timeTrans }}</div>
            </li>
        </ul>
    </div>
</template>
<script>
/*eslint-disable */
import axios from 'axios'
import bus from '../../event-bus'
export default {
	data () {
		return {
			searchlist: {
				single:{},
			}
		}
	},
	methods:{
		//双击搜索结果的某首歌曲，将这首歌的数据传出去，数据包含歌词，
		//同时将搜索列表也传给需要它的组件
		playNow(index){
			bus.$emit('playNow',this.searchlist.single[index])
			bus.$emit('allList',this.searchlist.single)
		},
		search:function(){
			let _this=this
			//获取搜索列表的所有歌曲
			axios.post('/api/search/pc?&s='+this.$route.params.search+'&offset=0&limit=50&type=1').then(function(data){
	    		_this.searchlist.single=data.data.result.songs
	    		//给每一首歌曲添加歌词
	    		for(let i=0; i<_this.searchlist.single.length; i++){
	    			axios.post('/api/song/lyric?os=pc&id='+_this.searchlist.single[i].id+'&lv=-1').then(function(data){
	    				_this.searchlist.single[i].lyric=''
	    				if(data.data.lrc){
							let arr=data.data.lrc.lyric.split('\n')
							_this.searchlist.single[i].lyric=arr
	    				}
	    			})
    			}
	    	})
		}
	},
	watch:{
		'$route': function () {
        	this.search()
      }
	},
	mounted(){
		// console.log('single.vue mounted: ' + this.$route.params.search)
		//将搜索结果放到(this.searchlist.single)里
		this.search()
	},
    filters:{
    	//将时间过滤成‘00:00’格式
    	timeTrans:function(number){
			var minute = parseInt(number / 60);
			var second = parseInt(number % 60);
			minute = minute >= 10 ? minute : "0" + minute;
			second = second >= 10 ? second : "0" + second;
			return minute + ":" + second;
    	},
    }
}

</script>
<style scoped>
.songlist li{
	overflow: hidden;
	cursor: default;
}

li.music-item:nth-child(odd){
	background-color: rgba(0, 0, 0, 0.06);
}

li.music-item:hover{
	background-color: #2e3033;
}

li.head div{
	border:1px solid #23262C;
}

.songlist li div{
	float: left;
	height: 30px;
	line-height: 30px;
	text-align: left;
	font-size: 13px;
	color: #666;
	text-indent: 12px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.songlist li div:nth-child(1){
	text-align: center;
}

.songlist li div:nth-child(1),
.songlist li div:nth-child(2){
	width: 6.25%;
}

.songlist li div:nth-child(3){
	width: 27.5%;
}

.songlist li div:nth-child(4){
	width: 15%;
}

.songlist li div:nth-child(5){
	width: 20%;
}

.songlist li div:nth-child(6){
	width: 10%;
}
</style>