<template>
  <div class="m-song">
    <h3>推荐歌单</h3>
    <div class="remdItems clearfix">
      <router-link class="remdLi" v-for="(item,index) in remdList.slice(0,6)" :to="{path:'playlist',query:{ id:item.id }}" :key ="index">
        <div class="remdImg"><img :src="item.picUrl" alt=""/></div>
         <p>{{item.name}}</p>
      </router-link>
     
    </div>
    <h3>最新音乐</h3>
    <div class="newMusicItems clearfix">
      <router-link class="newMusicLi pyls-fr" v-for="(item,index) in newMusicList.slice(0,10)" :key="index" :to="{path:'song',query:{id:item.id}}">
        <div class="pyls-name fl">    
            <label class="nobr">{{item.name}}<span v-if="item.song.alias.length != 0" class="cr88">({{item.song.alias[0]}})</span></label>
            <p class="cr88 fs12">
              <i class="u-hmsprt sghot"></i>
              <span class="fs12"  v-for="(itemar,index) in item.song.artists" :key="index"><font class="fs12" v-if="!(index == 0)"> / </font>{{itemar.name}}</span> - {{item.name}}</p>
        </div>
        <div class="pyls-ico fr">
            <i></i>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
// http://musicapi.leanapp.cn/ 网易云接口
import axios from 'axios';

export default {
  name: 'RemdMusic',
  data () {
    return {
      remdList:[],
      newMusicList:[],
    }
  },
  mounted(){
    axios.get('/api/remdmusic').then(res =>{
      this.remdList = res.data.result;
      console.log(this.remdList)
    }).catch(error =>{
      console.log(error);
    });

    axios.get('/api/newsmusic').then(res =>{
      this.newMusicList = res.data.result;
    }).catch(error =>{
      console.log(error);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang = "stylus" scoped>
   @import "../assets/css/style.styl";
  .m-song
    padding-top 20px
    h3
      font-size 17px
      border-left 2px solid #d33a31
      padding-left 9px
      height 17px
      line-height 17px
      font-weight 400
      margin-bottom 16px
  
  .remdItems 
    margin-bottom 20px
    .remdLi
      width 33.3%
      float left
      padding 0 0.5% 10px
      img 
        width 100%
      p
        padding 5px
        height 40px
        display  -webkit-box
        -webkit-line-clamp 2
        overflow hidden
        text-overflow ellipsis
        -webkit-box-orient vertical
  .nmInfo
    font-size 12px
  .u-hmsprt 
    background-image url("../assets/index_icon_3x.png")
    display inline-block
    width 12px
    height 8px
    margin-right 4px
    background-size 166px 97px
  
</style>
