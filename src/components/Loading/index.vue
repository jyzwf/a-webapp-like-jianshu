<!-- 提示组件 -->
<template>
	<div id="loading_part">
		<div id="loading">
			<span class='loading-word' v-for='word in loadingWord'>{{word}}</span>
			<!-- <span>o</span>
			<span>a</span>
			<span>d</span>
			<span>i</span>
			<span>n</span>
			<span>g</span> -->
		</div>
	</div>
</template>

<style lang='less' scope>
@loading_bg:rgba(0,0,0,.42);
@loading_color:#fff;
	#loading_part{
		position:fixed;
		left:0;
		top:0;
		right:0;
		bottom:0;
		background:transparent;
		display: flex;
		justify-content:center;
		align-items:center;
		z-index:999;

		#loading{
			font-size:0.26rem/1.5 Monospace;
			color:@loading_color;
			padding:0.2rem;
			background:@loading_bg;
			border-radius:0.04rem;
			perspective:1rem;

			span{
				animation:flip 2s infinite;
				display: inline-block;
				transform-origin:50% 50% -0.1rem;
				transform-style: preserve-3d;

				&:nth-child(1){
    			  animation-delay:0.1s;
    			}
    			&:nth-child(2){
    			  animation-delay:0.2s;
    			}
    			&:nth-child(3){
    			  animation-delay:0.3s;
    			}
    			&:nth-child(4){
    			  animation-delay:0.4s;
    			}
    			&:nth-child(5){
    			  animation-delay:0.5s;
    			}
    			&:nth-child(6){
    			  animation-delay:0.6s;
    			}
    			&:nth-child(7){
    			  animation-delay:0.7s;
    			}
    			&:nth-child(8){
    			  animation-delay:0.8s;
    			}
    			&:nth-child(9){
    			  animation-delay:0.9s;
    			}
    			&:nth-child(10){
    			  animation-delay:1s;
    			}


			}	

		}

		@keyframes flip{
			to{
				transform:rotateX(1turn)
			}
		}
	}
</style>

<script type="text/javascript">
	export default{
		props:['loadingWord']
	}
</script>