<template>
    <div class="my-header">
        <div class="top">
           <img alt="" class="logo fl" src="../assets/logo.png"/>
           <a class="topr fr">下载APP</a>
        </div>
        
        <ul class="nav">
          <li v-for = "(item,index) in navlist" @click="selectNav(item)" :key="index"><span :class="isSelect === item ? 'active':''">{{item}}</span></li>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'Myheader',
  data(){
    return {
      isSelect :'推荐音乐',
       navlist:['推荐音乐','热歌榜','搜索']
    }
  },
  mounted() {
    this.isSelect = this.$route.name;
  },
  methods:{
    selectNav(title){
      switch(title){
        case '推荐音乐':
          this.$router.push('/')
          break;
        case '热歌榜':
          this.$router.push('/hotMusic')
          break;
        case '搜索':
          this.$router.push('/search')
          break;
      }
      this.isSelect = this.$route.name;
      console.log(this.$router);
    }
  }
}
</script>
<style lang="stylus" scoped>
  .my-header
    height 104px
    font-size 15px
    .top
      background-color #d43c33
      height 64px
      color #fff
      width 100%
      position fixed
      top 0px
      padding 17px 10px
      .logo 
        height:25px
      .topr
        border 1px solid rgba(255,255,255,.5)
        border-radius 15px
        padding 4px 10px
        color #fff
    .nav 
      position fixed
      top 64px
      width 100%
      border-bottom 1px solid #ddd
      height 40px
      clear both
      background-color #fff
      li
       width 33.3%
       float left
       text-align center
       line-height 40px
       span
         padding 0 10px
         display inline-block
         height 40px
       .active
         color #d33a31
         border-bottom 2px solid #d43c33
</style>