<template lang='jade'>
	.note-article.qk-border-b
		article
			.article-content.writer-preview(v-html='articlePart.content.replace(/font-size\:/gi,"")')
		section.other-article(v-if='!isSelf')
			.btn-appreciate
				img.appreciate.img-64(@click='toAppreciate',src='../../assets/btn-reward.svg')
			router-link.article-topic.qk-round-8(:style="{'backgroundImage':'url('+articlePart.topic.img+')'}",:to="{name:'specialIntr',query:{type:articlePart.topic._id,name:articlePart.topic.name}}")
				h4 文章收录于 {{'#'+articlePart.topic.name+'#'}} 专题
				p 查看更多类似文章
			.pv-article.ele-justify
				button.init-btn(@click='keep') {{articlePart.iskeep?'已收藏':'添加收藏'}}
				p {{articlePart.pv}} 浏览 | {{articlePart.keeps}} 收藏 | {{articlePart.reward}} 赞赏
			.copyright-article.ele-justify
				p &copy; 著作权归作者所有
				p 举报文章

		section.self-article.qk-border-t(v-if='isSelf')
			router-link.article-topic.qk-round-8(:style="{'backgroundImage':'url('+articlePart.topic.img+')'}",:to="{name:'specialIntr',query:{type:articlePart.topic._id,name:articlePart.topic.name}}",v-if='articlePart.topic')
				h4 文章收录于 {{'#'+articlePart.topic.name+'#'}} 专题
				p 查看更多类似文章
			router-link.submit-note(:to="{name:'submitNote',params:{pageId:noteId}}",v-if='!articlePart.iscommit')
				img(src='../../assets/rectangle-6.png')
			.pv-article.ele-justify
				p &copy; 著作权归作者所有
				p {{articlePart.pv}} 浏览 | {{articlePart.keeps}} 收藏 | {{articlePart.reward}} 赞赏
		.qk-detail-mask.qk-mask(v-if='showAppreciate')
		transition(name='appreciate-fade')
			appreciate-box(v-if='showAppreciate',@hideAppreciate='cancelAppreciate',:appreciateTitle='articlePart.title',:appreciatePerson='articlePart.headimgurl')

</template>

<style scoped lang='less'>
@white:#fff;
@black-a:rgba(0, 0, 0, 0.87);
@btn-border:#e6e6e6;
@collect-color:#ff2741;
@article-info-color:#999;
@topic-mask:rgba(255,255,255,.6);
@more:rgba(0, 0, 0, 0.54);
@keep:#ff5856;

	.note-article{
		padding:0 0 0.16rem 0;
		font-size:0.15rem;
		background:@white;
		h2{
			font-size:0.24rem;
			font-weight: bold;
			letter-spacing: 0.02rem;
			word-break: break-all;
		}

		h2,.info-note,.article-content,.article-info{
			padding-left:0.2rem;
			padding-right:0.2rem;
		}


		.info-note{
			/*margin:0.1rem 0;*/
			font-size:0.12rem;

			.tag{
				background:@black-a;
				height:0.2rem;
				line-height:0.2rem;
				padding:0 0.08rem;
				color:@white;
				border-radius:0.03rem;
				margin-right:0.12rem;
				max-width: 1.2rem;
			}

			.count-msg{
				color:@black-a;
				letter-spacing: 0.01rem;
				font-weight:500;
			}
		}

		.article-content{
			font-size:0.15rem;
			line-height:1.8;
			color:@black-a;
			margin-bottom: .18rem;
		}

		.self-article{
			margin-top: .3rem;
			padding-top: .3rem
		}

		.article-info{
			font-size:0.12rem;
			margin-top:0.2rem;
			color:@article-info-color;
		}
		
		/*赞赏按钮*/
		.btn-appreciate{
			text-align: center;
			margin-bottom:0.18rem;
		}

		/*文张收录*/
		.article-topic{
			margin:0 .2rem;
			height:.64rem;
			/*background: url('../../assets/center.jpg');*/
			background-position: center;
			background-repeat: no-repeat;
			box-shadow: inset 0 0 0 55rem @topic-mask;
			background-size: 100% 100%; 
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: .13rem;
			letter-spacing: .01rem;
				h4{
					color:@black-a;
					font-weight:500;
					margin-bottom: .04rem;
				};

				p{
					color:@more;
				}
		}

		/*文章一些收藏信息*/
		.pv-article{
			padding:0 .2rem;
			margin-top: .16rem;
			*{
				letter-spacing: 0.01rem;
			}
			button{
				background: @keep;
				color:@white;
				font-size: .12rem;
				padding:.02rem .04rem;
			}

			p{
				font-size: .12rem;
				color:@more;
			}
		}

		.submit-note{
			display: block;
			padding:0 .2rem;

			img{
				width:100%;
			}
		}
		
		/*版权信息等*/
		.copyright-article{
			margin-top: .1rem;
			font-size: .12rem;
			color:@more;
			padding:0 .2rem;

		}

		.qk-detail-mask{
			z-index: 2;
			position: fixed;
			left:0;
			top:0;
			width:100%;
			height:100%;
		}

		.appreciate-fade-enter-active, .appreciate-fade-leave-active {
  		  transition: all .45s cubic-bezier(0, 0.51, 0.48, 1.26);
  		}
		
  		.appreciate-fade-enter,.appreciate-fade-leave-active{
  		  /*opacity:0;*/
  		  transform:translateY(7rem);
  		}
	}
</style>

<script>
	import AppreciateBox from 'components/Appreciate'
	export default{
		props:['articlePart','isSelf'],
		data(){
			return {
				type:'',
				showAppreciate:false
			}
		},
		components:{
			AppreciateBox
		},
		computed:{
			sendData(){
				return{
					page_id:this.$route.params.noteId,
					type:this.type,
					user_id:this.$store.state.baseData.userInfo._id
				}
			},
			noteId(){
				return this.$route.params.noteId
			},
			keepState(){
				return this.articlePart.iskeep ? 'cancle' : 'confirm'
			}
		},
		methods:{
			
			keep(){		//收藏
				this.$store.dispatch('can_close_login',true);
				if(!this.$store.state.baseData.userInfo._id){
					this.$store.dispatch('judge_islogin',true);
					return false;
				}
				this.type = this.keepState;
				this.$http.post(`${this.$store.state.baseData.host}keep/page`,this.sendData,{"emulateJSON":true,"emulateHTTP":true})
					.then((res)=>{		//收藏成功
						if(res.data.code === 0){
							if(this.keepState === 'cancle'){
								this.$emit('aboutKeep',0)
							}else{
								this.$emit('aboutKeep',1)
							}
						}
					
					},(err)=>{		//收藏失败
					alert('服务器开小差啦')
					})
			},
			cancelAppreciate(){
				this.showAppreciate = false
			},
			toAppreciate(){
				this.showAppreciate = true
			}
		}
	}
</script>