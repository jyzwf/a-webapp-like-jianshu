<!-- 消息提示列表 -->
<template lang='jade'>
	.msg-list
		header.v-h-center.qk-border-b
			span.margin-right-12(:class="{active:!all}",@click='toggleMsgState(false)') 未读
			span(:class="{active:all}",@click='toggleMsgState(true)' ) 全部
		.blank-div
		ul
			li(v-for='msg in msgList',@click='watchMsg(msg)')
				.detail-msg(v-if='msg.type!="follow"')
					img.icon-msg.qk-round(v-lazy='msg.who.headimgurl')
					.msg-snapshot.qk-border-b
						.msg-title <b>{{msg.who.username}}</b> {{msgType[msg.type]}}你的{{mainType[msg.from]}} <b>{{msg.name}}</b>
						time {{msg.time}}

				.detail-msg(v-if='msg.type == "follow"')
					img.icon-msg.qk-round(:src='msg.who.headimgurl')
					.msg-snapshot.qk-border-b
						.msg-title <b>{{msg.who.username}}</b>开始关注了你
						time {{msg.time}}
		p.loader-end {{'-- ' + loaderWords+' -- '}}

</template>

<style lang='less' scoped>
@header-color:rgba(255, 255, 255, 0.9);
@nav-color:rgba(0, 0, 0, 0.87);
@white:#fff;
@active-color:#fdcd38;
@disabled:rgba(0, 0, 0, 0.54);

	header{
		background:@header-color;
		height:0.48rem;
		padding:0 0.16rem;
		position: fixed;
		left:0;
		top:0;
		width:100%;
		
		span{
			font-size: .16rem;
			padding:0.04rem 0.08rem;
			border-bottom: 0.02rem solid transparent;
			color:@disabled;
			&.active{
				color:@nav-color;
				border-bottom-color:@active-color;
			}
		}
	}

	.blank-div{
		height:.5rem;
	}
	
	.no-msg{
		position: fixed;
	}
	
	ul{
		background: @white;
		padding-left: 0.16rem;
	}
	li{
		padding:.16rem 0.16rem .16rem 0;
	}
	.detail-msg{
		display: flex;
		align-items: flex-start;


		.icon-msg{
			margin-right: 0.16rem;
			width:0.4rem;
			min-width:0.4rem;
			height:0.4rem;
			object-fit: cover
		}

		.msg-title{
			font-size: 0.15rem;
			font-weight: 500;
			letter-spacing: 0.02rem;
			margin-bottom: 0.1rem;
		}
		
		.msg-snapshot{
			flex:auto;
			display: flex;
			flex-direction: column;
			padding-bottom: 0.1rem;
			padding-right: 0.16rem;
			/*border-bottom: 0.01rem solid rgba(0, 0, 0, 0.08)*/
		}

		.article-snap{
			font-size: 0.14rem;
		}

		.article-msg{
			display: flex;
			align-items: center;
			color:rgba(0, 0, 0, 0.54);
			font-size:0.12rem;
			margin-bottom: 0.11rem; 
			img{
				width:0.64rem;
				min-width:0.64rem;
				height:0.64rem;
				border-radius: 0.08rem;
				margin-right: 0.1rem;
				object-fit: cover
			}
		}

		time{
			font-size: .13rem;
		}
	}



</style>

<script>


	export default{
		data(){
			return {
				msgList:[],
				all:false,
				flag:false,
				msgType:{
					'comment':'评论了',
					'keep':'收藏了',
					'follow':'关注了',
					'reply':'回复了',
					'bonus':'打赏了'
				},
				mainType:{
					leavemsg:'留言',
					page:'文章'
				}
			}
		},
		computed:{
			dataOver(){		//数据是否加载完
				return this.$store.state.scrollLoadList.loadingOver
			},
			loaderWords(){		//底部显示的提示文字
				return this.dataOver?'end':'loading'
			},
			msgList(){		//当前文章的列表
				return this.$store.state.scrollLoadList.LoadingList
			},
			token(){
				return window.localStorage.qkT?window.localStorage.qkT:'';
			},
			msgUrl(){
				return this.all?'users/msg/list':'users/msg/nocheck'
			}
		},
		methods:{
		
			addScroll(){
				this.$store.dispatch('scrollLoader',{
					url:this.msgUrl,
					el:document.querySelector('.msg-list .loader-end'),
					scale:.3
				})
			},
			toggleMsgState(state){
				if(state==true){
					this.all = true
				}else{
					this.all = false
				}

				this.initData();
			},
			watchMsg(msg){
				if(this.flag){
					return false;
				}

				this.flag = true;
				this.$http.post(`${this.$store.state.baseData.host}users/msg/check`,{
					msg_id:msg.msg_id
				},{"emulateJSON":true,"emulateHTTP":true})
				.then(data=>{
					let formatData = data.data;
					if(formatData.code === 0){
						if(msg.type=='follow'){
							this.$router.push({name:'personalHomepage',params:{userId:msg.who._id}})
						}else if(msg.from=='page'){
							this.$router.push({name:'noteDetail',params:{noteId:msg.id}})
						}else if(msg.from=='leavepage'){
							this.$router.push({name:'debateDetail',params:{debateDetailId:msg.id}})
						}
					}else{
						alert('服务器开小差啦')
					}

					msg.flag = false;
				},err=>{
					alert('服务器开小差啦');
					msg.flag = false;
				})
			},
			initData(){

				this.$store.dispatch('reset_list');
				this.$store.dispatch('add_extra_data',{
					token:this.token
				});
			
   				this.$store.dispatch('loadData',{
					listUrl:this.msgUrl
				})
            	window.addEventListener('scroll',this.addScroll,false);
			}
		},
		mounted(){
			this.initData();
		},
		beforeDestroy(){
			this.$store.dispatch('clear_userinfo');
			window.removeEventListener('scroll',this.addScroll,false);
		}
	}
</script>