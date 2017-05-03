import Vue from 'vue'
import Router from 'vue-router'
// import mains from '@/components/mains'
// import playerInterface from '../components/playerInterface'
import homeplay from '../components/playlist/home'
import contents from '../components/contents'
import recommend from '../components/find/recommend'
import songs from '../components/find/songs'
import radio from '../components/find/radio'
import rank from '../components/find/rank'
import rsinger from '../components/find/singer'
import latest from '../components/find/latest'

import friends from '../components/friends/friends'
import mvs from '../components/mv/mv'
import myfm from '../components/myfm/myfm'

import home from '../components/search/home'
import single from '../components/search/single'
import singer from '../components/search/singer'
import album from '../components/search/album'
import mv from '../components/search/mv'
import playlist from '../components/search/playlist'
import user from '../components/search/user'
import djradio from '../components/search/djradio'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/find/recommend'
    },
    {
      path: '/find/recommend',
      name: 'find',
      component: contents,
      children: [
        {
          path: '/find/recommend',
          name: 'recommend',
          component: recommend
        },
        {
          path: '/find/songs',
          name: 'songs',
          component: songs
        },
        {
          path: '/find/radio',
          name: 'radio',
          component: radio
        },
        {
          path: '/find/rank',
          name: 'rank',
          component: rank
        },
        {
          path: '/find/singer',
          name: 'singer',
          component: rsinger
        },
        {
          path: '/find/latest',
          name: 'latest',
          component: latest
        }
      ]
    },
    {
      path: '/search/home/:search',
      component: home,
      children: [
        {
          path: '',
          name: 'single',
          component: single
        },
        {
          path: 'singer',
          name: 'ssinger',
          component: singer
        },
        {
          path: 'album',
          name: 'album',
          component: album
        },
        {
          path: 'djradio',
          name: 'djradio',
          component: djradio
        },
        {
          path: 'playlist',
          name: 'playlist',
          component: playlist
        },
        {
          path: 'user',
          name: 'user',
          component: user
        },
        {
          path: 'mv',
          name: 'mmv',
          component: mv
        }
      ]
    },
    {
      path: '/myfm',
      name: 'myfm',
      component: myfm
    },
    {
      path: '/friends',
      name: 'friends',
      component: friends
    },
    {
      path: '/mv',
      name: 'mv',
      component: mvs
    },
    {
      path: '/playlist',
      name: 'homeplay',
      component: homeplay
    }
  ]
})
