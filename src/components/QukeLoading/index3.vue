<template lang='jade'>
    .quke-loading-wrapper
        .loading-panel.pos-center
            .wrap-word
                span LOADING
            .qk-shadow
</template>

<style lang='less' scoped>
@shadow-color:#464646;
@logo-shadow1:rgba(238,238,238,1);
@logo-shadow2:rgba(0, 0, 0, 0.15);
@white:#fff ;
	.quke-loading-wrapper{
		position:fixed;
		left:0;
		top:0;
		width:100%;
		height:100%;
		z-index:99;
		background:@white;


		.wrap-word{
            display: table;
            background-color: #ddd;
            border-radius: 0.1rem;
            padding:0.1rem 0.16rem;
			-webkit-box-shadow: inset 0 0.02rem 0 0 @logo-shadow1, 0 0.01rem 0.01rem @logo-shadow2;
            animation: 2s bounce ease infinite;
            -webkit-animation: 2s bounce ease infinite;

            span{
                display: table-cell;
                vertical-align: middle;
                text-align: center;
                font-family: cursive;
                font-size:0.15rem;
            }
		}

.qk-shadow {
    position: absolute;
    width: 0.8rem;
    height: 0.2rem;
    bottom: -40%;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    border-radius: 50%;
    background-color: @shadow-color;
    opacity: 0.2;
    -webkit-transform-origin: -50% -50%;
    transform-origin: -50% -50%;
    animation: 2s pulsate ease infinite;
    -webkit-animation: 2s pulsate ease infinite;
}

@keyframes bounce {  
    50% {
        -webkit-transform: translateY(-0.5rem);
        -moz-transform: translateY(-0.5rem);
        -o-transform: translateY(-0.5rem);
        transform: translateY(-0.5rem);
    }
}

@-webkit-keyframes bounce {  
    50% {
        -webkit-transform: translateY(-0.5rem);
        -moz-transform: translateY(-0.5rem);
        -o-transform: translateY(-0.5rem);
        transform: translateY(-0.5rem);
    }
}

@-webkit-keyframes pulsate {
    0% {
        opacity: 0;
    }
    50% {
        -webkit-transform: scale(0.5);
        -moz-transform: scale(0.5);
        -o-transform: scale(0.5);
        transform: scale(0.5);
        opacity: 0.5;
    }


    100% {
        opacity: 0;
    }
}


@keyframes pulsate {
    0% {
        opacity: 0;
    }
    50% {
        -webkit-transform: scale(0.5);
        -moz-transform: scale(0.5);
        -o-transform: scale(0.5);
        transform: scale(0.5);
        opacity: 0.5;
    }


    100% {
        opacity: 0;
    }
}

	}
</style>