<template>
	<view class="login">
		<view class="hellow">
			<view class="t1">
				你好!
			</view>
			<view class="t2">
				欢迎登陆君佳优选
			</view>
		</view>
		<view class="mine_l">
			<image src="../../static/img/logo.png" class="mine_logo" mode="widthFix"></image>
		</view>
		<view class="sub_top">
			
			<button open-type="getUserInfo" lang="zh_CN" @getuserinfo="loginIn" class="btn blue ms round vx_login" @click="loginIn">
				<image src="../../static/img/weixdl.png" mode="" class="vx_img"></image>
				 <text>微信登录</text>
				</button>
		</view>
		<view class="s_bz_s">
			登录即代表同意平台<text class="blue" @click="toNav('xieyi')">《用户协议》</text>和<text class="blue" @click="toNav('yinsi')">《用户隐私》</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				phone: "",
				yzm: "",
				psd: "",
				timeout: -1
			};
		},
		onShow() {
		
		},
		methods: {
			loginIn() {
				 uni.getProvider({
				  service: 'oauth',
				  success: function (res) {
					if (~res.provider.indexOf('weixin')) {
						uni.login({
							provider: 'weixin',
							success: (res2) => {
								
								uni.getUserInfo({
									provider: 'weixin',
									success: (info) => {//这里请求接口
										console.log(res2);
										console.log(info);
										uni.switchTab({
											url:"../home/home"
										})
										
									},
									fail: () => {
										uni.showToast({title:"微信登录授权失败",icon:"none"});
									}
								})
						
							},
							fail: () => {
								uni.showToast({title:"微信登录授权失败",icon:"none"});
							}
						})
						
					}else{
						uni.showToast({
							title: '请先安装微信或升级版本',
							icon:"none"
						});
					}
				  }
				});
				
			},
			toNav(el){
				if(el == 'xieyi'){
					uni.navigateTo({
						url:'../mine/setXieyi'
					})
				}else
				if(el == 'yinsi'){
					uni.navigateTo({
						url:'./yinsi'
					})
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.login {
		.vx_login{
			display: flex;
			font-size: 36upx;
			justify-content: center;
			.vx_img{
				width: 42upx;
				height: 35upx;
				margin-right: 10upx;
			}
		}
		.hellow{
			padding-top: 20upx;
			.t1{
				font-size: 42upx;
				font-weight: bold;
				color: #555;
			}
			.t2{
				font-size: 34upx;
				color: #999;
				padding-top: 10upx;
				padding-bottom: 140upx;
			}
		}
		padding: 40upx 60rpx 0 60rpx;
		.iconfont{
			color: #666;
		}
		.iconshouye_shugang_shijiantixing {
			font-size: 38upx;
			color: #999;
		}
		
		.yzm {
			font-size: 25upx;
			color: $uni-bl;
		}
		.s_bz {
			padding-top: 10upx;
			color: #999;
			transform: scale(.9);
			text-align: center;
		}
		.s_bz_s{
			padding-top: 16upx;
			color: #999;
			transform: scale(.9);
			text-align: center;
			font-size: 28upx;
		}
		.mine_l_t {
			text-align: center;

			.t {
				padding: 100upx 0 50upx;
			}

			.wx {
				width: 80upx;
			}
		}

		.mine_l {
			text-align: center;
			margin-bottom: 50upx;

			.mine_logo {
				width: 200upx;
				height: 200upx;
			}
		}

		.sub_top {
			margin-top: 160upx;
		}

		.login_wjmm {
			font-size: 20upx;
			color: #999;
			padding: 20upx 0 90upx;

			&.b {
				color: #333;
			}
		}
	}
</style>
