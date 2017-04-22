<template lang='jade'>
	#video-detail
		video(:src='videoDetailData.url',  controls='controls', x-webkit-airplay="allow",webkit-playsinline="true",:poster='videoDetailData.url+"?vframe/jpg/offset/1/w/"+winW+"/h/"+videoH+""')
		h2.article-title {{videoDetailData.name}}
		p.video-describe {{videoDetailData.describe}}
		section.other-article
			.btn-appreciate
				img.appreciate.img-64(@click='toAppreciate',src='../assets/btn-reward.svg')
			.pv-article.ele-justify
				p &copy; 著作权归作者所有
				p 1 浏览 | 3 赞赏
		note-comment-show.detail-comment(:commentLength='videoDetailData.commentLength',:auther='videoDetailData.poster')
		.qk-detail-mask.qk-mask(v-if='showAppreciate')
		transition(name='appreciate-fade')
			appreciate-box(v-if='showAppreciate',@hideAppreciate='cancelAppreciate',:appreciateTitle='videoDetailData.name',:appreciatePerson='videoDetailData.poster.headimgurl')
		
</template>	

<style scoped lang='less'>
@comment-words:#999;
@btn-color:rgba(0, 0, 0, 0.54);
@comment-bg:#f5f5f5;
@white:#fff;
@delete-color:#ff2d2d;
@submit:#e78170;
@more:rgba(0, 0, 0, 0.54);
@keep:#ff5856;
@article-info-color:#999;
@topic-mask:rgba(255,255,255,.6);
@black-a:rgba(0, 0, 0, 0.87);
	#video-detail{
		/*padding-bottom: .8rem;*/
		/*background: @white;*/
	}
	video{
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
	}
	
	.article-title,.video-describe,.video-apprecaite{
		background: @white;
	}

	.video-describe{
		padding:0 .16rem .08rem;
		font-size: .14rem;
		
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
		padding: 0.1rem .16rem;
		button{
			padding-left:0;
			padding-right: 0
		}
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
	import NoteArticle from 'components/NoteArticle';
	import NoteCommentShow from 'components/NoteCommentShow';
	// import RecommendGoods from 'components/RecommendGoods';
	import AppreciateBox from 'components/Appreciate'

	export default{
		data(){
			return{
				videoDetailData:{},
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
			// ActionSheet,
			AppreciateBox
		},
		
		computed:{
			videoId(){
				return this.$route.params.videoId
			},
			token(){
				return window.localStorage.qkT?window.localStorage.qkT:'';
			}
			
		},
		methods:{

			operateKeep(type){		//收藏
				if(type === 1){
					this.videoDetailData.main.iskeep = true;
				}else{
					this.videoDetailData.main.iskeep = false;
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
					url:'video/detail/comments',
					el:document.querySelector('.note-comment .loader-end'),
					scale:.3
				})
			},
			deleteNote(){	//删除笔记
				let t = confirm('主人,你真不要我了吗><');
				if(t){
					this.$http.post(`${this.$store.state.baseData.host}delete/page`,{
						video_id:this.videoId,
						user_id:this.$store.aboutNote.state.userInfo._id
					},{"emulateJSON":true,"emulateHTTP":true})
					.then((data)=>{
						let formatData = data.data;
						if(formatData.code === 0){
							this.$router.replace('/')
						}
					})
				}
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
			//保存视频的id
			
			this.$store.dispatch('active_detail_id',this.videoId);
			this.$http.post(`${this.$store.state.baseData.host}discovery/video/detail`,{
				video_id:this.videoId,
				token:this.token
			},{"emulateJSON":true,"emulateHTTP":true})
			.then((data)=>{
				let formatData = data.data;
				if(formatData.code==0){
					this.videoDetailData = formatData.msg;
					if(formatData.user){		//一开始就判断是不是有用户信息，如果有，保存
						this.$store.dispatch('set_userinfo',formatData.user);
					}
				}
			})

			//重置数据
			this.$store.dispatch('reset_list');
			this.$store.dispatch('add_extra_data',{
					video_id:this.videoId
			});

			this.$store.dispatch('loadData',{
				listUrl:'video/detail/comments'
			})

			window.addEventListener('scroll',this.addScroll,false);
		},
		beforeDestroy(){
			this.$store.dispatch('clear_userinfo');
			window.removeEventListener('scroll',this.addScroll,false);
		}
	}
</script>