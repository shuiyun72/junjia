<template>
	<view>
		<view class="home_body">
			<view class="order_item_sy" v-if="orderItem">
				<view class="o_title">
					<view class="time_l">
						{{clacState(orderItem.status)}}
					</view>
					<view class="code_text1" v-if="orderItem.status == 1">
						取货码: {{orderItem.code}}
					</view>
					<view class="code_text2" v-if="orderItem.status == 5">
						用户取消
					</view>
				</view>
				<view class="o_it" v-for="item in orderItem.goods_list">
					<view class="content">
						{{item.name}}
					</view>
					<view class="num">
						x{{item.num}}
					</view>
				</view>
				<view class="code_text">
					订单编号 : {{orderItem.order_num}}
				</view>
				<view class="code_text">
					配货完成时间 : {{orderItem.package_time}}
				</view>
				<view class="code_text">
					配货员 : {{orderItem.manager_name}}
				</view>
				<view class="code_text">
					取件码 : {{orderItem.code}}
				</view>
				<view class="">
					<view class="code_text">
						送货员 : {{orderItem.code}}
					</view>
					<view class="code_text">
						取件时间 : {{orderItem.fetch_time}}
					</view>
				</view>
				
				<!-- <view class="btn_grow">
					<view class="btn blue round sm" @click="dayin(orderItem)">
						确认配送
					</view>
				</view> -->
			</view>
			
			<view class="no_code" v-if="!orderItem">
				
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderItem: ""
			};
		},
		onLoad(ph) {
			
			this.$getApi("/App/Goods/searchOrder", {order_num:ph.orderId}, res => {
				// this.hisList = [];
				console.log(res)
				this.orderItem = res.data
			})
		},
		methods: {
			clacState(num){
				if(num == 0){
					return "待取件"
				}
				if(num == 1){
					return "已配货"
				}
				if(num == 2){
					return "运送中"
				}
				if(num == 3){
					return "已送达"
				}
				if(num == 4){
					return "已完成"
				}
				if(num == 5){
					return "已取消"
				}

			},
			search(){
				uni.navigateTo({
					url:"./footSearch"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab_list_sy {
		display: flex;
		font-size: 32upx;
		justify-content: space-around;
		background-color: #fff;
		border-top: 2upx solid #eee;
		color: #999;

		.item {
			border-bottom: 6upx solid transparent;
			padding: 20upx 0 16upx;

			&.active {
				color: $uni-bl;
				border-bottom: 6upx solid $uni-bl;
			}
		}
	}

	.home_body {
		height: calc(100vh - 320upx);
		overflow-y: auto;
		padding: 20upx 26upx;
		background-color: #f0f0f0;
	}

	.order_item_sy {
		padding: 26upx;
		font-size: 30upx;
		color: #666;
		margin-bottom: 20upx;
		background-color: #fff;
		border-radius: 20upx;

		&.pop {
			width: 640upx;
		}

		.o_title {
			display: flex;
			justify-content: space-between;
			border-bottom: 1upx solid #f0f0f0;
			padding-bottom: 10upx;
			margin-bottom: 10upx;

			.time_l {
				color: #333;
			}
			.code_text1{
				color: #0f0;
			}
			.code_text2{
				color: $uni-or;
			}
		}

		.o_it {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10upx 0;

			.content {
				min-width: 500upx;
			}

			.num {
				width: 60upx;
				text-align: right;
				flex-shrink: 0;
			}

			.iconfont {
				font-size: 42upx;
				width: 50upx;
				flex-shrink: 0;
				margin-left: 20upx;
			}

			.iconyduizhengqueshixin {
				color: #0f0;
			}
		}

		.code_text {
			padding: 10upx 0;
			color: #999;
			// border-bottom: 1upx solid #f0f0f0;
		}

		.btn_grow {
			display: flex;
			justify-content: flex-end;
			padding-top: 20upx;

			.btn {
				border: 1upx solid #999;
				background-color: #999;
				color: #fff;

				&.blue {
					background-color: #007AFF;
					border: 1upx solid #007AFF;
				}
			}
		}
	}
</style>
