<template>
  <div id="app">
      <!-- <quke-loading v-show='showLoading'></quke-loading> -->
      <login v-if='showLogin'></login>
  		<transition name="quke-fade" mode="out-in">
        	<router-view></router-view>
   	 	</transition>	
  </div>
</template>

<script>
// import QukeLoading from 'components/QukeLoading';
import Login from 'components/Login';
export default {
  name: 'app',
  computed:{
    // showLoading(){
    //   return this.$store.state.baseConfig.isLoading;
    // },
    showLogin(){
      return this.$store.state.baseData.isLogin;
    }
  },
  components:{
    // QukeLoading,
    Login
  }
}
</script>

<style lang='less'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height:100%;

  .quke-fade-enter-active, .quke-fade-leave-active {
    transition: all .25s ease;
  }

  .quke-fade-enter,.quke-fade-leave-active{
    opacity:0;
    transform:translateX(3rem);
  }

 /*   {
    opacity:0;
    transform:translateX(-3rem);
  }*/

}
</style>
