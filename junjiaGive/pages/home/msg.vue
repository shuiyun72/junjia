<template>
	<view class="login">
		<view class="mine_l">
			<image src="../../static/img/wanc.png" class="mine_logo" mode="widthFix"></image>
		</view>
		<view v-if="pageTitle == '提现申请成功'">
			<view class="text_ccl">
				提现申请提交成功
			</view>
			<view class="text_cc2">
				1-7个工作日内到账,若未及时到账
			</view>
			<view class="text_cc2">
				请联系线下客服人员
			</view>
			<view class="sub_top">
				<button class="btn  ms round" @click="toNav" v-if="pageTitle=='提现申请成功'">返回我的钱包</button>
				<button class="btn  ms round" @click="toNav" v-if="pageTitle=='修改成功'">返回设置</button>
			</view>
		</view>
		<view v-if="pageTitle == '修改成功'">
			<view class="text_ccl">
				修改手机号成功
			</view>
			<view style="height:120upx">
					
			</view>
			<view class="msg_btn">
				<button class="lg btn blue round" @click="toNav('fankui')">返回</button>
			</view>
		</view>
		<!-- 意见反馈 -->
		<view v-if="pageTitle == '反馈成功'">
			<view class="text_cc2">
				您反映的问题,我们会尽快解决,谢谢合作
			</view>
			<view style="height:120upx">
		
			</view>
			<view class="msg_btn">
				<button class="lg btn blue round" @click="toNav('fankui')">返回</button>
			</view>
		</view>
			
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				phone: "",
				psd: "",
				pageTitle:""
			};
		},
		onLoad(ph) {
			if (ph.pageTitle) {
				uni.setNavigationBarTitle({
					title: ph.pageTitle
				})
				this.pageTitle = ph.pageTitle
			}
		},
		onShow() {

		},
		methods: {
			toNav(el) {
				uni.navigateBack({
					delta: 2
				})
				
			}

		}
	}
</script>

<style lang="scss" scoped>
	.login {
		padding: 80upx 60rpx 0 60rpx;

		.vx_login {
			display: flex;
			font-size: 36upx;
			justify-content: center;

			.vx_img {
				width: 42upx;
				height: 35upx;
				margin-right: 10upx;
			}
		}

		.text_ccl {
			text-align: center;
			font-size: 38upx;
			color: #666;
			margin-bottom: 30upx;
		}

		.text_cc2 {
			text-align: center;
			font-size: 28upx;
			color: #999;
		}

		.hellow {
			padding-top: 20upx;

			.t1 {
				font-size: 42upx;
				font-weight: bold;
				color: #555;
			}

			.t2 {
				font-size: 34upx;
				color: #999;
				padding-top: 10upx;
				padding-bottom: 140upx;
			}
		}

		.iconfont {
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

		.s_bz_s {
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
				width: 120upx;
				height: 120upx;
			}
		}

		.sub_top {
			margin-top: 160upx;

			.btn {
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
