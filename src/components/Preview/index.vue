<!-- 预览 -->
<template lang='jade'>
	.preview
		h2.article-title {{articleTitle}}
		.article-content.writer-preview(v-html='topic+previewHtml')

</template>

<style scoped lang='less'>
@black-a:rgba(0, 0, 0, 0.87);
@white:#fff;

	.preview{
		position:fixed;
		left:0;
		top:0.4rem;
		background:@white;
		width:100%;
		height:100%;
		z-index:199;
		overflow:scroll;
		padding-bottom: 0.8rem;
		
		h2{
			font-size:0.24rem;
			font-weight: bold;
			letter-spacing: 0.02rem;
			margin-bottom:0.08rem;
			margin-top:0.16rem;
			word-break: break-all;
		}
		

		h2,.info-note,.article-content,.article-info{
			padding-left:0.2rem;
			padding-right:0.2rem;
		}

		.article-content{
			font-size:0.15rem;
			line-height:1.8;
			color:@black-a;
			margin-top:0.12rem;
		}
	}
</style>

<script type="text/javascript">

	export default{
		props:['previewHtml','customTagShow','articleTitle'],
		computed:{
			topic(){
				if(this.customTagShow.trim()==''){
					return ''
				}
				return `<span class="qkTopic img-margin-right">#${this.customTagShow}</span>`
			}
		}
	}
</script>