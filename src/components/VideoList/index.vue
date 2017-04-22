<!-- 视屏播放列表 -->
<template lang="jade">
	#video-list
		ul
			li(v-for='v in videoList')
				router-link(:to="{name:'videoDetail',params:{videoId:v.id}}")
					.video-poster
						img.poster-img(:src='v.url+"?vframe/jpg/offset/10/w/"+winW+"/h/"+videoH+""')
						img.btn-play.pos-center.img-50(src='../../assets/btn_play.png')
					.video-title.line-clamp {{v.name}}
					.video-msg.ele-justify
						.video-publisher.ele-justify(@click.prevent.stop='goCenter(v.poster._id)')
							img.img-24.qk-round.margin-right-8(:src='v.poster.headimgurl')
							p {{v.poster.username}}
						.video-arg.ele-justify
							img.img-18(src='../../assets/ic-bold.svg')
							span {{v.commentnum}}
							span.open-num {{v.pv+'次播放'}}
		p.loader-end {{'-- ' + loaderWords+' -- '}}
</template>

<style lang="less" scoped>
@white:#fff;

	li{
		background:@white;
		margin-bottom:.1rem;
	
		&:last-child{
			margin-bottom:0;
		}

		.video-poster{
			width:100%;
			height:1.5rem;
			position:relative;
			
			.poster-img{
				width:100%;
				height:100%;
				object-fit:cover;
			}
		}

		.video-msg{
			padding:.1rem .16rem;
		}

		.video-arg{
			font-size:.12rem;
			.open-num{
				margin-left:.1rem;
			}
		}

		.video-publisher{
			flex:auto;
			justify-content:flex-start;
			p{
				font-size:.12rem;
			}
		}
	}

	.video-title {
		padding:.1rem .16rem 0;
		font-size:.16rem;
		-webkit-line-clamp: 2;
	}

</style>

<script type="text/javascript">
	export default{
		data(){
			return {
				winW:'',
				videoH:''
			}
		},
		computed:{
			dataOver(){		//数据是否加载完
				return this.$store.state.scrollLoadList.loadingOver
			},
			loaderWords(){		//底部显示的提示文字
				return this.dataOver?'end':'loading'
			},
			videoList(){		//当前文章的列表
				return this.$store.state.scrollLoadList.LoadingList
			},
		},
		methods:{
			goCenter(id){
				this.$router.push({name:'personalHomepage',params:{userId:id}})
			}
		},
		mounted(){
			let htmlFont = parseFloat(window.document.documentElement.style.fontSize);	//获取根字体大小
			this.winW = window.innerWidth;
			this.videoH = parseInt(1.5 * htmlFont);
		}
	}
</script>