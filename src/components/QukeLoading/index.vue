<template lang='jade'>
	.qukeLoading
		.content
			.loader
				.loader_letter L
				.loader_letter o
				.loader_letter a
				.loader_letter d
				.loader_letter i
				.loader_letter n
				.loader_letter g
	
</template>

<style lang='less'>
	.qukeLoading{
		position:fixed;
		left:0;
		top:0;
		right:0;
		bottom:0;
		background:#fff;
		z-index: 100;
		
		.content {
			min-height: 100%;
		}

.loader {
	position: absolute;
	text-align: center;
	width: 100%;
	height: 2em;
	top: 50%;
	margin-top: -1em;
	
	&_letter {
		text-transform: uppercase;
		color: #000;
		font-family: "Helvetica", sans-serif;
		font-weight: bold;
		padding: 0 .2em;
		font-size: 2em;
		line-height: 1;
		position: relative;
		display: inline-block;
		animation: bounce .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) infinite alternate;
		
		&:nth-child(0){
			 animation-delay: 0;
		}
		&:nth-child(1){
			 animation-delay: .05s;
		}
		&:nth-child(2){
			 animation-delay: .1s;
		}
		&:nth-child(3){
			 animation-delay: .15s;
		}
		&:nth-child(4){
			 animation-delay: .2s;
		}
		&:nth-child(5){
			 animation-delay: .25s;
		}
		&:nth-child(6){
			 animation-delay: .3s;
		}

	}
}

@keyframes bounce {
  0%{transform: translateY(0px);}
  100% {transform: translateY(-1em);}
}

	}
</style>