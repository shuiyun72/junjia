<template>
	<view class="no_time_recommend">
		<view class="buy_car iconfont icongouwuche" @click="toShopCar">
			<view class="text" v-if="carShowNum>0">
				{{carShowNum}}
			</view>
		</view>
		<view class="posi_img">
			<image src="../../static/img/daojishi.png" mode="" class="img"></image>
			<view class="no_time_q">
				<view class="item" :class="{'active':(index == noTimeSel && daojishi == 1)}" v-for="(item,index) in qiaogouTimeList">
					<view class="time">
						{{item.start_time}}
					</view>
					<view class="btn">
						<!-- {{index == noTimeSel?'抢购中': index < noTimeSel ? '已结束' : '即将开始'}} -->
						{{calcNavState(index,selIndexTime)}}
					</view>
				</view>
			</view>
		</view>
		<view class="scroll_fixed" :class="{'fixed':isFixed}">
			<view class="dao_jishi">
				<view class="text">
					{{daojishiState == 'start' ? '距离下一场开始':'离本场结束'}} :
				</view>
				<view class="btn_or">
					{{daojiTime[0]}}
				</view>
				<view class="case">
					:
				</view>
				<view class="btn_or">
					{{daojiTime[1]}}
				</view>
				<view class="case">
					:
				</view>
				<view class="btn_or">
					{{daojiTime[2]}}
				</view>
			</view>
			<!-- 			<view class="dao_jishi" v-if="daojishi == 0">
				<view class="text">
					本场已结束
				</view>
			</view> -->
			<view class="scroll_foots" ref="scrollFoots" :style="{'height':isFixed?'1140upx':'920upx'}">
				<view>
					<view class="title_recommend"></view>
					<view class="rec_body_sy" v-if="shopList.length > 0">
						<sy-foot2 v-for="item in shopList" :item="item" @click="foot2Click">
							<!-- <view class="num_add_sy">
								<view class="iconfont iconjian" v-if="item.num > 0" @click.stop="foot2Jian(item)"></view>
								<view class="n" v-if="item.num > 0">{{ item.num }}</view>
								<view class="iconfont iconjia show" @click.stop="foot2Jia(item)"></view>
							</view> -->
							<view class="btn_qiang" @click.stop="foot2Jia(item)">
								立即抢
							</view>
						</sy-foot2>
						
					</view>
				</view>
				<view class="no_foot" v-if="shopList.length == 0">
					<image src="../../static/img/none.png" class="no_img" mode=""></image>
					<view class="no_text">
						暂无可抢购商品
					</view>
				</view>
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
		onLoad(ph) {

		},
		data() {
			return {
				haveTime: {
					shi: "00",
					fen: "00",
					miao: "00"
				},
				ceshi: [1, 2, 3],
				itddd: 0,
				isFixed: false,
				classifyNav: [{
						name: "水果"
					},
					{
						name: "蔬菜"
					},
					{
						name: "肉禽"
					},
					{
						name: "海鲜水产"
					},
					{
						name: "粮油调料"
					}
				],
				classifyIndex: 0,
				shopList: [],
				timer: "",
				qiaogouTimeList: [],
				qiaogouTime: "",
				noTimeSel: -1,
				daojishi: "",
				daojishiState: "",
				haveTime: "",
				daojiTime: "",
				selIndexTime: "",
				timerCC: true
			};
		},
		watch: {
			itddd: {
				handle: function() {
					console.log(this.$refs.itddd)
				},
				deep: true
			}
		},
		onPageScroll(res) {
			// console.log(res.scrollTop)
			if (res.scrollTop > 115) {
				this.isFixed = true;
			} else {
				this.isFixed = false;
			}
		},
		computed: {
			...mapState(["httpp", "SystemInfo", "userInfo", "shopCar"]),
			carShowNum() {
				let carShowNum = 0;
				_.map(this.shopCar, itemC => {
					carShowNum += itemC.num
				})
				return carShowNum;
			}
		},
		onShow() {

			//抢购时间
			this.$getApi("/App/Goods/getShoppingTypes", {}, res => {
				let qiaogouTimeList = res.data;
				// let qiaogouTimeList = [
				// {start_time:"01:00:00",end_time:"02:00:00"}
				// ,{start_time:"02:43:20",end_time:"02:44:00"}
				// ,{start_time:"15:44:30",end_time:"15:45:00"}
				// ]
				// let qiaogouTimeList = [{
				// 	start_time: "15:27:00",
				// 	end_time: "15:27:20"
				// }, {
				// 	start_time: "15:27:30",
				// 	end_time: "15:27:40"
				// }, {
				// 	start_time: "15:40:00",
				// 	end_time: "15:40:50"
				// }]

				this.qiaogouTimeList = qiaogouTimeList;
				// let resTime = ["2:00-4:00","5:00-6:00","7:00-8:00"];
				let newT = this.$getDate("", "s-s-s");
				console.log(newT)
				let timeList = [];
				_.map(qiaogouTimeList, resTim => {
					// let s_e_time = resTim.split("-");
					timeList.push(newT + " " + resTim.start_time)
					timeList.push(newT + " " + resTim.end_time)
				})
				setInterval(() => {
					this.calcHaveTime(timeList);
				}, 1000)


			})

			// this.calcTimeNo()
			// let this_ = this;
			// this.timer = setInterval(()=>{
			// 	console.log("定时器")
			// 	this.calcTimeNo()
			// },1000)
		},
		onHide() {
			clearInterval(this.timer)
		},
		beforeDestroy() {
			clearInterval(this.timer)
		},
		methods: {
			...mapMutations(["jiaCar", "jianCar"]),
			calcHaveTime(timeList) {
				let currentTime = new Date();
				if (new Date(timeList[0]) > currentTime) {
					this.daojishiState = "start";
					this.selIndexTime = -1;
					this.haveTime = timeList[0];
				} else
				if (new Date(timeList[timeList.length - 1]) < currentTime) {
					this.daojishiState = "";
					this.selIndexTime = timeList.length + 1;
					this.haveTime = "";
				} else {
					for (let i = 0; i < timeList.length; i++) {
						if (new Date(timeList[i]) < currentTime && new Date(timeList[i + 1]) > currentTime) {
							this.selIndexTime = i;
							if (i % 2 == 1) {
								this.daojishiState = "start";
								this.shopList = [];
							} else {
								this.daojishiState = "doing"
								this.getGoodsList(timeList[i])
							}
							this.haveTime = timeList[i + 1];

							break;
						}
					}
				}
				let thisDateTime = new Date().getTime();
				let haveTime = new Date(this.haveTime).getTime() - thisDateTime;
				console.log(haveTime > 0)
				let second = Math.floor(haveTime / 1000);
				let hr = Math.floor(second / 3600 % 24);
				let min = Math.floor(second / 60 % 60);
				let sec = Math.floor(second % 60);
				hr = hr < 10 ? '0' + hr : hr;
				min = min < 10 ? '0' + min : min;
				sec = sec < 10 ? '0' + sec : sec;
				if (haveTime > 0) {
					this.daojiTime = [hr, min, sec]
				} else {
					this.daojiTime = ["已", "结", "束"]
				}
			},
			getGoodsList(qiaogouTime) {
				console.log(qiaogouTime)
				this.$getApi("/App/Goods/getShoppingGoods", {
					time: qiaogouTime.split(" ")[1]
				}, res => {
					console.log(res, "抢购")
					let shopList = res.data;
					_.map(shopList, itemL => {
						_.map(this.shopCar, itemC => {
							if (itemL.id == itemC.id) {
								itemL.num = itemC.num
							}else{
								itemL.num = 0
							}
						})
					})
					this.shopList  = shopList;
				})
			},
			erNav(item, index) {
				this.classifyIndex = index;
				console.log(item.name)
				console.log(this.$refs.titleName)
				document.getElementsByClassName("")
				let titleNames = this.$refs.titleName;
				_.map(titleNames, itemL => {
					if (item.name == itemL.$el.innerText) {
						console.log(itemL.$el.offsetTop)
						this.$refs.scrollFoots.$el.scrollTop = itemL.$el.offsetTop - 56
					}
				})
				// return false;
				// let this_ = this;
				// let query = wx.createSelectorQuery();
				// query.selectAll(".text_query_ng").boundingClientRect();
				// query.exec(function(res) {
				// 	console.log(this_.$refs.scrollFoots)
				// 	// this_.$refs.scrollFoots.$el.scrollTop = res[0][index].top-167
				// 	// for(let i;i<res[0].length;i++){
				// 	// 	if(item.name == res[0][i].innerText){
				// 	// 		this_.$refs.scrollFoots.$el.scrollTop = res[0][i].top-167
				// 	// 	}

				// 	// }
				// })

			},
			toShopCar() {
				uni.switchTab({
					url: "../shopCar/shopCar"
				})
			},
			foot2Click(item) {
				console.log(item)
				uni.navigateTo({
					url: "../detail/detail?id=" + item.id
				})
			},
			foot2Jia(item) {
				console.log("111111111")
				if (this.timerCC) {
					this.timerCC = false;
					setTimeout(() => {
						this.timerCC = true;
					}, 500)
					_.map(this.shopList, fil => {
						console.log(item)
						if (fil.id == item.id) {
							item.num++;
							if (item.num == 1) {
								// App/Goods/add_car
								this.$getApi("/App/Goods/add_car", {
									goods_id: item.id,
									num: item.num
								}, resCar => {
									this.timerCC = true;
									this.jiaCar(item)
								})
							} else {
								this.$getApi("/App/Goods/shop_car", {}, resCar => {
									console.log(resCar.data, item.id, "item.id")
									let carId = _.filter(resCar.data, itemC => {
										return itemC.id == item.id
									})[0].cart_id;
									this.$getApi("/App/Goods/change_car_num", {
										id: carId,
										num: item.num
									}, res => {
										this.timerCC = true;
										this.jiaCar(item)
									})
								})
							}
						}
					})
				}
			},
			foot2Jian(item) {
				console.log("2222222222")
				console.log(item)
				_.map(this.shopList, fil => {
					if (fil.id == item.id) {
						item.num--;
						if (item.num == 0) {
							// App/Goods/add_car
							this.$getApi("/App/Goods/shop_car", {}, resCar => {
								console.log(resCar, item, "1212")
						
								let carId = _.filter(resCar.data, itemC => {
									return itemC.id == item.id
								})[0].cart_id;
						
								this.$getApi("/App/Goods/del_car", {
									ids: carId
								}, resCar => {
									this.timer = true;
									this.jianCar(item)
								})
							})
						} else {
							this.$getApi("/App/Goods/shop_car", {}, resCar => {
								let carId = _.filter(resCar.data, itemC => {
									return itemC.id == item.id
								})[0].cart_id;
								this.$getApi("/App/Goods/change_car_num", {
									id: carId,
									num: item.num
								}, res => {
									this.timer = true;
									this.jianCar(item)
								})
							})
						}
					}
				})
			},
			calcNavState(index, noTimeSel) {
				console.log(noTimeSel)
				let Cindex = (index + 1) * 2 - 1;
				if (noTimeSel == (this.qiaogouTimeList.length * 2 + 1)) {
					return "已结束"
				} else
				if (noTimeSel == -1) {
					return "即将开始"
				} else {
					if (Cindex == (noTimeSel + 1)) {
						return "抢购中"
					} else
					if (Cindex > (noTimeSel + 1)) {
						return "即将开始"
					} else
					if (Cindex < noTimeSel || Cindex * 2 <= noTimeSel || Cindex == noTimeSel) {
						return "已结束"
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.num_add_sy {
		display: inline-flex;

		.n {
			width: 50upx;
			text-align: center;
			position: relative;
			top: 8upx;
		}

		.iconfont {
			padding: 6upx 8upx;
			border-radius: 50%;
		}

		.iconjian {
			// background-color: #f0f0f0;
			// color: #666;
			background-color: $uni-bl;
			color: #fff;
		}

		.iconjia {
			background-color: #f0f0f0;
			color: #666;

			&.show {
				background-color: $uni-bl;
				color: #fff;
			}
		}
	}

	.buy_car.icongouwuche {
		position: fixed;
		bottom: 40upx;
		right: 40upx;
		font-size: 70upx;
		background-color: $uni-bl;
		color: #fff;
		width: 120upx;
		height: 120upx;
		text-align: center;
		line-height: 120upx;
		border-radius: 50%;
		z-index: 10;

		.text {
			background-color: $uni-or;
			position: absolute;
			top: 16upx;
			right: 16upx;
			font-size: 26upx;
			width: 36upx;
			height: 36upx;
			line-height: 36upx;
			border-radius: 50%;
			transform: scale(.8);
		}
	}

	.no_time_recommend {
		background-color: #f0f0f0;
		min-height: 100vh;
		padding-bottom: 200upx;
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
		.scroll_fixed {
			padding: 0 26upx;
			position: relative;
			top: -60upx;
			width: 698upx;

			&.fixed {
				position: fixed;
				top: 100upx;
				left: 0;
			}

			.scroll_foots {
				overflow-y: auto;
				// max-height: calc( 100vh - 400upx );
			}
		}

		.posi_img {
			width: 750upx;
			height: 360upx;
			position: relative;

			.img {
				width: 750upx;
				height: 360upx;
			}

			.no_time_q {
				position: absolute;
				width: 750upx;
				box-sizing: border-box;
				left: 0;
				bottom: 0;
				display: flex;
				padding: 0 40upx 80upx;
				justify-content: space-between;

				.item {
					.time {
						font-size: 36upx;
						color: #fff;
						font-weight: bold;
						letter-spacing: 2upx;
						text-align: center;
					}

					.btn {
						width: 120upx;

						text-align: center;
						padding: 6upx 0 10upx;
						margin-top: 10upx;
						border-radius: 30upx;
						color: #fff;
					}

					&.active {
						.btn {
							background-color: #fff;
							color: $uni-red;
						}
					}
				}
			}
		}

		.dao_jishi {

			background-color: rgba(255, 255, 255, 1);
			padding: 26upx 10upx 26upx;
			border-radius: 30upx 30upx 0 0;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;

			.text {
				font-size: 32upx;
				color: #666;
			}

			.btn_or {
				width: 50upx;
				height: 50upx;
				background-color: $uni-or;
				text-align: center;
				line-height: 50upx;
				border-radius: 50%;
				color: #fff;
				margin: 0 10upx;
			}

			.case {
				color: $uni-or;
				font-weight: bold;
			}
		}

		.title_recommend {
			display: flex;
			justify-content: center;
			color: $uni-bl;
			font-weight: bold;
			font-size: 28upx;
			padding: 12upx 0;

			.text_query_ng {
				display: inline-flex;
				align-items: center;
			}

			.text_query_ng::before {
				display: block;
				content: "";
				width: 14px;
				height: 1px;
				background-color: $uni-bl-t;
				position: relative;
				left: -20upx;
			}

			.text_query_ng::after {
				display: block;
				content: "";
				width: 14px;
				height: 1px;
				background-color: $uni-bl-t;
				position: relative;
				right: -20upx;
			}
		}
	}

	.rec_body_sy {
		background-color: #fff;
		border-radius: 12upx;
		padding: 10upx 26upx;

	}
</style>
