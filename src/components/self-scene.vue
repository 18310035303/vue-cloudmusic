<template>
	<div class="self-scene">
       <div class="about-me">
          <div class="recommend music-block">
              <h4>推荐</h4>
              <ul>
              	  <router-link to='/find/recommend' tag="li" :class="{choosed: choose=='find'}"><span><i class="ion-music-note"></i></span> 发现音乐</router-link>
                  
                  <router-link to='/myfm' tag="li" :class="{choosed: hash=='myfm'}"><span><i class="ion-radio-waves"></i></span> 私人FM</router-link>

                  <router-link to='/mv' tag="li" :class="{choosed: hash=='mv'}"><span><i class="ion-social-youtube-outline"></i></span> MV</router-link>

                  <router-link to='/friends' tag="li" :class="{choosed: hash=='friends'}"><span><i class="ion-person-stalker"></i></span> 朋友</router-link>
              </ul>
          </div>
       </div>
       <div class="playing">
          <div class="thumbnail" v-on:click="appear">
              <img :src="single.album.picUrl">
              <span><i class="ion-arrow-resize"></i></span>
          </div>
          <div class="song-playing">
              <span>{{ single.name||'未知' }}</span>
              <p>{{ single.artists[0].name||'未知' }}</p>
          </div>
          <div class="interest">
              <span class="love">
                  <i class="ion-heart"></i>
              </span>
              <span class="share">
                  <i class="ion-share"></i>
              </span>
          </div>
       </div>
    </div>
</template>
<script>
/*eslint-disable */
import bus from '../event-bus.js'
export default {
	name: 'self-scene',
  	props:['hash'],
	data () {
		return{
      show:true,
      single:{
        name:'成都',
        artists:[{name:'赵雷'}],
        album:{picUrl:'http://p1.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg'}
      },
      choose:''
		}
	},
	methods:{
		//显示正在播放的界面
    appear() {
      bus.$emit('appear',this.show)
    },
    inspect() {
      let path = this.$route.path
      if(path.substr(path.indexOf('/') + 1,4) == 'find'){
        this.choose='find'
      }else{
        this.choose=''
      }
    }
	},
  mounted(){
    let _this=this
    bus.$on('playNow',function(data){
      _this.single=data
    })
    this.inspect()
  },
  watch: {
    '$route':function(){
       this.inspect()
    }
  }
}
</script>
<style scoped>
.choosed{
  border-left: 2px solid red;
  background-color: rgba(255, 255, 255, 0.06);
}
.self-scene{
	float:left;
	width: 20%;
	height: 100%;
	position: relative;
	border-right: 1px solid #23262C;
}
.about-me{
	width: 100%;
	height: 470px;
	overflow: auto;
}
.self-scene .playing{
	width: 100%;
	height: 60px;
	display: flex;
	justify-content: space-between;
	border:1px solid #23262C;
	position: relative;
}
.playing .thumbnail{
	display: inline-block;
	position: relative;
	cursor: pointer;
}
.thumbnail>img{
	width: 60px;
	height: 60px;
}
.thumbnail:hover span{
	display: block;
}

.thumbnail>span{
	display: none;
	position: absolute;
	top:0;
	left: 0;
	width: 60px;
	height: 60px;
	font-size: 50px;
	color: #b7b4b4;
	background-color: rgba(0, 0, 0, 0.46);
}
.thumbnail>span>i{
	position: relative;
	top: -4px;
	left: 12px;
}
.playing .song-playing{
	width: 100px;
	height: 100%;
	padding:8px 0 8px 10px;
}
.song-playing>span{
	font-size: 16px;
	cursor: pointer;
    display: inline-block;
    width: 90px;
    overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.song-playing>p{
	font-size: 14px;
	line-height: 16px;
	padding-top: 4px;
	cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis
}
.playing .interest{
	width:30px;
	padding-top: 4px;
}
.interest span{
	display: inline-block;
	font-size: 20px;
	cursor: pointer;
}

.music-block{
	color: #ADAFB2;
}
.music-block h4{
	text-indent: 10px;
	color: #7C7C7C;
	font-size: 14px;
	line-height: 30px;
}
ul li{
	padding-left: 20px;
	color: #DCDDE3;
	font-size: 13px;
	line-height: 30px;
	width: 100%;
	display: inline-block;
	border-left: 2px solid transparent;
}
.music-block ul li:hover{
	cursor: pointer;
	background-color: #26282C;
}
.music-block ul li span{
	display: inline-block;
	width: 18px;
}
.music-block i{
	color: #fff;
	font-size: 16px;
}
</style>