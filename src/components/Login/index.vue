<!-- 登录 -->
<template lang='jade'>
	#qk-login(@touchmove.self='forbid($event)',@click.self='hideLogin')
		.login-wrapper.qk-round-6
			header 登录
			p
				input.qk-round-4(type='tel',v-model='loginPhone',placeholder='请输入手机号码')
			.verification-code.ele-justify
				input.qk-round-4(type='number',v-model='loginCode',placeholder='短信验证码')
				button.init-btn.codeBtn(:disabled='isSendCode',@click='getCode') {{sendBtn}}
			footer
				button.init-btn.qk-round-4(:disabled='isCode',@click='finishLogin') 完成
</template>

<style lang='less' scoped>
@white:#fff;
@login-border:#e0e0e0;
	#qk-login{
		position: fixed;
		left:0;
		top:0;
		right: 0;
		bottom:0;
		display: flex;
		z-index: 999;
		&:before{		//灰色遮罩
			content:'';
			position: absolute;
			left:0;
			top:0;
			width:100%;
			height:100%;
			background:rgba(0,0,0,.5);
		};

		.login-wrapper{
			margin:auto;
			position: relative;
			background: @white;
			padding:0.16rem;
			width:3rem;
			
			input{
				
				border:0.01rem solid @login-border;
				padding:0.08rem;
				font-size:.13rem;
			}

			input[type=tel]{
				width:100%;
				margin-bottom: 0.08rem;
			}

			.codeBtn{
				padding:.08rem;
				font-size: .13rem;
			}
		}
	}

	header{
		text-align: center;
		font-size: 0.16rem;
		margin-bottom: 0.08rem;
	}

	footer{
		margin-top:.16rem;
		button{
			width:100%;
			display: block;
			text-align: center;
			padding:.08rem;
			border:0.01rem solid @login-border !important;
			font-size: .13rem;
		}
	}
</style>

<script type="text/javascript">
	export default{
		data(){
			return{
				loginPhone:'',
				loginCode:'',
				sendBtn:'获取验证码',
				isGetCode:false,
				time:60,
				t:null,
				_id:''
			}
		},
		computed:{
			isSendCode(){
				return !(/^1[3|4|5|7|8]\d{9}$/).test(this.loginPhone)
			},
			isCode(){
				return !(/^\d{6}$/).test(this.loginCode)
			},
			mutationKey(){
				return this.$store.state.baseData.commitSaveKey
			}
		},
		watch: {
  		  loginPhone (newVal) {			//限制字数，超出自动截断
  		      this.loginPhone = newVal.slice(0, 11)
  		  }
  		},
		methods:{
			forbid(ev){		//防止滑动
				ev.preventDefault();
			},
			hideLogin(){
				if(this.$store.state.baseData.isCloseLogin){
					this.$store.dispatch('judge_islogin',false);
					// this.$store.dispatch('SETLOGINSTATE',false)
				}
			},
			timeCount(){
				this.sendBtn = this.time+' s';
				console.log(this.time)
				if(this.time < 0 ){
					this.sendBtn = '获取验证码';
					clearTimeout(this.time);
					this.t = null;
					this.isGetCode = false;
					return false;
				}
				this.time-=1;
				this.t = setTimeout(this.timeCount,1000);
			},
			getCode(){
				if( !(/^1[3|4|5|7|8]\d{9}$/).test(this.loginPhone)){
            	    alert('请输入正确的手机号')
            	}
            	if(this.isGetCode){
            		return false;
            	}
            	this.isGetCode = true;
            	
            	this.$http.post(`${this.$store.state.baseData.host}users/sendsms`,{
            		mobile:this.loginPhone
            	},{"emulateJSON":true,"emulateHTTP":true})
            	.then(data=>{
            		let formatData = data.data;
					if(formatData.code == 0){
						this._id = formatData.msg;
						this.timeCount();
					}else if(formatData.code === 419 || formatData.code === 416){
						alert('请求过于频繁，请明天再试^^');
					}else{
						alert('手机号错误或不存在><');
					}
            	},err=>{
            		alert('服务器开小差啦')
            	})
			},
			finishLogin(){
				if( !(/^1[3|4|5|7|8]\d{9}$/).test(this.loginPhone)){
            	    alert('请输入正确的手机号')
            	}

            	if( !(/^\d{6}$/).test(this.loginCode)){
            	    alert('请输入验证码')
            	}

            	//发送登入
            	this.$http.post(`${this.$store.state.baseData.host}users/verifycode`,{
            		mobile:this.loginPhone,
            		code:this.loginCode,
            		_id:this._id
            	},{"emulateJSON":true,"emulateHTTP":true})
            	.then(data=>{
            		let formatData =data.data;

					if(formatData.code == 0){
						//保存token
						window.localStorage.qkT = formatData.token;
						this.$store.dispatch('set_userinfo',formatData.result);
						// this.$store.commit(this.mutationKey,formatData.result);
						this.$store.dispatch('judge_islogin',false);
					}else{
						alert('登入失败,请稍后再试');
					}
            	},err=>{
            		alert('服务器开小差啦')
            	})

			}
		}
	}
</script>


<!-- 31367f7ab17d920a0831187e2d6cfd70 -->