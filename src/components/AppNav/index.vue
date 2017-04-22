<!-- 应用底部导航 -->
<template lang='jade'>
	#app-nav
		transition(name="app-nav-fade")
			#app-nav-wrapper.qk-border-t(v-show='appNavScroll')
				router-link.v-h-center(:to="{name:'index'}" active-class='nav-link-active' exact)
					span.qk-icon-nav.img-20
					span 原创
				router-link.v-h-center(:to="{name:'find'}" active-class='nav-link-active' exact)
					span.qk-icon-nav.img-20
					span 发现
				router-link.v-h-center(:to="{name:'writenote'}" active-class='nav-link-active' exact)
					span.qk-icon-nav.img-20
					span 创作
				router-link.v-h-center(:to="{name:'mycenter'}" active-class='nav-link-active' exact)
					span.qk-icon-nav.img-20
					span 我的
</template>

<style lang='less' scoped>
@nav-border:rgba(0, 0, 0, 0.08);
@nav-active:#e78170;
@white:#fff;
	#app-nav-wrapper{		
		position: fixed;
		width:100%;
		height:0.5rem;
		bottom:0;
		left:0;
		z-index: 101;
		display: flex;
		align-items: center;
		background: @white;

		&:before{
			    top: -.02rem;
		};
		
		a{
			flex:1;
			flex-direction: column;

			&.nav-link-active{
				span{
					color:@nav-active;
				}
			}

			&:nth-of-type(1){
				.qk-icon-nav{
					background-image: url(../../assets/tab-articles.svg) ;
				}

				&.nav-link-active{
					.qk-icon-nav{
						background-image: url(../../assets/tab-articles-active.svg) ;
					}
				};
			};

			&:nth-of-type(2){
				.qk-icon-nav{
					background-image: url(../../assets/tab-discover.svg) ;
				}

				&.nav-link-active{
					.qk-icon-nav{
						background-image: url(../../assets/tab-discover-active.svg) ;
					}
				};
			};

			&:nth-of-type(3){
				.qk-icon-nav{
					background-image: url(../../assets/tab-creative-work.svg) ;
				}

				&.nav-link-active{
					.qk-icon-nav{
						background-image: url(../../assets/tab-creative-work-active.svg) ;
					}
				};
			};

			&:nth-of-type(4){
				.qk-icon-nav{
					background-image: url(../../assets/tab-profile.svg) ;
				}

				&.nav-link-active{
					.qk-icon-nav{
						background-image: url(../../assets/tab-profile-active.svg) ;
					}
				};
			};
		}

		.qk-icon-nav{
			background-repeat:no-repeat;
			background-size:0.2rem 0.2rem;
			background-position:center;

			
		}



		span:not(.qk-icon-nav){
			margin-top: 0.04rem;
			font-size: 0.1rem;
		}

	}


	.app-nav-fade-enter-active, .app-nav-fade-leave-active {
    transition: all .65s ease;
  }

  .app-nav-fade-enter,.app-nav-fade-leave-active{
    transform:translateY(1rem);
  }
</style>

<script type="text/javascript">
	export default{
		data(){
			return {
				hasScroll:0,
				appNavScroll:true,
			}
		},
		methods:{
			showAppNav(){		//滚动一定距离隐藏底部nav
				let scrollT = document.documentElement.scrollTop || document.body.scrollTop;
				// console.log(scrollT,this.detailScroll)
				if(scrollT>=100 && scrollT>this.hasScroll){
					this.appNavScroll = false;
				}else if(scrollT<=this.hasScroll){
					this.appNavScroll = true;
				}
					this.hasScroll = scrollT;
			}
		},
		mounted(){
			
			window.addEventListener('scroll',this.showAppNav,false)
		},
		beforeDestroy(){
			window.removeEventListener('scroll',this.showAppNav,false)
		}
	}
</script>