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
				let this_ = this;
				 uni.getProvider({
				  service: 'oauth',
				  success: function (res) {
					if (~res.provider.indexOf('weixin')) {
						// #ifndef MP
						// 弹出正在登录的弹框
						uni.showLoading({
							mask:true,
							title: '正在登录···',
							complete:()=>{}
						});
						uni.login({
							provider: 'weixin',
							success: (loginRes) => {
								
								uni.getUserInfo({
									provider: 'weixin',
									success: (info) => {//这里请求接口
										console.log(loginRes);
										console.log(info);
										let dataLogin = {
											open_id:info.userInfo.openId,
											nickname:info.userInfo.nickName,		
											avatar:info.userInfo.avatarUrl,
											type:4,
											UnionID:info.userInfo.unionId
										}
										console.log(dataLogin)
										this_.$getApi("/App/Public/thirdLogin",dataLogin, res => {
											console.log(res,"登录")
											this_.$store.commit("login",res.data)
											this_.$getApi("/App/Goods/shop_car", {}, resCarC => {
												console.log(resCarC.data, "获取购物车")
												// this_.lunboList = res.data
												let carInfo = resCarC.data == "" ? [] : resCarC.data;
												this_.$store.commit("setReCar",carInfo)
											})
											uni.switchTab({
												url:"../home/home"
											})
											uni.hideLoading();
										},"false")
									},
									fail: () => {
										uni.showToast({title:"微信登录授权失败",icon:"none"});
									},
								})
								
							},
							fail: () => {
								uni.showToast({title:"微信登录授权失败",icon:"none"});
							}
						})
						// #endif
						// #ifdef MP
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								console.log(loginRes, "微信权限信息");
								this_.$getApi("/App/Public/getOpenid", {
									code: loginRes.code
								}, resOpen => {
									console.log(resOpen, "ccccc")
									uni.getUserInfo({
										provider: 'weixin',
										success: (info) => { //这里请求接口
											console.log(info, "527");
											let dataLogin = {
												open_id: resOpen.data.openid,
												nickname: info.userInfo.nickName,
												avatar: info.userInfo.avatarUrl,
												type:3,
												UnionID:""
											}
											console.log(dataLogin)
											this_.$getApi("/App/Public/thirdLogin", dataLogin, res => {
												console.log(res, "登录")
												
												// 判断 this_.openP()
												this_.$store.commit("login", res.data)
												this_.$getApi("/App/Goods/shop_car", {}, resCarC => {
													console.log(resCarC.data, "获取购物车")
													// this_.lunboList = res.data
													let carInfo = resCarC.data == "" ? [] : resCarC.data;
													this_.$store.commit("setReCar",carInfo)
												})
												console.log(res.data)
												uni.switchTab({
													url:"../home/home"
												})
												uni.hideLoading();
											})
										},
										fail: () => {
											uni.showToast({
												title: "微信登录授权失败",
												icon: "none"
											});
										}
									})
								})
									
							}
						});						
						// #endif
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
