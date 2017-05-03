<template>
	<div class="footer">
        <div class="control">
            <span class="pre-music" @click="changeSong(-1)"><i class="ion-ios-skipbackward"></i></span>
            <div class="play-btns">
                 <span class="play" v-if="!play" v-on:click="playMusic()"><i class="ion-play"></i></span>
                <span class="pause" v-else v-on:click="pause()"><i class="ion-pause"></i></span>
            </div>
            <span class="next-music" @click="changeSong(1)"><i class="ion-ios-skipforward"></i></span>
        </div>
        <div class="progress">
        	<audio 
        	id="audio"
        	:src="single.mp3Url" 
        	ref="audio" 
        	@canplay="init"  
        	@error="error" 
        	@ended="loop?playMusic():changeSong(1)"></audio>
            <span>{{ currentTime|timeTrans }}</span>
            <div class="play-progress">
                <vue-slider v-model="progress" v-bind="setting"></vue-slider>
            </div>
            <span>{{ duration|timeTrans }}</span>
            <span class="voice-icon"><i class="ion-volume-medium"></i></span>
            <div class="voice">
                <vue-slider v-model="volume" v-bind="setting2"></vue-slider>
            </div>
            <div class="order" @click="order()">
            	<i class="material-icons" v-if="loop">repeat_one</i>
            	<i class="material-icons" v-else>playlist_play</i>
            </div>
            <div class="play-list" @click="showlist">
                <img src="../assets/playmenu.png" alt="">
                <span>{{ playlist.length }}</span>
            </div>
        </div>
        	<ul class="songlist" v-show="show">
	            <li class="head">
		            <div class="title">
		            	<span>播放列表</span>
		                <span>历史记录</span>
		            </div>
	                <span class="close" @click="show=false">×</span>
	            </li>
	            <li class="operation">
	                <div>总{{ playlist.length }}首</div>
	                <div>
	                	<span>收藏全部</span>
	                	<span class="clear">清空</span>
	                </div>
	            </li>
	            <li class="music-item" v-for="item in playlist">
	                <span>{{ item.name }}</span>
	                <span>{{ item.artists[0].name }}</span>
	                <span>{{ item.duration/1000|timeTrans }}</span>
	            </li>
	        </ul>
    </div>
</template>
<script>
/*eslint-disable */
import bus from '../event-bus'
import vueSlider from 'vue-slider-component'
import playerInterface from './player-interface'
import store from '../store.js'
	export default {
		name:'footer',
		components: {
			vueSlider,
			playerInterface
		},
		data(){
			return{
				//进度条
				progress:0,
				setting:{
					width: 450,
					dotSize: 13,
					tooltip:false,
					min:0,
					max:100,
					bgStyle: {
						"background-color":"#171719"
					},
					processStyle: {
						"background-color":"#B82525"
					}
				},
				//音量
				volume: 20,
				setting2: {
					width: 100,
					dotSize: 13,
					tooltip: false,
					bgStyle: {
						"background-color":"#171719"
					},
					processStyle: {
						"background-color":"#B82525"
					}
				},
				//当前音乐播放状态：true表示正在播放，false表示暂停状态
				play:false,
				//当前音乐的播放到的时间点
		        currentTime:0,
		        //当前音乐的总时间
		        duration:0,
		        //存储当前音乐的数据，设置了一首默认音乐
		        single:{mp3Url:'http://m2.music.126.net/7o5D4dA6271VktgawcbZFA==/18665309393829604.mp3',
		        		name:'',
		        		artists:[{name:''}]
		    			},
		    	//一个setInterval
		        timeout:'',
		        //footer部分右下角播放列表的显隐
		        show:false,
		        //歌单
		        playlist:[],
		        //单曲循环或列表循环
		        loop:false,
		        //第一次打开网页让音乐暂停
		        firstTime:true
			}
		},
		watch:{
			//进度条拖动时，更新音乐的当前播放时间
			progress:function(newValue,oldValue) {
			    this.currentTime = this.$refs.audio.currentTime
				if (Math.abs(newValue - oldValue) > 1) {
			        this.$refs.audio.currentTime = newValue
			    }
			},
			//拖动音量条控制声音大小
			volume:function(value){
				this.$refs.audio.volume=value / 100
			},
			//当前播放时间变化时，将audio的currentTime传给组件playerInterface
			currentTime:function(value){
				bus.$emit('update',this.$refs.audio.currentTime)
			},
			//将play状态传给组件playerInterface
			play:function(){
				bus.$emit('state',this.play)
			},
			single:function(val){
				bus.$emit('playNow',this.single)
				//将关闭页面前最后播放的音乐存到本地
				val?store.set('single',val):false
			}
		},
		created(){
			//获取本地存储的音乐
			this.load()
			// this.firstTime=false
		},
		methods:{
			//当audio加载完数据后，用audio的canplay方法调用init进行初始化
			init:function(){
				//将正在播放的音乐的总时间赋给进度条的最大值，这样方便控制进度条随
				//播放时间而移动
	        	this.setting.max=Math.floor(this.$refs.audio.duration)
	        	this.duration=this.$refs.audio.duration
	        	if(!this.firstTime){
	        		this.playMusic()
	        	}else{
	        		this.pause()
	        		this.firstTime=false
	        	}
	        	
			},
			//开始音乐
	        playMusic:function(){
	        	this.play = true
	        	this.firstTime=false
	        	this.$refs.audio.play()
	        	let _this=this
	        	this.timeout= setInterval(function(){
	        		const currentTime=_this.$refs.audio.currentTime
	        		_this.progress = Number.parseInt(currentTime,10)
	        		_this.currentTime = _this.$refs.audio.currentTime
	        	},1000/60)
	        },
	        //暂停音乐
	        pause:function(){
	        	this.play=false
	        	this.$refs.audio.pause()
	        	clearInterval(this.timeout)
	        },
	        //上一首或下一首
	        changeSong:function(value){
	        	let index
	        	if(this.playlist.length===0){
	        		return
	        	}
	        	if(this.playlist.length===1&this.$refs.audio.currentTime===this.duration){
	        		this.pause()
	        	}
				for(let i=0;i<this.playlist.length;i++){
					if(this.playlist[i].id===this.single.id){
						index=i
						break
					}
					index='?'
				}
				if(index!=='?'){
					let border=index+value
					if(border<0){
						border=this.playlist.length-1
					}else if(border>(this.playlist.length-1)){
						border=0
					}
					this.single=this.playlist[border]
				}
	        },
	        //控制单曲循环或列表循环
	        order:function(){
	        	this.loop=!this.loop
	        },
	        //控制播放列表的显隐
	        showlist:function(){
	        	this.show=!this.show
	        },
	        //获取不到音乐的播放链接时弹出提示
	        error:function(){
	        	alert('版权原因，无法播放')
	        },
	        //获取本地存储
	        load:function(){
	        	if(store.get('single')){
	        		this.single = store.get('single')
	        		this.playlist.push(this.single)
	        	}
	        	
	        }
		},
		mounted(){
			let _this=this
		
			
			//当在搜索页面双击音乐时，接受当前双击的音乐的数据并直接播放音乐
			bus.$on('playNow',function(data){
				_this.single=data
				_this.play=true
			})
			//接收整个歌单的列表放在footer的播放列表里
			bus.$on('allList',function(data){
				_this.playlist=data
			})
		},
		filters:{
	    	timeTrans:function(number){
				var minute = parseInt(number / 60);
				var second = parseInt(number % 60);
				minute = minute >= 10 ? minute : "0" + minute;
				second = second >= 10 ? second : "0" + second;
				return minute + ":" + second;
	    	}
	    }
	}
</script>
<style scoped>
.footer{
	width: 100%;
	height: 50px;
	border-top: 1px solid #23262C;
	box-shadow: 0 0 1px #000;

}
.control{
	display: flex;
	align-items: center;
    float: left;
    height: 100%;
    line-height: 50px;
    margin-left: 20px;
    color:#FFFFFF;
}
.control span{
	display: inline-block;
	border-radius: 50%;
	border:1px solid #5B5B5E;
	text-align: center;
    cursor: pointer;
}

.pre-music, .next-music {
	width: 30px;
    height: 30px;
    line-height: 30px;
	font-size: 16px;
    position: relative;
}
.play-btns{
	display: inline-block;
}
.play, .pause {
	width: 36px;
    height: 36px;
    line-height: 36px;
    font-size: 18px;
    margin: 0 15px;
}

.progress{
    float: left;
    height: 100%;
    line-height: 50px;
    margin-left: 20px;
}
.progress>span{
	position: relative;
	vertical-align: top;
}
.play-progress,.voice{
    display: inline-block;
	line-height: 50px;
}
.play-progress{
	width: 450px;
	margin: 0 8px;
}
.voice{
	width: 120px;
	margin-left: 22px;
}
.slider{
	height: 4px;
	border-radius: 15px;
	background-color: #ccc;
	cursor: pointer;
}

.progress>span.voice-icon{
	font-size: 28px;
	position: relative;
	left: 20px;
}

.order{
	display: inline-block;
	cursor: pointer;
	color: #aaa;
}

.play-list{
	display: inline-block;
	position: relative;
	cursor: pointer;
	margin-left: 10px;
}

.play-list>span{
	position: absolute;
	top: -8px;
	right: 14px;
	font-size: 13px;
}

.songlist{
	width: 58%;
	height: 68%;
	position: absolute;
	bottom: 50px;
	right: 0;
	color: #666;
	background: #282A2E;
	padding-top: 4px;
	font-size: 14px;
	overflow: auto;
	z-index: 20;
}
.songlist li{
	overflow: hidden;
	padding: 0 20px;
}

li.music-item:nth-child(odd){
	background-color: rgba(0, 0, 0, 0.04);
}

li.music-item:hover{
	background-color: #2e3033;
}

li.head{
	text-align: center;
	padding:4px 10px;
}
li.operation{
	display: flex;
	justify-content: space-between;
	color: #828385;
	padding: 4px 20px;
	border-top: 1px solid #373738;
	border-bottom: 1px solid #373738;
}
.head .title{
	border:1px solid #3A3A3F;
	display: inline-block;
	text-align: center;
	border-radius: 6px;
	font-size: 14px;
}

.title span{
	display: inline-block;
	padding: 4px 20px;

}
.title span:nth-child(1){
	background: #3A3A3F;
	color: #DCDDE4;
}

span.close{
	cursor: pointer;
	position: absolute;
	right: 2px;
	font-size: 22px;
}

.music-item span:nth-child(1){
	width: 60%;
}
.music-item span:nth-child(3){
	width: 20%;
	text-align: right;
}
.music-item span{
	display: inline-block;
	height: 30px;
	line-height: 30px;
	text-align: left;
	font-size: 13px;
	white-space: nowrap;
	overflow: hidden;
	width: 18%;
}



</style>