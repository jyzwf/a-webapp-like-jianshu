<template lang='jade'>
	.my-focus(@click.capture='hideSelect')
		header.v-h-center.qk-border-b
			span(@click='showSelect') {{focusType[nowSelect]}}
			img.img-20(src='../../assets/ic_expand_more.svg')
		ul.select.qk-round-4(v-show='isShowSelect')
				li(v-for='(val,key) in focusType',:class="{active:key==nowSelect}",@click='changeSelect(key)') {{val}}
		.blank-div
		ul
			li.qk-border-b(v-for='f in focusList',v-show='nowSelect=="all"||f.type==nowSelect',@click='goCenter(f)')
				.focus-cell
					.focus-main.ele-justify
						img.margin-right-12.img-4.qk-round-8(v-lazy='f.img')
						.focus-snop
							h4 {{f.name}}
							p.line-clamp {{f.page_title?f.page_title:'Ta很懒，什么也没有留下'}}
					img.arrow.img-24.cell-icon(src='../../assets/ic-arrow-right.svg')

		p.loader-end {{'-- ' + loaderWords+' -- '}}		
</template>

<style scoped lang='less'>
@white:#fff;
@words:rgba(0, 0, 0, 0.54);
@btn-bg:#f8f8f8;
@header:rgba(255,255,255,.9);

@focus-color:#ff2741;
@black-a:rgba(0, 0, 0, 0.87);
@white-a:rgba(255,255,255,.54);
/*@end-color:#e0e0e0;*/
	.my-focus{
		background: @white;
		height:100%;
		
		header{
			height:.48rem;
			font-size: .16rem;
			position: fixed;
			left:0;
			top:0;
			width:100%;
			background: @header;
		}

		.select{
			background: @black-a;
			position: fixed;
			left:50%;
			transform:translateX(-50%);
			top:.48rem;
			z-index: 9;

			&:before{
				content:'';
				width:0;
				height:0;
				border:0.1rem solid @black-a;
				position: absolute;
				left:50%;
				transform:translateX(-50%) rotate(45deg);
				top:-0.06rem;
			};

			li{
				color:@white-a;
				padding:0.08rem .16rem;
				font-size: .14rem;
				position: relative;
				z-index:10;

				&.active{
					color:@white;
				}
			}
		}
		.loading{
		 	text-align:center;
		 	padding:0.1rem;
	    }

	    .focus-main{
	    	flex:auto;
	    	justify-content: flex-start;
	    }

	    .blank-div{
			height:.5rem;
		}

		.focus-cell{
			display: flex;
			padding:.16rem;
			align-items:center;

			&:last-child{
				border:none;
			}
		}

		h4{
			font-size: .18rem;
			font-weight: 500;
		}

		.focus-snop{
			p{
				-webkit-line-clamp: 1;
				color:@words;
				font-size: .12rem;
			}
		}
		
		.arrow{
			margin-left: .2rem;
		}

		
	}

	
</style>


<script>
	import QkHeader from 'components/QkHeader';
	export default{
		data(){
           return{
           	   nowSelect:'all',
           	   focusType:{
           	   		all:'全部关注',
           	   		'focus_user':'只看用户',
           	   		'focus_topic':'只看专题'
           	   },
           	   renderOver:false,
           	   showFocus:false,
           	   url:'users/focus/list',
           	   isShowSelect:false
           }
		},
		computed:{
			// user_id(){
			// 	return this.$route.params.myId
			// },
			dataOver(){		//数据是否加载完
				return this.$store.state.scrollLoadList.loadingOver
			},
			loaderWords(){		//底部显示的提示文字
				return this.dataOver?'end':'loading'
			},
			focusList(){		//当前文章的列表
				return this.$store.state.scrollLoadList.LoadingList
			},
			token(){
				return window.localStorage.qkT?window.localStorage.qkT:'';
			}
		},
		components:{
			QkHeader
		},
		methods:{
			goCenter(f){
				if(f.type=='focus_user'){
					this.$router.push({name:'personalHomepage',params:{userId:f.id}})
				}else if(f.type=='focus_topic'){
					this.$router.push({name:'specialIntr',query:{type:f.id,name:f.name}})
				}
			},
			addScroll(){
				this.$store.dispatch('scrollLoader',{
					url:this.url,
					el:document.querySelector('.my-focus .loader-end'),
					scale:.3
				})
			},
			changeSelect(key){		//改变select
				this.nowSelect = key;
				this.hideSelect();
			},
			showSelect(){
				this.isShowSelect = true;
			},
			hideSelect(){
				this.isShowSelect = false;
			}

		},
		mounted(){

			this.$store.dispatch('reset_list');
			this.$store.dispatch('header_title','我的关注')
			
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