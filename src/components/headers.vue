<template>
	<div class="top">
        <div class="logo">
            <a href=""></a>
        </div>
        <div class="move-btn">
            <button class="prev" @click="$router.go(-1)"><i class="ion-chevron-left"></i></button>
            <button class="next" @click="$router.go(1)"><i class="ion-chevron-right"></i></button>
        </div>
        <div class="search">
            <input type="text" class="search-input" placeholder="搜索音乐，歌手，歌词，用户" v-model='value' @keyup.enter="search">
            <button class="search-btn" @click="search">
                <i class="ion-search"></i>
            </button>
        </div>
        <div class="app-setting">
            <ul>
                <li class="skin">
                    <a href="">
                        <i class="ion-tshirt-outline"></i>
                    </a>
                </li>
                <li class="message">
                    <a href="">
                        <i class="ion-ios-email-outline"></i>
                    </a>
                </li>
                <li class="setting">
                    <a href="">
                        <i class="ion-android-settings"></i>
                    </a>
                </li>
            </ul>
        </div>
        <div class="user">
            <img src="../assets/user-logo.jpg" class="user-logo">
            <span class="user-info">Yurentle</span>
        </div>
    </div>
</template>

<script>
/*eslint-disable */
import axios from 'axios'

import bus from '../event-bus'

export default {
	name:'header',
	data () {
        return{
            value:'',
            count:0,
            type:{
                'single': '1',
                'album': '10',
                'singer': '100',
                'playlist': '1000',
                'user': '1002',
                'mv': '1004',
                'djradio': '1009'
            }
        }
	},
	methods:{
        //搜索歌曲并将搜索到的数量返回给search下面的home组件
        search: function() {
            bus.$emit('search',this.value)
        //     var _this=this
        //     if(this.value){
            this.$router.push({name: 'single', params: { search: this.value } })
        //     let type = this.type[choose]
        //         axios.post('/api/search/pc?&s=' + this.value +'&offset=0&limit=20&type=' + this.type[type]).then(function(response){
        //             _this.count=response.data.result.songCount
        //             console.log(response.data.result.songCount)
        //             // bus.$emit('search', _this.count)
        //         })
        //     }
        },
	},
    computed: {
        choose:function(){
            let path = this.$route.path
            path=path.substr(path.lastIndexOf('/')+1)
            return path
            console.log(path)
        }
    }
}
</script>
<style scoped>
.top {
	height: 50px;
	/*background-color: #222225;*/
	border-bottom: 3px solid #7C0D0D;
}

.logo {
    float: left;
}

.logo a {
    display: inline-block;
    height: 50px;
    width: 177px;
    background: url(../assets/applogo.png);
    background-position: 0 0;
    background-repeat: no-repeat;
}

.move-btn {
    float: left;
    margin-left: 12px;
    font-size: 0;
}

.move-btn button {
    width: 28px;
    height: 21px;
    font-size: 14px;
    margin-top: 14px;
    color: #979798;
    background-color: #222225;
    border: 1px solid #191818;
}
.move-btn .prev{
	border-right: 0;
}
.search {
    float: left;
    margin-left: 10px;
    margin-top: 14px;
    position: relative;
}

.search input {
    width: 216px;
    height: 21px;
    border-radius: 21px;
    background-color: #171719;
    border: 0;
    padding: 2px 0 2px 8px;
    outline: 0;
    color:#fff;
}

::-webkit-input-placeholder{
    color: #454546;
}
::-moz-placeholder {
    color: #454546;
}

.search .search-btn {
    position: absolute;
    top: 2px;
    right: 4px;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border: 0;
}

.search-btn i {
    font-size: 16px;
    color: #787879;
}

.app-setting {
    margin-right:134px;
    float: right;
    color: #fff;
}

.app-setting ul li {
    display: inline;
}

.app-setting ul li a {
    display: inline-block;
    font-size: 20px;
    line-height: 50px;
    color: #ADAFB2;
    padding: 2px;
    margin-left: 20px;
}

.user {
    float: right;
    color: #fff;
}

.user .user-logo {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    vertical-align: text-bottom;
    margin-right: 4px;
}

.user span {
    line-height: 50px;
    color: #ADAFB2;
}

</style>