<template>
<transition name="fade">
	<div class="player-interface" v-show="show">
      <div class="resize" v-on:click="resize">
          <img src="../assets/resize.png" alt="">
      </div>
      <div class="record">
          <div class="needle" ref="needle" :class="{needleRotate:play===true}">
          </div>
          <div class="song-cover" ref="songcover" :class="{songcover:play===false}">
              <img :src="single.album.picUrl" alt="">
              <span class="mask"></span>
          </div>
          <div class="content-operation">
              <ul>
                  <li>
                      <span>
                          <i class="ion-heart"></i>
                      </span> 喜欢
                  </li>
                  <li>
                      <span>
                      <i class="ion-android-cart">
                      </i>    
                  </span> 收藏
                  </li>
                  <li>
                      <span>
                      <i class="ion-ios-download-outline"></i></span> 下载
                  </li>
                  <li>
                      <span>
                      <i class="ion-share"></i>
                  </span> 分享
                  </li>
              </ul>
          </div>
      </div>
      <div class="lyric">
          <div class="songtitle">
              <span>{{ single.name }}</span>
          </div>
          <ul class="from">
              <li>
                  专辑：<span>{{ single.album.name }}</span>
              </li>
              <li>
                  歌手：<span>{{ single.artists[0].name }}</span>
              </li>
              <li>
                  来源：<span>搜索页</span>
              </li>
          </ul>
          <div class="lyric-content" ref="lyriccontent">
              <div v-for="(everyone,keys) in single.lyric" ref='lyric' :style="{color:keys===now?'#fff':'#6D6260'}">{{everyone|Lyric}}</div>
          </div>
      </div>
	</div>
</transition>
</template>
<script>
/*eslint-disable */
import axios from 'axios'
import bus from '../event-bus'
export default {
	data(){
		return{
			app:'',
			play:false,
			show:false,
			lyric_sign:0,
			currentTime:0,
			single:{
				name:'成都',
				artists:[{name:'赵雷'}],
				album:{name:'成都',picUrl:'http://p1.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg'},
				lyric:'默认内容，点击搜索后双击音乐播放即可看到歌词'
			},
			now:0
		}
	},
	watch:{
		//若歌曲正在播放，则调用update函数对歌词进行位置调整
		currentTime:function(){
			this.update()
		}
	},
	methods:{
		//点击播放页面右上角按钮让播放页面隐藏
		resize:function() {
			this.show=false
		},
		//歌词同步
		update:function(){
			if(this.single.lyric){
				for(let i=0;i<this.single.lyric.length;i++){
					if(this.single.lyric[i].substr(1,5)===this.timeTrans(this.currentTime)){
						this.now=i
						let offset = this.$refs.lyric[i].offsetTop
						this.$refs.lyriccontent.scrollTop=(offset-250)
					}
				}
			}
		},
		//对时间进行格式转换
		timeTrans:function(number){
			let minute = parseInt(number / 60);
			let second = parseInt(number % 60);
			minute = minute >= 10 ? minute : "0" + minute;
			second = second >= 10 ? second : "0" + second;
			return minute + ":" + second;
    	}
	},
	mounted(){
		let _this=this
		bus.$on('playNow',function(data){
			_this.single=data
		})
		//接收点击播放按钮上方缩略图时传递过来的数据（true）
		bus.$on('appear',function(data){
			_this.show=data
		})
		bus.$on('state',function(data){
			_this.play=data
		})
		bus.$on('pause',function(data){
			_this.play=data
		})
		//接收传递过来的audio的当前播放时间
		bus.$on('update',function(data){
			_this.currentTime=data
		})
	},
	filters:{
		Lyric:function(val){
			return val.substr(val.lastIndexOf(']')+1)
		}
	}
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active{
  transition: opacity .5s;
}
.fade-enter, .fade-leave-active{
  opacity: 0;
}
.record .needleRotate{
	transform: rotate(-7deg);
	top:-6px;
}
.songcover{
	animation-play-state: paused;
}
.player-interface{
	overflow: hidden;
	position: absolute;
	top:0;
	bottom: 0;
	right: 0;
	left: 0;
	padding: 0 100px;
	background-color: #222225;
	z-index: 20;
}
.resize{
	position: absolute;
	top:4px;
	right: 20px;
	cursor: pointer;
	background-color: #26282C;
	border-radius: 4px;
	font-size: 0;
}
.resize:hover{
	background-color: #393b40;
}
.record{
	float: left;
	position: relative;
}
.needle{
	position: absolute;
	top: 0;
	left: 140px;
	width: 100px;
	height: 150px;
	background: url(../assets/needle.png) no-repeat;
	background-size: cover;
	transform: rotate(-38deg);
	transform-origin: 0 0;
	transition: 0.5s linear;
	z-index: 9;
}
.record .needle>img{
	width: 100px;
}
.record .song-cover{
	width: 310px;
	height: 310px;
	position: relative;
	text-align: center;
	margin-top: 50px;
	animation-name: rotateInterface;
	animation-duration: 40s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
}
.song-cover>img{
	width: 200px;
	height: 200px;
	margin-top: 55px;
}
.song-cover>span{
	display: block;
	width: 100%;
	height: 100%;
	background: url(../assets/coverall.png) no-repeat;
	background-size: cover;
	position: absolute;
	top:0;
}
.mask:before{
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	border-radius: 50%;
	background-color: rgba(255,255,255,0.05);
	z-index: -10;

}
.content-operation{
	width: 100%;
}
.content-operation ul{
	display: flex;
	justify-content: space-between;
	margin-top: 40px;
}
.content-operation li{
	width:68px;
	height: 26px;
	line-height: 26px;
	font-size: 13px;
	list-style: none;
	color: #fff;
	text-align: center;
	border-radius: 4px;
	cursor: pointer;
	background-color: #2F3134;
}
.content-operation li span{
	display: inline-block;
	font-size: 16px;
	padding-right: 4px;
}
.lyric{
	float: right;
	width: 400px;
	height: 70%;
}
.lyric .songtitle>span{
	display: inline-block;
	font-size: 22px;
	line-height: 2;
	color:#D2D2D3;
}
.lyric .from{
	display: flex;
	justify-content: space-between;
	font-size: 12px;
}
.from li {
	color:#A3A5A7;
}
.from li span{
	color: #29578C;
	overflow: hidden;
	cursor:pointer;
}

.lyric-content{
	margin-top: 10px;
	overflow: auto;
	text-align: center;
	height: 100%;
	transition: 0.6s;
}
.lyric-content>div{
	line-height: 40px;
	font-size: 14px;
	transition: 0.6s;
}
@keyframes rotateInterface{
	0%{
		transform:rotate(0deg);
	}
	100%{
		transform: rotate(360deg);
	}
}

</style>