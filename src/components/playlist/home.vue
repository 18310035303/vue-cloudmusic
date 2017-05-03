<template>
	<div class="box">
        <div class="head">
            <img class="cover-image" :src="playlist.coverImgUrl">
            <div class="head-right">
                <div class="title">
                    <span class="tag">歌单</span>
                    <span class="name">{{ playlist.name }}</span>
                    <span class="play-count"><i class="ion-android-arrow-dropright-circle"></i>{{ playlist.playCount|tenThousand }}</span>
                    <span class="track-count"><i class="ion-ios-musical-note"></i>{{ playlist.trackCount }}</span>
                </div>
                <div class="author">
                    <img :src="playlist.creator.avatarUrl">
                    <span class="nickname">{{ playlist.creator.nickname }}</span>
                    <span class="create-time">{{ playlist.createTime|unixTime }}创建</span>
                </div>
                <div class="control">
                    <div class="play-all">
                        <span>
                        <i class="material-icons">play_circle_outline</i>
                        播放全部</span>
                        <span class="add">+</span>
                    </div>
                    <div class="saved">
                      <i class="material-icons">local_pharmacy</i>
                      收藏({{playlist.subscribedCount}})
                    </div>
                    <div class="share-count">
                      <i class="fa fa-share-square-o" aria-hidden="true"></i>
                      分享({{ playlist.shareCount }})
                    </div>
                    <div class="download-all">
                      <i class="material-icons">file_download</i>
                      下载全部
                    </div>
                </div>
                <div class="tags">
                    标签：<span>{{ playlist.tags|splitTags }}</span>
                </div>
                <div class="description">
                    <p 简介：</p>
                        <div class="drop-down"> </div>
                </div>
            </div>
        </div>
        <div class="content">
            <dl>
                <dd class="choosed">歌曲列表</dd>
                <dd>评论({{ playlist.commentCount }})</dd>
                <dd>收藏者</dd>
            </dl>
        </div>
        <ul class="songlist">
            <li class="head">
                <div></div>
                <div>操作</div>
                <div>音乐标题</div>
                <div>歌手</div>
                <div>专辑</div>
                <div>时长</div>
            </li>
            <li class="music-item" v-for='(everyone,index) in playlist.tracks' @dblclick='playNow(index)'>
                <div class="line">{{ index+1 }}</div>
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
export default{
	data(){
		return{
			app:'',
			search:'',
      playlist:{ creator:{avatarUrl:{}} },//调用多余两层要补全至少一层（深入响应式原理）
      dafaultId:166049534
		}
	},
  mounted(){
    this.getHash(window.location.hash)
    this.getlist()
  },
  methods:{
    getlist:function(){
      let _this=this
      axios.post('/api/playlist/detail?id=' + this.defaultId).then(function(data){
        _this.playlist=data.data.result
            //给每一首歌曲添加歌词
          for(let i=0; i<_this.playlist.tracks.length; i++){
            axios.post('/api/song/lyric?os=pc&id='+_this.playlist.tracks[i].id+'&lv=-1').then(function(data){
              _this.playlist.tracks[i].lyric=''
              if(data.data.lrc){
              let arr=data.data.lrc.lyric.split('\n')
              _this.playlist.tracks[i].lyric=arr
              }
            })
          }
      })
    },
    playNow:function(index){
      bus.$emit('playNow',this.playlist.tracks[index])
      bus.$emit('allList',this.playlist.tracks)
    },
    getHash:function(hash){
      this.defaultId = hash.substr(hash.lastIndexOf('=')+1)
    }
  },
  filters:{
    timeTrans:function(number){
      var minute = parseInt(number / 60);
      var second = parseInt(number % 60);
      minute = minute >= 10 ? minute : "0" + minute;
      second = second >= 10 ? second : "0" + second;
      return minute + ":" + second;
    },
    splitTags:function(tags){
      if (typeof tags === 'object') {
          return tags.join('/')
        }
        return ''
    },
    unixTime:function(time){
      let date = new Date(time)
      let year = date.getFullYear()
      let month = date.getMonth()+1
      let day = date.getDate()
      return year + '-' + month + '-' + day
    },
    tenThousand(num) {
      num+=''
      return num>=10000?num.substr(0,num.length-4) + '万':num
    }
  }
}
</script>
<style scoped>
.box{
  overflow: auto;
  height: 100%;
}
div.head{
  padding:20px 20px 60px 30px;
  width: 100%;
  height: auto;
}
.head .cover-image{
	width: 200px;
	height: 200px;
	vertical-align: top;
}
.head-right{
  display: inline-block;
  width: calc(100% - 220px);
  padding-left: 30px;
}

.title{
  height: auto;
  overflow: hidden;
}

.title span{
  display: inline-block;
  float: left;
}

.play-count{
  padding-right: 10px;
}

.title span>i{
  color: #9a9a9a;
  margin-right: 4px;
}

.tag{
  font-size: 14px;
  background-color: rgb(198, 47, 47);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: normal;
}

.name{
  font-size: 20px;
  line-height: 1.2;
  margin-left: 10px;
  font-weight: bold;
  width: 330px;
  color: #DCDDE4;
}

.control{
  overflow: hidden;

}

.control > div{
  float: left;
  background-color: #2e3035;
  margin-right: 10px;
  padding: 2px 10px;
  font-size: 14px;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
}

.control > div:hover{
  background-color: #444242;
}

.control i{
  font-size: 16px;
  vertical-align: sub;
}

.tags{
  font-size: 14px;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: normal;
  margin-top: 20px;
}

.tags>span{
  color: #2E6BB0;
}

.author{
  padding: 10px 0;
}

.author>img{
  width: 30px;
  border-radius: 50%;
  vertical-align: middle;
}

.author>span{
  padding: 0 4px;
  font-size: 14px;
  color: #828385;
}

.author .nickname{
  color: #828385;
}

dl{
  padding-left: 20px;
  border-bottom: 1px solid #B82525;
}
dl>dd{
  display: inline-block;
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
  font-size: 13px;
  cursor:pointer;
  background-color: rgb(47, 47, 47);
}

dd.choosed{
  background-color: #c62f2f;
}

.songlist li{
  overflow: hidden;
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