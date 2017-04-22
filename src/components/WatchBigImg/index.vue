<template lang='jade'>
	.watch-big-img(@click.self='hide')
		.img-wrapper.pos-center.shadow-mask-black
			img.original-img(:src='bigImg')
</template>

<style lang='less' scoped>
	.watch-big-img{
		position:fixed;
		left:0;
		top:0;
		right:0;
		bottom:0;
		z-index:999;


		.img-wrapper{
			width:100%;
			max-height:80%;
			overflow:scroll;
			object-fit: cover;
		}
		img.original-img{
			width:100%;
			user-select: none;
		}
	}
</style>

<script>
	export default{
		props:['bigImg','hideOrigin'],
		methods:{
			hide(){		//隐藏放大图片
				this.$emit('hideOrigin')
			},
			deleteOrigin(){		//删除放大的图片
				this.$emit('delete').hide();
			}
		}
	}
</script>