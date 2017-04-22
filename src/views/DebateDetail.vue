<!-- 进入树洞列表的详情 -->
<template lang="jade">
	#debate-detail
		user-info-header(:noterInfo='debateDesc.leaver',:isSelf='debateDesc.isself',@aboutFocus='operateFocus')
		img.debate-img(:src='debateDesc.img')
		h2.article-title {{debateDesc.content}}
		section.other-article
			.btn-appreciate
				img.appreciate.img-64(@click='toAppreciate',src='../assets/btn-reward.svg')
			.pv-article.ele-justify
				p &copy; 著作权归作者所有
				p 1 浏览 | 3 赞赏
				
		note-comment-show.detail-comment(:commentLength='debatelData.commentLength',:auther='debateDesc.leaver')
		.qk-detail-mask.qk-mask(v-if='showAppreciate')
		transition(name='appreciate-fade')
			appreciate-box(v-if='showAppreciate',@hideAppreciate='cancelAppreciate',:appreciateTitle='debateDesc.content',:appreciatePerson='debateDesc.leaver.headimgurl')
		
</template>	

<style scoped lang='less'>
@comment-words:#999;
@btn-color:rgba(0, 0, 0, 0.54);
@comment-bg:#f5f5f5;
@white:#fff;
@delete-color:#ff2d2d;
@more:rgba(0, 0, 0, 0.54);

	#debate-detail{
		padding-bottom: .8rem;
	}
	.debate-img{
		width: 100%;
	}
	.my-comment{
		padding:0.1rem 0.16rem;
		display: flex;
		img{
			width:0.32rem;
			height:0.32rem;
			margin-right:0.12rem;
			border-radius:0.03rem;
		}

		.to-reply{
			flex:auto;
			padding-left:0.12rem;
			background:@white;
			color:@btn-color;
			text-align:left;
			font-size:0.12rem;
		}
	}

	h2{
		font-size:0.16rem;
		font-weight: bold;
		letter-spacing: 0.02rem;
		word-break: break-all;
		padding:.16rem;
		padding-bottom:.12rem;
		background:@white;
	}


		.self-article{
			margin-top: .3rem;
			padding-top: .3rem
		}

		.other-article{
			background: @white;
			padding-bottom: .16rem;
			padding-top: .2rem;
		}


		
		/*赞赏按钮*/
		.btn-appreciate{
			text-align: center;
			margin-bottom:0.18rem;
		}

		

		/*文章一些收藏信息*/
		.pv-article{
			padding:0 .2rem;
			margin-top: .16rem;
			/*justify-content: flex-end;*/
			*{
				letter-spacing: 0.01rem;
			}

			p{
				font-size: .12rem;
				color:@more;
			}
		}

		
		/*版权信息等*/
		.copyright-article{
			margin-top: .1rem;
			font-size: .12rem;
			color:@more;
			padding:0 .2rem;

		}


	.delete-note{
		color:@delete-color;
		letter-spacing: 0.01rem;
		margin-left:0.08rem;
		font-weight: 500;
		cursor: pointer;
		font-size:0.12rem;
	}


	

	.detail-comment{
		margin-bottom:0.7rem;
	}

	.video-apprecaite{
		padding: 0 .16rem;

		button{
			padding-left:0;
			padding-right: 0
		}
	}

	.debate-apprecaite{
		background:@white;
		padding-bottom: .1rem;
		padding-left: .1rem;
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


</style>

<script>
	import UserInfoHeader from 'components/UserInfoHeader';
	import NoteArticle from 'components/NoteArticle';
	import NoteCommentShow from 'components/NoteCommentShow';
	import AppreciateBox from 'components/Appreciate'

	export default{
		data(){
			return{
				debatelData:{},
				maskActive:false,
				isDetail:true,
				detailScroll:0,
				winW:'',
				videoH:'',
				showAppreciate:false
			}
		},
		components:{
			NoteArticle,
			NoteCommentShow,
			// RecommendGoods,
			UserInfoHeader,
			AppreciateBox
		},
		
		computed:{
			debateDetailId(){
				return this.$route.params.debateDetailId
			},
			token(){
				return window.localStorage.qkT?window.localStorage.qkT:'';
			},
			debateDesc(){
				return this.$store.state.scrollLoadList.otherMsg
			}
			
		},
		methods:{

			operateKeep(type){		//收藏
				if(type === 1){
					this.debatelData.main.iskeep = true;
				}else{
					this.debatelData.main.iskeep = false;
				}
			},

			operateFocus(type){		//关注
				if(type === 1){
					this.noteDetailData.poster.isfocus = true;
				}else{
					this.noteDetailData.poster.isfocus = false;
				}
			},


			showMask(){		//显示遮罩
				this.maskActive = true;
			},

			hideSheet(){		//隐藏遮罩
				this.maskActive = false;
			},
			addScroll(){		//添加滚动事件
				this.$store.dispatch('scrollLoader',{
					url:'discovery/debate/leavemsg',
					el:document.querySelector('.note-comment .loader-end'),
					scale:.3
				})
			},
			cancelAppreciate(){
				this.showAppreciate = false
			},
			toAppreciate(){
				this.showAppreciate = true
			}

		},
		mounted(){
			let htmlFont = parseFloat(window.document.documentElement.style.fontSize);	//获取根字体大小
			this.winW = window.innerWidth;
			this.videoH = parseInt(1.5 * htmlFont);
			//设置要保存的mutations
			// this.$store.commit('SETCOMMITKEY','SETDETAILUSERINFO');

			//设置comment的url
			this.$store.dispatch('comment_belong','discovery/debate/leavemsg/comment')

			//保存视频的id
			this.$store.dispatch('active_detail_id',this.debateDetailId);
			

			//重置数据
			this.$store.dispatch('reset_list');
			this.$store.dispatch('add_extra_data',{
				leavemsg_id:this.debateDetailId,
				token:this.token
			});

			this.$store.dispatch('loadData',{
				listUrl:'discovery/debate/leavemsg'
			})

			window.addEventListener('scroll',this.addScroll,false);
		},
		beforeDestroy(){
			this.$store.dispatch('clear_userinfo');
			window.removeEventListener('scroll',this.addScroll,false);
		}
	}
</script>