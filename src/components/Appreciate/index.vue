<!-- 赞赏框 -->
<template lang="jade">
	#appreciate-box(@touchmove='forbid($event)',@click.self='cancel')
		.appreciate-wrapper.qk-round-6
			section(v-if='!qrCodeShow')
				header
					img.qk-round.img-50(:src='appreciatePerson')
					p 打赏给Ta
				.appreciateMoney
					h1 {{appreciateMoney}}<sub>元<sub>
					p(@click='gerRandom') 换一换
				.appreciate-act
					button.init-btn(@click='sureAppreciate') 赏 
				#appreciate-qrcode
			section(v-if='qrCodeShow')
				header.qrMsg 请长按或者扫一扫进行打赏
				img.appreciate-img(:src='appreciateQr',attr='')
			

</template>

<style lang='less' scoped>
@white:#fff;
@gray:rgba(0,0,0,.38);
@give:#fc4766;
@change:#4395ff;
	#appreciate-box{
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
			p{
				color:@gray;
				font-size: .14rem;
				margin-top: .04rem;
			}

			&.qrMsg{
				font-size: .16rem;
				font-weight: 500;
				white-space: nowrap;
			}
		}

		.appreciate-wrapper{
			position: absolute;
			top:50%;
			transform: translateY(-50%);
			left:.5rem;
			right:.5rem;
			background: @white;
			padding:.34rem 0;
			text-align: center;
			-webkit-user-select:none;
			user-select:none;
			z-index: 9;
		}

		.appreciateMoney{
			margin:0 0 .1rem 0;
			h1{
				font-weight: 500;
				font-size: .4rem;

				sub{
					vertical-align: baseline;
					font-size: .12rem;
				}
			}

			p{
				color:@change;
			}
		}

		.appreciate-act{
			button{
				padding: .05rem 0.32rem;
				background: @give;
				color:@white;
				border-radius: .2rem;
				font-size: .16rem;
				font-weight: 500;
			}
		}
		label{
			white-space: nowrap;
		}
		#appreciate-qrcode{
			position: absolute;
			left:999rem;
			opacity: 0;
		}

		.appreciate-img{
			margin: .16rem 0;
			width: 80%;
			-webkit-user-select:all;
			user-select:all;
		}
	}
</style>

<script type="text/javascript">

function convertCanvasToImage(canvas) {
    return canvas.toDataURL("image/jpeg");
}

	import qrcode from '../../libs/qrCode.js';

	export default{
		props:['appreciateTitle','appreciatePerson'],
		data(){
			return{
				showAppreciate:true,
				appreciateMoney:'',
				appreciateQr:'',
				qrCodeShow:false
			}
		},
		computed:{
			detailId(){
				if(this.$route.params.noteId){
					return this.$route.params.noteId
				}else if(this.$route.params.videoId){
					return this.$route.params.videoId
				}else if(this.$route.params.debateDetailId){
					return this.$route.params.debateDetailId
				}
			}
		},
		methods:{
			forbid(ev){
				ev.preventDefault();
			},
			cancel(){
				this.$emit('hideAppreciate')
			},
			gerRandom(){
				this.appreciateMoney = (Math.random()*6).toFixed(2)
			},
			getQRCode(url){
				$("#appreciate-qrcode").qrcode({
               		render : "canvas",    //    设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
               		text : url,    //   扫描二维码后显示的内容,可以直接填一个网址，扫描二维码后自动跳向该链接
               		width : "2000",               //二维码的宽度
               		height : "2000",              //二维码的高度
               		background : "#ffffff",       //二维码的后景色
               		foreground : "#000000",        //二维码的前景色          //二维码中间的图片
            	});       
            	var qrcodeCanvas = document.querySelector('#appreciate-qrcode canvas')
            	this.appreciateQr = convertCanvasToImage(qrcodeCanvas);
			},
			sureAppreciate(){
				this.$http.post(`${this.$store.state.baseData.host}pay/page/createOrder`,{
            		title:this.appreciateTitle,
            		money:this.appreciateMoney,
            		page_id:this.detailId,
            		user_id:this.$store.state.aboutNote.userInfo._id
            	},{"emulateJSON":true,"emulateHTTP":true})
            	.then(data=>{
            		let formatData = data.data;
					if(formatData.code == 0){
						this.getQRCode(formatData.msg.code_url);
						this.qrCodeShow = true;
					}else{
						alert('服务器开小差啦');
					}
            	},err=>{
            		alert('服务器开小差啦')
            	})
			}
		},
		mounted(){
			this.gerRandom();
		}
	}
</script>