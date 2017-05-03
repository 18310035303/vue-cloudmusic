<template>
	<div class="music-scene ">
      <carousel></carousel>
      <div class="recommend-sheet">
          <h1>推荐歌单</h1>
          <ul>
              <router-link tag="li" class="daily item" :to="routerTo(579471092)">
              	<p class="more">根据你的口味每日生成更新</p>
                  <div>
                      <h3>{{ week }}</h3>
                      <h2>{{ day }}</h2>
                  </div>
                  <span>每日歌曲推荐</span>
              </router-link>
              <router-link tag="li" class="item" 
			  :to="routerTo(item.id)"
              v-for="item in playlist"
              :key="item.id">
                    <p class="more">{{ item.name }}</p>
                    <span class="circle"><i class="ion-android-arrow-dropright-circle"></i></span>
                    <p class="page-view">
                        <i class="ion-headphone"></i>
                        {{ item.playCount|tenThousand }}
                    </p>
                    <img :src="item.coverImgUrl" alt="">
                    <span>{{ item.name }}</span>
              </router-link>
          </ul>
	  </div>
	</div>
</template>
<script>
/*eslint-disable */
import axios from 'axios'
import carousel from './carousel'
export default {
	name: 'self-scene',
	components:{
		carousel
	},
	data () {
		return{
			day:'',
			week:'',
			ids:{
				0:556734085,
				1:702531269,
				2:409434667,
				3:102282057,
				4:699210111,
				5:699862519,
				6:627599430,
				7:691394551,
				8:128871831
			},
			playlist:[]
		}
	},
	created(){
		this.getdate()
		this.getweek()
	},
	mounted(){
		this.getlists()
	},
	methods:{
	    getdate:function(){
			let date = new Date()
			let day = date.getDate()
			this.day = day
		},
		getweek:function(){
			let date = new Date()
			let day = date.getDay()
			let week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
			this.week = week[day]
		},
		routerTo:function(id){
			return '/playlist#id='+ id
		},
		getlists:function(){
			let _this=this
			this.playlist=[]
			for(let i in this.ids){
				axios.post('/api/playlist/detail?id=' + this.ids[i]).then(function(data){
		          _this.playlist.push(data.data.result)
		        })
			}
		}
	},
	filters:{
		tenThousand(num) {
			num+=''
			return num>=10000?num.substr(0,num.length-4) + '万':num
		}
	}
}
</script>
<style scoped>
.music-scene{
	position: relative;
	padding: 20px;
}


.recommend-sheet{
	height: 450px;
	width: 100%;
	color:#fff;
	margin:0 auto;
}
.recommend-sheet>h1,.exclusive h1{
	line-height: 40px;
    font-size: 20px;
    font-weight: 200;
    border-bottom: 1px solid #23262C;
    margin-bottom: 10px;
}
.recommend-sheet ul{
	height: 380px;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	flex-wrap: wrap;
}
.recommend-sheet li{
	display: inline-block;
	width: 18%;
	height: 200px;
	font-size: 12px;
	line-height: 1.5;
	cursor: pointer;
}

.daily>div{
	height: 140px;
	width: 100%;
	border:1px solid #e1e1e2;
	text-align: center;
	background-color: #FFFFFF;
}
.daily>div>h3{
	height: 40px;
	line-height: 40px;
	font-size: 15px;
	font-weight: 400;
	color:#828385;
}
.daily>div>h2{
	height: 80px;
	line-height: 80px;
	font-size: 80px;
	color:#c62f2f;
}
.item{
	position: relative;
}

.item:hover .more{
	/*display: block;*/
	opacity: 1;
	height: 25%;
	/*transform: translateY(20px);*/
}

.item:hover .page-view{
	display: none;
}

.item:hover .circle{
	display: block;
}

.item .more{
	/*display: none;*/
	opacity: 0;
	position: absolute;
	width: 100%;
	height: 0;
	padding: 4px;
	transition: 0.3s linear;
	overflow: hidden;
	background-color: rgba(0, 0, 0, 0.5);
}

.item .circle{
	display: none;
	position: absolute;
	bottom: 70px;
	right: 10px;
	font-size: 30px;
	color: rgba(0,0,0,0.66);
}

.item .page-view{
	position: absolute;
	height: 20px;
	width: 100%;
	line-height: 20px;
	text-align: right;
	font-size: 11px;
	color:#fff;
	padding:0 10px;
	background: rgba(89, 89, 93, 0.16);
}
.item>img{
	height: 140px;
	width: 100%;
}
.item>span{
	line-height: 1.4;
}

</style>
