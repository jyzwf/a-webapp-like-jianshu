<!-- 专题介绍 -->
<template lang="jade">
	.special-intr
		
		QkIntr(:intr='specialMsg')
			.special-extra-intr.qk-border-t(slot='extraIntr')
				h5 专题简介
				p {{specialMsg.describe}}
			button.init-btn.submit-btn(slot='btn-submit') 投稿
		QkNav(:navList='pageNav',@toggleNavs='toggleNav',hasBorder='true')
		ArticlesSnapshot

</template>

<style lang='less' scoped>
@submit:#49be38;
@white:#fff;
	.special-intr{
		padding-bottom: .8rem;
		
	}

	.special-extra-intr{
		margin-top: .2rem;
		padding: .16rem .16rem 0;
		text-align: left;

		h5{
			margin-bottom: 0.04rem;
		}
	}

	.submit-btn{
		border:0.01rem solid @submit;
		color:@submit;
		padding:0.04rem 0.08rem;
		font-size:0.15rem;

	}
</style>

<script type="text/javascript">
	import QkHeader from 'components/QkHeader';
	import QkIntr from 'components/IntrHeader';
	import QkNav from 'components/QkNav';
	import ArticlesSnapshot from 'components/ArticlesSnapshot';
	export default{
		data(){
			return{
				pageNav:[
					{
						name:'最新文章',
						url:'topic/detail/newpage'
					},
					{
						name:'最热文章',
						url:'topic/detail/hotpage'
					}
				],
				specialMsg:{}
			}
		},
		components:{
			QkHeader,
			QkIntr,
			QkNav,
			ArticlesSnapshot
		},
		computed:{
			topicId(){
				return this.$route.query.type
			},
			url(){
				// return this.$store.state.specialIntrConfig.nowReqUrl
				return this.$store.state.toggleUrl.nowReqUrl
			}
		},
		methods:{
			addScroll(){
				this.$store.dispatch('scrollLoader',{
					url:this.url,
					el:document.querySelector('.article-list-teml .loader-end'),
					scale:.3
				})
			},
			toggleNav(n){
				this.$store.dispatch('toggle_req_url',n.url)

				this.$store.dispatch('reset_list');

				this.$store.dispatch('add_extra_data',{
					topic_id:this.topicId
				});
				this.$store.dispatch('loadData',{
					listUrl:this.url
				})

			
			}
		},
		mounted(){
			// 设置顶部title以及请求的数据
			this.$store.dispatch('header_title',this.$route.query.name)

			// 设置一开始的请求url
			// this.$store.dispatch('toggle_req_url',this.pageNav[0].url)
			
			// 请求专题的详情介绍
			this.$http.post(`${this.$store.state.baseData.host}topic/detail`,{
				topic_id:this.topicId
			},{"emulateJSON":true,"emulateHTTP":true})
			.then((data)=>{
				let formatData = data.data;
				if(formatData.code==0){
					this.specialMsg = formatData.msg;
				}else{
					alert('服务器开小差啦')
				}
			},err=>{
				alert('服务器开小差啦')
			})

			// 开始请求下面的最新最热
			this.toggleNav(this.pageNav[0])
			// window.addEventListener('scroll',this.addScroll,false);
		},
		beforeDestroy(){
			// window.removeEventListener('scroll',this.addScroll,false);
		}
	}
</script>