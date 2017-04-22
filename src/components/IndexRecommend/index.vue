<!-- 首页推荐部分 -->

<template lang='jade'>
	#index-recommend
		<!-- 顶部轮播 -->
		IndexCarousel(:carousels='unchangeData.banner')
		<!-- note自定义板块 -->
		.dashed-line
		
		<!-- 话题图 -->
		router-link.daily-topic(:to="{name:'debateList',params:{debateId:unchangeData.daylyDebate._id}}")
			img.qk-round-8(v-lazy='unchangeData.daylyDebate.img')
			.tree-hole-today
				p # 今日树洞 #
				h2 {{unchangeData.daylyDebate.title}}
				p 立即参与

		.dashed-line
		ClassifyLabel(typeName='推荐文章',:readMore='false')
		<!-- 热门专题标签 -->
		ArticleCell(:showLoading='true')


</template>

<style scoped lang='less'>
@white:#fff;
@notice-login:rgb(151, 201, 33);
@search-bg:#efefef;
@search-shadow:rgba(0, 0, 0, 0.12);
@gray:rgba(0,0,0,.38);


	#index-recommend{
		padding-top: .5rem;
		padding-bottom: .8rem;
	}
	
	


/*	.toSearchBtn{
		background: @white;
		padding: .04rem .08rem;
		border-radius:1rem;
		text-align: center;
		display: inline-block;
		width:auto;
		transition: all .25s ease;

		span{
			font-size: .14rem;
    		color: @search;
    		letter-spacing: 0.01rem;
		}
	}*/

	/*每日话题*/
	.daily-topic{
		padding: 0.12rem .16rem;
		display: block;
		position: relative;
		height:1.6rem;

		.tree-hole-today{
			position: absolute;
			top:.32rem;
			bottom:.32rem;
			left:.16rem;
			right:0.16rem;
			text-align: center;
			color:@white;
			display: flex;
    		flex-direction: column;
    		justify-content: space-around;

    		h2{
    			font-size: .18rem;
    		}

    		p:first-child{
    			font-size: .12rem;
    		}

    		p:last-child{
    			font-size: .14rem;
    		}
		}
		img{
			width:100%;
			height: 100%;
			object-fit: cover;
		}
	}
	


	
</style>

<script>
	import ClassifyLabel from 'components/ClassifyLabel';
	import IndexCarousel from 'components/IndexCarousel';
	// import SliderNav from 'components/SliderNav';
	import ArticleCell from 'components/ArticleCell';


	export default{
		data(){
			return {
				//showSearch:false,		//是否显示搜索框
				//changeSearch:false,   //改变搜索框的类
				//subscribe:[],		//用户订阅的板块
				//isLogin:false,
				//isLoadingData:true
				url:'homepage/recommend'
			}
		},
		components:{
			ClassifyLabel,
			IndexCarousel,
			// SliderNav,
			ArticleCell
		},
		computed:{
			unchangeData(){		//首页顶部数据
				return this.$store.state.baseData.indexSaveData
			},
			// token(){
			// 	return window.localStorage.qkT?window.localStorage.qkT:'';
			// },
			
		},
		methods:{
			addScroll(){
				this.$store.dispatch('scrollLoader',{
					url:this.url,
					el:document.querySelector('.article-cell .loader-end'),
					scale:.3
				})
			}
		},
		mounted(){
			// 请求顶部的不变数据
			if(!this.$store.state.baseData.isSaved){
				this.$http.get(`${this.$store.state.baseData.host}homepage`)
				.then(data=>{
					let formatData = data.data;
					if(formatData.code === 0){
						this.$store.dispatch('index_page_data',formatData.msg);
					}else{
						alert('服务器开小差啦')
					}
					this.isLoadingData = false;
				},err=>{
					alert('服务器开小差啦');
					this.isLoadingData = false;
				})
			}

			this.$store.dispatch('reset_list');
			this.$store.dispatch('loadData',{
				listUrl:this.url
			})
			window.addEventListener('scroll',this.addScroll,false);

		},
		beforeDestroy(){
			window.removeEventListener('scroll',this.addScroll,false);
		}
	}
</script>

