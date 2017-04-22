<template lang='jade'>
	.search-note
		header.ele-justify.qk-border-b
			img.back(src='../assets/ic_arrow_back.svg',@click='closeSearch')
			.operate-search.ele-justify
				input(placeholder='输入或选择笔记标签',type='text',autofocus v-model='nowArticleTag')
				img(src='../assets/toolbar-search.svg',@click='toSearch')
		.blank-div
		transition(name="search-fade" mode="out-in")
				components(:is='searchPart',@selectNowTag='setNowArticleTag',type='search',:qkTopic='historyTopic')
					ClassifyLabel(typeName='历史搜索',slot='history',v-show='historyTopic[0]')
</template>

<style lang='less' scoped>
	@black-border:rgba(0,0,0,.12);
	@input-bg:#f5f5f5;
	@black-a:rgba(0, 0, 0, 0.87);
	@white-a:rgba(255,255,255,.9);
	.search-note{
		
		padding-bottom: .8rem;

		/*调整历史搜索标签的边距*/
  		.classify-label{
  			padding:0;
  			margin-bottom: .1rem;
  		}
	}

	header{
		height:0.56rem;
		padding:0 0.16rem ;
		position: fixed;
		left:0;
		top:0;
		width:100%;
		background: @white-a;
		
		.operate-search{
			margin-left:.1rem;
			padding:0.08rem 0.12rem;
			height:.36rem;
			border-radius:0.03rem;
			border:0.01rem solid #e0e0e0;
			flex:auto;
		}

		input{
			
			font-size:0.14rem;
			letter-spacing:0.01rem;
			flex:auto;
			-webkit-appearance:none;
			margin-right:0.1rem;
			&::-webkit-search-cancel-button {
				display: none;
			}
		}

		img{
			width:.2rem;
			min-width:.2rem;
			height:0.2rem;
			cursor: pointer;
			
			&.back{
				width:.24rem;
				min-width:.24rem;
				height: .24rem;
			}
			
		}
	}

	/*搜索框的动画*/
	.search-fade-enter-active, .search-fade-leave-active {
  	  transition: all .4s ease;
  	}

  	.search-fade-enter,.search-fade-leave-active{
  	  opacity:0;
  	  transform:translateX(3rem);
  	}


</style>

<script>
	import ClassifyLabel from 'components/ClassifyLabel';
	import ArticleTag from 'components/ArticleTag';
	import ArticlesSnapshot from 'components/ArticlesSnapshot';
	export default{
		data(){
			return {
				searchTags:[],
				nowArticleTag:'',
				searchPart:'ArticleTag',
				historyTopic:[]
			}
		},
		components:{
			ClassifyLabel,
			ArticleTag,
			ArticlesSnapshot
		},
		watch:{
			searchPart(newVal){
				if(newVal == 'ArticlesSnapshot'){
					window.addEventListener('scroll',this.addScroll,false);
				}
			}
		},
		methods:{
			toSearch(){
				if(this.nowArticleTag.trim() == ''){
					alert('请输入搜索内容');
					return false;
				}

				this.$store.commit('CHANGESENDKEY',{
					key:this.nowArticleTag
				});
				this.$store.dispatch('loadData',{
					listUrl:'topic/search'
				})
				this.searchPart = 'ArticlesSnapshot'
			},
			closeSearch(){	//退出搜索
				this.$router.push({name:'index'})
			},
			setNowArticleTag(cxt){		//设置标签
				this.nowArticleTag = cxt;
				this.toSearch();
			},
			addScroll(){
				this.$store.dispatch('scrollLoader',{
					url:'topic/search',
					el:document.querySelector('.article-list-teml .loader-end'),
					scale:.87
				})
			}
		},
		mounted(){
			//重置数据
			this.$store.commit('RESETSENDDATA');
		},
		beforeDestroy(){
			window.removeEventListener('scroll',this.addScroll,false);
		}
	}
</script>