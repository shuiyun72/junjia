<template>
	<view class="order_detail">
		<view class="order_header">
			<view class="deng1" v-if="orderItem.status == -1">
				<view class="part1">
					<!-- <text class="d_t1">等待支付 剩余</text>
					<text class="d_t2">03:20</text> -->
					<text class="d_t1">等待支付</text>
				</view>
				<view class="part2">
					逾期未支付订单将自动取消
				</view>
			</view>
			<view class="deng1"  v-if="orderItem.status == 1">
				<view class="d_t3">
					预计{{orderItem.receive_time}}送达
				</view>
			</view>
			<view class="deng1" v-if="orderState == 0">
				<view class="part1">
					<text class="d_t1">订单已取消</text>
				</view>
				<view class="part2">
					若有退款 退款将会退回
				</view>
			</view>
			<view class="part3">
				<!-- <view class="btn del round" v-if="orderState == 0 || orderState == 1" @click="quxiaoOrder">
					取消订单
				</view> -->
				<view class="btn blue round" v-if="orderItem.status == -1" @click="quzhifu">
					去支付
				</view>
				<view class="btn blue round" v-if="orderItem.status == 1 || orderItem.status == 6" @click="zailaiOrder">
					再来一单
				</view>
				<view class="btn del round" v-if="orderItem.status == 2 || orderItem.status == 3 "  @click="zailaiOrder">
					再来一单
				</view>
				<view  @click="lianxiKF" class="btn del round">
					联系客服
				</view>
			</view>
		</view>
		<view class="user_msg">
			<view class="row_c">
				<view class="attr">
					期望时间 :
				</view>
				<view class="value">
					{{orderItem.receive_time}}
				</view>
			</view>
			<view class="row_c">
				<view class="attr">
					收件人 :
				</view>
				<view class="value">
					{{orderItem.user_name}}
				</view>
			</view>
			<view class="row_c">
				<view class="attr">
					收件人电话 :
				</view>
				<view class="value">
					{{orderItem.user_phone}}
				</view>
			</view>
			<view class="row_c">
				<view class="attr">
					收货地址 :
				</view>
				<view class="value" v-if="orderItem.user_address">
					{{orderItem.user_address.split("undefined")[0]}}
				</view>
			</view>
		</view>
		<view class="order_msg">
			<view class="title">
				<view class="left">
					商品
				</view>
				<view class="num">
					{{orderItem.total_num}}件
				</view>
			</view>
			<view class="i_item" v-for="item in orderItem.goods_list">
				<view class="left">
					<image :src="item.goods_thumb" class="img_m" mode=""></image>
					<view class="info_cc">
						<view class="in1 shengluehao">
							{{item.goods_name}}
						</view>
						<view class="in2">
							x <text>{{item.price}}</text> 
						</view>
					</view>
				</view>
				<view class="right">
					x{{item.num}}
				</view>
			</view>
		</view>
		<view class="user_msg">
			<view class="title">
				<view class="left">
					订单明细
				</view>
				<view class="num"></view>
			</view>
			<view class="row_c">
				<view class="attr">
					订单总价 :
				</view>
				<view class="value">
					{{Number(orderItem.credit)+ Number(orderItem.coupon_money)}}
				</view>
			</view>
			<view class="row_c">
				<view class="attr">
					优惠 :
				</view>
				<view class="value">
					{{orderItem.coupon_money}}
				</view>
			</view>
			<view class="row_c">
				<view class="attr">
					配送费 :
				</view>
				<view class="value">
					{{orderItem.credit >= peisongfei ?'0': peisongfei}}
				</view>
			</view>
			<view class="row_c">
				<view class="attr">
					实付 :
				</view>
				<view class="value">
					{{orderItem.credit >= peisongfei ?'0': (Number(peisongfei) + Number(orderItem.credit))}}
				</view>
			</view>
		</view>
		<view class="user_msg">
			<view class="title">
				<view class="left">
					订单信息
				</view>
				<view class="num"></view>
			</view>
			<view class="row_c">
				<view class="attr">
					订单编号 :
				</view>
				<view class="value">
					{{orderItem.order_num}}
				</view>
			</view>
			<view v-if="orderItem.status > 0">
				<view class="row_c">
					<view class="attr">
						支付方式 :
					</view>
					<view class="value">
						{{orderItem.pay_type == 1?"微信":"支付宝"}}
					</view>
				</view>
				<view class="row_c">
					<view class="attr">
						下单时间 :
					</view>
					<view class="value">
						{{getDateL(orderItem.add_time)}}
					</view>
				</view>
				<view class="row_c">
					<view class="attr">
						支付时间:
					</view>
					<view class="value">
						{{getDateL(orderItem.pay_time)}}
					</view>
				</view>
			</view>
			<view class="row_c">
				<view class="attr">
					备注信息 :
				</view>
				<view class="value">
					{{orderItem.remark}}
				</view>
			</view>
			
			<!-- <view class="row_c" v-if="orderState==2">
				<view class="attr">
					取消时间:
				</view>
				<view class="value">
					2020-10-21 17:08
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import _ from "../../until/lodash";
	// orderState 0:待支付 1备货中,配送中 2订单取消
	export default {
		data() {
			return {
				orderState:1,
				orderItem:{},
				peisongfei:0,
				xitongMsg:[],
				orderId:0
			};
		},
		onLoad(ph) {
			this.orderId = ph.orderId;
			this.$getApi("/App/Goods/orderDetail",{id:ph.orderId}, res => {
				console.log(res.data,"订单详情")
				this.orderItem = res.data[0];
			})
			this.$getApi('/App/Index/getSysConfig',{},res=>{
				console.log(res.data,"配送费")
				this.xitongMsg = res.data;
				this.peisongfei  = _.filter(this.xitongMsg,item=>{
					return item.remark.indexOf("配送费") != -1
				})[0].value;
			})
		},
		methods:{
			quzhifu(){
				uni.navigateTo({
					url:'./orderPay?orderId='+this.orderId
				})
			},
			quxiaoOrder(){
				uni.showModal({
				    title: '取消订单',
				    content: '是否确认取消订单',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			lianxiKF(){
				let phoneL  = _.filter(this.xitongMsg,item=>{
					return item.remark.indexOf("客服电话") != -1
				})[0].value;
				console.log(phoneL)
				uni.makePhoneCall({
					phoneNumber: phoneL
				});	
			},
			zailaiOrder(){
				uni.navigateTo({
					url:"./orderTrue?orderId="+this.orderId
				})
			},
			getDateL(date){
				return this.$getDate(date,'s-s-s s:s:s',"c")
			}
		}
	}
</script>

<style lang="scss" scoped>
.order_detail{
	background-color: #f0f0f0;
	min-height: 100vh;
	font-size: 28upx;
	padding-bottom: 100upx;
	.order_msg{
		background-color: #fff;
		margin-top: 20upx;
		padding: 20upx 26upx;
		.title{
			display: flex;
			justify-content: space-between;
			font-size: 32upx;
			color: #333;
			margin-bottom: 10upx;
		}
		.i_item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #666;
			padding: 20upx 0;
			.left{
				display: inline-flex;
				align-items: center;
				.img_m{
					width: 90upx;
					height: 90upx;
				}
				.info_cc{
					margin-left: 20upx;
					display: inline-flex;
					flex-direction: column;
					justify-content: space-between;
					.in1{
						width: 540upx;
						margin-bottom: 10upx;
					}
				}
			}
		}
	}
	.user_msg{
		background-color: #fff;
		margin-top: 20upx;
		padding: 20upx 26upx;
		.title{
			display: flex;
			justify-content: space-between;
			font-size: 32upx;
			color: #333;
			padding-bottom: 26upx;
		}
		.row_c{
			display: flex;
			font-size: 28upx;
			padding-bottom: 20upx;
			color: #666;
			.attr{
				width: 160upx;
				flex-shrink: 0;
			}
			.value{
				
			}
		}
	}
	.order_header{
		padding: 20upx 0 40upx;
		text-align: center;
		background: url(../../static/img/ts2.png) no-repeat center bottom;
		background-size: 750upx auto;
		.part1{
			.d_t1{
				font-size: 34upx;
				font-weight: bold;
				color: #666;
				letter-spacing:1px;
			}
			.d_t2{
				color: $uni-or;
				font-size: 32upx;
				margin-left: 10upx;
			}
		}
		.d_t3{
			font-size: 30upx;
			font-weight: bold;
			color: #666;
			letter-spacing:1px;
			padding: 30upx 0;
		}
		.part2{
			font-size: 30upx;
			color: #999;
			padding: 10upx 0 10upx;
		}
		.part3{
			display: flex;
			justify-content: center;
			padding: 20upx 26upx;
			.btn{
				width: 200upx;
				padding: 12upx 0 14upx;
				&+.btn{
					margin-left: 30upx;
				}
				&.del{
					border: 1upx solid #f0f0f0;
					color: #666;
				}
			}
		}
	}
}
</style>
