<template lang='jade'>
	#qk-enter
		<!-- 路由 -->
		router-view
		<!-- 底部导航 -->
		AppNav(v-show='nowRouterName')
</template>


<script>
	import AppNav from 'components/AppNav';

	export default{
		components:{
			AppNav
		},
		computed:{
			nowRouterName(){
				return this.$route.name != 'writenote'
			}
		}
	}
</script>

