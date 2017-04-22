<!-- 一些专题或者用户的头部信息 -->
<template lang="jade">
	.qk-intr-header
		img.img-64.qk-round-4(:src='intr.img')
		p.intr-name {{intr.name}}
		p.intr-msg {{'共'+intr.pagenumber+'篇文章'}}
		.action-intr
			button.init-btn.focus.margin-right-8 + 关注
			slot(name='btn-submit')
		slot(name='extraIntr')
</template>

<style lang='less' scoped>
@focus:#49be38;
@white:#fff;
	.qk-intr-header{
		padding:.16rem;
		text-align: center;
		margin-bottom: .12rem;
		background: @white;
		    padding-top: .2rem;
	}

	.intr-name {
		font-size: .16rem;
		margin: .08rem 0;
	}

	.intr-msg{
		font-size:.12rem;
		margin:.08rem 0;
	}

	.focus{
		padding:0.04rem 0.08rem;
		background:@focus;
		color:@white;
		font-size:0.15rem;

	}


</style>

<script type="text/javascript">
	export default{
		props:['intr']
	}
</script>