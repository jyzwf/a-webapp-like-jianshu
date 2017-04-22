<template lang='jade'>
	.comment-action
		.comment-header.ele-justify
			span.reply-words(v-if='!isReply') 评论笔记
			span.reply-words(v-if='isReply') 回复评论
			span.publish(@click='publishComment') 发布
		.reply-textarea
			.reply-sb(v-if='isReply') {{'@'+this.$store.state.aboutNote.activeComment.nickname}}
			textarea.init-textarea(placeholder='请输入评论内容...',autofocus,v-model='content')
</template>

<style lang='less' scoped>
@white:#fff;
@black-a:rgba(0,0,0,.87);
@black-border:rgba(0,0,0,.12);
@replysb-color:#e31936;

	.comment-header{
		height:0.48rem;
		padding:0 0.12rem 0 0.16rem;
		border-bottom:0.01rem solid @black-border;
		.reply-words{
			font-size:0.18rem;
			letter-spacing: 0.02rem;
		}
	}

	.publish{
		padding:0.06rem .16rem;
		font-size:0.14rem;
		border-radius: 0.2rem;
		background:@black-a;
		color:@white;
		cursor: pointer;
	}

	.reply-sb{
			color:@replysb-color;
			font-size:0.15rem;
			margin-bottom:0.1rem;
		}

	.reply-textarea{
		padding:0.16rem 0.2rem;
		background:@white;
	}
</style>

<script>
	// import CommonHeader from 'components/CommonHeader';
	import { mapState } from 'vuex';
	export default{
		data(){
			return {
					content:''
			}
		},
		components:{
			// CommonHeader
		},
		computed:{
			sendData(){

				if(this.isReply){
					return {
						page_id:this.$store.state.aboutNote.activeNoteId,
						user_id:this.$store.state.baseConfig.userInfo._id,
						content:this.content,
						comment_id:this.$store.state.aboutNote.activeComment.commentId
					}
				}else{
					return {
						page_id:this.$store.state.aboutNote.activeNoteId,
						user_id:this.$store.state.baseConfig.userInfo._id,
						content:this.content
					}
				}
				
			},
			...mapState({
				isReply(){
					return this.$store.state.aboutNote.isReply
				}
			})
		},
		methods:{
			publishComment(){
				if(this.content.trim() == ''){		//判断是否为空
					alert('说点什么吧');
					return false;
				}
				
				this.$http.post(`${this.$store.state.baseData.host}page/comment`,this.sendData,{"emulateJSON":true,"emulateHTTP":true})
				.then((data)=>{
					let formatData = data.data;
					if(formatData.code === 0){
						this.$router.push('/note-detail/'+this.$store.state.aboutNote.activeNoteId)
					}
				})

			}
		}
	}
</script>