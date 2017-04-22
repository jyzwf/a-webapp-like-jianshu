<!--基本的cell -->
<template lang='jade'>
	.qk-cell(:class="{'qk-border-b':hasBottom}",@click='toLink(cellFill)')
		.ele-justify
			.cell-left
				img.img-24.cell-icon(:src='"../../assets/"+cellFill.icon+".svg"')
				span {{cellFill.name}}
			.cell-right
				span.img-margin-right.msg-num {{cellFill.num}}
				img.img-24.cell-icon(src='../../assets/ic-arrow-right.svg')
</template>

<style lang="less" scoped>
@num:rgba(0, 0, 0, 0.54);
@border-bottom:#e0e0e0;


	.qk-cell{
		&>div{
			height:.48rem;
		}

		span{
			display:inline;
		}
		height:.48rem;
		line-height:.48rem;
		&.hasBorBottom{
			border-bottom: solid 0.01rem @border-bottom;
		}
		
	}

	.cell-left{
		img{
			margin-right:.1rem;
		}
	}

	span{
		font-size:.16rem;
		letter-spacing:.01rem;
		font-weight: 500;

		&.msg-num{
			color:@num;
			font-weight: 100;
			    vertical-align: sub;
		}
	}
</style>

<script type="text/javascript">
	export default{
		props:['cellFill','hasBottom'],
		methods:{
			toLink(cxt){
				if(cxt.type=='1'){
					location.href=cxt.link;
					return false;
				}

				if(cxt.params){
					this.$router.push({name:cxt.link,params:{myId:cxt.params}})
					return false;
				}
					this.$router.push({name:cxt.link})
			}
		}
	}
</script>