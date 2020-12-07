<template>
	<view class="order_true">
		<view class="pay_money">
			<view class="bg_img">
				<view class="name">
					应付 :
				</view>
				<view class="money">
					￥<text class="num">23.88</text>
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
					￥<text class="big">23.88</text>
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
				radio: "A"
			};
		},
		methods:{
			toNav(el){
				if(el == 'pay'){
					uni.reLaunch({
						url:"../home/msg?title=付款成功"
					})
				}
			},
			RadioChange(el){
				console.log(el.detail.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order_true {
		min-height: 100vh;
		background-color: #f0f0f0;
		.bottom_btn_zu_sy{
			display: flex;
			position:fixed;
			bottom: 0;
			left: 0;
			width: 750upx;
			align-items: center;
			.btn1{
				flex:1;
				display: inline-flex;
				padding-left: 26upx;
				align-items: center;
				color: #666;
				.big{
					font-size: 36upx;
				}
			}
			.btn_b{
				width: 230upx;
				color: #fff;
				text-align: center;
				font-size: 34upx;
				padding: 30upx 0;
				&.or{
					background-color: $uni-or;
				}
				&.bl{
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
				.name{
					font-size: 36upx;
					margin-bottom: 12upx;
				}
				.money{
					position:relative;
					left: -16upx;
					.num{
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
