<template lang='jade'>
	#note-detail
		<!-- 顶部导航 -->
		.detail-nav.ele-justify.qk-border-b(@click.self='toggleNav(0)')
			img.img-35(src='../assets/logo.png',@click='toggleNav(1)')
			img.img-32(src='../assets/ic_more_vert.svg')
			nav(v-show='showDetailNav')
				li.qk-border-b
					router-link(:to="{name:'index'}" exact)
						img.margin-right-17.img-20(src='../assets/tab-articles.svg')
						span 原创
				li.qk-border-b
					router-link(:to="{name:'find'}" exact)
						img.margin-right-17.img-20(src='../assets/tab-discover.svg')
						span 发现
				li.qk-border-b
					router-link(:to="{name:'writenote'}" exact)
						img.margin-right-17.img-20(src='../assets/tab-creative-work.svg')
						span 创作
				li
					router-link(:to="{name:'mycenter'}" exact)
						img.margin-right-17.img-20(src='../assets/tab-profile.svg')
						span 我的
		section.detail-container(@click='toggleNav(0)')
			user-info-header(:noterInfo='noteDetailData.poster',:isSelf='noteDetailData._isself',@aboutFocus='operateFocus')

			h2.article-title(v-title="noteDetailData.title") {{noteDetailData.title}}
		
			note-article(:articlePart='noteDetailData.main',@aboutKeep='operateKeep',:isSelf='noteDetailData._isself')
				span.delete-note(slot='delete',v-if='noteDetailData._isself',@click='deleteNote') 删除笔记
				router-link.submit-note(slot='submitNote',v-if='noteDetailData._isself',:to="{name:'submitNote',params:{pageId:noteId}}") 投稿
			note-comment-show.detail-comment(:commentLength='noteDetailData.commentLength',:auther='noteDetailData.poster')


</template>	

<style scoped lang='less'>
@comment-words:#999;
@btn-color:rgba(0, 0, 0, 0.54);
@comment-bg:#f5f5f5;
@white:#fff;
@delete-color:#ff2d2d;
@black-87:rgba(0,0,0,.87);
@submit:#e78170;
@white-90:rgba(255,255,255,.9);

	.detail-nav{
		position: fixed;
		height:.48rem;
		width:100%;
		padding:0 .2rem 0 .16rem;
		background: @white-90;
		z-index: 1;

		/*&>img:first-child{
			height:.47rem
		};*/

		nav{
			position: absolute;
			top:.48rem;
			left:0;
			z-index: 1;
			background: @white;
				
			
			a{
				display: block;
				padding:.13rem;
				width:1.6rem;
				font-size: .16rem;
				color:@black-87;
				font-weight: 500;
			}
		}
	}
	#note-detail{
		margin-bottom: .5rem;
		user-select:none;
		/*background: @white;*/
	}

	.detail-container{
		padding-top: .48rem;
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
		font-size:0.24rem;
		font-weight: bold;
		letter-spacing: 0.02rem;
		word-break: break-all;
		padding:.12rem .2rem;
		/*padding-bottom:.12rem;*/
		background:@white;
	}


	.delete-note,submit-note{
		color:@delete-color;
		letter-spacing: 0.01rem;
		margin-left:0.08rem;
		font-weight: 500;
		cursor: pointer;
		font-size:0.12rem;
	}

	.submit-note{
		color:@submit;
	}


	.watch-all{
		padding:0.1rem;
		text-align:center;
		display: block;
		color:@comment-words;
		margin-bottom:0.15rem;
		font-size:0.14rem;
	}

	.detail-comment{
		margin-bottom:0.7rem;
	}


</style>

<script>
	import UserInfoHeader from 'components/UserInfoHeader';
	import NoteArticle from 'components/NoteArticle';
	import NoteCommentShow from 'components/NoteCommentShow';
	export default{
		data(){
			return{
				noteDetailData:{},
				maskActive:false,
				isDetail:true,
				detailScroll:0,
				openShare:false,
				s:0,
				showDetailNav:false
			}
		},
		components:{
			UserInfoHeader,
			NoteArticle,
			NoteCommentShow
		},
		
		computed:{
			noteId(){
				return this.$route.params.noteId
			},
			token(){
				return window.localStorage.qkT?window.localStorage.qkT:'';
			},
			
		},
		created(){
			this.s = this.$store.state.baseData.scrollT;
		},
		methods:{
			toggleNav(num){		//显示或隐藏顶部导航
				num == 1?this.showDetailNav=true:this.showDetailNav=false
			},
			operateFocus(type){		//关注
				if(type === 1){
					this.noteDetailData.poster.isfocus = true;
				}else{
					this.noteDetailData.poster.isfocus = false;
				}
			},

			operateKeep(type){		//收藏
				if(type === 1){
					this.noteDetailData.main.iskeep = true;
				}else{
					this.noteDetailData.main.iskeep = false;
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
					url:'page/detail/comments',
					el:document.querySelector('.note-comment .loader-end'),
					scale:.3
				})
			},
			recordScroll(){
				let scrollT = document.documentElement.scrollTop || document.body.scrollTop;
				this.$store.dispatch('set_scrollT',scrollT)
			},
			deleteNote(){	//删除笔记
				let t = confirm('主人,你真不要我了吗><');
				if(t){
					this.$http.post(`${this.$store.state.baseData.host}delete/page`,{
						page_id:this.noteId,
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



		},
		mounted(){

			document.querySelector('#note-detail').style.minHeight = window.innerHeight+'px';

			//设置要保存的mutations
			// this.$store.commit('SETCOMMITKEY','SETDETAILUSERINFO');


			//设置comment的url
			this.$store.dispatch('comment_belong','page/comment')

			//保存文章的id
			this.$store.dispatch('active_detail_id',this.noteId);

			this.$http.post(`${this.$store.state.baseData.host}homepage/detail`,{
				page_id:this.noteId,
				token:this.token
			},{"emulateJSON":true,"emulateHTTP":true})
			.then((data)=>{
				let formatData = data.data;
				if(formatData.code==0){
					this.noteDetailData = formatData.msg.page;
					this.$nextTick(()=>{
						document.documentElement.scrollTop = this.s;
					})
					
					if(formatData.msg.user){		//一开始就判断是不是有用户信息，如果有，保存
						// this.$store.commit('SETDETAILUSERINFO',formatData.msg.user);
						this.$store.dispatch('set_userinfo',formatData.msg.user);

					}
				}
			})

			//重置数据
			this.$store.dispatch('reset_list');
			this.$store.dispatch('add_extra_data',{
				page_id:this.noteId
			});

			this.$store.dispatch('loadData',{
				listUrl:'page/detail/comments'
			})


			window.addEventListener('scroll',this.addScroll,false);
			window.addEventListener('scroll',this.recordScroll,false);
		},



		beforeDestroy(){
			this.$store.dispatch('clear_userinfo');
			var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
			
			window.removeEventListener('scroll',this.addScroll,false);
			window.removeEventListener('scroll',this.recordScroll,false);
		}
	}
</script>