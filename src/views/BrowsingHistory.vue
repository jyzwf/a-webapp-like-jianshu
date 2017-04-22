<!-- 浏览历史 -->
<template lang='jade'>
	.my-submit
		QkHeader
		.blank-div
		ul
			li(v-for='b in browseList')
				router-link.qk-border-b.ele-justify(:to="{name:'noteDetail',params:{noteId:b.page_id._id}}")
					h4 {{b.page_id.title}}
					time {{b.updateTime.replace(/2016\-/g,'')}}
		p.loader-end {{'-- ' + loaderWords+' -- '}}

</template>

<style lang='less' scoped>
@white:#fff;
@submit:#fdcd38;
@black-a:rgba(0,0,0,.87);
@end-color:#e0e0e0;
	.my-submit{
		padding-bottom: .8rem;
		height:100%;
		background: @white;
	}
	.blank-div{
		height:.5rem;
	}

	li a{
		padding: .16rem;
		h4{
			font-size: .18rem;
			color:@black-a;
			margin-right: .1rem;
		}

		time{
			white-space: nowrap;
		}

		
	}

	.loader-end{
		text-align: center;
		font-size: .14rem;
		padding: .12rem;
		letter-spacing: 0.01rem;
		color:@end-color;
	}
</style>

<script type="text/javascript">
	import QkHeader from 'components/QkHeader';
	export default{
		data(){
			return{
				url:'users/history/list'
			}
		},
		components:{
			QkHeader
		},
		computed:{
			token(){
				return window.localStorage.qkT?window.localStorage.qkT:'';
			},
			dataOver(){		//数据是否加载完
				return this.$store.state.scrollLoadList.loadingOver
			},
			loaderWords(){		//底部显示的提示文字
				return this.dataOver?'end':'loading'
			},
			browseList(){		//当前浏览的列表
				return this.$store.state.scrollLoadList.LoadingList
			},
		},
		methods:{
			addScroll(){
				this.$store.dispatch('scrollLoader',{
					url:this.url,
					el:document.querySelector('#video-list .loader-end'),
					scale:.3
				})
			}
		},
		mounted(){
			// 设置顶部title以及请求的数据
			this.$store.dispatch('reset_list');
			this.$store.dispatch('header_title','我的足迹')
			
			this.$store.dispatch('add_extra_data',{
				token:this.token
			});
			// 请求数据
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