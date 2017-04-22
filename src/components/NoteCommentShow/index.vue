<template lang='jade'>
	.note-comment
		.comment-header.ele-justify.qk-border-b(@click='showComment(1)') 
			img.qk-round-4.img-32.margin-right-12(:src='myMsg.headimgurl')
			input.qk-round-4(placeholder='发表评论…',readonly)
		.comment-list
			.comment-item.qk-border-b(v-for='item in commentList')
				.commenter-msg.ele-justify
					img.qk-round-4.img-32.margin-right-12(:src='item.commenter.headimgurl')
					.commenter-info 
						p.nickname.single-ellipsis {{item.commenter.username.split('')[0]+'***'+item.commenter.username.split('')[item.commenter.username.length-1]}}
						time {{item.time}}
				.comment-content(@click='showComment(2,item)') {{item.content}}
				.comment-reply-list
					ul 
						li.t-border(v-for='reply in item.reply',@click='showComment(3,reply)')
							| <span class="reply-name">{{reply.commenter.username.split('')[0]+'***'+reply.commenter.username.split('')[reply.commenter.username.length-1]+':'}}</span>
							| <span class="beReply">{{'@'+reply.to.username.split('')[0]+'***'+reply.to.username.split('')[reply.to.username.length-1]}}</span>
							| {{reply.content}}
			p.loader-end -- {{loaderWords}} --
		Comment(:beReplyName='selectName',v-if='commntActive',@closeComment='hideComment')

</template>


<style scoped lang='less'>
@white:#fff;
@zan-color:#ddd;
@black-a:rgba(0, 0, 0, 0.87);
@name-color:#28a1c5;
/*@end-color:#e0e0e0;*/
@end-bg:#f8f8f8;
	.comment-header{
		padding:0.1rem .16rem;
		font-size: .12rem;
		    align-items: stretch;

		input{
			background: @white;
			padding:0rem 0.08rem;
			flex:auto;
			border: solid 0.01rem rgba(0, 0, 0, 0.06);
			font-size: .12rem;

		};
	}
	
	.note-comment{
		/*background: @white;*/
		margin-top: .12rem;
	}

	.comment-item{
		padding:0.16rem;
		
		.commenter-msg{
			justify-content: flex-start;
			
		}

		.nickname{
			margin-bottom: .02rem;
			letter-spacing: .01rem;
			font-size: .13rem;
			max-width: 2.5rem;
		}

		.comment-content{
			font-size: .14rem;
			letter-spacing: .01rem;
			padding: .08rem 0;
		}
	}

	.comment-reply-list{
		li{
			padding:.08rem 0;
			border-top-style: dashed;
			font-size: .13rem;

			&:last-child{
				padding-bottom:0;
			}

			*{
				letter-spacing: 0.01rem;
			}
			span{
				color:@name-color;
				font-size: 0.13rem;
				    vertical-align: baseline;
			}
		}
	}


</style>

<script>
	import Comment from 'components/Comment';

	export default{
		props:['commentLength'],
		components:{
			Comment
		},
		data(){
			return {
				commntActive:false,
				selectName:'',
				// nowComment:[]
			}
		},
		computed:{
			dataOver(){		//数据是否加载完
				return this.$store.state.scrollLoadList.loadingOver
			},
			loaderWords(){		//底部显示的提示文字
				if(this.commentList.length<1){
					return '暂无评论'
				}
				return this.dataOver?'end':'loading'
			},
			commentList(){		//当前文章的列表
				return this.$store.state.scrollLoadList.LoadingList
			},
			myMsg(){
				return this.$store.state.baseData.userInfo
			}
		},
		methods:{
			
			// hideSheet(){
			// 	this.$store.commit('CLEARACTIVE')
			// 	this.maskActive = false;
			// },
			showComment(type,reply){
				// 判断是否登入
				this.$store.dispatch('can_close_login',true);
				if(!this.$store.state.baseData.userInfo._id){
					this.$store.dispatch('judge_islogin',true);
					return false;
				}

				this.commntActive = true;
				if(type==1){
					this.$store.dispatch('judge_reply',false);
					this.selectName = ''
				}else{
					this.$store.dispatch('active_comment_id',reply._id);
					this.$store.dispatch('judge_reply',true);
					this.selectName = '@'+reply.commenter.username
				}
			},
			hideComment(){
				this.commntActive = false
			}
		}
	}
</script>