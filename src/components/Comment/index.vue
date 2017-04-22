<!-- 评论 -->
<template lang='jade'>
	.comment-temp.qk-mask(@touchmove.self='forbid($event)',@click.self='closeComment')
		.comment-wrapper
			textarea(autofocus,:placeholder="beReplyName",rows='3',v-model='content')
			p
				button.init-btn(@click='publishComment') 发布评论
</template>

<style lang='less' scoped>
@white:#fff;
@btn:#49be38;

	.comment-temp{
		position: fixed;
		top:0;
		right:0;
		bottom:0;
		left:0;
		z-index:19;
		
		

		.comment-wrapper{
			position: fixed;
			bottom:0;
			left:0;
			width:100%;
			padding:.16rem;
			background: @white;
		}

		textarea{
			width:100%;
			padding:.1rem;
			font-size: .14rem;
			border:0.01rem solid #e0e0e0;
			letter-spacing: .01rem;
		}

		.to-reply{
			padding:0 .04rem;
			letter-spacing: 0.01rem;
		}

		p{
			text-align: right;
			margin-top: .1rem;
			button{
				font-size: .12rem;
				padding:0.04rem 0.06rem;
				border:0.01rem solid @btn;
				color:@btn;
			}
		}
	}
</style>

<script type="text/javascript">
	export default{
		props:['beReplyName'],
		data(){
			return {
				content:''
			}
		},
		computed:{
			sendData(){
				if(this.$store.state.commentConfig.isReply){
					return {
						page_id:this.$route.params.noteId,
						user_id:this.$store.state.baseData.userInfo._id,
						content:this.content,
						comment_id:this.$store.state.commentConfig.activeCommentId
					}
				}else{
					return {
						page_id:this.$route.params.noteId,
						user_id:this.$store.state.baseData.userInfo._id,
						content:this.content
					}
				}
			},
			url(){
				return this.$store.state.commentConfig.commentBelongUrl
			}
		},
		methods:{
			forbid(ev){
				ev.preventDefault();
			},
			closeComment(){
				this.$emit('closeComment')
			},
			publishComment(){
				if(this.content.trim() == ''){		//判断是否为空
					alert('说点什么吧');
					return false;
				}
				// 
				this.$http.post(`${this.$store.state.baseData.host}${this.url}`,this.sendData,{"emulateJSON":true,"emulateHTTP":true})
				.then((data)=>{
					let formatData = data.data;
					if(formatData.code === 0){
						this.closeComment();
						window.location.reload();
					}
				})

			}

		}
	}
</script>