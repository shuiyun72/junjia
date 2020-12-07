<template>
	<view class="order">
		<uni-nav-bar color="#333333" background-color="#ffffff" :status-bar="true"  :title="barTitle" left-icon="arrowleft"
		 @clickLeft="back" />
		<view class="tab_list_sy">
			<view class="item" v-for="(item,index) in tabList" :class="{'active':index == tabSel}" @click="selectTab(item,index)">{{item.text}}</view>
		</view>
		<view class="order_list">
			<view class="order_box" v-for="parent in orderList" @click="toDetail(parent)">
				<view class="title_c">
					<view class="left" :class="parent.text == '等待支付'?'or':parent.text == '备货中'?'blue':parent.text == '配送中'?'blue2':''">
						{{parent.text}}
					</view>
					<view class="right">
						2020-10-21 14:31
					</view>
				</view>
				<view class="o_item" v-for="item in parent.items">
					<view class="left">
						<image src="../../static/img/order/dingd4.png" class="img_c" mode=""></image>
						<view class="title shengluehao">
							荻花白擦荻花白擦荻花白擦荻花白擦荻花白擦荻花白擦荻花白擦荻花白擦荻花白擦
						</view>
					</view>
					<view class="right">
						x{{item.num}}
					</view>
				</view>
				<view class="last_money">
					<view class="left">
						...
					</view>
					<view class="right">
						<view class="sm">
							共4件 实付 :
						</view>
						<view class="money">
							<text class="red">23.88</text> 元
						</view>
					</view>
				</view>
				<view class="btn_box" v-if="parent.text == '等待支付'">
					<view class="btn blue sm round" @click.stop="toNav('quzhifu')">
						去支付
					</view>
				</view>
				<view class="btn_box" v-if="parent.text == '备货中'">
					<view class="btn blue sm round">
						再来一单
					</view>
				</view>
				<view class="btn_box" v-if="parent.text == '配送中'">
					<view class="btn blue sm round">
						再来一单
					</view>
				</view>
				<view class="btn_box" v-if="parent.text == '待评价'">
					<view class="btn blue_n sm round">
						再来一单
					</view>
					<view class="btn blue sm round">
						去评价
					</view>
				</view>
				<view class="btn_box" v-if="parent.text == '订单已取消'">
					<view class="btn blue sm round">
						再来一单
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import _ from "../../until/lodash";
	export default {
		data() {
			return {
				barTitle:"订单",
				orderList:[
					{
						text:"等待支付",
						state:1,
						items:[
							{num:3},{num:2},{num:1}
						]
					},
					{
						text:"备货中",
						state:2,
						items:[
							{num:1},{num:2},{num:1}
						]
					},
					{
						text:"配送中",
						state:3,
						items:[
							{num:1},{num:2},{num:1}
						]
					},
					{
						text:"待评价",
						state:4,
						items:[
							{num:1},{num:2},{num:1}
						]
					},
					{
						text:"订单已取消",
						state:5,
						items:[
							{num:1},{num:2},{num:1}
						]
					}
				],
				tabSel: 1,
				tabList: [{
						text: "全部",
						type: 0
					}, {
						text: "待付款",
						type: 1
					}, {
						text: "待收货",
						type: 2
					},
					{
						text: "待评价",
						type: 3
					}
				],
			};
		},
		onLoad(ph) {
			this.tabSel = ph.ins;
		},
		methods: {
			back(){
				uni.switchTab({
					url:"../home/home"
				})
			},
			toNav(el){
				if(el == 'quzhifu'){
					uni.navigateTo({
						url:'./orderPay'
					})
				}
			},
			toDetail(items){
				uni.navigateTo({
					url:"./orderDetail"
				})
			},
			selectTab(el, i) {
				this.tabSel = i;
				// this.getOrder(el.type);
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f0f0f0;
	}
	.order_list{
		padding: 0upx 26upx 20upx;
		.order_box{
			background-color: #fff;
			padding: 20upx;
			border-radius: 16upx;
			margin-bottom: 20upx;
			.title_c{
				display: flex;
				justify-content: space-between;
				align-items: baseline;
				.left{
					font-weight: bold;
					font-size: 32upx;
					color: #666;
					&.or{
						color: $uni-or;
					}
					&.blue2{
						color: #72C9CB;
					}
				}
				.right{
					color: #999;
					font-size: 28upx;
				}
			}
			.o_item{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 16upx 0;
				.left{
					display: inline-flex;
					align-items: center;
					.img_c{
						width: 80upx;
						height: 80upx;
					}
					.title{
						margin-left: 20upx;
						width: 520upx;
						color: #333;
					}
				}
			}
			.last_money{
				display: flex;
				justify-content: space-between;
				.left{
					color: #999;
				}
				.right{
					display: inline-flex;
					.sm{
						color: #999;
						transform: scale(.8);
						position: relative;
						top:4upx;
					}
				}
			}
			.btn_box{
				display: flex;
				justify-content: flex-end;
				padding: 20upx 0 0;
				.btn{
					padding: 10upx 0;
					width: 160upx;
					text-align: center;
					margin-left: 20upx;
					&+.btn{
						
					}
				}
			}
		}
	}
	.tab_list_sy {
		display: flex;
		font-size: 32upx;
		justify-content: space-around;
		background-color: #fff;
		margin-bottom: 26upx;
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
</style>
