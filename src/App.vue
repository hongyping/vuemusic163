<template>
  <div id="app">
    <keep-alive>
      <my-header v-if="$route.meta.keepAlive"></my-header>
    </keep-alive>
    
    <router-view/>
  </div>
</template>

<script>
import Myheader from '@/components/my-header'
export default {
  name: 'App',
  components:{
    'my-header':Myheader
  }
}
</script>

<style lang="stylus">

</style>
