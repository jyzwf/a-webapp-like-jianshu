<!-- 文章列表 -->
<template lang='jade'>
	.article-list-teml
		ul
			li.qk-border-b(v-for='article in articleList')
				router-link.ele-justify(:to="{name:'noteDetail',params:{noteId:article._id}}")
					.snapshot-msg
						.writer-snapshot.ele-justify
							p(@click.prevent.stop='goCenter(article.poster._id)')
								img.img-margin-right.qk-round.img-24(v-lazy='article.poster.headimgurl',v-if='article.poster')
								span.img-margin-right.article-writer(v-if='article.poster') {{article.poster.username}}
							time {{article.time.split(' ')[0]}}
						p.text-snapshot.line-clamp {{article.title}}
						p.others-evaluation.ele-justify
							span.article-tag.qk-round-6(v-show='article.topic') {{article.topic}}
							span.evaluation 阅读{{article.pv}} · 评论{{article.comment_num}} · 打赏{{article.reward_num}}
					.snapshot-img(v-if='article.img')
						img.qk-round-4(v-lazy='article.img')
		p.loader-end {{'-- ' + loaderWords+' -- '}}
</template>

<style lang='less' scoped>
@writer-color:#4094c7;
@evaluation-color:#999;
@tag:#e78170;
/*@end-color:#e0e0e0;*/
@white:#fff;
	ul{
		padding-left:0.16rem;
		width:100%;
		background: @white;
	}
	li{
		padding:0.16rem 0.16rem 0.16rem 0;
		
		&:last-child{
			border:none;
		};

		a{
			width:100%;
		}

		.snapshot-msg{
			flex:auto;
		}
		/*用户信息*/
		.writer-snapshot{
			font-size: 0.13rem;
			justify-content: flex-start;
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
		/*文章快照*/
		.text-snapshot{
			margin:0.08rem 0;
			font-size: 0.14rem;
			letter-spacing: 0.01rem;
			-webkit-line-clamp: 2;
			word-break: break-all;
		}
		
		/*文章阅读量相关*/
		.others-evaluation{
			justify-content: flex-start;
			font-size: 0.1rem;
			
			.article-tag{
				color:@tag;
				padding: 0.02rem 0.04rem;
				border:0.01rem solid @tag;
				margin-right: 0.08rem;
				font-size: 0.09rem;
			}

			.evaluation{
				color:@evaluation-color;
				letter-spacing: 0.01rem
			}
		}

		.snapshot-img{
			margin-left: .12rem;
			min-width: 0.64rem;
			width:.64rem;
			height:.64rem;
			img{
				width:100%;
				height:100%;
				object-fit: cover;
			}
		}
	}

/*	.loader-end{
		text-align: center;
		font-size: .14rem;
		padding: .12rem;
		letter-spacing: 0.01rem;
		color:@end-color;
	}*/

</style>

<script type="text/javascript">
	export default{
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
		}
	}
</script>