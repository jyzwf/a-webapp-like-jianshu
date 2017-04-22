<!-- 我的个人中心 -->
<template lang='jade'>
	#my-center
		<!-- 我的头像以及昵称 -->
		.qk-border-b.ele-justify.my-heading-nickname(@click='goCenter')
			img.img-64.qk-round(:src='myData.headimgurl')
			.my-nickname-edit.ele-justify
				.left-part
					p {{myData.username}}
					.edit-self.ele-justify.qk-round-4
						img.img-margin-right.img-15(src='../assets/integral.svg')
						span {{'积分'+myData.integral}}
				.right-part
					span 个人主页
					img.img-24(src='../assets/ic-arrow-right.svg')
		<!-- 有关个人中心的一些操作 -->
		.my-operate-info.qk-border-t-b
			QkCell(v-for='(cell,idx) in userCell',:cellFill='cell',:hasBottom='idx!==userCell.length-1')
		.my-wallet.qk-border-t-b
			QkCell(:cellFill='wallet',:hasBottom='true')
			QkCell(:cellFill='browsingHistory',:hasBottom='false')
		.weiceng-relative.qk-border-t-b
			QkCell(v-for='(cell,idx) in weiceng',:cellFill='cell',:hasBottom='idx!==userCell.length-1')
</template>

<style lang='less' scoped>
@bg:#f8f8f8;
@white:#fff;
@intergral:#ff5856;
@gray:rgba(0,0,0,.38);
	#my-center{
		padding-bottom: .8rem;
		background: @bg;
	}

	.my-heading-nickname{		/*我的个人信息*/
		padding:0.16rem;
		margin-bottom: .12rem;
		justify-content: flex-start;
		background: @white;

		&>p{
			font-size: .12rem;
		}
		
		.my-nickname-edit{
			margin-left:.2rem; 
			flex: auto;
		}
		
		p:not(.edit-self){
			font-size: .16rem;
			margin-bottom: 0.04rem;
		}

		.edit-self{
			font-size: .11rem;
			border:0.01rem solid @intergral;
			padding: 0.01rem 0.04rem;
			letter-spacing: 0.01rem;
			span{
				color:@intergral;
			}
		}
	}

	.right-part{
		font-size: .14rem;
		color:@gray;
	}

	/*下面的相关选项*/
	.my-operate-info,.my-wallet,.weiceng-relative{
		padding: 0 .16rem;
		background:@white;
		margin-bottom: .12rem;

		&:before{
			    top: -.02rem;
		};
	}

</style>

<script type="text/javascript">
	import QkCell from 'components/QkCell';

	export default{
		data(){
			return {
				userMsg:{},
				weiceng:[
					{
						name:'帮助反馈',
                        link:"myNote",
                        num:'',
                        icon:'feedback'
					},
					{
						name:'关于我们',
                        link:"http://mp.weixin.qq.com/s/IsvGn5MjUKx5qHxtG5H5yw",
                        type:'1',
                        num:'',
                        icon:'about-us'
					}
				],
				browsingHistory:{
					name:'浏览历史',
                    link:"browseHis",
                    num:'',
                    icon:'ic_browser_history'
				},
				myData:{}
			}
		},
		components:{
			QkCell
		},
		computed:{
			userCell(){
				return [
					{
						name:'我的创作',
                        link:"myCreate",
                        num:this.userMsg.original_count,
                        icon:'published-article',
                        params:this.myData._id
					},
					{
						name:'我的关注',
                        link:"myFocus",
                        // params:this.myData._id,
                        num:this.userMsg.focus_count,
                        icon:'secret-article'
					},
					{
						name:'我的投稿',
                        link:"mySubmit",
                        num:this.userMsg.submit_count,
                        icon:'collected-article'
					},
					{
						name:'我的消息',
                        link:"myInfo",
                        num:this.userMsg.msg_count,
                        icon:'view-history'
					}
				]
			},
			wallet(){
				return {
						name:'打赏收入',
                        link:"withdrawals",
                        num:(+this.myData.wallet).toFixed(2),
                        icon:'article-income'
				}
			}

		},
		methods:{
			goCenter(){
				this.$router.push({name:'personalHomepage',params:{userId:this.myData._id}})
			}
		},
		beforeCreate(){
			this.$store.dispatch('can_close_login',false);

			if(!window.localStorage.qkT){
				this.$store.dispatch('judge_islogin',true);
				return false;
			}

			let token = window.localStorage.qkT?window.localStorage.qkT:'';

			this.$http.post(`${this.$store.state.baseData.host}users/base/info`,{
				token:token
			},{"emulateJSON":true,"emulateHTTP":true})
			.then((data)=>{
				let formatData = data.data;
				if(formatData.code==0){
					this.userMsg = formatData.msg.count;
					if(formatData.msg.base){		//一开始就判断是不是有用户信息，如果有，保存
						this.myData = formatData.msg.base;
						this.$store.dispatch('set_userinfo',formatData.msg.base);
					}
				}else if(formatData.code == 4002){
						this.$store.dispatch('judge_islogin',true);
					}
			},err=>{
				alert('服务器开小差啦')
			})
		},
		mounted(){
			document.querySelector('#my-center').style.minHeight = window.innerHeight+'px';
		},
		beforeDestroy(){
  			this.$store.dispatch('judge_islogin',false);
  			this.$store.dispatch('clear_userinfo');
  		}
	}
</script>