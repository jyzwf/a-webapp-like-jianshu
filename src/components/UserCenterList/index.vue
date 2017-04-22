<!-- 文章列表 -->
<template lang='jade'>
	.user-article-list-teml
		ul
			li.qk-border-t-b(v-for='article in articleList')
				router-link(:to="{name:'noteDetail',params:{noteId:article._id}}")
					h2.text-title {{article.title}}
					.text-content.line-clamp {{article.content.replace(/&lt;[^>]*?&gt;/gi,'').slice(0,50)}}
					img.text-img.qk-round-4(v-lazy='article.img',v-if='article.img')
					.writer-snapshot.ele-justify(v-show='!isSelf')
						p(@click.prevent.stop='goCenter(article.poster._id)')
								img.margin-right-8.qk-round.img-20(v-lazy='article.poster.headimgurl',v-if='article.poster')
								span.img-margin-right.article-writer(v-if='article.poster') {{article.poster.username}}
							time {{article.time.split(' ')[0]}}
		.loader-end {{'-- ' + loaderWords+' -- '}}
</template>

<style lang='less' scoped>
@writer-color:rgba(0, 0, 0, 0.54);
@evaluation-color:#999;
@tag:#e78170;

@white:#fff;
	ul{
		width:100%;
		
	}
	li{
		padding:0.12rem 0.16rem 0.16rem;
		margin-bottom: .12rem;
		background: @white;

		&:before{
			top:-0.02rem;
		};
		
		&:last-child{
			margin-bottom:0;
		};

		a,.text-img{
			width:100%;
		}

		.text-img{
			max-height: 1.44rem;
			object-fit: cover;
		}

		.text-title{
			letter-spacing: 0.01rem;
			font-size: .14rem;
			margin-bottom: 0.01rem;
		}

		.text-content{
			font-size: .13rem;
			letter-spacing: 0.01rem;
			line-height: 1.5;
			margin-bottom: 0.1rem;
			-webkit-line-clamp: 2;
		}

		}

		.writer-snapshot{
			font-size: 0.13rem;
			margin-top: .12rem;
			img{
				object-fit: cover;
			}

			span{
				color:@writer-color;
			}

			time{
				vertical-align: middle;
			}
		}



</style>

<script type="text/javascript">
	export default{
		props:['isSelf'],
		computed:{
			dataOver(){		//数据是否加载完
				return this.$store.state.scrollLoadList.loadingOver
			},
			loaderWords(){		//底部显示的提示文字
				return this.dataOver?'end':'loading'
			},
			articleList(){		//当前文章的列表
				return this.$store.state.scrollLoadList.LoadingList
			}
		},
		methods:{
			goCenter(id){
				this.$router.push({name:'personalHomepage',params:{userId:id}})
			}
		},
		
	}
</script>