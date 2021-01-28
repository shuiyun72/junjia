<template>
	<view class="edit_phone">
		<view class="mine_l">
			<image src="../../static/img/logo.png" class="mine_logo" mode="widthFix"></image>
		</view>
		<view class="edit_body">
			
			<view class="icon_input_sy" v-if="isShow">
				<!-- <view class="iconfont iconyanzhengma2"></view> -->
				<input class="input" type="text" v-model="phone" placeholder="请输入手机号" />
			</view>
			<view class="icon_input_sy">
				<!-- <view class="iconfont icon19"></view> -->
				<input class="input" type="text" v-model="yzm" placeholder="请输入验证码" />
				<!-- <text class="iconfont iconshouye_shugang_shijiantixing"></text> -->
				<text class="yzm" @click="getYZM" v-if="timeout<0">获取验证码</text>
				<text class="yzm" v-if="timeout>=0">{{timeout}}s 重新获取</text>
			</view>
		</view>
		<view class="sub_top">
			<button class="btn blue ms round" @click="next">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: true,
				phone: "",
				yzm: "",
				timeout: -1
			};
		},
		onShow() {
			
		},
		methods: {
			//获取验证码
			getYZM(){
				if(!this.phone){
					this.$msg("请输入手机号")
					return false;
				}
				let data = {
					phone:this.phone,
					type: "3"
				}
				this.timeout = 60;
				let interL = setInterval(()=>{
					this.timeout--
					if(this.timeout<0){
						clearInterval(interL)
					}
				},1000)
				this.$getApi('/App/Public/sendSms',data,res=>{
					console.log(res)
					
					this.$msg('请在短信中查看验证码')
				},"false")
				
			},
			next(){
				let data = {
					phone:this.phone,
					code:this.yzm
				}
				this.$getApi('/App/Public/riderLogin',data,res=>{
					console.log(res)
					this.$store.commit("login",res.data)
					uni.switchTab({
						url:"../home/home"
					})
				},"false")
				
			}

		}
	}
</script>

<style lang="scss" scoped>
	.icon_input_sy{
		.input{
			width: 400upx;
		}
	}
	.mine_l {
		text-align: center;
		margin-bottom: 100upx;
	
		.mine_logo {
			width: 230upx;
			height: 230upx;
		}
	}
	.edit_body{
		padding: 0upx 0 100upx;
	}
	.edit_phone {
		.s_bz {
			padding-top: 10upx;
			color: #999;
			transform: scale(.9);
			text-align: center;
		}
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

	.sub_top {
		margin-top: 40upx;
	}

	.edit_phone {
		padding: 40upx 60rpx 0 60rpx;

		.iconshouye_shugang_shijiantixing {
			font-size: 38upx;
			color: #999;
		}

		.yzm {
			font-size: 25upx;
			color: $uni-bl;
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
</style>
