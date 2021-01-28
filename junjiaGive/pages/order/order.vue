<template>
	<view>
		<view class="tab_list_sy">
			<view class="item" v-for="(item,index) in tabList" :class="{'active':index == tabSel}" @click="selectTab(item,index)">{{item.text}}</view>
		</view>
		<view class="home_body" @touchmove.stop @touch.stop>
			<view class="no_foot" v-if="orderList.length == 0">
				<image src="../../static/img/none.png" class="no_img" mode=""></image>
				<view class="no_text">
					暂无订单
				</view>
			</view>
			<view class="order_item_sy" v-for="orderItem in orderList">
				<view class="o_title">
					<view class="time_l" v-if="orderItem.status == 0">
						待取件
					</view>
					<view class="time_l" v-if="orderItem.status == 1">
						已配货
					</view>
					<view class="time_l" v-if="orderItem.status == 2">
						运送中
					</view>
					<view class="time_l" v-if="orderItem.status == 3">
						<!-- 已送达 -->
						已完成
					</view>
					<view class="time_l" v-if="orderItem.status == 4">
						已完成
					</view>
		<!-- 			<view class="time_l" v-if="orderItem.status == 5">
						已取消
					</view> -->
					
					<view class="code_text2" v-if="orderItem.status == 0 || orderItem.status == 1 || orderItem.status == 2">
						{{clacNoTime(orderItem.receive_time)}}
					</view>
					<view class="code_text2" v-if="orderItem.status == 5">
						用户已取消
					</view>
				</view>
				
				<view class="code_text" v-if="orderItem">
					<view class="name">
						送达时间 :
					</view>
					<view class="text">
						{{clacTimeDate(orderItem.receive_time)}}
						<!-- {{orderItem.receive_time}} -->
					</view>
				</view>
				<view class="code_text" @click.stop="mapTo(orderItem.lat,orderItem.lng)">
					<view class="name">
						送达地址 :
					</view>
					<view class="text">
						<view class="" v-if="orderItem.user_address">
						{{orderItem.user_address.split('undefined')[0]}}
						</view>
						<view class="iconfont iconzhifeiji"></view>
					</view>
				</view>
				<view class="code_text">
					<view class="name">
						姓名
					</view>
					<view class="text">
						{{orderItem.user_name}}
					</view>
				</view>
				<view class="code_text" @click.stop="phoneTo(orderItem.user_phone)">
					<view class="name">
						电话
					</view>
					<view class="text">
						<view class="">
							{{orderItem.user_phone}}
						</view>
						<view class="iconfont iconweibiaoti-"></view>
					</view>
				</view>
				<view class="code_text">
					<view class="name">
						备注 :
					</view>
					<view class="text">
						{{orderItem.remark}}
					</view>
				</view>
				<view class="code_text">
					<view class="name">
						订单编号 :
					</view>
					<view class="text">
						{{orderItem.order_num}}
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
				<view class="code_text" v-if="orderItem.state == 1 || orderItem.state == 3">
					<view class="name">
						取件时间
					</view>
					<view class="text">
						10-21 15:28
					</view>
				</view>
				<view class="code_text" v-if="orderItem.state == 3">
					<view class="name">
						完成时间
					</view>
					<view class="text">
						10-21 15:28
					</view>
				</view>
				<!-- v-if="orderItem.state == 2" -->
				<view class="btn_grow" v-if="orderItem.status == 1">
					<view class="btn blue round sm" @click="orderTo('qujian',orderItem)">
						确认取件
					</view>
					<view class="text_or">
						取件码 : {{orderItem.code}}
					</view>
				</view>
				<view class="btn_grow" v-if="orderItem.status == 2">
					<view class="btn blue round sm" @click="orderTo('songda',orderItem)">
						确认送达
					</view>
					
				</view>
			</view>
		</view>
		<uni-popup ref="orderSongdapop" type="dialog">
		  <view class="order_songda_pop">
		  	<view class="input_box">
		  		<input type="text" placeholder="请输入用户取件码" v-model="orderSongda" class="input"/>
		  	</view>
			<view class="true_btn">
				<view class="quxiao btn" @click="songdaHandle('quxiao')">
					取消
				</view>
				<view class="queren btn" @click="songdaHandle('queren')">
					确认
				</view>
			</view>
		  </view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderSongda:"",
				tabList: [{
						text: "待取件",
						type: 2
					}, {
						text: "运送中",
						type: 4
					},
					{
						text: "已完成",
						type: 7
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
			};
		},
		onHide() {
			this.$refs.orderSongdapop.close()
		},
		onLoad() {
			this.getOrder(2)
		},
		// onPullDownRefresh() {
		// 	console.log("12112")
		// 	let this_ = this;
		// 	this.getOrder(this.tabList[this.tabSel].type)
		// 	//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
		// 	setTimeout(function() {
		// 		uni.stopPullDownRefresh(); //停止下拉刷新动画
		// 	}, 1000);
		// },
		onPullDownRefresh() {
			console.log("12112")
			let this_ = this;
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			setTimeout(function() {
		
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		methods: {
			selectTab(el, i) {
				// console.log(el.type)
				this.tabSel = i;
				this.getOrder(el.type);
			},
			mapTo(lat,lng){
				console.log(lat,lng,"导航")
				lat = Number(lat);
				lng = Number(lng);
				uni.openLocation({
					latitude:lat,
					longitude:lng,
					success: function () {
						console.log('success');
					}
				})
			},
			phoneTo(phone){
				console.log(phone,"电话")
				uni.makePhoneCall({
				    phoneNumber: phone //仅为示例
				});
			},
			clacTimeDate(time){
				console.log(time)
				console.log(time.indexOf('尽快送达') != -1 )
				if(time.indexOf('尽快送达') != -1){
					return this.$getDate('','s-s-s') +" "+time.split("预计")[1].split("送达")[0]
				}else{		
					return time
				}
			},
			clacNoTime(time){
				console.log(time)
				let thisTT = time.split("-")[3]
				console.log(thisTT)
				if( this.$haveFen(thisTT) == "00:00"){
					return "已超时"
				}else{
					return  "剩余 "+this.$haveFen(thisTT)+" 分钟"
				}
			},
			getOrder(type){
				console.log(type,"1212")
				this.$getApi('/App/Goods/getRiderOrder',{status:type},res=>{
					console.log(res,"order")
					this.orderList = res.data
				})
			},
			songdaHandle(el){
				if(el == "quxiao"){
					this.$refs.orderSongdapop.close()
				}
				if(el == "queren"){
					this.$refs.orderSongdapop.close()
					console.log(this.orderSongda)
				}
			},
			search(){
				uni.navigateTo({
					url:"./footSearch"
				})
			},
			orderTo(el,item){
				let this_ = this;
				if(el == 'qujian'){
					uni.showModal({
					    title: '确认取件',
					    content: '是否确认取件?',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								console.log(item)
								
								this_.$getApi('/App/User/gotPackage',{order_id:item.order_id},res=>{
									console.log(res,"确认取件")
									this_.getOrder(4);
									this_.tabSel = 1;
								})
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
				if(el=='songda'){
					// this.$refs.orderSongdapop.open()
					uni.showModal({
					    title: '确认送达',
					    content: '是否确认送达?',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								console.log(item)
								
								this_.$getApi('/App/User/deliverPackage',{order_id:item.order_id},res=>{
									console.log(res,"确认送达")
									this_.getOrder(7);
									this_.tabSel = 2;
								})
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
			},
		}
	}
</script>
<style>
	page{
		background-color: #f0f0f0;
	}
</style>
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
			display: flex;
			.name{
				width: 200upx;
				flex-shrink: 0;
			}
			.text{
				display: inline-flex;
				align-items: center;
				.iconfont{
					margin-left: 10upx;
					color: $uni-bl;
				}
			}
			// border-bottom: 1upx solid #f0f0f0;
		}

		.btn_grow {
			display: flex;
			justify-content: space-between;
			padding-top: 20upx;
			flex-direction: row-reverse;
			align-items: center;
			.text_or{
				color: $uni-or;
			}
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
	.order_songda_pop{
		background-color: #fff;
		width: 600upx;
		box-sizing: border-box;
		padding: 26upx 26upx 0;
		border-radius: 10upx;
		.input_box{
			padding: 30upx 6upx 50upx;
			.input{
				background-color: #f0f0f0;
				padding: 10upx 0;
				text-align: center;
			}
		}
		.true_btn{
			display: flex;
			border-top: 1upx solid #f0f0f0;
			padding: 10upx 0;
			.btn{
				width: 49%;
				text-align: center;
				padding: 20upx 0;
				
			}
			.queren{
				border-left: 1upx solid #ddd;
				color: $uni-bl;
			}
		}
	}
</style>
