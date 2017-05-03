<template>
	<div class="search-scene">
		<div class="search-content">
		<!-- {{$route.params.search}} --> 
			<h1>搜索
			    <span class="search-name">{{ $route.params.search }}</span>
			    <span >,找到{{ count }}{{ filter[choose] }}</span>
			</h1>
			<ul class="search-items">
			    <router-link :to="{name:'single'}" :class="{choosed:choose===''}"><li><a>单曲</a></li></router-link>
			    <router-link :to="{name:'ssinger'}" :class="{choosed:choose==='singer'}"><li><a>歌手</a></li></router-link>
			    <router-link :to="{name:'album'}" :class="{choosed:choose==='album'}"><li><a>专辑</a></li></router-link>
			    <router-link :to="{name:'mmv'}" :class="{choosed:choose==='mv'}"><li><a>MV</a></li></router-link>
			    <router-link :to="{name:'playlist'}" :class="{choosed:choose==='playlist'}"><li><a>歌单</a></li></router-link>
			    <router-link :to="{name:'djradio'}" :class="{choosed:choose==='djradio'}"><li><a>主播电台</a></li></router-link>
			    <router-link :to="{name:'user'}" :class="{choosed:choose==='user'}"><li><a>用户</a></li></router-link>
			</ul>
		</div>
		<div class="list">
			<router-view :list="searchlist"></router-view>
		</div>
	</div>
</template>
<script>
/*eslint-disable */
import axios from 'axios'

import bus from '../../event-bus'
import store from '../../store.js'
export default {
  name: 'search-scene',
  data () {
    return {
    	count: 0,
    	s: '',
    	filter:{
    		'': '首单曲',
    		'singer': '位歌手',
    		'album': '张专辑',
    		'mv': '首mv',
    		'playlist': '个歌单',
    		'djradio': '个节目',
    		'user': '位用户'
    	},
    	type:{
            '': '1',
            'album': '10',
            'singer': '100',
            'playlist': '1000',
            'user': '1002',
            'mv': '1004',
            'djradio': '1009'
        },
        countType: {
        	'': 'songCount',
    		'singer': 'artistCount',
    		'album': 'albumCount',
    		'mv': 'mvCount',
    		'playlist': 'playlistCount',
    		'djradio': 'djRadiosCount',
    		'user': 'userprofileCount'
        },
        searchlist:{}
    }
  },
  created(){
    this.getData()
  },
  watch: {
  	'$route':function(){
  	   this.getData()
  	}
  },
  methods:{
    getData:function(){
        let _this=this
        let type = this.type[this.choose]
        let countType = this.countType[this.choose]
        this.s=this.$route.params.search
        if(this.s){
        // this.$router.push({name: 'single', params: { search: this.value } })
          axios.post('/api/search/pc?&s=' + this.s +'&offset=0&limit=20&type=' + type).then(function(response){
              _this.searchlist = response.data.result
              _this.count=_this.searchlist[countType]
          })
        }
    }
  },
  computed:{
  	choose:function(){
  		let path = this.$route.path
  		path=path.substr(path.lastIndexOf('/')+1)
  		return path
  		console.log(path)
  	}
  },
  mounted() {
  	bus.$on('search',function(data){
  		console.log(data)
  	})
  }

}
</script>
<style scoped>
.choosed{
	background-color: #B82525;
}
.search-scene{
	height: 100%;
	background-color: #222225;
	z-index: 10;
	overflow: auto;
}
.search-content{
	width: 100%;
	margin:0 auto;
}
.search-scene h1{
	font-size: 14px;
	font-weight: 400;
	padding: 30px;
}
.search-name{
	color: #0c73c2;
}
.search-items{
	padding:0 30px;
	border-bottom: 1px solid #c62f2f;
}
.search-items li{
	display: inline;
}
.search-items a{
	display: inline-block;
	width: 80px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	margin-right: 5px;
	font-size: 13px;
	cursor:pointer;
}
.list{
	padding: 0 20px;
	width: 100%;
  font-size: 14px;
}

</style>