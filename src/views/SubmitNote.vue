<!-- 投稿标签 -->
<template lang="jade">
	#submit-tags
		QkHeader(url='javascript:window.history.back();return false;')
		.blank-div
		section
			Submit-note-list(needSubmit='true',@toSubmit='submitNote')
</template>

<style lang='less' scoped>



	#submit-tags{
		padding-bottom: .8rem;
	}
	.blank-div{
		height:.48rem;
	}

	section{
		/*padding-left: .16rem;*/
	}

	
</style>

<script type="text/javascript">
	import QkHeader from 'components/QkHeader';
	import SubmitNoteList from 'components/SubmitNoteList';
	export default{
		data(){
			return {
				topicsList:[],
				topicSelect:'',
				url:'topic/list',
				// isSubmitOver:true
			}
		},
		components:{
			QkHeader,
			SubmitNoteList
		},
		computed:{
			token(){
				return window.localStorage.qkT?window.localStorage.qkT:'';
			},
			sendData(){
				return {
					page_id:this.$route.params.pageId,
					reqtopic:this.topicSelect,
					token:this.token
				}
			}
		},
		methods:{
			submitNote(item){
				item.submitOver = false;
				if(item.isSubmit){
					return false;
				}

				this.topicSelect = item.name;
				this.$http.post(`${this.$store.state.baseData.host}users/submit/page`,this.sendData,{"emulateJSON":true,"emulateHTTP":true})
				.then((data)=>{
					let formatData = data.data;
					if(formatData.code==0){
						item.isSubmit = true;
					}else if(formatData.code==11000){

						alert('这篇文章你已经投稿过了哦');
						// item.isSubmit = true;
					}else if(formatData.code==4002){
						
						this.$store.dispatch('judge_islogin',true);
						return false;
					}

					item.submitOver = true;
				},err=>{
					alert('服务器开小差啦');
					item.isSubmitOver = true;
				})
			},
			addScroll(){
				this.$store.dispatch('scrollLoader',{
					url:this.url,
					el:document.querySelector('.submit-note-list .loader-end'),
					scale:.3
				})
			}
		},
		mounted(){
			this.$store.dispatch('can_close_login',true);
			this.$store.dispatch('reset_list');
			this.$store.dispatch('header_title','投稿')


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