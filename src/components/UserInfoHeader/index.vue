<template lang='jade'>
	#user-info-header.ele-justify
		.left-part(@click='goCenter(noterInfo._id)')
			img.qk-round.margin-right-12(:src='noterInfo.headimgurl')
			p
				span.single-ellipsis {{noterInfo.username}}
				time {{noterInfo.time}}
		button.init-btn(:class="{'isFocus':noterInfo.isfocus}",@click='focus',v-if='!isSelf') {{noterInfo.isfocus?'已关注':'+ 关注'}}
</template>

<style lang='less' scoped>
@white:#fff;
@focus-color:#fdcd38;
@words:#ddd;
@before-color:rgba(0, 0, 0, 0.12);
@border:#D9D9D9;

	#user-info-header{
		padding:0.16rem 0.16rem .1rem .16rem;
		background:@white;
		font-size:0.15rem;
		width:100%;
		.left-part{
			display: flex;
			align-items: center;
		}
		span{
			letter-spacing: 0.01rem;
			max-width: 2rem;
		}

		p{
			display: flex;
			flex-direction: column;
		}

		img{
			width:0.35rem;
			height:0.35rem;
		}

		button{
			padding:0.04rem 0.08rem;
			background:@focus-color;
			color:@white;
			font-size:0.15rem;
			/*border:0.01rem solid @border;*/
			&.isFocus{
				background:transparent;
				border:0.01rem solid @words;
				color:@words;
			}
		}
	}
</style>

<script>
	export default{
		props:['noterInfo','isSelf'],
		computed:{
			sendData(){
				return {
					focuser_id:this.noterInfo._id,
					type:this.type,
					user_id:this.$store.state.baseData.userInfo._id
				}
			},
			type(){
				return this.noterInfo.isfocus ? 'cancle' : 'confirm'
			}
		},
		methods:{
			focus(){
				// 判断是否登入
				this.$store.dispatch('can_close_login',true);
				if(!this.$store.state.baseData.userInfo._id){
					this.$store.dispatch('judge_islogin',true);
					return false;
				}
				this.$http.post(`${this.$store.state.baseData.host}focus/user`,this.sendData,{"emulateJSON":true,"emulateHTTP":true})
					.then((res)=>{		//关注成功
						if(res.data.code === 0){
							if(this.type === 'cancle'){
								this.$emit('aboutFocus',0)
							}else{
								this.$emit('aboutFocus',1)
							}
						}
						
					},(err)=>{		//关注失败
						alert('服务器开小差啦')
					})
			},
			goCenter(focuserId){
            	this.$router.push({name:'personalHomepage',params:{userId:focuserId}})
			},
		}
	}
</script>