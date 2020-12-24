<template>
	<view class="order_true">
		<view class="pay_money">
			<view class="bg_img">
				<view class="name">
					应付 :
				</view>
				<view class="money">
					￥<text class="num">{{allMoney}}</text>
				</view>
			</view>
		</view>
		<view class="pey_type">
			<uni-list>
				<sy-list-item title="支付方式" :showArrow="false"></sy-list-item>
			</uni-list>
			<radio-group class="block" @change="RadioChange">
				<label class="cu-form-group">
					<view class="item">
						<image style="width: 44rpx;height: 44rpx;" src="../../static/img/weixin.png" mode=""></image><text class="margin-left-xs">微信支付</text>
					</view>
					<radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A" class="radio" :color="'#18B357'"></radio>
				</label>
				<label class="cu-form-group">
					<view class="item">
						<image style="width: 44rpx;height: 44rpx;" src="../../static/img/zhifb.png" mode=""></image><text class="margin-left-xs">支付宝支付</text>
					</view>
					<view>
						<radio :class="radio=='B'?'checked':''" :checked="radio=='C'?true:false" value="B" class="radio" :color="'#18B357'"></radio>
					</view>
				</label>

			</radio-group>
		</view>
		<view class="bottom_btn_zu_sy">
			<view class="btn1">
				<view>合计 :</view>
				<view class="red">
					￥<text class="big">{{allMoney}}</text>
				</view>
			</view>
			<view class="btn_b bl" @click="toNav('pay')">
				确认支付
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				radio: "A",
				orderItem: "",
				orderId: 0
			};
		},
		onLoad(ph) {
			this.orderId = ph.orderId;
			this.$getApi("/App/Goods/orderDetail", {
				id: ph.orderId
			}, res => {
				console.log(res.data, "订单详情")
				this.orderItem = res.data[0];
			})
		},
		computed:{
			allMoney(){
				return Number(this.orderItem.credit) + Number(this.orderItem.fee)
			}
		},
		methods: {
			toNav(el) {
				let this_ = this;
				if (el == 'pay') {
					let payType = 0;
					// #ifndef MP
					payType = this.radio == "A" ? 1 : 2;
					// #endif
					// #ifdef MP
					payType = 3;
					// #endif
					let dataPay = {
						type: payType,
						total_credit: this.orderItem.credit,
						id: this.orderId
					}
					this.$getApi("/App/Goods/payOrder", dataPay, resbuy => {
						console.log(resbuy, "payOrder1111")

						console.log(this.radio)
						let thisPayType = ""

						// #ifndef MP
						if (this.radio == "A") {
							thisPayType = "wepay"
						} else
						if (this.radio == "B") {
							thisPayType = "alipay"
						} else
						if (this.radio == "C") {
							thisPayType = "xxwepay"
						}

						// let orderMsgL = {
						// 	appId: resbuy.data.appid,
						// 	nonceStr: resbuy.data.noncestr,
						// 	package: resbuy.data.package,
						// 	partnerId: resbuy.data.partnerid,
						// 	prepayId: resbuy.data.prepayid,
						// 	paySign: resbuy.data.sign,
						// 	signType: "MD5",
						// 	timeStamp: resbuy.data.timestamp.toString()
						// }
						
						// {"appId":"wxecd3f91ea27efd64",
						// "partnerId":"1600270993",
						// "prepayId":"wx170137550934325fbf203fddf0ed420000",
						// "timeStamp":"1608140275",
						// "nonceStr":"V7XEHGo8jAWRVwFI",
						// "package":"Sign=WXPay",
						// "paySign":"8C66F91B205C87D66C8F48C49349846E"}
						
						// // 上面是其他项目正常微信app支付,下面是咱的接口返回值 看起来少个 partnerId ,不知道排序有没有影响
						
						// {"appId":"wxb93dc4f298fe3f11","nonceStr":"wk9XIz4mwCB8k28kMbB2NsAfPIy3HDKD","package":"Sign=WXPay","prepayId":"wx170142288145814f3727eb82dec5350000","paySign":"DA078D038DCC6CEA05C9DAD6D615F7B7","signType":"MD5","timeStamp":"1608140548"} 
						
						let orderMsgL = {
							appid: resbuy.data.appId,
							partnerid: resbuy.data.partnerId,
							prepayid: resbuy.data.prepayId,
							timestamp: resbuy.data.timeStamp,
							noncestr: resbuy.data.nonceStr,
							package: resbuy.data.package,
							sign: resbuy.data.paySign
						}
						console.log(JSON.stringify(orderMsgL))
						// #endif
						// #ifdef MP
						thisPayType = "xxwepay"
						// #endif	

						if (thisPayType == "wepay") {
							console.log("wepay")
							console.log(JSON.stringify(orderMsgL))
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: resbuy.data, //微信、支付宝订单数据
								success: function(res) {
									this_.$msg(JSON.stringify(res))
									uni.navigateTo({
										url:"../home/msg?title=付款成功"
									})
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
									this_.$msg(JSON.stringify(err))
								}
							});
						} else
						if (thisPayType == "alipay") {
							console.log(orderMsgL, "cccc")
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: JSON.stringify(orderMsgL), //微信、支付宝订单数据
								success: function(res) {
									uni.navigateTo({
										url:"../home/msg?title=付款成功"
									})
									console.log('success:' + JSON.stringify(res));
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						} else
						if (thisPayType == "xxwepay") {
							let timeStamp = resbuy.data.timeStamp.toString()
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: timeStamp,
								nonceStr: resbuy.data.nonceStr,
								package: resbuy.data.package,
								signType: resbuy.data.signType,
								paySign: resbuy.data.paySign,
								success: function(res) {
									this_.$getApi("/api/user/userinfo", {}, resss => {
										this_.$store.commit('login', resss.data);
									})
									if (this_.$store.state.userInfo.groupid != 0) {
										uni.navigateTo({
											url:"../home/msg?title=付款成功"
										})
									} else {
										setTimeout(() => {
											uni.navigateTo({
												url:"../home/msg?title=付款成功"
											})
										}, 600)
									}
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						}
					});
				}
			},
			RadioChange(el) {
				console.log(el.detail.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order_true {
		min-height: 100vh;
		background-color: #f0f0f0;

		.bottom_btn_zu_sy {
			display: flex;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 750upx;
			align-items: center;

			.btn1 {
				flex: 1;
				display: inline-flex;
				padding-left: 26upx;
				align-items: center;
				color: #666;

				.big {
					font-size: 36upx;
				}
			}

			.btn_b {
				width: 230upx;
				color: #fff;
				text-align: center;
				font-size: 34upx;
				padding: 30upx 0;

				&.or {
					background-color: $uni-or;
				}

				&.bl {
					background-color: $uni-bl;
				}
			}
		}

		.pay_money {
			background-color: #fff;
			padding: 20upx 26upx;
			margin-bottom: 30upx;

			.bg_img {
				background: url(../../static/img/zhif.png) no-repeat center center;
				background-size: 698upx 260upx;
				color: #fff;
				text-align: center;
				padding: 60upx 0 0;
				height: 260upx;
				box-sizing: border-box;

				.name {
					font-size: 36upx;
					margin-bottom: 12upx;
				}

				.money {
					position: relative;
					left: -16upx;

					.num {
						font-size: 46upx;
						margin-left: 6upx;
						// font-weight: bold;
					}
				}

			}
		}

		.cu-form-group {
			display: flex;
			justify-content: space-between;
			padding: 16upx 26upx;
			background-color: #fff;
			border-top: 1upx solid #f0f0f0;

			.item {
				display: inline-flex;
				align-items: center;

				.margin-left-xs {
					margin-left: 10upx;
					font-size: 28upx;
					color: #666;
				}
			}

			.radio {
				transform: scale(.8);
			}
		}
	}
</style>
