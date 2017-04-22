<template lang='jade'>
	#search-result
		transition(name='search-fade')
			.type-name.single-ellipsis(v-show='showSearchTag') {{tag}}
		note-list.home-lists(noteUrl='topic/search')
			.no-aboutmy(slot='writeNote',v-if='noResult')
				img(src='../assets/img-empty-state.svg')
				.attention 搜索不到你要的笔记呢
				p
					router-link(to='/writenote') 我要发布
</template>

<style scoped lang='less'>
@type-color:#fff;
	.home-lists{
		padding:0.6rem 0.16rem 0.16rem;
	}
	.type-name{
			letter-spacing: 0.02rem;
			color:@type-color;
			font-size:0.14rem;
			font-weight: 500;
			border-top-right-radius: 2rem;
    		border-bottom-right-radius: 2rem;
			padding:0.08rem 0.16rem;
			position: fixed;
			left:0;
			top:0.7rem;
			z-index: 99;
			background:rgba(0,0,0,.7);
			max-width:65%;
		}

	.search-fade-enter-active, .search-fade-leave-active {
  	  transition: all .8s ease;
  	}
	
  	.search-fade-enter,.search-fade-leave-active{
  	  transform:translateX(-5rem);
  	}
</style>

<script>
	import NoteList from 'components/NoteList';

	export default{
		data(){
			return {
				showSearchTag:true,
				detailScroll:0
			}
		},
		components:{
			NoteList,

		},
		computed:{
			noResult(){
				return this.$store.state.searchConfig.searchResult
			},
			tag(){
				return '#'+this.$store.state.searchConfig.searchTag
			}
		},
		methods:{
			showTag(){
				let scrollT = document.documentElement.scrollTop || document.body.scrollTop;
				console.log(scrollT,this.detailScroll)
				if(scrollT>200 && scrollT>this.detailScroll){
					this.showSearchTag = false;
				}else if(scrollT<=this.detailScroll){
					this.showSearchTag = true;
				}
					this.detailScroll = scrollT;
			}
		},
		mounted(){
			window.addEventListener('scroll',this.showTag,false)
		},
		beforeDestroy(){
			window.removeEventListener('scroll',this.showTag,false)
		}
	}
</script>

