# cloud-music

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8884
npm run dev

```

如果启动服务出现问题，试着去修改config文件夹下index里面的端口号

##技术依赖
vue + vue-cli + vue-router
vue-slider-component  进度条组件
element-ui 使用了它的轮播组件
##实现功能
###发现音乐
 - 上一曲
 - 播放
 - 暂停
 - 下一曲
 - 进度控制
 - 音量控制
 - 单曲循环
 - 顺序播放
 
###音乐搜索（在搜索框输入搜索内容，按回车键或者放大镜图标）

 - 单曲（双击歌曲添加至播放列表，部分音乐存在版权问题无法播放，当前播放的音乐会本地存储）
 - 歌手
 - 专辑
 - MV
 - 歌单
 - 主播电台
 - 用户

###播放列表

 - 展示播放内容

###播放界面

 - 唱片和指针（音乐播放时旋转）
 - 歌词滚动

##注：

[api来源]（http://moonlib.com/606.html）
api使用post方法，需要跨域，使用proxy转发

``` bash
proxyTable: {
    '/api': {
        target: 'http://music.163.com',
        changeOrigin: true,
        pathRewrite: {
            '^/api': 'api'
        }
    }
}

```
项目非父子组件的信息传递较多，使用了event-bus

