<template lang='jade'>
	.my-submit
		QkHeader
		.blank-div
		ul
			li.ele-justify.qk-border-b(v-for='(s,idx) in submitList')
				.submit-msg
					p(v-if="s.status=='审核中'") <b>{{s.page.title}}</b> 投稿于{{'#'+s.reqtopic+'#'}}
					p(v-if="s.status=='已通过'") <b>{{s.page.title}}</b> 投稿于{{'#'+s.reqtopic+'#'}}
					p.passReason(v-if="s.status=='已通过'") 通过理由：{{s.reason}}
					p(v-if="s.status=='未通过'") <b>{{s.page.title}}</b> 投稿于{{'#'+s.reqtopic+'#'}}
					p.unpassReason(v-if="s.status=='未通过'") 未通过理由：{{s.reason}}
					time {{s.passtime}}
				button.init-btn(@click='revoke(s,idx)') {{s.status=='审核中'?'撤回':s.status}}
		p.loader-end {{'-- ' + loaderWords+' -- '}}

</template>

<style lang='less' scoped>
@white:#fff;
@submit:#fdcd38;
@black-a:rgba(0,0,0,.87);

	.my-submit{
		padding-bottom: .8rem;
		height:100%;
		background: @white;
	}
	.blank-div{
		height:.5rem;
	}

	li{
		padding: .16rem;
		p{
			margin-bottom: .04rem;
			font-size: .14rem;
			color:@black-a;
		}

		button{
			color:@submit;
			border:0.01rem solid @submit;
			padding:0 .08rem;
			text-align: center;
			height: .28rem;
			line-height: .28rem;
			font-size: .12rem;
			letter-spacing: 0.01rem;
			margin-left: .12rem;
			white-space: nowrap;
		}

		time{
			font-size: .1rem;
		}
	}

</style>

<script type="text/javascript">
	import QkHeader from 'components/QkHeader';
	export default{
		data(){
			return{
				url:'users/submit/index'
			}
		},
		components:{
			QkHeader
		},
		computed:{
			token(){
				return window.localStorage.qkT?window.localStorage.qkT:'';
			},
			dataOver(){		//数据是否加载完
				return this.$store.state.scrollLoadList.loadingOver
			},
			loaderWords(){		//底部显示的提示文字
				return this.dataOver?'end':'loading'
			},
			submitList(){		//当前投稿的列表
				return this.$store.state.scrollLoadList.LoadingList
			},
		},
		methods:{
			addScroll(){
				this.$store.dispatch('scrollLoader',{
					url:this.url,
					el:document.querySelector('#video-list .loader-end'),
					scale:.3
				})
			},
			// 撤回投稿
			revoke(s,idx){
				if(s.status!='审核中'){
					return false;
				}


				let t = confirm('你确定要撤回吗');
				if(t){
					this.$http.post(`${this.$store.state.baseData.host}users/submit/cancel`,{
						token:this.token,
						submit_id:s._id
					},{"emulateJSON":true,"emulateHTTP":true})
					.then((data)=>{
						let formatData = data.data;
						if(formatData.code === 0){
							this.submitList.splice(idx,1);
						}else if(formatData.code ==4002){
							this.$store.dispatch('can_close_login',true);
							this.$store.dispatch('judge_islogin',true);
						}
					},err=>{
						alert('服务器开小差啦')
					})
				}
			}
		},
		mounted(){
			// 设置顶部title以及请求的数据
			this.$store.dispatch('reset_list');
			this.$store.dispatch('header_title','我的投稿')
			
			this.$store.dispatch('add_extra_data',{
				token:this.token
			});
			// 请求数据
			this.$store.dispatch('loadData',{
				listUrl:this.url
			})
			window.addEventListener('scroll',this.addScroll,false);
		},
		beforeDestroy(){
			window.removeEventListener('scroll',this.addScroll,false);
		}
	}
</script>