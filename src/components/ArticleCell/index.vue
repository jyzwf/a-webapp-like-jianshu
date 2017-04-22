<!-- 文章列表展示块 -->
<template lang="jade">
	.article-cell
		ul
			li(v-for='article in plateItem')
				router-link.ele-justify(:to="{name:'noteDetail',params:{noteId:article._id}}")
					.snapshot-msg
						h4.text-snapshot.line-clamp {{article.title}}
						p.text-snapshot-content.line-clamp {{article.content.replace(/&lt;[^>]*?&gt;/gi,'').slice(0,50)}}
					.snapshot-img.img-88(v-if='article.img')
						img.qk-round-8(v-lazy='article.img')
		p.loader-end(v-if='showLoading') {{'-- ' + loaderWords+' -- '}}		
</template>

<style lang='less' scoped>
@writer-color:#4094c7;
@evaluation-color:#999;
@tag:#e78170;
@white:#fff;
@content:rgba(0, 0, 0, 0.54);
@title:rgba(0, 0, 0, 0.87);
	ul{
		padding-left:0.16rem;
		width:100%;
		background: @white;
	}
	li{
		padding-right: .16rem;
		margin:0.16rem 0;
		
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
			font-size: 0.16rem;
			font-weight: 500;
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
			margin:0 0 0.04rem 0;
			font-size: 0.18rem;
			letter-spacing: 0.01rem;
			-webkit-line-clamp: 2;
			word-break: break-all;
			font-weight: 600;
			color:@title;
		}

		.text-snapshot-content{
			font-size: 0.16rem;
			-webkit-line-clamp: 3;
			color:@content;
			    line-height: 1.5;
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
			margin-left: .2rem;
			/*min-width: 0.64rem;
			width:.64rem;
			height:.64rem;*/
			img{
				width:100%;
				height:100%;
				object-fit: cover;
			}
		}
	}



</style>


<script type="text/javascript">

	export default{
		props:['showLoading','ClassifyPlateItem'],
		computed:{
			dataOver(){		//数据是否加载完
				return this.$store.state.scrollLoadList.loadingOver
			},
			loaderWords(){		//底部显示的提示文字
				return this.dataOver?'end':'loading'
			},
			plateItem(){		//当前文章的列表
				if(this.showLoading){
					return this.$store.state.scrollLoadList.LoadingList
				}else{
					return this.ClassifyPlateItem
				}
				
			},
		},
		methods:{
			goCenter(id){
				this.$router.push({name:'personalHomepage',params:{userId:id}})
			}
		}
	}
</script>