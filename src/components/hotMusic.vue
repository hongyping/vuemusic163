<template>
    <div class="m-hotmusic">
        <div class="pylist">
            <div class="hotop">
                <div class="img"><img src="../assets/index_icon_3x.png" alt=""></div>
                <p class="fs12">更新日期：04月25日</p>
            </div>
            <ul class="pylist-item">
                <li v-for="(item,index) in playitem.tracks" :key="index">
                    <span class="fl">
                        {{index+1}}
                    </span>
                    <div class="pyls-fr fl">
                        <div class="pyls-name fl">    
                            <label class="nobr">{{item.name}}</label>
                            <p class="cr88 fs12">{{item.ar[0].name}} - {{item.al.name}}</p>
                        </div>
                        <div class="pyls-ico fr">
                            <i></i>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data(){
        return {
            playitem:[],
            descr:'',
        }
    },
    mounted(){
        axios.get('/api/topsmusic').then(res=>{
           this.playitem = res.data.playlist;
           this.descr = res.data.playlist.description.replace(/\n/g,'<br/>');
           console.log(this.playitem);
        }).catch(error =>{
          console.log(error);
        });
    }
}
</script>
<style lang="stylus" scoped>
     @import "../assets/css/style.styl";
     .hotop
        background url("../assets/hot_music_bg_3x.jpg") no-repeat left top
        background-size cover
        padding 27px 20px 30px
        .img 
            width 172px
            overflow hidden
            img 
              margin -24px 0 8px -30px
        p
            color #fff
</style>