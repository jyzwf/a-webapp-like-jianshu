<!-- 发布debate -->
<template lang='jade'>
	#publish-debate(@touchmove='forbid($event)',@click.self='cancel')
		.publish-wrapper.qk-round-6
			header 发布图文
			.wrapper-img
				img(:src='"//qiniu.xtongtong.com/"+publishImg',v-if='publishImg')
				#debate_container
					#debate_pickfiles
			textarea(autofocus,rows='3',v-model='publishContent',placeholder='描述下吧')
			.publish-btn
				button.init-btn(@click='toPublish') 发布

</template>

<style lang="less" scoped>
@white:#fff;
	#publish-debate{
		position: fixed;
		left:0;
		right:0;
		top:0;
		bottom:0;
		z-index: 99;
		*{
			font-size: .14rem;
		}

		header{
			margin-bottom:.1rem;
			font-size:.14rem;
			font-weight:500;
		}

		.publish-wrapper{
			position: absolute;
			top:50%;
			transform: translateY(-50%);
			left:.3rem;
			right:.3rem;
			background: @white;
			padding:.16rem;
			text-align: center;
			-webkit-user-select:none;
			user-select:none;
			z-index: 100;
			img{
				position:absolute;
				left:0;
				top:0;
				width: 100%;
    			height: 100%;
    			object-fit:cover
			}
		}

		.wrapper-img{
			position:relative;
			width:100%;
			height:2rem;
			max-height:2rem;
		}

		#debate_container{
			position:absolute;
			left:0;
			top:0;
			width: 100%;
    		height: 100%;

			&>div{
				width:100%;
				height:100%;
			}
		}

		textarea{
			width:100%;
			padding:.1rem;
			font-size: .14rem;
			border:0.01rem solid #e0e0e0;
			letter-spacing: .01rem;
			margin:.1rem 0;
		}

		.publish-btn{
			button{
				font-size:.14rem;
			}
		}
	}
</style>

<script type="text/javascript">
import uuid from 'node-uuid';
	export default{
		data(){
			return {
				publishContent:'',
				publishImg:'',
				uploaderToken:''
			}
		},
		methods:{
			uploader_img(){			//七牛上传图片配置
                let _this = this;
                            this.uploader = Qiniu.uploader({
                            runtimes: 'html5,flash,html4', 
                            browse_button: 'debate_pickfiles',    
                            uptoken: _this.uploaderToken,      
                            domain: 'qiniu.xtongtong.com', 
                            get_new_uptoken: false,  
                            container: 'debate_container',   
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
                                	// _this.showNotice = true;
                                },
                                'FileUploaded': function(up, file, info) {
                                	console.log(info);
                                	let formatInfo = JSON.parse(info);
                                	_this.publishImg=formatInfo.key;
                                },
                                'UploadComplete': function() {
                                },
                                'Error': function(up, err, errTip) {
                                      // _this.noticeWords = ['上','传','失','败'];
                                      // _this.showNotice = false;
                                },
                                'Key': function(up, file) {		//配置文件名为:uuid+文件名后缀名
                                	let file_subfix = file.name.replace(/[\s\S]*\./gi,'.');
                                    var key = uuid.v1()+file_subfix;
                                    return key
                                }
                            }
                        });
				},
				toPublish(){
					if(!this.publishImg && !this.publishContent){
						alert('说点什么吧^^');
						return false;
					}

					this.$http.post(`${this.$store.state.baseData.host}discovery/debate/leavemsg/post`,{
						debate_id:this.$route.params.debateId,
						content:this.publishContent,
						img:this.publishImg,
						user_id:this.$store.state.aboutNote.userInfo._id
					},{"emulateJSON":true,"emulateHTTP":true})
					.then((data)=>{
						let formatData = data.data;
						if(formatData.code==0){
							this.$store.dispatch('unshift_list',formatData.msg)
							this.cancel()
						}
					})
				},
				forbid(ev){
					ev.preventDefault();
				},
				cancel(){
					this.$emit('hidePublish')
				},
		},
		mounted(){
  			//获取七牛的token
  			this.$http.get(`${this.$store.state.baseData.host}uptoken`).then((data)=>{
				this.uploaderToken = data.data.msg.uptoken;
				this.uploader_img();
			})

			
  		},
	}
</script>