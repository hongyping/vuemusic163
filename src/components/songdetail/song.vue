<template>
    <div class="m-song">
        <div class="mSong-bg" :style="{backgroundImage:'url('+songdetail.al.picUrl+')'}"></div>
        <div class="mSong">
            <span class="logo"><img src="../../assets/logo1.png" alt=""></span>
            <div class="mSong-wrap">
                <div class="mSong-disc" @click="togglePlay()" :class="isPlaying">
                    <span class="disc-bg play" :class="{'pause':!isPlaying}"><img :src="songdetail.al.picUrl" alt=""/></span>
                    <div class="play-btn">
                        <img v-show="!isPlaying" src="../../assets/play_btn_3x.png" alt="">
                    </div>
                </div>
                <div class="mSong-lyric">
                    <h3>{{songdetail.name}} - <span>{{songdetail.ar[0].name}}</span></h3>
                    <div class="lyric">
                       <div class="play-lyric" id="lyric">{{lyriclist}}</div> 
                    </div>
                </div>
            </div>
            <h4>精彩评论</h4>
            <div class="comment-item">
                <li v-for="(item,index) in commentItem" :key="index">
                    <div class="fl img"><img :src="item.user.avatarUrl" alt=""></div>
                    <div class="box">
                        <div class="link fr fs12 cr88">{{item.likedCount}}<i class="icon-link fr"><svg class="u-svg u-svg-unzancmt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path fill="#999" d="m25.857 14.752c-.015.059-1.506 5.867-2.932 8.813-1.162 2.402-3 2.436-3.099 2.436h-12.826v-13c3 0 5.728-4 5.728-7.275 0-3.725 1.433-3.725 2.142-3.725 1.327 0 1.978 1.345 1.978 4 0 2.872-.832 4.525-.839 4.537-.161.31-.155.682.027.981.181.299.5.482.849.482h6.942c.922 0 1.551.215 1.866.64.467.626.286 1.705.164 2.112m-23.857 10.248v-10c0-1.795.659-1.981.855-2h2.145v13h-2.173c-.829 0-.827-.648-.827-1m25.309-13.54c-.713-.969-1.886-1.46-3.482-1.46h-5.519c.26-.932.519-2.285.519-4 0-5.221-2.507-6-4-6-1.909 0-4.185.993-4.185 5.725 0 2.206-1.923 5.275-3.815 5.275h-4-.011c-1.034.011-2.816.862-2.816 4v10.02c0 1.198.675 2.979 2.827 2.979h16.971.035c.364 0 3.224-.113 4.894-3.564 1.514-3.127 3.01-8.942 3.056-9.14.071-.23.664-2.289-.474-3.836"></path></svg></i></div>
                        <router-link class="name"  :key="item.user.userId" :to="{path:'user',query:{id:item.user.userId}}">{{item.user.nickname}}</router-link>
                        <p class="cr88 fs12">{{item.time | formatDate}}</p>
                        <div class="cont">
                            <span><span v-if="item.beReplied.length>0">回复<router-link class="cr50" :key="item.beReplied[0].user.userId" :to="{path:'user',query:{id:item.beReplied[0].user.userId}}">@{{item.beReplied[0].user.nickname}}</router-link>：</span>{{item.content}}</span>
                            <p class="txt" v-if="item.beReplied.length>0">@{{item.beReplied[0].user.nickname}}：{{item.beReplied[0].content}}</p>
                        </div>
                    </div>
                </li>
            </div>
        </div>
         <audio class="music" ref="audio" :src="song.url"></audio>
    </div>
</template>
<script>
import axios from 'axios'
import Api from '../../api/index.js'
import  {formatDate} from '../../assets/js/date.js'
import lyrics from '../../assets/js/lyric.js'

function getDayTime () {
    let date = new Date()
    let times = date.getTime()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    let dayTime = times - hour * 3600 * 1000 - minute * 60 * 1000 - second * 1000
    return dayTime;
}
export default {
    data(){
        return {
            typeId : this.$route.query.id,
            song:[],
            songdetail:[],
            lyriclist:[],
            commentItem:[],
            isPlaying:false
        }
    },
    filters: {
        formatDate(time) {
            var offset = getDayTime() - time;
            let isToday = offset / 1000 / 60 / 60;
            var date = new Date(time);
            if(isToday <= 0){
                return formatDate(date, 'hh:mm');
            }else{
                return formatDate(date, 'yyyy年MM月dd日');
            }
            
        }
    },
    mounted(){
        var apiUrl = Api.getSong(this.typeId);
        axios.get(apiUrl).then(res=>{
           this.song = res.data.data[0];
           //console.log(this.song);
        }).catch(error =>{
          console.log(error);
        });
        var songUrl = Api.getSongDetail(this.typeId);
        axios.get(songUrl).then(res=>{
           this.songdetail = res.data.songs[0];
        }).catch(error =>{
          console.log(error);
        });
        
        var lyricApi = Api.getLyric(this.typeId);
        axios.get(lyricApi).then(res=>{
            var conp = document.querySelector('.play-lyric');
            lyrics.lyticsEnd(conp)
            this.lyriclist = lyrics.parse(res.data.lrc.lyric,conp);
            lyrics.addcontent(conp) ;
            lyrics.gundong(conp)
            console.log(res.data.lrc.lyric)
        }).catch(error =>{
          console.log(error);
        });
        var commentApi = Api.getSongComment(this.typeId)
        axios.get(commentApi).then(res=>{
           this.commentItem = res.data.hotComments;
           //console.log(this.commentItem);
        }).catch(error =>{
          console.log(error);
        });
        
    },
    methods:{
        togglePlay(){
            this.isPlaying = !this.isPlaying;
            if(this.isPlaying){
                this.$refs.audio.play();
            }else{
                this.$refs.audio.pause();
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import "../../assets/css/style.styl";
    .mSong-bg
        position fixed
        top 0px
        left 0
        right 0
        bottom 0
        min-width 320px
        opacity .5
        background-position center top
        filter blur(10px)
        background-size  cover
    .mSong-bg:after 
        content ''
        position absolute
        top 0px
        left 0
        right 0
        bottom 0
        background-color rgba(0,0,0,0.5)

    .mSong
        position relative
        z-index 2
        .logo
            position absolute
            left 10px
            top 10px
            width 90px
        .mSong-wrap
            padding-top 80px
            .mSong-disc
                width 342px
                height 342px
                position relative
                margin 0 auto
                overflow hidden
                .disc-bg
                    display block
                    background url("../../assets/disc-plus.png") no-repeat center top
                    background-size cover
                    text-align center
                    width 100%
                    height 100%
                    animation rotate 20s linear infinite
                    img 
                        margin 65px 0
                        width 212px
                        border-radius 50% 
                .pause
                    animation-play-state paused
                .play-btn
                    position absolute
                    width 65px
                    height 65px
                    left 140px
                    top 140px
            .mSong-lyric
                color #fff
                margin-bottom 40px
                h3
                    text-align center
                    font-weight 400
                    font-size 18px
                    margin 10px 0 6px
                    span
                        color rgba(255,255,255,.6)
                        font-size 15px
                .lyric
                    height 56px
                    overflow hidden
                    line-height 28px
                    color rgba(255,255,255,.7)
                    padding 0 10px
                    text-align center
                    position relative
                    .play-lyric
                        position absolute
                        width 100%
                        
        h4
            color #fff
            padding-left 8px
            border-left: 2px solid #d33a31;
            font-size 16px
            font-weight 400
            height 18px
            line-height 1
            margin-bottom 5px 
    
    .mSong-wrap:after
        content ''
        position absolute
        top 0
        left 45%
        width 109px
        height 157px
        background url("../../assets/needle-plus.png") no-repeat left top
        background-size cover
    .comment-item li 
        color #fff
        .box 
            .name
                color rgba(255,255,255,.7) 
            .cr88
                color rgba(255,255,255,.3) 
            .cont .txt  
                color rgba(255,255,255,.7)   
    @keyframes rotate 
      0%  
        transform rotate(0deg)
      100%
        transform rotate(360deg)
     
</style>