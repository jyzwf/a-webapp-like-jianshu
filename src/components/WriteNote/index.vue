<template lang='jade'>
	.to-write
		.write-action.qk-border-b
			.publish-tag.qk-wave(@click='quote')
				img(src='../../assets/ic_format_quote.svg')
			.publish-tag.qk-wave(@click='selectTags')
				img(src='../../assets/ic-tag.svg')
			.upload-imgs.qk-wave
				img(src='../../assets/ic-cam.svg')
				#qiniu_container
					#pickfiles
			.publish-tag.qk-wave
				img(src='../../assets/ic-div.svg',@click='divideLine')
			span.qk-wave.preview-icon(@click='preview',:class="{isViewing:showPreview}")
			span.to-publish(@click='beginPublish') 发布

		.write-info
			.write-title
				input(placeholder='添加标题',v-model='title')
				span {{(count)+ '/' +limit}}
			.write-content
				#contentEdit(contenteditable="true",@blur='hidePlaceholder(0)',@focus='hidePlaceholder(1)')
				p.placeholder(v-if='p') 说说你的心得吧
		
		loading(:loadingWord='noticeWords',v-show='showNotice')

		<!-- 选择标签 -->
		transition( name="tag-fade" mode="out-in")
			.choose-tag(v-show='showTags',@click.self='hideSelectTag')
				.tag-model
					p 填写标签
					.tags-choosed
						input(placeholder='自定义标签(可选)',v-model='customTag')
					.tag-success(@click='successSelect') 完成

		transition(name="write-fade" ,mode='out-in')
			preview(:previewHtml='previewContent',:customTagShow='customTag',:articleTitle='title',v-if='showPreview')

</template>

<style scoped lang='less'>
@white:#fff;
@limit:rgba(0, 0, 0, 0.38);
@addFile:#D9D9D9;
@black-a:rgba(0, 0, 0, 0.87);
@placeholder:#afafaf;
@publishActive:rgba(255,255,255,.4);
@shadow-color:rgba(0, 0, 0, .12);
@files-bg:#f8f8f8;
@tags-choose:rgba(0, 0, 0, 0.5);
@choosed-color:#fafafa;
@choosed-tag:#333;
@unchoosed-color:#999;

	.write-action{
		display:flex;
		padding:0rem 0.12rem 0rem 0.16rem;
		align-items:center;
		justify-content: flex-end;
		position:fixed;
		width:100%;
		height:0.48rem;
		left:0;
		top:0;
		/*box-shadow: 0 0.01rem 0.02rem 0 @shadow-color;*/
		background:@white;
		    z-index: 9;
		*{
			cursor: pointer;
		}
		.publish-tag,.preview-icon{
			width:0.24rem;
			height:0.24rem;
			margin-right:0.32rem;

			img{
				width:100%;
				height:100%;
			}
		}
		.to-publish{
			padding:0.06rem .12rem;
			border-radius:0.2rem;
			font-size:0.14rem;
		}

		.preview-icon{
			background:url('../../assets/ic-review.svg') center no-repeat;
			background-size:0.24rem 0.24rem;
			margin-right:0.2rem;
			&.isViewing{
				background:url('../../assets/ic-review-off.svg') center no-repeat;
				background-size:0.24rem 0.24rem;
			}
		}
	}

	/*选择标签*/
	.choose-tag{
		position:fixed;
		left:0;
		top:0;
		width:100%;
		height:100%;
		z-index:200;
		display:flex;

		&:before{
			content: "";
			width:100%;
			height:100%;
			position:absolute;
			left:0;
			top:0;
			background:@tags-choose;
			z-index:9;
		}
		.tag-model{	
			width:3.12rem;
			margin:auto;
			background:@white;
			z-index:10;
			padding:0.16rem;
			border-radius:0.06rem;

			p{
				font-size: 0.13rem;
				font-weight:500;
				color:@black-a;
				margin-bottom:0.16rem;
			}

			.tags-choosed{
				background:@choosed-color;
				padding:0.08rem .1rem;
				border:0.01rem solid @shadow-color;
				border-radius:0.06rem;

				.tag-cell{
					background:@choosed-tag;
					
				}

				img{
					width:0.14rem;
					height:0.14rem;
					margin-left:0.04rem;
				}
			}

			.tag-cell{
				padding:0.08rem .1rem;
				font-weight: 500;
				color:@white;
				font-size:0.13rem;
				margin-right:0.08rem;
				border-radius:0.03rem;
				margin-bottom:0.08rem;
				background:@unchoosed-color;
				cursor:pointer;
			}

			input{
				display:block;
				background:transparent;
				font-size:0.13rem;
				width:100%;
			}

			.tags-container{
				padding:0.16rem 0.1rem 0.04;
			}

			.tag-success{
				padding:0.1rem;
				text-align:center;
				color:@black-a;
				font-size:0.13rem;
			}
		}
	}

	.upload-imgs{		//上传图片的按钮
		width:0.24rem;
		height:0.24rem;
		margin-right:0.32rem;
		position:relative;

		img,#qiniu_container{
			width:100%;
			height:100%;
		}

		#qiniu_container{
			position:absolute;
			left:0;
			top:0;

			&>div{
				width:100%;
				height:100%;
			}
		}

	}

	.write-info{
		padding:0.5rem 0.2rem 0;
		background:@white;

		.write-title{		//note title
			display: flex;
			align-items:center;
			margin: 0.16rem 0;
			
			input{
				flex:auto;
				font-size:0.18rem;
				font-weight: bold;
				margin-right:0.1rem;
				letter-spacing: 0.02rem;
			}

			span{
				color:@limit;
				font-size:0.15rem;
				letter-spacing: 0.01rem;
			}
		}
	}

	.write-content{		//note内容
		position:relative;
		font-size:0.15rem;
		#contentEdit{
			outline:none;
			letter-spacing:0.01rem;
			user-select :text;
		}

		.placeholder{
			position:absolute;
			left:0;
			top:0rem;
			color:@placeholder;
			pointer-events: none;
		}
	}



.write-fade-enter-active, .write-fade-leave-active {		//预览的切换
    transition: all .25s ease;
  }

  .write-fade-enter,.write-fade-leave-active{
    opacity:0;
    transform:translateX(3rem);
  }

.tag-fade-enter-active, .tag-fade-leave-active {		//选择标签的切换
    transition: all .25s ease;
  }

  .tag-fade-enter,.tag-fade-leave-active{
    opacity:0;
    transform:translateY(-3rem);
  }


	
</style>

<script>

import Loading from 'components/Loading';
import uuid from 'node-uuid';
// import UploaderFiles from 'components/UploaderFiles';
import Preview from 'components/Preview';

	export default{
		data(){
			return{
				title:'',	//标题
				content:'',	//内容
				limit:25,	//最大字数
				uploaderFiles:[],	//已经上传的文件数组
				uploaderToken:'',	//七牛的token
				noticeWords:['正','在','上','传'],
				showNotice:false,
				isPublishing:false,
				p:true,			//输入框提示是否显示的开关
				publishingTop:0,	//发布按钮的距离顶部高度
				isShowPublish:true,	//发布按钮在设置好top后再显示的开关
				showPreview:false,
				previewContent:'',
				showTags:false,	//是否显示标签选项的model
				customTag:'',	//自定义标签
				hasSelectTags:{},	//已经选择的标签
				// provideSelectTags:[		//提供选择的标签
					
				// ],
				xb:true
			}
		},
		components:{
			Loading,
			Preview
		},
		computed:{
			count(){	//字数随输入的字数的长度改变而改变
				return this.title.trim().length
			},
		},
		watch: {
  		  title (newVal) {			//限制字数，超出自动截断
  		      this.title = newVal.slice(0, this.limit)
  		  }
  		},
		beforeCreate(){
			this.$store.dispatch('can_close_login',false);
			if(!window.localStorage.qkT){
				this.$store.dispatch('judge_islogin',true);
				// this.$store.commit('SETCOMMITKEY','SETDETAILUSERINFO');
				return false;
			}

			this.$http.post(`${this.$store.state.baseData.host}users/check/page`,{
            		token:window.localStorage.qkT
            	},{"emulateJSON":true,"emulateHTTP":true})
            .then(data=>{
            	let formatData = data.data;
				if(formatData.code == 0){
					this.$store.dispatch('set_userinfo',formatData.result);
					window.localStorage.qkT = formatData.token;
				}else if(formatData.code ==4002){
					this.$store.dispatch('judge_islogin',true);
				}
            },err=>{
            	alert('服务器开小差啦')
            })
		},
  		methods:{
  			hidePlaceholder(type){			//隐藏提示字
  				if(type === 0){
  					if(document.querySelector('#contentEdit').innerHTML.trim() == ''){
  						this.p = true;
  						return false;
  					}
  				}
  				this.p = false
  			},

  			insertImg(url){
  				let w = document.getElementById('contentEdit').offsetWidth;
  				var img = document.createElement("img"),
  					p = document.createElement("p");
  				img.setAttribute("src", `//qiniu.xtongtong.com/${url}?imageView2/2/w/${w}`);
  				p.innerHTML = '&nbsp;';
  				document.querySelector('#contentEdit').appendChild(img);
  				document.querySelector('#contentEdit').appendChild(p);

  				// 移动光标
  				if (window.getSelection) {//ie11 10 9 ff safari
        		   document.querySelector('#contentEdit').focus(); //解决ff不获取焦点无法定位问题
        		    let range = window.getSelection();//创建range
        		    range.selectAllChildren(document.querySelector('#contentEdit'));//range 选择obj下所有子内容
        		    range.collapseToEnd();//光标移至最后
        		}else if (document.selection) {//ie10 9 8 7 6 5
        		  let range = document.selection.createRange();//创建选择对象
        		      range.moveToElementText(document.querySelector('#contentEdit'));//range定位到obj
        		      range.collapse(false);//光标移至最后
        		      range.select();
        		}
  				
  			},

  			preview(){		//预览

  				this.showPreview = !this.showPreview;

  				if(this.showPreview){
  					this.previewContent = document.getElementById('contentEdit').innerHTML.replace(/&nbsp;|font-size\:[\s]*[\d]*px;/gi,'');
  				}
  			},

  			divideLine(){			//分割线
  				document.execCommand('insertHorizontalRule',false); 
  			},

  			quote(){			//分割线
  				if(this.xb){
  					document.execCommand('formatBlock',false,'BLOCKQUOTE'); 
  				}else{
  					document.execCommand('formatBlock',false,'div'); 
  				}
  				
  				this.xb = !this.xb
  			},

  			selectTags(){		//显示标签选择
  				this.showTags = true;
  			},

  			hideSelectTag(){	//隐藏标签选择
  				this.showTags = false;
  			},

  			toSelectTags(tag){		//选择标签
  				this.hasSelectTags=tag;
  			},

  			successSelect(){	//完成标签的选择
  				if(!this.hasSelectTags.name){
  					alert('请选择标签');
  					return false;
  				}

  				this.hideSelectTag();
  			},
  			// removeSelectTags(){		//删除所选标签
  			// 	this.hasSelectTags = {};
  			// },

  			uploader_img(){			//七牛上传图片配置
                let _this = this;
                            this.uploader = Qiniu.uploader({
                            runtimes: 'html5,flash,html4', 
                            browse_button: 'pickfiles',    
                            uptoken: _this.uploaderToken,      
                            domain: 'qiniu.xtongtong.com', 
                            get_new_uptoken: false,  
                            container: 'qiniu_container',   
                            max_file_size: '100mb',     
                            flash_swf_url: 'http://cdn.staticfile.org/Plupload/2.1.1/Moxie.swf', 
                            max_retries: 3,               
                            dragdrop: false, 
                            chunk_size: '4mb', 
                            auto_start: true,
                            unique_names:false,
                            save_key: false,
                            multi_selection: false,
                            init: {
                                'FilesAdded': function(up, files) {
                                	console.log(files);
                                	_this.showNotice = true;
                                },
                                'FileUploaded': function(up, file, info) {
                                	console.log(info);
                                	let formatInfo = JSON.parse(info);
                                	// _this.uploaderFiles.push(formatInfo.key);
                                	// 插入图片
                                	_this.noticeWords = ['上','传','成','功'];
                                	_this.showNotice = false;
                                	_this.insertImg(formatInfo.key);
                                },
                                'UploadComplete': function() {
                                },
                                'Error': function(up, err, errTip) {
                                      _this.noticeWords = ['上','传','失','败'];
                                      _this.showNotice = false;
                                },
                                'Key': function(up, file) {		//配置文件名为:uuid+文件名后缀名
                                	let file_subfix = file.name.replace(/[\s\S]*\./gi,'.');
                                    var key = 'page/'+uuid.v1()+file_subfix;
                                    return key
                                }
                            }
                        });
				},
				validata(){	//验证表单方法
					this.uploaderFiles = [];
					let content = document.querySelector('#contentEdit').innerHTML;
					Array.from(document.querySelectorAll('#contentEdit img')).map(x=>{
						console.log(x.src);
						this.uploaderFiles.push('//qiniu.xtongtong.com/'+x.src.replace(/[\s\S]+\/\/qiniu.xtongtong.com\/([\s\S]+)\?[\s\S]+/,'$1'))
					});

					// console.log(this.uploaderFiles,'++++++++++')
					if(this.title.trim() == ''){
						return '请输入标题';
					}

					if(content.trim() == ''){
						return '请输入文章内容'
					}
					// if(!this.hasSelectTags.name){
					// 	return '请选择标题'
					// }
				},
				beginPublish(){		//通过验证后开始发布
					if(this.isPublishing){
						return false
					}

					this.isPublishing = true;

					let err = this.validata();
					if(err){
						alert(err);
						this.isPublishing = false;
						return false;
					}



					this.noticeWords = ['正','在','发','布'];
                    this.showNotice = true;



					let sendData = {
						title:this.title,
						tag:this.customTag,
						content:document.querySelector('#contentEdit').innerHTML.trim().replace(/&nbsp;/gi,''),
						poster:this.$store.state.baseData.userInfo._id,
						uploaderFiles:this.uploaderFiles
					},
					_this = this;

					// console.log(sendData);
					// return false;
					this.$http.post(`${this.$store.state.baseData.host}postpage`,sendData,{"emulateJSON":true,"emulateHTTP":true})
						.then(function(res) {
							console.log(res)
							if(res.data.code === 0){
								_this.noticeWords = ['发','布','成','功'];
                    			let t = setTimeout(()=>{
                    				_this.showNotice = false;
                    				clearTimeout(t)
                    				this.isPublishing = false;
                    				_this.$router.push('/');
                    			},1100)
							}else{
								_this.noticeWords = ['发','布','失','败'];
								let t = setTimeout(()=>{
                    				_this.showNotice = false;
                    				clearTimeout(t)
                    				this.isPublishing = false;
                    			},1100)
							}


							
                		},function(err){
                	    	console.log(err)
                	    	_this.noticeWords = ['发','布','失','败'];
							let t = setTimeout(()=>{
                    			_this.showNotice = false;
                    			clearTimeout(t)
                    			this.isPublishing = false;
                    		},1100)
                		})
				}
  		},



  		mounted(){
  			//获取七牛的token
  			this.$http.get(`${this.$store.state.baseData.host}uptoken`).then((data)=>{
				this.uploaderToken = data.data.msg.uptoken;
				this.uploader_img();
			})

			// this.$http.get(`${this.$store.state.baseConfig.host}topic/recommend`).then(data=>{
			// 	if(data.data.code == 0){
			// 		this.provideSelectTags = data.data.msg
			// 	}
			// })

  			//显示按钮
			this.isShowPublish = false;
  		},
  		beforeDestroy(){
  			this.$store.dispatch('judge_islogin',false);
  			this.$store.dispatch('clear_userinfo');
  		}
	}
</script>