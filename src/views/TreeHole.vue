<!-- 树洞 -->
<template lang="jade">
	#tree-hole
		header.qk-border-b 推荐互动
		.blank-div
		ul
			li.qk-border-b(v-for='d in debateList',@click='goDetail(d.id)')
				img.img-35.qk-round-4.margin-right-8(:src='d.img')
				.tree-msg
					p.line-clamp.tree-title {{d.title}}
					p.line-clamp.tree-desc {{d.describe}}
					p.tree-num {{d.leavemsgnum+'条动态'}}
			li.loader-end {{'-- ' + loaderWords+' -- '}}
</template>

<style lang="less" scoped>
@header:rgba(255,255,255,.9);
@gray:rgba(0,0,0,.38);

@white:#fff;

	#tree-hole{
		padding-bottom:.8rem;
		background:@white;
		.blank-div{
			height:.48rem;
		}
		header{
			font-size:.13rem;
			position:fixed;
			left:0;
			top:0;
			width:100%;
			background:@header;
			padding-left:.16rem;
			height:.44rem;
			line-height:.44rem;
			z-index: 9;
		}

		ul{
			li:not(.loader-end){
				padding:.1rem .16rem;
				display:flex;
				align-items:flex-start;
				justify-conetnt:flex-start;

				&:last-child{
					&:after{
						content:none
					}
				}
			}

			.tree-msg{
				flex:auto;
			}

			.tree-title,.tree-desc{
				font-size:.14rem;
				-webkit-line-clamp: 1;

			}

			.tree-desc,.tree-num{
				color:@gray;
			}

			.tree-num{
				font-size:.1rem;
			}
		}

		
	}

</style>

<script>
	export default{
		data(){
			return{
				url:'discovery/debate/list'
			}
		},
		computed:{
			dataOver(){		//数据是否加载完
				return this.$store.state.scrollLoadList.loadingOver
			},
			loaderWords(){		//底部显示的提示文字
				return this.dataOver?'end':'loading'
			},
			debateList(){		//当前文章的列表
				return this.$store.state.scrollLoadList.LoadingList
			}
		},
		methods:{
			addScroll(){
				this.$store.dispatch('scrollLoader',{
					url:this.url,
					el:document.querySelector('.submit-note-list .loader-end'),
					scale:.3
				})
			},
			goDetail(id){
				this.$router.push({name:'debateList',params:{debateId:id}})
			}
		},
		mounted(){
			document.querySelector('#tree-hole').style.minHeight = window.innerHeight+'px';
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