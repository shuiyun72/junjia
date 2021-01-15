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
						{{calcNavState(index,noTimeSel)}}
					</view>
				</view>
			</view>
		</view>
		<view class="scroll_fixed" :class="{'fixed':isFixed}">
			<view class="dao_jishi" v-if="daojishi == 1">
				<view class="text">
					离本场结束 :
				</view>
				<view class="btn_or">
					{{haveTime.shi}}
				</view>
				<view class="case">
					:
				</view>
				<view class="btn_or">
					{{haveTime.fen}}
				</view>
				<view class="case">
					:
				</view>
				<view class="btn_or">
					{{haveTime.miao}}
				</view>
			</view>
			<view class="dao_jishi" v-if="daojishi == 0">
				<view class="text">
					本场已结束
				</view>
			</view>
			<view class="scroll_foots" ref="scrollFoots" :style="{'height':isFixed?'1140upx':'920upx'}">
				<view>
					<view class="title_recommend"></view>
					<view class="rec_body_sy">
						<sy-foot2 v-for="item in shopList" :item="item" @click="foot2Click">
							<!-- <view class="num_add_sy">
								<view class="iconfont iconjian" v-if="item.num > 0" @click.stop="foot2Jian(item)"></view>
								<view class="n" v-if="item.num > 0">{{ item.num }}</view>
								<view class="iconfont iconjia show" @click.stop="foot2Jia(item)"></view>
							</view> -->
							<view class="btn_qiang" v-if="item.state == 3" @click.stop="foot2Jia(item)">
								立即抢
							</view>
						</sy-foot2>
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
				isStart: false,
				
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
				timer:"",
				qiaogouTimeList:[],
				qiaogouTime:"",
				noTimeSel: -1,
				daojishi:""
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
				_.map(qiaogouTimeList,item=>{
					item.sel = 0
				})
				this.qiaogouTimeList = qiaogouTimeList;
			})
			_.map(this.shopList, itemL => {
				_.map(this.shopCar, itemC => {
					if (itemL.id == itemC.id) {
						itemL.num = itemC.num
					}
				})
			})
			this.isStart = true;
			this.calcTimeNo()
			let this_ = this;
			this.timer = setInterval(()=>{
				console.log("定时器")
				this.calcTimeNo()
			},1000)
		},
		onHide() {
			this.isStart = false;
			clearInterval(this.timer)
		},
		beforeDestroy() {
			this.isStart = false;
			clearInterval(this.timer)
		},
		methods: {
			...mapMutations(["jiaCar", "jianCar"]),
			calcTimeNo() {
				if(this.qiaogouTimeList.length > 0){
					let timeDate = this.$getDate("","s-s-s")
					let thisDateTime = new Date().getTime();
					for(let itTime = 0 ; itTime < this.qiaogouTimeList.length;itTime++) { 
						let startTime = new Date(timeDate + " " + this.qiaogouTimeList[itTime].start_time);
						let endTime = new Date(timeDate + " " + this.qiaogouTimeList[itTime].end_time);
						let lastEndTime = new Date(timeDate + " " + this.qiaogouTimeList[this.qiaogouTimeList.length-1].end_time)
						if(thisDateTime  > startTime &&  thisDateTime  < endTime) { 
							this.qiaogouTime = this.qiaogouTimeList[itTime].start_time;
							let toTime = timeDate + " " + this.qiaogouTime;
							this.toTime = this.$lastDate(toTime, "s:s:s")	
							if(itTime != this.noTimeSel){
								this.$getApi("/App/Goods/getShoppingGoods", {time:this.qiaogouTime}, res => {
									console.log(res,"抢购")
									this.shopList = res.data
									// this.clacCar(res.data)
								})
							}
							this.noTimeSel = itTime;
							let haveTime = endTime.getTime() - thisDateTime;
							if(haveTime>0){
								let second = Math.floor(haveTime / 1000);
								let hr = Math.floor(second / 3600 % 24);
								let min = Math.floor(second / 60 % 60);
								let sec = Math.floor(second % 60);
								hr = hr < 10 ? '0' + hr : hr;
								min = min < 10 ? '0' + min : min;
								sec = sec < 10 ? '0' + sec : sec;
								this.haveTime = {
									shi: hr,
									fen: min,
									miao: sec
								}
								this.daojishi = 1;
							}else{
								this.haveTime = {
									shi: "00",
									fen: "00",
									miao: "00"
								}
								this.daojishi = 0;
							}
							break; 
						}else
						if(thisDateTime  < startTime){
							console.log(startTime,itTime)
							this.noTimeSel = itTime-1
							this.daojishi = 0;
							break; 
						}else
						if(thisDateTime  > lastEndTime){
							this.noTimeSel = this.qiaogouTimeList.length + 2
							this.daojishi = 0;
							break; 
						}
					} 
				}
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
				_.map(this.shopList, fil => {
					console.log(item)
					if (fil.id == item.id) {
						item.num++;
						this.jiaCar(item)
					}
				})
			},
			foot2Jian(item) {
				console.log("2222222222")
				console.log(item)
				_.map(this.shopList, fil => {
					if (fil.id == item.id) {
						item.num--;
						this.jianCar(item)
					}
				})
			},
			calcNavState(index,noTimeSel){
				if(index == noTimeSel){
					if(this.daojishi == 0 ){
						return "已结束"
					}else{
						return "抢购中"
					}
					
				}else
				if(index < noTimeSel){
					return "已结束"
				}else{
					return "即将开始"
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
