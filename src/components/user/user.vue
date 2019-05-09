<template>
    <div class="m-user">
        <header class="user-header" :style="{backgroundImage:'url('+ userList.profile.backgroundUrl +')'}">
            <div class="user-cont">
                <div class="user-top">
                    <div class="listen">
                    <span>{{userList.listenSongs}} </span> <p>听歌数</p>     
                    </div>
                    <div class="img">
                        <img :src="userList.profile.avatarUrl" alt="">
                    </div>
                    <div class="fans fr">
                        <span>{{userList.profile.followeds}} </span> <p>粉丝数</p>     
                    </div>
                </div>
                <div class="user-info">
                    <label class="fs17">{{userList.profile.nickname}} 
                    <span v-if="userList.profile.gender == 1">
                        <svg viewBox="0 0 48 48" class="usr-svg usr-svg-male usrhd_icn"><g><path class="svg_st0" d="M24,0C10.7,0,0,10.7,0,24c0,13.3,10.7,24,24,24c13.3,0,24-10.7,24-24C48,10.7,37.3,0,24,0z M36,21 c0,0.8-0.7,1.5-1.5,1.5S33,21.8,33,21v-3.9L28.1,22c1.2,1.6,1.9,3.6,1.9,5.7c0,5.4-4.4,9.8-9.8,9.8c-5.4,0-9.8-4.4-9.8-9.8 c0-5.4,4.4-9.7,9.8-9.7c2.2,0,4.1,0.7,5.7,1.9l4.9-4.9H27c-0.8,0-1.5-0.7-1.5-1.5S26.2,12,27,12h9V21z"></path><circle class="svg_st0" cx="20.2" cy="27.8" r="6.7"></circle><path class="svg_st1" d="M25.5,13.5c0,0.8,0.7,1.5,1.5,1.5h3.9L26,19.9c-1.6-1.2-3.6-1.9-5.7-1.9c-5.4,0-9.8,4.4-9.8,9.7 c0,5.4,4.4,9.8,9.8,9.8c5.4,0,9.8-4.4,9.8-9.8c0-2.2-0.7-4.1-1.9-5.7l4.9-4.9V21c0,0.8,0.7,1.5,1.5,1.5S36,21.8,36,21v-9h-9 C26.2,12,25.5,12.7,25.5,13.5z M20.2,34.5c-3.7,0-6.8-3-6.8-6.8s3-6.7,6.8-6.7c3.7,0,6.8,3,6.8,6.7S24,34.5,20.2,34.5z"></path></g></svg>
                    </span>
                    <span v-else-if="userList.profile.gender == 2"> 
                        <svg viewBox="0 0 48 48" class="usr-svg usr-svg-female usrhd_icn"><path class="svg_st0" d="M24,0c13.3,0,24,10.7,24,24S37.3,48,24,48C10.7,48,0,37.3,0,24S10.7,0,24,0z"></path><path class="svg_st1" d="M27,31c-2.3,0-4.4-0.8-6.1-2.1c-0.1,0.2-0.2,0.4-0.3,0.5L19,31l2.5,2.5c0.6,0.6,0.6,1.5,0,2 c-0.6,0.6-1.5,0.6-2,0L17,33l-2.6,2.5c-0.6,0.6-1.5,0.6-2,0c-0.6-0.6-0.6-1.5,0-2L15,31l-2.5-2.5c-0.6-0.6-0.6-1.5,0-2 c0.6-0.6,1.5-0.6,2,0L17,29l1.6-1.6c0.1-0.1,0.3-0.3,0.5-0.3C17.8,25.4,17,23.3,17,21c0-5.5,4.5-10,10-10c5.5,0,10,4.5,10,10 C37,26.5,32.5,31,27,31z M27,14c-3.9,0-7,3.1-7,7c0,3.9,3.1,7,7,7c3.9,0,7-3.1,7-7C34,17.1,30.8,14,27,14z"></path></svg>
                    </span>
                    </label>
                    <div class="btn"><span>+ </span>关注</div>
                </div>
            </div>
            
        </header>
        <section class="user-body">
            <div class="pylist">
                <h4 class="cr88">歌单({{musiclist.length}})</h4>
                <ul class="pylist-item">
                    <li v-for="(item,index) in musiclist" :key="index">
                        <span class="fl">
                            <img :src="item.coverImgUrl" alt="">
                        </span>
                        <router-link class="pyls-fr fl" :to="{path:'playlist',query:{ id:item.id }}" :key ="index">
                            <div class="pyls-name">    
                                <label class="nobr">{{item.name}}</label>
                                <p class="cr88 fs12">{{item.trackCount}}首，播放{{item.playCount | formatCout}}次</p>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>

        </section>
    </div>
</template>
<script>
import axios from 'axios';
import Api from '../../api/index.js';

export default {
    name:'user',
    data() {
        return {
            typeId:this.$route.query.id,
            userList:[],
            musiclist:[]
        }
    },
    filters:{
        formatCout:function(val){
            if(val.toString().length>5){
                val = (val /10000).toFixed(1) +'万';
            }
            return val;
        }
    },
    mounted() {
       var useApi = Api.getUser('playlist',this.typeId); 
       axios.get(useApi).then(res=>{
           this.musiclist = res.data.playlist;
           //console.log(res.data.playlist)
       });
       var useDetailApi = Api.getUser('detail',this.typeId); 
       axios.get(useDetailApi).then(res=>{
           this.userList = res.data;
           //console.log(res.data)
       });
    },
}
</script>
<style lang="stylus" scoped>
    @import "../../assets/css/style.styl";
    .user-header
        height 267px
        background-position center
        background-size cover
        position relative
        padding 60px 0 0
        .user-cont
            position relative
            z-index 2
            color #fff
            text-align center 
            .user-top 
                display flex
                margin-bottom 5px
                .listen,.fans
                    flex 1 1 auto
                    padding-top 20px
                    span 
                        font-size 17px
                    p 
                        color rgba(255,255,255,.7)
                .img
                    width 80px
                    margin 0 10px
                    img 
                        border-radius 50% 
            .user-info
                text-align center
                color #fff
                .btn
                    width 126px
                    height 30px
                    line-height 28px
                    border 1px solid rgba(255,255,255,.8)
                    border-radius 15px
                    margin 8px auto 0
                    span 
                        font-size 21px
                        display inline-block
                        line-height 20px
                        position relative
                        top 1px
                        margin-right 3px
    .user-header:before 
        content ''
        position absolute
        left 0
        top 0px
        width 100%
        height 100%
        background rgba(0,0,0,.3)
    .usrhd_icn
        margin-left 3px
        width 18px
        height 18px
        position relative
        top 3px
        .svg_st0
            fill-rule evenodd
            clip-rule evenodd
            fill #ff86b6
        .svg_st1
            fill #fff
    .usr-svg-male .svg_st0
        fill #47a1ce
    .pylist .pylist-item li span 
        width 50px
        padding 0
        margin-right 10px
</style>