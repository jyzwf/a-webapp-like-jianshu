<!-- 一般的专题头 -->
<template lang='jade'>
	.qk-header.ele-justify(:class="{'qk-border-b':hasBottom!='1'}")
		span.pos-center.single-ellipsis {{headerTitle}}
		slot(name='save')
</template>

<style lang='less' scoped>
@white:#fff;
@header-color:rgba(255,255,255,.9);
@title-color:#999999;
	.qk-header{
		background:@header-color;
		position: fixed;
		height:.48rem;
		left:0;
		top:0;
		width:100%;
		padding:0 .16rem;
		    z-index: 9;
		
		a{
			cursor: pointer;
		}

		span{
			font-size: .16rem;
		}

	}
</style>


<script type="text/javascript">
	export default{
		props:['hasBottom'],
		computed:{
			headerTitle(){
				return this.$store.state.headerTitle.header
			}
		}
	}
</script>