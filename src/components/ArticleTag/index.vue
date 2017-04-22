<!-- 热门专题的tag -->
<template lang='jade'>
	.tag-categories
		slot(name='history')
		ul
			li.qk-round-6(v-for='(c,idx) in qkTopic', :class="{active:type=='index'&&idx==nowSelectNum}",@click='selectCategories(idx,c)') {{c.name}}
			li.loader-tiny(v-show='loading')
				img(src='../../assets/tiny.gif')

</template>

<style lang='less' scoped>
@tag:#e78170;
@font:#fff;
	.tag-categories{
		padding:0.16rem 0.1rem 0 0.16rem; 
		li{
			color:@tag;
			border:0.01rem solid @tag;
			display: inline-block;
			margin:0.05rem 0.12rem 0.05rem 0;
			padding:0.05rem 0.1rem;
			font-size: 0.12rem;

			&:not(.loader-tiny).active{
				background: @tag;
				color:@font;
			}
			
			&.loader-tiny{
				border:none;

				img{
					width: 0.24rem;
				}
			}
		}
	}
</style>

<script type="text/javascript">
	export default{
		props:['type','qkTopic','listUrl'],
		data(){
			return {
				nowSelectNum:0  //选中标签的序号
			}
		},
		computed:{
			loading(){
				return this.$store.state.articleListConfig.isLoader
			}
		},

		methods:{
			selectCategories(idx,c){
				if(this.loading){
					return false
				}
				this.nowSelectNum = idx;
				this.$store.commit('CHANGEINDEXTAG',idx);
				this.$store.commit('CHANGESENDKEY',{
					topic_id:c.id
				})
				this.$store.commit('RESETSENDDATA');
				this.$store.dispatch('loadData',{
					listUrl:this.listUrl
				});
			}
		}
	}
</script>