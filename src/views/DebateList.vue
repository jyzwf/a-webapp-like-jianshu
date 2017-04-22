<!-- 话题列表 -->
<template lang='jade'>
	#debate-list
		header.qk-border-b
			img(:src='debateDesc.img')
			p.pos-center {{debateDesc.describe}}
		ul
			li.qk-border-t-b(v-for= 'd in debateList')
				router-link.debate-wrapper(:to="{name:'debateDetail',params:{debateDetailId:d.id}}")
					.debater.ele-justify
						img.qk-round.img-4.margin-right-8(:src='d.leaver.headimgurl',@click.prevent.stop='goCenter(d.leaver._id)')
						.debater-msg
							p {{d.leaver.username}}
							p.qk-round-4 {{d.leaver.rank}}
					.debate-content {{d.content}}
					img(:src='d.img')
					.debate-snop.ele-justify
						time {{d.createTime}}
						.debate-act.ele-justify
							p.margin-right-8
								img.img-15(src='../assets/published-article.svg')
								span(v-show='d.comment!=0') {{d.comment}}
							p
								img.img-15(src='../assets/published-article.svg')
								span(v-show='d.reward!=0') {{d.reward}}
		p.loader-end {{'-- ' + loaderWords+' -- '}}
		.publish-debate.qk-round(@click='showPublishDebate')
			img.img-32(src='../assets/ic-cam.svg')
		.qk-detail-mask.qk-mask(v-if='showPublish')
		transition(name='publish-fade')
			publish-debate(v-if='showPublish',@hidePublish='cancelPublish')
</template>

<style lang="less" scoped>
@gray:rgba(0,0,0,.38);
@center-bg:#f9f9f9;
@white:#fff;
@job:#ff5856;

	#debate-list{
		padding-bottom:.8rem;
		background:@center-bg;
		header{
			
			background:@white;
			margin-bottom:.1rem;
			img{
				width:100%;
				height:3.28rem;
				object-fit:cover;
			}

			p{
				padding: 0 .32rem;
    			font-size: .18rem;
    			color: #fff;
			    width: 100%;
			    text-align: center;
			    letter-spacing: 0.02rem;
			}
		}

		li{
			padding:.1rem;
			background:@white;
			margin-bottom:.1rem;
			&:before{
				top:-0.02rem;
			}
			&:last-child{
				margin:0;
			}
			.debate-wrapper{
				&>img{
					width:100%;
					max-height:2rem;
					object-fit:cover;
				}
			}

			.debater{
				justify-content:flex-start;
				padding:.1rem 0;

				p{
					font-size:.14rem;
					margin-bottom:0.04rem;
				}
				p:last-child{
					font-size:.1rem;
					color:@job;
					border: 0.01rem solid @job;
					padding: 0rem 0.04rem;
				    height: .16rem;
    				line-height: .16rem;
    				display:inline;
				}
			}

			.debate-snop{
				padding:.1rem 0 0;
			}

			.debate-content{
				margin:0 0 .1rem 0;
				font-size:.16rem;
			}

			.debate-act{
				
			}
		}


	}

	.publish-debate{
		position:fixed;
		right:.2rem;
		bottom:.2rem;
		z-index:9;
	}

	.qk-detail-mask{
			z-index: 2;
			position: fixed;
			left:0;
			top:0;
			width:100%;
			height:100%;
		}

		.publish-fade-enter-active, .publish-fade-leave-active {
  		  transition: all .45s cubic-bezier(0, 0.51, 0.48, 1.26);
  		}
		
  		.publish-fade-enter,.publish-fade-leave-active{
  		  transform:translateY(7rem);
  		}
</style>

<script type="text/javascript">
	import PublishDebate from 'components/PublishDebate'

	export default{
		data(){
			return {
				url:'discovery/debate/detail',
				showPublish:false
			}
		},
		computed:{
			dataOver(){		//数据是否加载完
				return this.$store.state.scrollLoadList.loadingOver
			},
			loaderWords(){		//底部显示的提示文字
				return this.dataOver?'end':'loading'
			},
			debateList(){		//当前文章的列表
				// this.$nextTick(()=>{
					return this.$store.state.scrollLoadList.LoadingList
				// })
			},
			debateDesc(){
				return this.$store.state.scrollLoadList.otherMsg
			},
			token(){
				return window.localStorage.qkT?window.localStorage.qkT:'';
			}
		},
		components:{
			PublishDebate
		},
		methods:{
			addScroll(){
				this.$store.dispatch('scrollLoader',{
					url:this.url,
					el:document.querySelector('#debate-list .loader-end'),
					scale:.3
				})
			},
			goCenter(id){
				this.$router.push({name:'personalHomepage',params:{userId:id}})
			},
			cancelPublish(){
				this.showPublish = false;
			},
			showPublishDebate(){
				this.$store.dispatch('can_close_login',false);
				if(!this.$store.state.baseData.userInfo._id){
					this.$store.dispatch('judge_islogin',true);
					return false;
				}
				this.showPublish = true;
			}
		},
		mounted(){

			this.$store.dispatch('reset_list');
			this.$store.dispatch('add_extra_data',{
				debate_id:this.$route.params.debateId,
				token:this.token
			});

   			this.$store.dispatch('loadData',{
					listUrl:this.url
			})
            window.addEventListener('scroll',this.addScroll,false);
		},
		beforeDestroy(){
			this.$store.dispatch('clear_userinfo');
			window.removeEventListener('scroll',this.addScroll,false);
		}
	}
</script>