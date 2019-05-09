<template>
    <div class="m-search">
        <form action="#" method="get">
            <div class="search">
                <i class="ico fl"><img src="../assets/search.svg" alt=""></i>
                <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="inputmsg" @keyup.enter="searchResult()" @input="change()">
                <span class="close fr" v-show="isHas" @click="clear">&times;</span>
            </div>
            <div class="search-result">
                <div class="search-plane">
                    <dl class="hot-search" v-show="isShow"> 
                        <dt>热门搜索</dt>
                        <dd v-for="(item,index) in hotSeachlists" :key="index" @click="searchResult(item.first)">{{item.first}}</dd>
                    </dl>
                    <!-- 搜索历史
                        <ul class="search-history">
                         <li class="item" v-for="(item,index) in seachlists" :key="index" @click="searchResult(item.name)"><i class="ico fl"><img src="../assets/search.svg" alt=""></i><p>{{item.name}}</p></li>
                    </ul> -->
                </div>
               
                <div class="seach-recom" v-show="isHas">
                    <p class="cr50">搜索"{{inputmsg}}"</p>
                    <ul class="recom-item">
                        <li class="item" v-for="(item,index) in seachlists" :key="index" @click="searchResult(item.name)"><i class="ico fl"><img src="../assets/search.svg" alt=""></i><p>{{item.name}}</p></li>
                    </ul>
                </div>
            
                <ul class="seach-item">
                    <li class="newMusicLi pyls-fr" v-for="(item,index) in resultlists" :key="index">
                        <div class="pyls-name fl">    
                            <label class="nobr">{{item.name}}</label>
                            <p class="cr88 fs12">
                                <i class="u-hmsprt sghot "></i>
                                <span class="fs12" v-for="(itemar,index) in item.ar" :key="index"><font class="fs12" v-if="!(index == 0)"> / </font>{{itemar.name}}</span> - {{item.al.name}}
                            </p>
                        </div>
                        <div class="pyls-ico fr">
                            <i></i>
                        </div>
                    </li>
                </ul>
            </div>
        </form>
        
    </div>
</template>

<script>
import axios from 'axios';
import Api from '../api/index.js'
export default {
    name:'Search',
    data() {
        return {
            inputmsg:'',
            hotSeachlists:[],
            seachlists:[],
            resultlists:[],
            isShow:true,
            isHas:false
        }
    },
    mounted() {
        var hotApi= 'http://musicapi.leanapp.cn/search/hot';
        axios.get(hotApi).then(res=>{
            this.hotSeachlists = res.data.result.hots;
        });
    },
    methods: {
        searchResult(name){
            if(name!=undefined){
                this.inputmsg = name;
            }
            var apiUrl= Api.getSearch(this.inputmsg);
            axios.get(apiUrl).then(res=>{
                this.resultlists = res.data.result.songs;
                this.isHas = false; 
                this.isShow = false;
                console.log(res.data.result.songs);
            });
        },
        change(){
            var sugUrl= Api.getSugest(this.inputmsg);
            axios.get(sugUrl).then(res=>{console.log(res.data.result.songs);
                this.seachlists = res.data.result.songs;
                
                
            });
        },
        clear(){
            this.inputmsg = '';
        },
    },
    watch: {
        inputmsg(){
            this.resultlists = [];
           if(this.inputmsg.length>0){
               this.isHas = true; 
               this.isShow = false;
           }else{
               this.isHas = false;
               this.isShow = true; 
           }
           
        }
    },
}
</script>

<style lang="stylus" scoped>
     @import "../assets/css/style.styl";
    .search
        background-color #ebecec
        border-radius 30px
        padding 0 10px
        margin 15px 10px
        line-height 30px
        input
            border none
            background none
            outline: none;
            font-size 14px
            color #444
        ::-webkit-input-placeholder
            color #bbb
        .ico
            width 13px
            padding-top 2px
            margin-right 8px
        .close
            border-radius 50%
            background-color #bbb
            height 14px
            width 14px
            line-height 14px
            text-align center 
            color #ebecec
            margin 8px 0
    
    .item
        display flex
        .ico
            width 15px
            align-items center
            display flex
            margin-right 7px
        p
            flex 1 auto
            border-bottom 1px solid #eee
    .search-result
        border-top 1px solid #eee
        .seach-recom
            padding 0px 10px
            p
                line-height 45px
            .recom-item
                border-top 1px solid #eee
                
                      
        .hot-search
            padding 5px 10px
            dt
               line-height 30px 
               color #666
               margin-bottom 5px
            dd
                border 1px solid #eee
                border-radius 30px
                padding 5px 13px
                margin 0 8px 8px 0
                display inline-block
    .u-hmsprt 
        background-image url("../assets/index_icon_3x.png")
        display inline-block
        width 12px
        height 8px
        margin-right 4px
        background-size 166px 97px
</style>