<template>
	<view class="login">
		<view class="icon_input_sy">
			<view class="iconfont icon19"></view>
			<input class="input" type="text"  v-model="phone" placeholder="请输入手机号"/>
		</view>
		<view class="icon_input_sy">
			<view class="iconfont iconyanzhengma2"></view>
			<input class="input" type="text"  v-model="yzm" placeholder="请输入验证码"/>
			<text class="iconfont iconshouye_shugang_shijiantixing"></text>
			<text class="yzm" @click="getYZM" v-if="timeout<0">发送验证码</text>
			<text class="yzm" v-if="timeout>=0">{{timeout}}s 重新获取</text>
		</view>
		<view class="sub_top">
			<!-- #ifndef MP -->
			<button class="btn blue ms" @click="loginIn">确定</button>
			<!-- #endif -->
			<!-- #ifdef MP -->
			<button class="btn blue ms" open-type="getUserInfo" @getuserinfo="getUserInfoc">确定</button>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:"",
				yzm:"",
				uid:"",
				timeout: -1
			};
		},
		onLoad(ph) {
			console.log(ph)
			if(ph.uid){
				this.uid = ph.uid;
			}

		},
		methods:{

			//获取验证码
			getYZM(){
				if(!this.phone){
					this.$msg("请输入手机号")
					return false;
				}
				let data = {
					phone:this.phone,
					type: "1"
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
			loginIn(){
				let this_  = this;
				if(this_.phone && this_.yzm){
					let data = {
						id:this.uid,
						phone:this.phone,
						code:this.yzm
					}
					this.$getApi('/App/Public/mobileBind',data,res=>{
						
						this.$msg('绑定成功')
						setTimeout(()=>{
							uni.switchTab({
								url:"../home/home"
							})
						},500)
					},"false")
				}else{
					
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
page{
	background-color: #fff;
}
.sub_top{
	margin-top: 160upx;
}
.login {
	padding: 180upx 60rpx 0 60rpx;
	.iconshouye_shugang_shijiantixing{
		font-size: 38upx;
		color: #999;
	}
	.yzm{
		font-size: 25upx;
		color: $uni-bl;
	}
}
.login_wjmm{
	font-size: 20upx;
	color: #999;
	padding: 20upx 0 90upx;
	&.b{
		color: #333;
	}
}
</style>
