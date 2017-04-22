<template lang='jade'>
	.write-note
		write-note
		
</template>

<style lang='less' scoped>
	@white:#fff;
	.write-note{
		background: @white;
	}
</style>

<script>
	// import CommonHeader from 'components/CommonHeader';
	import WriteNote from 'components/WriteNote';
	

	export default{
		components:{
			// CommonHeader,
			WriteNote
		},
		mounted(){
			document.querySelector('.write-note').style.minHeight = window.innerHeight+'px';
		}
	}
</script>