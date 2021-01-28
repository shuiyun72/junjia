<template>
	<view>
		<uni-nav-bar color="#333333" background-color="#ffffff" :status-bar="true"  title="发货管理" right-icon="search"
		 @clickRight="search" />
		<view class="tab_list_sy">
			<view class="item" v-for="(item,index) in tabList" :class="{'active':index == tabSel}" @click="selectTab(item,index)">{{item.text}}</view>
		</view>
		<view class="home_body">
			<view class="no_foot" v-if="orderList.length == 0">
				<image src="../../static/img/none.png" class="no_img" mode=""></image>
				<view class="no_text">
					暂无订单
				</view>
			</view>
			<view class="order_item_sy" v-for="orderItem in orderList">
				<view class="o_title">
					<view class="time_l">
						{{clacStatus(orderItem.status)}}
					</view>
					<view class="code_text1" v-if="orderItem.status == 1">
						取货码: {{orderItem.code}}
					</view>
					<!-- <view class="code_text2" v-if="orderItem.status == 3">
						用户取消
					</view> -->
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
					订单编号 : {{orderItem.code}}
				</view>
				<view class="code_text">
					配货完成时间 : {{getDate(orderItem.package_time)}}
				</view>
				<view class="code_text">
					配货员 : {{orderItem.manager_name}}
				</view>
				<view class="code_text">
					取件码 : {{orderItem.code}}
				</view>
				<view class="">
					<view class="code_text">
						送货员 : {{orderItem.rider_name}}
					</view>
					<view class="code_text">
						取件时间 : {{getDate(orderItem.fetch_time)}}
					</view>
				</view>
				
				<!-- <view class="btn_grow">
					<view class="btn blue round sm" @click="dayin(orderItem)">
						确认配送
					</view>
				</view> -->
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [{
						text: "已配货",
						type: 3
					}, {
						text: "已取走",
						type: 4
					},
					{
						text: "已取消",
						type: 8
					}, {
						text: "全部",
						type: ""
					}
				],
				tabSel: 0,
				orderList: [],
				timer:""
			};
		},
		onShow() {
			let this_= this;
			
			this_.getOrder(3)
			
			this.timer = setInterval(()=>{
				console.log(this_.tabList[this_.tabSel],this_.tabList[this_.tabSel].type)
				this_.getOrder(this_.tabList[this_.tabSel].type)
			},1000)
		},
		onHide() {
			let this_ = this;
			clearInterval(this_.timer)
		},
		// onPullDownRefresh() {
		// 	let this_ = this;
		// 	this.getOrder(this.tabList[this.tabSel].type)
		// 	//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
		// 	setTimeout(function() {
		// 		uni.stopPullDownRefresh(); //停止下拉刷新动画
		// 	}, 1000);
		// },
		
		methods: {
			selectTab(el, i) {
				this.tabSel = i;
				this.getOrder(el.type);
			},
			clacStatus(status){
				if(status == 1){
					return "已配货"
				}
				if(status == 2){
					return "已取走"
				}
				if(status == 3){
					return "已完成"
				}
			},
			getOrder(type){
				
				this.$getApi("/App/User/getDonePackage", {status:type}, res => {
					// this.hisList = [];
					console.log(res,"库管发货管理")
					this.orderList = res.data;
					
				})
			},
			search(){
				uni.navigateTo({
					url:"./footSearch"
				})
			},
			getDate(time){
				if(time != 0 ){
					return this.$getDate(time,"s-s-s s:s:s","c")
				}else{
					return 0
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.no_foot{
		text-align: center;
		font-size: 40upx;
		padding-top: 100upx;
		.no_img{
			width: 500upx;
			height: 500upx;
		}
		.no_text{
			font-size: 40upx;
			color: #999;
			padding-top: 60upx;
		}
	}
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
