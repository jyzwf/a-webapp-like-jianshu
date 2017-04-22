<!-- 关于用户或者专题的详情里面的导航 -->
<template lang="jade">
	.qk-nav-slider.qk-border-t(:class="{'qk-border-b':hasBorder}")
		ul.v-h-center
			li(v-for='(n,idx) in navList',@click='slide(idx,n)',:class="{'active':idx==navIdx}") {{hasBorder?n.name:n.name+'('+n.number+')'}}
			li.slider(:style="{'left':sliderWidth*navIdx+'px','width':sliderWidth+'px'}")
</template>

<style lang='less' scoped>
@slider:#ff5856;
@active:rgba(0,0,0,.87);
@disabled:rgba(0, 0, 0, 0.38);
@white:#fff;
	.qk-nav-slider{
		background: @white;
		&:before{
			top:-.02rem;
		};
	}
	ul{
		position: relative;
		li:not(.slider){
			flex:1;
			height:.48rem;
			line-height: .48rem;
			text-align: center;
			color: @disabled;
			font-size: .14rem;
			&.active{
				color:@active;
			};
		}
		.slider{
			position: absolute;
			bottom:0;
			left:0;
			background: @slider;
			height:0.02rem;
			z-index: 2;
			transition:all .3s cubic-bezier(0.25, 0.1, 0.72, 1.18);
		}
	}
</style>

<script type="text/javascript">
	export default{
		props:['navList','hasBorder'],
		data(){
			return {
				// navList:[
				// 	{
				// 		name:'祝'
				// 	},
				// 	{
				// 		name:'话'
				// 	},
				// 	{
				// 		name:'最新'
				// 	}
				// ],
				sliderWidth:0,
				// sliderLeft:0,
				navIdx:0
			}
		},
		computed:{
			sliderWidth(){
				return Math.floor(window.innerWidth/this.navList.length)
			}
		},
		methods:{
			slide(idx,n){
				this.navIdx = idx;
				this.$emit('toggleNavs',n)
			}
		}
	}
</script>