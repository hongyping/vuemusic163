<template>
    <div class="m-playlist" >
        <div class="plheadbg" :style="{backgroundImage:'url('+ playitem.coverImgUrl+')'}"></div>    
        <div class="plhead clearfix">
            <div class="plheadImg fl">
                <img :src="playitem.coverImgUrl" alt="" class="img">
                <span class="plIcon">歌单</span>
                <i>{{playitem.playCount | formatCout}}</i>
            </div>
            <div class="plheadr">
                <h3>{{playitem.name}}</h3>
                <router-link class="creater" :key="playitem.userId" :to="{path:'user',query:{id:playitem.userId}}"><i class="img"><img :src="playitem.creator.avatarUrl" alt=""></i>{{playitem.creator.nickname}}</router-link>
            </div>
        </div>
        <div class="plhead-info">
            <div class="tags">
                <label for="">标签：</label>
                <span class="fs12" v-for ="(item,index) in playitem.tags" :key="index">{{item}}</span>
            </div>
            <div class="intr">
                <label for="">简介：</label>
                <span :class="{'nobr3':isActive}" v-html="descr">{{descr}}</span>
                <div class="arrow" @click="showMore()"><span>></span></div>
            </div>
        </div>
        <div class="pylist">
            <h4>歌曲列表</h4>
            <ul class="pylist-item">
                <li v-for="(item,index) in playitem.tracks" :key="index">
                    <span class="fl">
                        {{index+1}}
                    </span>
                    <router-link class="pyls-fr fl" :key="item.id" :to="{path:'song',query:{id:item.id}}">
                        <div class="pyls-name fl">    
                            <label class="nobr">{{item.name}}</label>
                            <p class="cr88 fs12">{{item.ar[0].name}} - {{item.al.name}}</p>
                        </div>
                        <div class="pyls-ico fr">
                            <i></i>
                        </div>
                    </router-link>
                </li>
            </ul>
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
    </div>
</template>
<script>
import axios from 'axios'
import Api from '../../api/index.js'
import  {formatDate} from '../../assets/js/date.js'

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
            playitem:[],
            commentItem:[],
            descr:'',
            isActive:true
        }
    },
    filters: {
        formatCout:function(val){
            if(val.toString().length>5){
                val = (val /10000).toFixed(1) +'万';
            }
            return val;
        },
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
        var apiUrl = Api.getPlaylist(this.typeId);
        axios.get(apiUrl).then(res=>{
           this.playitem = res.data.playlist;
           this.descr = res.data.playlist.description.replace(/\n/g,'<br/>');
           console.log(this.playitem);
        }).catch(error =>{
          console.log(error);
        });
        var commentApi = Api.getComment('playlist',this.typeId)
        axios.get(commentApi).then(res=>{
           this.commentItem = res.data.hotComments;
           console.log(this.commentItem);
        }).catch(error =>{
          console.log(error);
        });
        
    },
    methods:{
        showMore(){
            this.isActive = (this.isActive==false)?true:false;
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import "../../assets/css/style.styl";
    .m-playlist
        position relative
        overflow hidden
    .plheadbg
        position absolute
        left 0
        top 0
        right 0
        height 210px
        background-size cover
        filter blur(20px)
        background-position 50%
        transform scale(1.5)
        z-index: -1;
    .plhead
        padding 30px 15px
        display flex
        .plheadImg
            position relative
            width 145px
            height 145px
            color #fff
            span 
                position absolute 
                left 0
                top 16px
                background-color rgba(217,48,48,.8)
                border-radius 0 10px 10px 0 
                padding 0 6px 1px
                font-size 12px
            i 
                width 100%
                background-color rgba(0,0,0,.1)
                text-align right
                position absolute
                left 0
                top 0
                font-style normal
                padding 1px 3px
                font-size 12px
        .plheadr
            padding-left 16px
            flex 1 1
            h3
                font-size 17px
                color #fff
                font-weight 400
                margin-bottom 22px
            .creater
                line-height 30px
                color rgba(255,255,255,.7)
                .img
                    border-radius 50%
                    width 30px
                    height 30px
                    display inline-block
                    overflow hidden
                    float left
                    margin-right 5px
    .plhead-info
        background-color #fff    
        padding 10px 15px
        color #666
        .tags
            margin 0 0 10px
            span 
                margin-right 10px
                border 1px solid #ddd
                border-radius 20px
                padding 2px 7px
    .arrow
        font-style normal 
        text-align right
        display block
        span 
            font-family "宋体"
            display inline-block
            transform rotate(90deg)
    
                    
</style>