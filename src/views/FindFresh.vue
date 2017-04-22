<!-- 发现 -->
<template lang="jade">
	#find-fresh
		.find-nav
			router-link(to='/',v-for='f in findFresh.office')
				img.img-50.qk-round(:src='f.img')
				span {{f.name}}

		SliderNav(:officialNav='findFresh.topic')
			h4.slide-name(slot='slideName')
				img.img-24.margin-right-8(src='../assets/ic_whatshot.svg')
				span 热门专题

		<!-- 推荐作者 -->
		section.recomment-author
			ClassifyLabel(typeName='推荐作者',:readMore='true')
			ul
				li(v-for='f in findFresh.user')
					router-link.focus-cell(:to="{name:'personalHomepage',params:{userId:f.id}}")
						.focus-main.ele-justify
							img.margin-right-24.img-48.qk-round-8(v-lazy='f.headimgurl')
							.focus-snop
								h4 {{f.username}}
								p.line-clamp(v-cloak) 发布有 {{f.page_count}} 篇文章, 人气: {{f.popularity}}
		<!-- 推荐话题 -->
		section.recomment-topic
			ClassifyLabel(typeName='推荐话题',:readMore='true')
			ul
				li(v-for='d in findFresh.debate')
					router-link(:to="{name:'debateList',params:{debateId:d.id}}")
						img(:src='d.img')
						p.pos-center {{d.title}}
						.hot-rank 热度 {{d.dynamic}}



</template>

<style lang='less' scoped>
@import "../../node_modules/swiper/dist/css/swiper.min.css";
@center-bg:#f9f9f9;
@white:#fff;
@blank-54:rgba(0,0,0,.54);
@desc_color:#333;
@hot-topic:#ff5856;
	
	#find-fresh{
		padding-bottom: .8rem;
		
		
	}
	.find-nav{
		display: flex;
		flex-wrap:wrap;
		padding:0.16rem;
		margin-bottom:0.12rem;
		background:@white;

		a{
			width:calc(100% / 3);
			display: flex;
			flex-direction:column;
			
			justify-content:center;
			align-items:center;
			img{
				margin-bottom:0.04rem;
			}

			&:nth-child(n+4){
				padding-top:0.16rem;
			};

			span{
				font-size:0.14rem;
				color:@desc_color;
				letter-spacing: 0.02rem
			}
		}
	}

	
		
		.blank-div{
			height: .5rem;
		}


		.custom-classification{
			background: @white;

			.slide-name{
				padding:0 .16rem;
				margin-bottom: .1rem;
				display: flex;
				align-items: center;

				span{
					font-size: .16rem;
					font-weight: 500;
					color:@hot-topic;
				}
			}
		}
	
	.focus-cell{
		display: flex;
		padding:.16rem;
		align-items:center;

		&:last-child{
			border:none;
		}

		h4{
			font-size: .16rem;
			margin-bottom: .03rem;
		}

		p{
			font-size: .14rem;
			color:@blank-54;
		}
	}

	.focus-main{
	    	flex:auto;
	    	justify-content: flex-start;
	    }

	    .recomment-author{
	    	margin-top: .12rem;
	    	background: @white;
	    	li:last-child{
				&:after{
					content:none;
				};
	    	};
	    }

	    .recomment-topic{
	    	margin-top: .12rem;
	    	background: @white;

	    	ul{
	    		margin-top: .16rem;
	    	}

	    	li{
	    		position: relative;
	    		width:100%;
	    		margin-bottom: .1rem;

	    		a{
	    			display: block;
	    		}
				
				&:after{
					content:'';
					width:100%;
					height:100%;
					position: absolute;
					left:0;
					top:0;
					background: rgba(0, 0, 0, 0.3);
				}

	    		img{
	    			width:100%;
	    			max-height: 3.28rem;
	    		}

	    		p{
	    			padding: 0 .32rem;
    				font-size: .18rem;
    				color: @white;
			   		width: 100%;
			   		text-align: center;
			   		letter-spacing: 0.02rem;
			   		z-index: 9;
	    		}

	    		.hot-rank{
	    			position: absolute;
	    			right:.16rem;
	    			bottom:.16rem;
	    			color: @white;
	    			font-size: .16rem;
	    			z-index: 9;
	    		}
	    	}
	    }
	
</style>

<script type="text/javascript">
	import Swiper from 'swiper';
	import SliderNav from 'components/SliderNav';
	import ClassifyLabel from 'components/ClassifyLabel';
	export default{
		data(){
			return{
				findFresh:{},
				hotTopic:[
				{
					name:'男票',
					img:'//img.hb.aicdn.com/24afa161b63c380c9e157a3820f167a993d2decc2131c-GitoAQ_sq236bl4'
				},
				{
					name:'女票',
					img:'//hbimg.b0.upaiyun.com/37224d790962a5d32d641585cffa9f63f1b472dad64cf-VeeXoU_sq236bl4'
				},
				{
					name:'男女票',
					img:'//hbimg.b0.upaiyun.com/37224d790962a5d32d641585cffa9f63f1b472dad64cf-VeeXoU_sq236bl4'
				},
				{
					name:'男女票',
					img:'//hbimg.b0.upaiyun.com/37224d790962a5d32d641585cffa9f63f1b472dad64cf-VeeXoU_sq236bl4'
				}
				],
			}
		},
		components:{
			SliderNav,
			ClassifyLabel
		},
		computed:{
			url(){
				return this.$store.state.toggleUrl.nowReqUrl
			},
		},
		methods:{
			initSwiper(){
				let htmlFont = parseFloat(window.document.documentElement.style.fontSize);	//获取根字体大小
				new Swiper('.fresh-container',{
            	    observer: true,
            	    resistanceRatio: 0,
            	    slidesPerView:'auto',
            	    // centeredSlides:true,
            	    freeMode:true,
            	    // slidesOffsetAfter:0.4 * htmlFont,
            	    freeModeMomentumBounce:false
				})
			}
		},
		mounted(){
			document.querySelector('#find-fresh').style.minHeight = window.innerHeight+'px';
			
			this.$http.get(`${this.$store.state.baseData.host}discovery/recommand`)
				.then(data=>{
					let formatData = data.data;
					if(formatData.code === 0){
						this.findFresh = formatData.msg
					}
				},err=>{
					alert('服务器开小差啦');
				})
			

			
		},
		beforeDestroy(){
			
		}
	}
</script>