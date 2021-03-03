<template>
	<view class="msg_all">
		<!-- left-icon="arrowleft" -->
		<uni-nav-bar color="#333333" background-color="#ffffff" :status-bar="true" :title="barTitle" @clickLeft="back" />
		<view class="t_img">
			<image src="../../static/img/morl.png" class="img"></image>
		</view>
		<!-- 订单订单 -->
		<view v-if="barTitle == '付款成功'">
			<view class="msg_title">
				商品付款成功
			</view>
			<view style="height:120upx">

			</view>
			<view class="msg_btn">
				<button class="lg btn blue round" @click="toNav('daifukuan')">查看订单</button>
			</view>
		</view>
		<!-- 修改手机号 -->
		<view v-if="barTitle == '修改成功'">
			<view class="msg_title">
				修改手机号成功
			</view>
			<view style="height:120upx">

			</view>
			<view class="msg_btn">
				<button class="lg btn blue round" @click="toNav('shezhi')">返回设置</button>
			</view>
		</view>
		<!-- 意见反馈 -->
		<view v-if="barTitle == '反馈成功'">
			<view class="msg_title">
				您反映的问题,我们会尽快解决,谢谢合作
			</view>
			<view style="height:120upx">
		
			</view>
			<view class="msg_btn">
				<button class="lg btn blue round" @click="toNav('fankui')">返回</button>
			</view>
		</view>
		<!-- 发票 -->
		<view v-if="msgShow == '发票'">
			<view class="msg_title">
				发票信息提交成功, 1~3个工作日审核通过后将会吧电子发票发送到您的邮箱中
			</view>
			<view style="height:120upx">
		
			</view>
			<view class="msg_btn">
				<button class="lg btn blue round" @click="toNav('fapiao')">返回发票中心</button>
			</view>
		</view>
		<!-- 发票 -->
		<view v-if="barTitle == '评价成功'">
			<view class="msg_title">
				评价提交成功
			</view>
			<view style="height:120upx">
		
			</view>
			<view class="msg_btn">
				<button class="lg btn blue round" @click="toNav('dingdan')">返回订单</button>
			</view>
		</view>
		
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgShow: "",
				pageType: "",
				barTitle: "购买成功"
			};
		},
		onLoad(ph) {
			if (ph.title) {
				this.barTitle = ph.title;
			}
			if (ph.msgShow) {
				this.msgShow = ph.msgShow
			}
		},
		onBackPress(e){
		  uni.switchTab({
		  	url: './home'
		  })
		  return true;
		},
		methods: {
			back() {
				if (this.barTitle == '付款成功') {

				}
				uni.switchTab({
					url: './home'
				})
				return true;
			},

			toNav(el) {
				if (el == "daifukuan"){
					uni.switchTab({
						url:"../mine/mine"
					})
				}
				if(el == "shezhi"){
					uni.navigateBack({
						delta:2
					})
				}
				if(el == "fankui"){
					uni.switchTab({
						url:'../mine/mine'
					})
				}
				if(el == "fapiao"){
					uni.navigateBack({
						delta:2
					})
				}
				if(el == "dingdan"){
					uni.navigateBack({
						delta:2
					})
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.msg_all {
		padding: 26upx;
		color: #666;
		text-align: center;

		.t_img {
			padding: 120upx 0 40upx;
			text-align: center;

			.img {
				width: 140upx;
				height: 140upx;
			}
		}

		.msg_title {
			font-size: 36upx;
			font-weight: bold;
		}

		.msg_info {
			padding: 16upx 0;
		}

		.msg_btn {
			padding: 0 30upx;
		}
	}
</style>
