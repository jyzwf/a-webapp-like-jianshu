<!-- 别人个人主页的头 -->
<template lang='jade'>
	.user-center-header
		.base-source
			router-link.qk-round-4(:to="{name:'editSelf'}",v-if='userInfo.isSelf')
				img.img-14.img-margin-right(src='../../assets/edit-profile.svg')
				span 编辑信息
			img(src='../../assets/center.jpg')
			.source-card.ele-justify.qk-round-4
				img.img-4.qk-round.margin-right-8(:src='userInfo.headimgurl')
				section.source-data.ele-justify
					div
						span.nickname {{userInfo.name}}
						span.qk-round-4(v-if='userInfo.rank') {{userInfo.rank}}
					div
						ul
							li
								p {{userInfo.follownum}}
								p 粉丝
							li
								p {{userInfo.pv}}
								p 访客
		.source-self-intr.qk-round-4.ele-justify(v-if='!userInfo.isSelf')
			p
				img.margin-right-8.img-24(src='../../assets/tips.svg')
				span 及时查看新发布的文章, 点击关注他
			span.focus.qk-round-4 关注
		.blank-div(v-if='userInfo.isSelf')
		




</template>

<style lang='less' scoped>
@white:#fff;
@line-color:rgba(0, 0, 0, 0.12);
@focus-color:#fdcd38;
@self-color:#ff5856;
@edit-color:rgba(0, 0, 0, 0.54);
@border:rgba(0, 0, 0, 0.08);
	
	.base-source{
		position: relative;
		width: 100%;
		&>img{
			width:100%;
			height:1.44rem;
		}
	}

	a{
		position: absolute;
		display: flex;
		align-items: center;
		right:.16rem;
		top:.16rem;
		z-index: 100;
		background: @white;
		height:.3rem;
		padding:0 .08rem;
		color:@edit-color;

		span{
			display: inline;
		}
	}

	.source-card{
		justify-content: flex-start;
		position: absolute;
		left:.16rem;
		right:.16rem;
		bottom:-.35rem;
		background: @white;
		padding:.12rem 0 .12rem .12rem;
		border:0.01rem solid @border;

	}

	.source-data{
		flex:auto;
		div:last-child{
			display: flex;
			flex-direction: column;
		}

		&>div:first-child{
			span{
				font-size: 0.09rem;
			}
			span:first-child{
				font-size:0.18rem;
				display: block;
				margin-bottom: 0.04rem;
				font-weight: 500
			};

			span:last-child:not(.nickname){
				border:0.01rem solid @self-color;
				color: @self-color;
				padding:0rem 0.04rem;
				font-size: .1rem;
				height:.16rem;
				line-height: .16rem;

			}
		};

		&>div:last-child{
			flex:auto;
			align-items: flex-end;
		};

		ul{
			/*margin-bottom: 0.08rem;*/
			display: flex;
		}
	}

	.focus{
		background: @focus-color;
		color:@white;

		&:hasFocus{
			border:0.01rem solid @line-color;
			background: none;
			color:@line-color;
		};
	}

	li{
		text-align: center;
		padding:0 0.16rem;
    	border-right: 0.01rem solid @line-color;
		
		*{
			font-size: .12rem;
		}
    	&:last-child{
			border:none;
    	};

    	p:first-child{
    		margin-bottom: .04rem;
    	}
	}

	.source-self-intr{
		background: @white;
		text-align: center;
		padding: .1rem;
		margin:0.47rem .16rem .12rem .16rem; 
		height:.48rem;
		border:0.01rem solid @border;
		
		.focus{
			padding:0 .08rem;
			text-align: center;
			height: .28rem;
			line-height: .28rem;
			font-size: .12rem;
			letter-spacing: 0.01rem;
		}

		p span{
			font-size: .13rem;
		}
	}

	.blank-div{
		height:.48rem;
		margin-bottom: 0.03rem;
	}
</style>

<script>
	
	export default{
		props:['userInfo'],
		methods:{
			editSelf(){
				this.$router.push({name:'editSelf'})
			}
		}
	}
</script>