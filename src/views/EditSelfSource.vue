<!-- 个人资料编辑 -->
<template lang='jade'>
	#edit-self-source
		QkHeader(url='javascript:window.history.back();return false;')
			span(slot='save') 保存
		.blank-div
		ul.qk-border-t
			li.ele-justify.qk-border-b
				span 更改头像
				img.img-35.qk-round(:src='myData.headingImg')
			li.ele-justify.qk-border-b
				span 更改昵称
				input(type='text',v-model='myData.nickname')
			li
				p 设置简介
				textarea(v-model='myData.describe',rows='3',placeholder='介绍下自己吧')
</template>

<style lang='less' scoped>
@white:#fff;
	#edit-self-source{
		background: @white;
	}
	.blank-div{
		height:.5rem;
	}

	/*设置信息的样式*/
	ul{
		margin-top: .1rem;
		padding-left: .16rem;

		li{
			padding: .16rem .16rem .16rem 0;
		}

		input{
			direction: rtl;
			font-size: 0.14rem;
		}

		textarea{
			width:100%;
			border:0.01rem solid #d9d9d9;
			margin-top: .08rem;
			padding:0.08rem;
			font-size: 0.14rem;
		}

		p,span{
			font-size: .14rem;
		}
	}
</style>

<script type="text/javascript">
	import QkHeader from 'components/QkHeader';
	export default{
		data(){
			return{
				myNickname:'hhh ',
				selfIntr:''
			}
		},
		components:{
			QkHeader,
			
		},
		computed:{
			myData(){
				return {
					nickname:this.$store.state.baseData.userInfo.name,
					headingImg:this.$store.state.baseData.userInfo.headimgurl,
					describe:this.$store.state.baseData.userInfo.describe,
				}
			}
		},
		mounted(){
			// document.querySelector('#edit-self-source').style.minHeight = window.innerHeight+'px';
			
			this.$store.dispatch('header_title','编辑个人资料')

		}
	}
</script>