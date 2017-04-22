<!-- 首页用户订阅部分 -->
<template lang='jade'>
	#index-user-love
		<!-- 订阅板块 -->
		section.subscribe(v-for='s in subscribe')
			ClassifyLabel(:typeName="'#'+s.name",:readMore='true',:topicId='s.id',:topicName='s.name')
			<!-- 热门专题标签 -->
			ArticleCell(:ClassifyPlateItem='s.pages',:showLoading='false')

		section.no-subscribe(v-if='!isLoadingData&&!isLogin')
			h1 请登录获取相关订阅专题
			p 进入相应专题，点击订阅即可在首页快速<br>阅读专题新鲜文章

		section.no-subscribe(v-if='!isLoadingData&&isLogin&&subscribe.length==0')
			h1 尚未订阅任何专题文章
			p 进入相应专题，点击订阅即可在首页快速<br>阅读专题新鲜文章

</template>

<style scoped lang='less'>
@white:#fff;
@notice-login:rgb(151, 201, 33);
@search-bg:#efefef;
@search-shadow:rgba(0, 0, 0, 0.12);
@gray:rgba(0,0,0,.38);
	
	#index-user-love{
		padding-top: .5rem;
		padding-bottom: .8rem;
		height:100%;
	}

	/*#home{
		padding-top:.16rem; 
		margin-bottom: 0.5rem;
		background: @white;
		padding-bottom: 1rem;
	}*/
	
	
/*	.toSearchBtnWrapper{
		position: fixed;
		left:0;
		top:0rem;
		z-index: 9;
		padding:.1rem;
		width:100%;
		text-align: right;

		&.scrollChange{
    		background: #fff;
    		box-shadow: 0 0 0.04rem 0 @search-shadow;
    		.toSearchBtn{
    			width:100%;
    			background: @search-bg;
    		}
    	}
	}*/

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
	/*.daily-topic{
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
	*/
	.no-subscribe{
		
		text-align: center;
		padding:0 .16rem;
		h1{
			color:@notice-login;
			font-size: .18rem;
			margin-top: .32rem;
			margin-bottom: .16rem;
		}
		p{
			color:@gray;
			white-space: nowrap;
			font-size: .16rem;
			line-height: 1.5;
		}
	}

	
</style>

<script>
	import ClassifyLabel from 'components/ClassifyLabel';
	import ArticleCell from 'components/ArticleCell';


	export default{
		data(){
			return {
				//showSearch:false,		//是否显示搜索框
				//changeSearch:false,   //改变搜索框的类
				subscribe:[],		//用户订阅的板块
				isLogin:false,
				isLoadingData:true
			}
		},
		components:{
			ClassifyLabel,
			ArticleCell
		},
		computed:{
			unchangeData(){		//首页顶部数据
				return this.$store.state.baseData.indexSaveData
			},
			token(){
				return window.localStorage.qkT?window.localStorage.qkT:'';
			},
			
		},
		mounted(){
			// 请求顶部的不变数据
			// if(!this.$store.state.baseData.isSaved){
			// 	this.$http.get(`${this.$store.state.baseData.host}homepage`)
			// 	.then(data=>{
			// 		let formatData = data.data;
			// 		if(formatData.code === 0){
			// 			// this.$store.commit('SAVEINDEXDATA',formatData.msg);
			// 			this.$store.dispatch('index_page_data',formatData.msg);
			// 		}else{
			// 			alert('服务器开小差啦')
			// 		}
			// 		this.isLoadingData = false;
			// 	},err=>{
			// 		alert('服务器开小差啦');
			// 		this.isLoadingData = false;
			// 	})
			// }


			//请求用户订阅的数据
			this.$http.post(`${this.$store.state.baseData.host}homepage/focus`,{
				token:this.token
			},{"emulateJSON":true,"emulateHTTP":true})
			.then((data)=>{
				let formatData = data.data;
				if(formatData.code === 0&&formatData.msg){
						this.subscribe = formatData.msg;
						this.isLogin = true
				}else if(formatData.code === 4002){
					this.isLogin = false
				}

				this.isLoadingData = false;
			},err=>{
				alert('服务器开小差啦');
				this.isLoadingData = false;
			})


		},
		beforeDestroy(){
		}
	}
</script>

