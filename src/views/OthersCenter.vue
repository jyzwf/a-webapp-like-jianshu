<!-- 别人的个人主页 -->
<template lang='jade'>
	.personal-center-page
		user-center-header(:userInfo='userMsg')
		QkNav(:navList='pageNav',@toggleNavs='toggleNav')
		transition(name="qukecenter-fade" mode="out-in")
			components(:is='nowPart',:needSubmit='false',:isSelf='isSelf')
</template>

<style scoped lang='less'>
@center-bg:#f9f9f9;
@white:#fff;
	.personal-center-page{
		min-height: 100%;
		background: @center-bg;
		padding-bottom: .8rem;
	}

	.qk-nav-slider{
		background:@white; 
	}

	


	.qukecenter-fade-enter-active, .qukecenter-fade-leave-active {
    transition: all .25s ease;
  }

  .qukecenter-fade-enter{
    opacity:0;
    transform:translateX(3rem);
  }

   .qukecenter-fade-leave-active {
    opacity:0;
    transform:translateX(-3rem);
  }

</style>

<script>
	import UserCenterHeader from 'components/UserCenterHeader';
	import QkNav from 'components/QkNav';
	// import ArticlesSnapshot from 'components/ArticlesSnapshot';
	import SubmitNoteList from 'components/SubmitNoteList';
	import UserCenterList from 'components/UserCenterList';
	export default{
		data(){
			return {
				userMsg:{},
				scrollEle:'.article-list-teml .loader-end',
				nowPart:'UserCenterList',
				isSelf:false
			}
		},
		components:{
			UserCenterHeader,
			QkNav,
			UserCenterList,
			SubmitNoteList
		},
		computed:{
			userId(){
				return this.$route.params.userId
			},
			token(){
				return window.localStorage.qkT?window.localStorage.qkT:'';
			},
			url(){
				return this.$store.state.toggleUrl.nowReqUrl
			},
			pageNav(){
				return [
					{
						name:'文章',
						part:'UserCenterList',
						url:'users/page',
						number:this.userMsg.pagenum,
						el:'.user-article-list-teml .loader-end',
					},
					{
						name:'收藏',
						url:'users/keep',
						part:'UserCenterList',
						number:this.userMsg.keepnum,
						el:'.user-article-list-teml .loader-end',
					},
					{
						name:'专题',
						url:'users/focus/topic',
						part:'SubmitNoteList',
						number:this.userMsg.focustopicnum,
						el:'.submit-note-list .loader-end',
					}
				]
			}
		},
		methods:{
			addScroll(){
				this.$store.dispatch('scrollLoader',{
					url:this.url,
					el:document.querySelector(this.scrollEle),
					scale:.3
				})
			},
			toggleNav(n){
				if(n.url == 'users/page'){
					this.isSelf = true
				}else{
					this.isSelf = false;
				}
				
				this.nowPart = n.part;
				this.scrollEle = n.el;

				this.$store.dispatch('toggle_req_url',n.url)
				this.$store.dispatch('reset_list');
				this.$store.dispatch('add_extra_data',{
					user_id:this.userId
				});


				this.$store.dispatch('loadData',{
					listUrl:this.url
				})
			}
		},
		mounted(){
			document.querySelector('.personal-center-page').style.minHeight = window.innerHeight+'px';
			// 请求个人的数据
			this.$http.post(`${this.$store.state.baseData.host}users/homepage/baseinfo`,{
				token:this.token,
				user_id:this.userId
			},{"emulateJSON":true,"emulateHTTP":true})
			.then((data)=>{
				let formatData = data.data;
				if(formatData.code === 0){
					if(formatData.msg.isSelf){
						// this.$store.commit('SETUSERCENTERINFO',formatData.msg.main)
						this.$store.dispatch('set_userinfo',formatData.msg.main);
					}
					this.userMsg = formatData.msg.main
				}
			},err=>{
				alert('服务器开小差啦')
			})


			//请求底部数据
			// this.$store.commit('SETSPECIALREQURL',this.pageNav[0].url)
			this.toggleNav(this.pageNav[0])
			window.addEventListener('scroll',this.addScroll,false);
		},
		beforeDestroy(){
			// this.$store.dispatch('clear_userinfo');
			window.removeEventListener('scroll',this.addScroll,false);
		}
	}
</script>