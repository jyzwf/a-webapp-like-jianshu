<template lang='jade'>
	.index-carousel
		.swiper-container#indexSwiper
			.swiper-wrapper
				.swiper-slide.quke-img(v-for="item in carousels")
					img.carousel-img(:src="item.img")
</template>

<style lang='less' scoped>
@white:#fff;
	@import "../../../node_modules/swiper/dist/css/swiper.min.css";
	.index-carousel{
		margin-bottom: .16rem;
		.quke-img{
			width:3rem;
			height:1.44rem;
			border-radius:0.08rem;
		}
		.carousel-img{
			width:100%;
			height:100%;
			border-radius:0.08rem;
			object-fit: cover;
			user-select: none;
		}
	}

	
</style>

<script>
	import Swiper from 'swiper';
	export default{
		props: ['carousels'],
		data(){
			return {
				bounce_w:0,
				space_w:0,
			}
		},
		methods:{
			toDetail(){
				this.$router.push({name:'noteDetail'})
			},
			swiper(){
					new Swiper('#indexSwiper',{
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
		},
		mounted(){

			let htmlFont = parseFloat(window.document.documentElement.style.fontSize);	//获取根字体大小

			this.bounce_w = 0.16 * htmlFont,
			this.space_w = 0.12 * htmlFont;

			this.swiper();
		}
	}
</script>