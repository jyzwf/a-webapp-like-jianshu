<!-- 大块分类type -->
<template lang='jade'>
	.classify-label.ele-justify
		span.label-name(:style="{color:typeColor}") {{typeName}}
		router-link(:to="{name:'specialIntr',query:{type:topicId,name:topicName}}",v-show='readMore')
			img.img-20(src='../../assets/ic-arrow-right.svg')
</template>

<style lang="less" scoped>
@line:#e78170;
	.classify-label{
		padding:0.16rem 0.16rem 0; 

		
		/*分类name*/
		.label-name{
			font-size: .18rem;
 		 	font-weight: 500;
		}

	}
</style>

<script type="text/javascript">
	export default{
		props:['typeName','readMore','topicId','topicName'],
		data(){
			return{
				nameColor:{
					'推荐文章':'#f41f1f',
					'推荐话题':'#97c921',
					'#好书分享':'#5ab6ec',
					'推荐作者':'#f41f1f'
				}
			}
		},
		computed:{
			typeColor(){
				return this.nameColor[this.typeName]
			}
		}
	}
</script>