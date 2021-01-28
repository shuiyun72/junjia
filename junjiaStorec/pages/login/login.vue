<template>
	<view class="login">
		<view class="mine_l">
			<image src="../../static/img/logo.png" class="mine_logo" mode="widthFix"></image>
		</view>
		
		<view class="icon_input_sy">
			<view class="iconfont icon19"></view>
			<input class="input" type="text"  v-model="phone" placeholder="请输入账号"/>
		</view>
		<view class="icon_input_sy">
			<view class="iconfont iconjiesuo"></view>
			<input class="input" type="password"  v-model="psd" placeholder="请输入密码"/>
		</view>
		<view class="sub_top">
			<button class="btn  ms round" @click="loginIn">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				phone: "",
				psd: ""
			};
		},
		onShow() {
		
		},
		methods: {
			loginIn() {
				let data = {
					phone:this.phone,
					password:this.psd
				}
				this.$getApi('/App/Public/managerLogin',data,res=>{
					console.log(res)
					this.$store.commit('login',res.data)
					this.$store.commit('remlogin',data)
					uni.switchTab({
						url:"../home/home"
					})
				})
				
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
		padding: 80upx 60rpx 0 60rpx;
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
			.btn{
				background-color: $uni-bl;
				color: #fff;
			}
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
