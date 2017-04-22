<!-- 专题列表 -->
<template lang="jade">
	.submit-note-list
		ul.qk-border-t-b(:class="{'paddingLeft':!needSubmit}")
			li.qk-border-b(v-for='t in topicsList')
				router-link.ele-justify(:to="{name:'specialIntr',query:{type:t._id,name:t.name}}")
					img.img-32.qk-round-6.margin-right-8(:src='t.img')
					.tag-main.ele-justify
						.tag-intr
							p.submit-title {{t.name}}
							p {{t.pagenumber+'篇文章 · '+t.followernumber+'人关注'}}
						.sub-action(v-if='needSubmit')
							button.init-btn(v-show='t.submitOver',@click.prevent.stop='submitNote(t)',:class="{checking:'t.isSubmit'}") {{t.isSubmit?'投稿成功':'投稿'}}
							span.is-submiting.qk-round.img-10(v-show='!t.submitOver')
		p.loader-end {{'-- ' + loaderWords+' -- '}}
</template>

<style lang="less" scoped>
@focus-color:#49be38;
@check:#d9d9d9;

@white:#fff;
.paddingLeft{
	padding-left:.16rem;
	background:@white
}

ul{
	background:@white;
	padding-left: .16rem;
	&:before{
			top:-0.02rem;
		};
}

	li{
		padding: .16rem .16rem .16rem 0;
		justify-content: flex-start;
		&:last-child{
			&:after{
				content:none;
			};
		};

		img{
			object-fit: cover;
		}

		.tag-main{
			flex:auto;
			font-size: .14rem;
			letter-spacing: 0.01rem;

			p:last-child{
				font-size:.1rem;
			};
		}

		.submit-title{
			margin-bottom: 0.04rem;
		}

		button{
			padding:0.04rem 0.08rem;
			border:0.01rem solid @focus-color;
			color:@focus-color;
			font-size:0.13rem;

			&:checking{
				color:@check;
				border:0.01rem solid @check;
				    white-space: nowrap;
			};
		}

		.is-submiting{
			border:0.04rem dashed @focus-color;
			padding:0.08rem;
			animation: loading 1.5s .3s cubic-bezier(.17,.37,.43,.67) infinite;
		}
	}



	@keyframes loading {
	    0 {transform: rotate(0deg);}
	    50% {transform: rotate(180deg);}
	    100% {transform: rotate(360deg);}
	}
</style>

<script type="text/javascript">
	export default{
		props:['needSubmit','submitOver'],

		computed:{
			dataOver(){		//数据是否加载完
				return this.$store.state.scrollLoadList.loadingOver
			},
			loaderWords(){		//底部显示的提示文字
				return this.dataOver?'end':'loading'
			},
			topicsList(){		//当前文章的列表
				return this.$store.state.scrollLoadList.LoadingList
			}
		},
		methods:{
			submitNote(item){
				this.$emit('toSubmit',item)
			}
		}
	}
</script>