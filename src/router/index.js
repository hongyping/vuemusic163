import Vue from 'vue'
import Router from 'vue-router'
import RemdMusic from '@/components/remdMusic'
import Search from '@/components/search'
import HotMusic from '@/components/hotMusic'
import Playlist from '@/components/playlist/playlist'
import Song from '@/components/songdetail/song'
import User from '@/components/user/user'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '推荐音乐',
      component: RemdMusic,
      meta:{
        keepAlive:true
      }
    }, 
    { 
      path: '/hotMusic', 
      name: '热歌榜', 
      component: HotMusic,
      meta:{
        keepAlive:true
      } 
    },
    { 
      path: '/search', 
      name: '搜索', 
      component: Search,
      meta:{
        keepAlive:true
      } 
    },
    {
      path: '/playlist',
      name: 'playlist', 
      component: Playlist
    },
    {
      path: '/song',
      name: 'song', 
      component: Song
    },
    {
      path: '/user',
      name: 'user', 
      component: User
    }
  ]
})
