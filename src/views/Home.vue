<template lang='jade'>
	#home
		transition(name="index-header-fade")
			header.v-h-center.qk-border-b(v-show='indexHeaderScroll')
				span.margin-right-12(:class="{active:isRecommend}",@click='toggleIndexState(true)') 推荐
				span(:class="{active:!isRecommend}",@click='toggleIndexState(false)' ) 喜欢
		transition(name="index-fade" mode="out-in")
			components(:is='indexNow')

</template>

<style scoped lang='less'>
@nav-color:rgba(0, 0, 0, 0.87);
@white:#fff;
@active-color:#fdcd38;
@header-color:rgba(255, 255, 255, 0.9);
@disabled:rgba(0, 0, 0, 0.54);
	#home{
		padding-top:.16rem; 
		background: @white;
		min-height: 100%;
	}

	header{
		background:@header-color;
		height:0.48rem;
		padding:0 0.16rem;
		position: fixed;
		left:0;
		top:0;
		width:100%;
		z-index: 99;
		
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
	
.index-fade-enter-active, .index-fade-leave-active {
    transition: all .25s ease;
  }

  .index-fade-enter,.index-fade-leave-active{
    opacity:0;
    transform:translateX(3rem);
  }


.index-header-fade-enter-active, .index-header-fade-leave-active {
    transition: all .65s ease;
  }

  .index-header-fade-enter,.index-header-fade-leave-active{
    transform:translateY(-1rem);
  }

	
</style>

<script>
	
	import IndexRecommend from 'components/IndexRecommend';
	import IndexUserLove from 'components/IndexUserLove';

	export default{
		data(){
			return {
				indexNow:'IndexRecommend',
				isRecommend:true,
				hasScroll:0,
				indexHeaderScroll:true,
			}
		},
		components:{
			IndexUserLove,
			IndexRecommend,
		},
		methods:{
			toggleIndexState(bool){
				this.isRecommend = bool;
				bool?this.indexNow = 'IndexRecommend':this.indexNow = 'IndexUserLove'
			},
			showHeaderNav(){	//滚动一定距离隐藏顶部nav
				let scrollT = document.documentElement.scrollTop || document.body.scrollTop;
				// console.log(scrollT,this.detailScroll)
				if(scrollT>=100 && scrollT>this.hasScroll){
					this.indexHeaderScroll = false;
				}else if(scrollT<=this.hasScroll){
					this.indexHeaderScroll = true;
				}
					this.hasScroll = scrollT;
			}
		},
		mounted(){
			
			window.addEventListener('scroll',this.showHeaderNav,false)
		},
		beforeDestroy(){
			window.removeEventListener('scroll',this.showHeaderNav,false)
		}
	}
</script>

