<!-- 提现 -->
<template lang="jade">
	#withdrawals
		img.img-73(src='../assets/wallet.svg')
		p 我的赏金
		h1.withdrawals-money ￥{{userWallet.wallet.toFixed(2)}}
		button.init-btn(:disabled='userWallet.wallet==0') 提现
		a.qk-round-4 查看交易历史
		small.withdrawals-notice 提现时，味噌将抽取5%手续费
</template>

<style lang='less' scoped>
@notice:rgba(0,0,0,.38);
@withdrawals:#1AAD19;
@history:rgba(0, 0, 0, 0.12);
@white:#fff;

	#withdrawals{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding:1.17rem .16rem 0 .16rem;
		background: @white;
		height:100%;
		
		*{
			letter-spacing: .01rem;
		}

		img{
			margin-bottom: .16rem;
		}

		p{
			font-size: .15rem;
			
			margin-bottom: .04rem;
		}

		h1{
			font-size: .28rem;
			margin-bottom: .16rem;
		}

		button,a{
			width:100%;
			text-align: center;
			height:.38rem;
			line-height: .38rem;
			font-size: .16rem;
		}

		button{
			background: @withdrawals;
			color:@white;
		}

		a{
			margin: .16rem 0 .08rem;
			color:@withdrawals;
			border: solid 0.01rem @withdrawals;
		}

		small{
			color:@notice;
		}
	}
</style>

<script type="text/javascript">
	export default{
		data(){
			return{
				userWallet:{}
			}
		},
		beforeCreate(){
			this.$store.dispatch('can_close_login',false);
			if(!window.localStorage.qkT){
				this.$store.dispatch('judge_islogin',true);
				
				// this.$store.commit('SETCOMMITKEY','SETUSERCENTERINFO');
				return false;
			}

			let token = window.localStorage.qkT?window.localStorage.qkT:'';

			this.$http.post(`${this.$store.state.baseData.host}users/wallet/index`,{
				token:token
			},{"emulateJSON":true,"emulateHTTP":true})
			.then((data)=>{
				let formatData = data.data;
				if(formatData.code==0){
					this.userWallet = formatData.msg;
				}else if(formatData.code == 4002){
					this.$store.dispatch('judge_islogin',true);
				}
			},err=>{
				alert('服务器开小差啦')
			})
		},
		mounted(){
			
		}
	
	}
</script>