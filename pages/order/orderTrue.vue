<template>
	<view class="order_true">
		<view class="sel_address">
			<image src="../../static/img/icon-dingddz.png" class="add_img" mode=""></image>
			<view class="title" v-if="!address" @click="selItem('dizhi')">
				请选择地址
			</view>
			<view class="user_info" v-if="address" @click="selItem('dizhi')">
				<view class="pt1">
					<view class="name">
						{{address.name}}
					</view>
					<view class="phone">
						{{address.phone}}
					</view>
				</view>
				<view class="pt2">
					{{address.receive_address}}{{address.address?address.address:''}}
				</view>
			</view>
			<view class="iconfont iconjiantou"></view>
		</view>
		<uni-list>
			<sy-list-item title="送达时间" @click="selItem('time')">
				<template v-slot:right="">
					<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
						<view class="peisong_timje">{{timeText}}</view>
					</picker>
				</template>
			</sy-list-item>
		</uni-list>
		<view class="h20"></view>
		<view class="order_msg">
			<view class="title">
				<view class="left">
					商品
				</view>
				<view class="num">
					{{orderTrueFoot.length}}件
				</view>
			</view>
			<view class="i_item" v-for="item in orderTrueFoot">
				<view class="left">
					<image :src="item.thumb" class="img_m" mode=""></image>
					<view class="info_cc">
						<view class="in1 shengluehao">
							{{item.name}}
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
			<view class="last_calc">
				共{{allFootsCalc}}件商品 小计￥:<text class="num">{{allMoneyFootsCalc}}元</text>
			</view>
		</view>
		<view class="h20"></view>
		<uni-list>
			<sy-list-item title="优惠券" @click="selItem('youhuiquan')">
				<template v-slot:right="">
					<view class="list_youhuiquan">
						{{youhuiquan.coupon_id?youhuiquan.title:'请选择优惠券'}}
					</view>
				</template>
			</sy-list-item>
			<sy-list-item title="备注" @click="selItem('beizhu')" :showArrow="false">
				<template v-slot:right="">

					<input type="text" class="beizhu_input_text" v-model="beizhuC" placeholder="请填写备注" />

				</template>
			</sy-list-item>
		</uni-list>
		<view class="h20">

		</view>
		<view class="">
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
				<!-- #ifndef MP -->
				<label class="cu-form-group">
					<view class="item">
						<image style="width: 44rpx;height: 44rpx;" src="../../static/img/zhifb.png" mode=""></image><text class="margin-left-xs">支付宝支付</text>
					</view>
					<view>
						<radio :class="radio=='B'?'checked':''" :checked="radio=='C'?true:false" value="B" class="radio" :color="'#18B357'"></radio>
					</view>
				</label>
				<!-- #endif -->
			</radio-group>
			<view class="dikou" @click="isDikouC">
				<view class="iconfont " :class="isDikou?'iconyduizhengqueshixin':'iconyk_yuanquan'"></view>
				<view class="">
					使用金币抵扣
				</view>
			</view>
		</view>

		<view class="h20"></view>
		<uni-list>
			<uni-list-item title="总价" :rightText="'￥'+allMoneyFootsCalc" :showArrow="false"></uni-list-item>
			<uni-list-item title="配送费" :rightText="'￥'+peisong" :showArrow="false"></uni-list-item>
			<uni-list-item title="优惠券" :rightText="'-'+youhui" :showArrow="false" v-if="youhui != 0"></uni-list-item>
			<uni-list-item title="合计" :rightText="'￥'+allMoneyFootsCalcPS" :showArrow="false"></uni-list-item>
		</uni-list>
		<view class="h20"></view>
		<view class="tishi">
			订单满{{mianPeisong}}元免配送费
		</view>
		<view class="h120">

		</view>
		<view class="bottom_btn_zu_sy">
			<view class="btn1">
				<view>合计 :</view>
				<view class="red">
					￥<text class="big">{{allMoneyFootsCalcPS}}元</text>
				</view>
			</view>
			<view class="btn_b bl" @click="toNav('pay')">
				去支付
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex";
	import _ from "../../until/lodash";
	export default {
		data() {
			return {
				beizhuC: "",
				radio: "A",
				money: 23.88,
				allMoney: 23.88,
				isDikou: true,
				multiArray: [
					[],
					[]
				],
				multiIndex: [0, 0],
				timeText: "",
				order_id: "",
				total_credit: "",
				peisong: 0,
				mianPeisong: 28

			};
		},
		computed: {
			...mapState(["address", "orderTrueFoot", "youhuiquan"]),
			allFootsCalc() {
				let numL = 0;
				_.map(this.orderTrueFoot, item => {
					numL = numL + Number(item.num)
				})
				return numL
			},
			youhui(){
				if(this.youhuiquan.money){
					return this.youhuiquan.money
				}else{
					return 0
				}
			},
			allMoneyFootsCalc() {
				let numL = 0;
				_.map(this.orderTrueFoot, item => {
					numL = numL + Number(item.num) * (Number(item.price) * 100)
				})
				return numL / 100
			},
			allMoneyFootsCalcPS() {
				console.log(this.allMoneyFootsCalc, this.peisong)
				if (this.allMoneyFootsCalc < this.mianPeisong) {
					this.peisong = this.peisong
				} else {
					this.peisong = 0
				}
				let youhuiquanM = this.youhuiquan.money ? Number(this.youhuiquan.money) : 0;
				return Number(this.allMoneyFootsCalc) + Number(this.peisong) - youhuiquanM;
			}
		},
		onShow() {
			console.log("orderTrueFoot", this.orderTrueFoot)
			console.log(this.address)
		},
		onLoad(ph) {
			if (ph.strCode) {
				this.$getApi("/App/Goods/create_order", {
					str: ph.strCode
				}, res => {
					console.log(res, "1212")
					this.$store.commit('clearCar')
					this.order_id = res.data.order_id;
					this.total_credit = res.data.total_credit;
				})
			}
			if (ph.orderId) {
				this.order_id = ph.orderId;
				this.$getApi("/App/Goods/anotherOrder", {
					id: this.order_id
				}, resCC => {
					this.$getApi("/App/Goods/orderDetail", {
						id: ph.orderId
					}, res => {

						console.log(resCC, "再来一单")
						console.log(res.data[0], "1212")
						let rItem = res.data[0];
						let addressItem = {
							address: rItem.user_address.split(" ")[1],
							name: rItem.user_name,
							phone: rItem.user_phone,
							receive_address: rItem.user_address.split(" ")[0]
						}
						this.$store.commit("setAddress", addressItem)
						// this.timeText = rItem.receive_time;
						let goodsList = [];
						_.map(rItem.goods_list, item => {
							item.thumb = item.goods_thumb;
							item.id = item.goods_id;
							item.name = item.goods_name;
							goodsList.push(item)
						})
						this.$store.commit("setOrderTrueFoot", goodsList)
						this.beizhuC = rItem.remark;

						let order_car = [];
						this.$getApi("/App/Goods/shop_car", {}, resCar => {
							console.log(resCar)
							_.map(resCar.data, itemCar => {
								_.map(goodsList, item => {
									console.log(item.id, itemCar.id)
									if (item.id == itemCar.id) {
										order_car.push(itemCar.cart_id + "_" + item.num);
									}
								})
							})
							console.log(order_car.toString())

							let huanhouId = 0;
							if (this.itemHg && this.itemHg.id) {
								huanhouId = this.itemHg.id
							} else {
								huanhouId = ""
							}
							this.$getApi("/App/Goods/shopping_cart", {
								shop_ids_num: order_car.toString(),
								change_goods_id: huanhouId
							}, resCode => {
								console.log(resCode, "1212resCode")
								this.$getApi("/App/Goods/create_order", {
									str: resCode.data
								}, res => {
									console.log(res, "1212")
									this.$store.commit('clearCar')
									this.order_id = res.data.order_id;
									this.total_credit = res.data.total_credit;
								})
							})
						})

					})
				})
			}
		},
		mounted() {
			let newD = new Date();
			let toData = newD.setTime(newD.getTime() + 24 * 60 * 60 * 1000);
			let newTime = "今天-" + this.$getDate("", "月-号");
			let tomorrowTime = "明天-" + this.$getDate(toData, "月-号")
			this.multiArray = [
				[newTime, tomorrowTime],
				["尽快送达", "12:00-12:30", "12:30-13:00", "13:00-13:30", "17:30-18:00", "18:00-18:30", "18:30-19:00", "19:00-19:30",
					"19:30-20:00", "20:00-20:30", "20:30-21:00", "21:00-21:30"
				]
			]
			this.timeTextM();
			let this_ = this;
			// 获取系统配置信息
			this_.$getApi("/App/Index/getSysConfig", {}, res => {
				console.log(res, "获取系统配置信息")
				this_.peisong = _.filter(res.data, item => {
					return item.remark.includes('配送费')
				})[0].value;
				// this_.mianPeisong = _.filter(res.data,item=>{
				// 	return item.remark.includes('免配送费门槛')
				// })[0].value;
				this_.mianPeisong = 0;
			})
		},
		methods: {

			timeTextM() {
				console.log(this.multiIndex, "ccc")
				if (this.multiArray[1][this.multiIndex[1]] == '尽快送达') {
					let shijianC = new Date().getTime() + 1800000;
					let lasteTimeC = this.$getDate(new Date(shijianC), "s:s:s")
					console.log(lasteTimeC)
					let lasteTimeC2 = lasteTimeC.split(":")[0] + ":" + lasteTimeC.split(":")[1]
					console.log(lasteTimeC2)
					this.timeText = "尽快送达 预计" + lasteTimeC2 + "送达"
				} else {
					this.timeText = this.multiArray[0][this.multiIndex[0]] + " " + this.multiArray[1][this.multiIndex[1]]
				}
			},
			isDikouC() {
				if (this.isDikou) {
					this.isDikou = false
				} else {
					this.isDikou = true
				}
			},
			selItem(el) {
				// 'dizhi'
				console.log(el)
				if (el == 'dizhi') {
					uni.navigateTo({
						url: "../mine/address?title=地址选择"
					})
				}
				if (el == 'time') {
					// this.$refs.songTime.open()
				}
				if (el == 'youhuiquan') {
					uni.navigateTo({
						url: "../mine/youhuiquan?fromOrder=1&money=" + this.allMoneyFootsCalc
					})
				}
			},
			RadioChange(el) {
				console.log(el)
				this.radio = el.detail.value
			},
			toNav(el) {
				let this_ = this;
				if (el == 'pay') {
					if (!this.address.name) {
						this.$msg('请选择地址')
						return false;
					};

					console.log(this.timeText)
					let timeText = ""
					if (this.timeText.indexOf('尽快送达') != -1) {
						let thisTT = this.timeText.split("预计")[1].split("送达")[0];
						let thisTimeC = this.$getDate("", "s:s:s").split(":")[0] + ":" + this.$getDate("", "s:s:s").split(":")[1]
						timeText = this.$getDate("", "s-s-s") + " " + thisTimeC + "-" + thisTT
					} else
					if (this.timeText.indexOf('今天') != -1) {
						timeText = this.$getDate("", "s-s-s") + " " + this.timeText.split("号 ")[1]
						let selTime = new Date(this.$getDate("", "s-s-s") + " " + this.timeText.split("号 ")[1].split("-")[1] + ":00").getTime();
						if (selTime <= new Date().getTime()) {
							this.$msg("您选择的今天送达时间 " + this.timeText.split("号 ")[1].split("-")[1] + " 不合理,请重新选择")
							return false;
						}
					} else
					if (this.timeText.indexOf('明天') != -1) {
						let day3 = new Date();
						let tomorrow = day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000);
						timeText = this.$getDate(tomorrow, "s-s-s") + " " + this.timeText.split("号 ")[1]
					}
					let user_address = this.address.address ? this.address.address : "";
					let dataL = {
						id: this.order_id,
						remark: this.beizhuC,
						user_name: this.address.name,
						user_phone: this.address.phone,
						user_address: this.address.receive_address + user_address,
						receive_time: timeText,
						coupon_id: this.youhuiquan.coupon_id ? this.youhuiquan.coupon_id : "",
						credit: this.total_credit,
						lat: this.address.lat,
						lng: this.address.lng
					}
					console.log(dataL)
					this.$getApi("/App/Goods/editOrder", dataL, resEdit => {
				
						let payType = 0;
						// #ifndef MP
						payType = this.radio == "A" ? 1 : 2;
						// #endif
						// #ifdef MP
						payType = 3;
						// #endif
						let dataPay = {
							type: payType,
							total_credit: this.allMoneyFootsCalcPS,
							id: this.order_id
						}
						this.$getApi("/App/Goods/payOrder", dataPay, resbuy => {
							console.log(resbuy, "payOrder1111")
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
									orderInfo: orderMsgL, //微信、支付宝订单数据
									success: function(res) {
										this_.$msg(JSON.stringify(res))
										uni.navigateTo({
											url: "../home/msg?title=付款成功"
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
											url: "../home/msg?title=付款成功"
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
												url: "../home/msg?title=付款成功"
											})
										} else {
											setTimeout(() => {
												uni.navigateTo({
													url: "../home/msg?title=付款成功"
												})
											}, 600)
										}
									},
									fail: function(err) {
										console.log('fail:' + JSON.stringify(err));
									}
								});
							}
						})
					})


				}
			},
			bindMultiPickerColumnChange: function(el) {
				console.log(el)
				let newD = new Date();
				let toData = newD.setTime(newD.getTime() + 24 * 60 * 60 * 1000);
				let newTime = "今天-" + this.$getDate("", "月-号");
				let tomorrowTime = "明天-" + this.$getDate(toData, "月-号")

				if (el.detail.column == 0) {
					this.multiIndex[0] = el.detail.value
					if (el.detail.value == 0) {
						this.multiArray = [
							[newTime, tomorrowTime],
							["尽快送达", "12:00-12:30", "12:30-13:00", "13:00-13:30", "17:30-18:00", "18:00-18:30", "18:30-19:00",
								"19:00-19:30", "19:30-20:00", "20:00-20:30", "20:30-21:00", "21:00-21:30"
							]
						]
					} else
					if (el.detail.value == 1) {
						this.multiArray = [
							[newTime, tomorrowTime],
							["12:00-12:30", "12:30-13:00", "13:00-13:30", "17:30-18:00", "18:00-18:30", "18:30-19:00", "19:00-19:30",
								"19:30-20:00", "20:00-20:30", "20:30-21:00", "21:00-21:30"
							]
						]
					}
					this.timeTextM()
				} else
				if (el.detail.column == 1) {
					console.log("cccccccccccccc")
					this.multiIndex[1] = el.detail.value;
					console.log(this.multiIndex)
					this.timeTextM()
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.order_true {
		.sel_address {
			display: flex;
			align-items: center;
			padding: 6upx 62upx 6upx 32upx;

			.add_img {
				width: 54upx;
				height: 54upx;
				flex-shrink: 0;
			}

			.title {
				font-size: 34upx;
				color: #666;
				flex: 1;
				padding-left: 20upx;
			}

			.user_info {
				flex: 1;
				padding-left: 20upx;
				color: #666;

				.pt1 {
					display: flex;
					align-items: center;
					margin-bottom: 6upx;

					.name {
						font-size: 32upx;
						font-weight: bold;
					}

					.phone {
						font-size: 32upx;
						margin-left: 30upx;
					}
				}

				.pt2 {
					font-size: 28upx;

				}
			}

			.iconjiantou {
				color: #ccc;
				width: 12upx;
				flex-shrink: 0;
				font-size: 44upx;
			}
		}

		.h120 {
			height: 120upx;
			background-color: #f0f0f0;
		}

		.bottom_btn_zu_sy {
			display: flex;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 750upx;
			align-items: center;
			background-color: #fff;

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

		.peisong_timje {
			background-color: $uni-bl;
			color: #fff;
			padding: 0 20upx 3upx;
			border-radius: 20upx;
		}

		.dikou {
			display: flex;
			color: #666;
			background-color: #f0f0f0;
			padding: 10upx 26upx;

			.iconyduizhengqueshixin {
				color: $uni-bl;
				margin-right: 10upx;
			}

			.iconyk_yuanquan {
				color: #666;
				margin-right: 10upx;
			}
		}

		.list_youhuiquan {
			color: #666;
			font-size: 30upx;
		}

		.beizhu_input_text {
			text-align: right;
		}

		.tishi {
			background-color: $uni-or;
			padding: 10upx 26upx;
			color: #fff;
		}

		.order_msg {
			background-color: #fff;
			margin-top: 20upx;
			padding: 20upx 26upx;

			.last_calc {
				text-align: right;
				color: #666;

				.num {
					font-size: 32upx;
				}
			}

			.title {
				display: flex;
				justify-content: space-between;
				font-size: 32upx;
				color: #333;
				margin-bottom: 10upx;
			}

			.i_item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #666;
				padding: 20upx 0;

				.left {
					display: inline-flex;
					align-items: center;

					.img_m {
						width: 90upx;
						height: 90upx;
					}

					.info_cc {
						margin-left: 20upx;
						display: inline-flex;
						flex-direction: column;
						justify-content: space-between;

						.in1 {
							width: 540upx;
							margin-bottom: 10upx;
						}
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
