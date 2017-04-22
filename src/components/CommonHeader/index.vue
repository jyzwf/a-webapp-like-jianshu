<template lang='jade'>
	#common-header.ele-justify
		<!-- a(v-if='url',:onclick='url') -->
		<!-- img(src='../../assets/ic_arrow_back.svg') -->
		span.pos-center.single-ellipsis {{title}}
		slot
</template>

<style lang='less' scoped>
@white:#fff;
@header-color:#f5f5f5;
@title-color:#999999;
	#common-header{
		text-align:center;
		background:@header-color;
		padding:0.1rem .16rem;
		position:relative;

		a{
			cursor: pointer;
		}

		.pos-center{
			font-size:0.2rem;
			color:@title-color;
			width:60%;
		}

		img{
			width:0.24rem;
			height:0.24rem;
		}
		
	}
</style>


<script>
	export default{
		props:['title','url']
	}
</script>