<template lang='jade'>
	.custom-classification
		slot(name='slideName')
		.swiper-container.slider-topic-container
			.swiper-wrapper
				.swiper-slide.quke-slide.qk-round-8(v-for="(val,idx) in officialNav",@click='goTopic(val)',:style="{'backgroundImage':'url('+val.img+')'}") {{val.name}}
</template>

<style lang='less' scoped>
@custom:#e78170;
@white:#fff;
@tag:#e78170;
@topic-mask:rgba(255,255,255,.6);

	@import "../../../node_modules/swiper/dist/css/swiper.min.css";
	.custom-classification{
		padding:.12rem 0;

	}
	.slider-topic-container{
		.quke-slide{
			width:.9rem;
			height:.52rem;
			line-height: .52rem;
			text-align: center;
			font-size: 0.16rem;
    		letter-spacing: 0.01rem;
    		white-space: nowrap;
    		font-weight: 500;
    		
		}

		.quke-slide{
			/*background: url('../../assets/banner.jpg') center no-repeat; /*/
			background-position: center;
			background-repeat: no-repeat;
			box-shadow: inset 0 0 0 55rem @topic-mask;
			background-size: 100% 100%; 
		}
	}



	
</style>

<script>
	import Swiper from 'swiper';
	export default{
		props:['officialNav'],
		data(){
			return {
				bounce_w:'',
				space_w:''
			}
		},
		methods:{
			swiper(){
					new Swiper('.slider-topic-container',{
            		    observer: true,
            		    lazyLoading: true,
            		    resistanceRatio: 0,
            		    slidesOffsetBefore:this.bounce_w,
            		    slidesOffsetAfter:this.bounce_w,
            		    slidesPerView:'auto',
            		    spaceBetween:this.space_w,
            		    centeredSlides:false,
					})
			},
			goTopic(tag){		
				this.$router.push({name:'specialIntr',query:{type:tag._id,name:tag.name}})
			}
		},
		mounted(){
			let htmlFont = parseFloat(window.document.documentElement.style.fontSize);	//获取根字体大小

			this.bounce_w = 0.16 * htmlFont,
			this.space_w = 0.1 * htmlFont;
			this.$nextTick(()=>{
				this.swiper();
			})
		}
	}
</script>