<!-- 我的视频系列 -->
<template lang='jade'>
	#my-videos
		QkHeader(:hasBottom='1')
		.blank-div
		UserCenterList(:isSelf='true')
</template>


<style lang='less' scoped>
	#my-article{
		padding-bottom: .8rem;
	}
	.blank-div{
		height:.48rem;
	}
</style>

<script type="text/javascript">
	import QkHeader from 'components/QkHeader';
	import UserCenterList from 'components/UserCenterList';
	export default{
		data(){
			return{
				url:'users/page'
			}
		},
		components:{
			QkHeader,
			UserCenterList
		},
		methods:{
			addScroll(){
				this.$store.dispatch('scrollLoader',{
					url:this.url,
					el:document.querySelector('.user-article-list-teml .loader-end'),
					scale:.3
				})
			}
		},
		mounted(){
			// 设置顶部title以及请求的数据
			this.$store.dispatch('reset_list');
			this.$store.dispatch('header_title','我的创作')
			
			this.$store.dispatch('add_extra_data',{
				user_id:this.$route.params.myId,
			});
			
			// 请求数据
			this.$store.dispatch('loadData',{
				listUrl:this.url
			})
			window.addEventListener('scroll',this.addScroll,false);
		},
		beforeDestroy(){
			window.removeEventListener('scroll',this.addScroll,false);
		}
	}
</script>