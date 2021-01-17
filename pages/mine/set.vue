<template>
	<view class="mine_set">
		<uni-list>
			<uni-list-item title="账号与安全" @click="setTo('anquan')"></uni-list-item>
			<uni-list-item title="推荐人" @click="setTo('tuijianren')" v-if="userInfo.referee_id =='0'"></uni-list-item>
			<uni-list-item title="用户协议" @click="setTo('xieyi')"></uni-list-item>
			<uni-list-item title="清除缓存" @click="setTo('huancun')"></uni-list-item>
			<uni-list-item title="版本更新" @click="setTo('gengxin')" rightText="V1.0.1" :showArrow="false"></uni-list-item>
			<uni-list-item title="账号注销" @click="setTo('zhuxiao')"></uni-list-item>
		</uni-list>
		<view class="sub_btn_all mt100" @click="loginOut">
			退出登录
		</view>
		<uni-popup type="center" ref="tuijian">
			
			<view class="tuijan_view">
				<view class="title_c">
					<view class="">
						推荐人手机号
					</view>
					<view class="iconfont iconyduicuowushixin" @click="closePop"></view>
				</view>
				<view class="icon_input_sy">
					<view class="iconfont icon19"></view>
					<input class="input" type="text"  v-model="phone" placeholder="请输入推荐人手机号"/>
				</view>
				<view class="btn blue ms btn_tuijian round" @click="tuijianTrue">
					确认
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				phone:""
			};
		},
		computed: {
			...mapState(["httpp", "SystemInfo", "userInfo", "hasLogin"]),
		},
		onShow() {
			try{
				this.$refs.tuijian.close();
			}catch(e){
				//TODO handle the exception
			}
		},
		methods:{
			closePop(){
				this.$refs.tuijian.close();
			},
			tuijianTrue(){
				if(!this.phone){
					this.$msg("请输入推荐人手机号")
					return false;
				}
				let data = {
					phone:this.phone
				}
				this.$getApi('/App/User/setRefereeGuy', data, res => {
					console.log(res.data, "设置推荐人")
					this.$msg("推荐人设置成功")
					this.$refs.tuijian.close();
					this.$getApi('/App/User/userInfo', {}, res => {
						console.log(res.data, "获取用户信息")
						this.$store.commit("login", res.data)
					})
					// this.xitongMsg = res.data
				})
			},
			setTo(el){
				if( el == "tuijianren"){
					this.$refs.tuijian.open();
				}
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
				this.$store.commit('logout');
				uni.reLaunch({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tuijan_view{
		width: 600upx;
		background-color: #fff;
		padding:30upx 60upx 60upx;
		border-radius: 20upx;
		.title_c{
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #666;
			font-size: 30upx;
			.iconfont{
				color: #999;
				font-size: 50upx;
			}
		}
		.icon_input_sy{
			margin-bottom: 80upx;
		}
		.btn_tuijian{
			text-align: center;
			
		}
	}
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
