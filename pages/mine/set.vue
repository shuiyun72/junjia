<template>
	<view class="mine_set">
		<uni-list>
			<uni-list-item title="账号与安全" @click="setTo('anquan')"></uni-list-item>
			<uni-list-item title="用户协议" @click="setTo('xieyi')"></uni-list-item>
			<uni-list-item title="清除缓存" @click="setTo('huancun')"></uni-list-item>
			<uni-list-item title="版本更新" @click="setTo('gengxin')" rightText="V1.0.1" :showArrow="false"></uni-list-item>
			<uni-list-item title="账号注销" @click="setTo('zhuxiao')"></uni-list-item>
		</uni-list>
		<view class="sub_btn_all mt100" @click="loginOut">
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			setTo(el){
				if(el == "anquan"){
					uni.navigateTo({
						url:"./setEditPhone"
					})
				}else
				if(el == "xieyi"){
					uni.navigateTo({
						url:"./setXieyi"
					})
				}else
				if(el == "huancun"){
					uni.showModal({
						title: '清除缓存',
						content: '是否确认清除缓存',
						confirmColor:"#18B357",
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}else
				if(el == "gengxin"){
					
				}else
				if(el == "zhuxiao"){
					uni.showModal({
						title: '账号注销',
						content: '是否确认账号注销',
						confirmColor:"#18B357",
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			loginOut(){
				uni.reLaunch({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.mine_set{
	height: 100vh;
	background-color: #f0f0f0;
}
.sub_btn_all{
	text-align: center;
	background-color: #fff;
	padding: 24upx 0;
	font-size: 32upx;
}
.mt100{
	margin-top: 100upx;
}
</style>
