<template>
	<view class="shop_car">
		<view class="huangou m26" v-if="!itemHg">
			<view class="box" @click="toNav('huangou')">
				<view class="l_pt1">
					<view class="btn round">
						全场换购
					</view>
					<view class="text">
						全场商品满{{huangou}}元,可参与换购
					</view>
				</view>
				<view class="r_pt1">
					去换购 〉
				</view>
			</view>
		</view>
		<view class="ctrl_btn" v-if="numb > 0">
			<view class="name">
				已加购商品
			</view>
			<view class="btn" @click="deleteFoots">
				删除
			</view>
		</view>
		<!-- 换购商品 -->
		<view class="shop_car_cc">
		
			<view class="shop_list huangou_c" v-if="itemHg">
				<view class="for_item_box huangou_ctrl" >
					<view class="ctrl_btn"  @click="toNav('huangou')">
						<view class="name">
							已加购商品
						</view>
						<view class="btn">
							去换购>
						</view>
					</view>
					<view class="item_box" >
						<view class="iconfont sel_s" :class="itemHg.sel == 1?'iconyduizhengqueshixin':'sel_c'"></view>
						<view class="right_info">
							<view class="">
								<image :src="itemHg.thumb" class="img" mode=""></image>
							</view>
							<view class="text">
								<view class="title">
									<view>{{itemHg.name}}</view>
								</view>
								<view class="money_num">
									<view class="money or">
										换购价 : ￥<text class="price">{{itemHg.change_price}}</text>
									</view>
									<view class="num_add_sy">
										<view class="n">x1</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 购物车商品 -->
			<view class="shop_list">
				<view v-if="shopList.length > 0">
					
				
				<view class="for_item_box" v-for="(item,index) in shopList">
					<view class="item_box" >
						<view class="iconfont sel_s" :class="item.sel == 1?'iconyduizhengqueshixin':'sel_c'"  @click="selItem(item,index)"></view>
						<view class="right_info">
							<view class="">
								<image :src="item.thumb" class="img" mode="" @click="showDetail(item)"></image>
							</view>
							<view class="text">
								<view class="title" @click="showDetail(item)">
									<view class="maiyisong" v-if="item.on_sale == 1">买一送一</view> <view>{{item.name}}</view>
								</view>
								<view class="money_num">
									<view class="money">
										￥<text class="price">{{item.price}}</text>
									</view>
									<view class="num_add_sy">
										<view class="iconfont iconjian" v-if="item.num > 0" @click.stop="foot2Jian(item)"></view>
										<view class="n" v-if="item.num > 0">{{ item.num }}</view>
										<view class="iconfont iconjia" @click.stop="foot2Jia(item)"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="maiyisongyi" v-if="item.on_sale == 1">
						<view class="img_l">
							<image :src="item.thumb" class="img" mode=""></image>
						</view>
						<view class="text_r">
							<view class="r_l shengluehao">
								<view class="or">
									赠品
								</view>
								<view >
									{{item.name}}
								</view>
							</view>
							<view class="r_r">
								x{{item.num}}
							</view>
						</view>
						
					</view>
				</view>
				</view>
				<view class="no_foot" v-if="shopList.length == 0">
					<image src="../../static/img/none.png" class="no_img" mode=""></image>
					<view class="no_text">
						暂无商品
					</view>
				</view>
			</view>
			
		</view>
		<view class="car_pay_sy">
			<view class="part1">
				<view class="iconfont sel_s" :class="allItem?'iconyduizhengqueshixin':'sel_c'"></view>
				<view class="text" @click="allSel">
					全选
				</view>
			</view>
			<view class="money_b">
				<view class="c_text">
					合计:
				</view>
				<view calss="price_c">{{allMoney}}</view>
			</view>
			<view class="buy_btn" @click="payFoots">
				结算({{numb}})
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
				shopList: [],
				allItem: false,
				xitongMsg:[],
				huangou:0
			};
		},
		mounted() {
			console.log(this.SystemInfo)
			this.$getApi('/App/Index/getSysConfig',{},res=>{
				console.log(res.data,"获取系统配置信息")
				this.xitongMsg = res.data;
				// this.huangou  = 0.02;
				this.huangou  = _.filter(this.xitongMsg,item=>{
					return item.remark.indexOf("换购门槛") != -1
				})[0].value;
				console.log(this.huangou)
			})
		},
		onShow() {
			this.shopList = this.shopCar || [];
			this.initShopCar();
			this.$getApi('/App/User/getUserDefaultAddress',{},res=>{
				console.log(res.data,"获取用户默认地址")
				this.$store.commit("setAddress", res.data)
			})
		},
		watch: {
			shopList: {
				handler: function(newVal, oldVal) {
					let selIndex = _.filter(this.shopList, item => {
						return item.sel == 1
					})
					console.log(selIndex.length, this.shopList.length)
					if (selIndex.length == this.shopList.length) {
						this.allItem = true
					} else {
						this.allItem = false
					}
				},
				deep: true,
				immediate: true
			},
			shopCar: {
				handler: function(newVal, oldVal) {
					this.initShopCar();
				},
				deep: true,
				immediate: true
			}
		},
		computed: {
			...mapState(["httpp", "SystemInfo", "userInfo", "shopCar", "location","itemHg"]),
			numb() {

				let numb = 0;
				let newShop = _.filter(this.shopCar, item => {
					return item.sel == 1
				})
				_.map(newShop, item => {
					numb += item.num
				})
				if(this.itemHg && this.itemHg.change_price){
					numb = numb+1
				}
				return numb;
			},
			SystemInfoL() {
				// #ifdef MP
				return JSON.parse(this.SystemInfo)
				// #endif
				// #ifndef MP
				return {
					'barHeight': 64,
					'menu': {
						'bottom': 58,
						'height': 32,
						'left': 263,
						'right': 350,
						'top': 26,
						'width': 87
					},
					'statusBarHeight': 20
				}
				// #endif

			},
			allMoney() {
				let money = 0;
				_.map(this.shopList, item => {
					if (item.sel == 1) {
						money += (item.price * 1000 * item.num)
					}
					console.log(money)
				})
				if(this.itemHg && this.itemHg.change_price){
					money += Number(this.itemHg.change_price)*1000
				}
				if(this.huangou >  money / 1000){
					this.setItemHg("")
				}
				return money / 1000
			}
		},
		methods: {
			...mapMutations(["jiaCar", "jianCar", "delCar","setOrderTrueFoot","setItemHg"]),
			showDetail(item){
				console.log(item)
				uni.navigateTo({
					url:"../detail/detail?id="+item.id
				})
			},
			initShopCar() {
				let numb = 0;
				_.map(this.shopCar, item => {
					numb += item.num
				})
				if (numb > 0) {
					let numbStr = numb.toString();
					uni.setTabBarBadge({
						index: 3,
						text: numbStr
					})
				} else {
					uni.removeTabBarBadge({
						index: 3
					})
				}
			},
			//删除已选商品
			deleteFoots() {
				let this_ = this;
				uni.showModal({
				    title: '删除',
				    content: '是否确认删除商品',
				    success: function (res) {
				        if (res.confirm) {
				            let noSelFoot = _.filter(this_.shopList, item => {
				            	return item.sel == 0
				            })
				            let delSelFoot = _.filter(this_.shopList, item => {
				            	return item.sel == 1
				            })
				            
				            this_.$getApi("/App/Goods/shop_car", {}, resCar => {
				            	console.log(resCar.data,"1212")
				            	let delCar = []
				            	_.map(resCar.data,itemRes=>{
				            		_.map(delSelFoot,itemC=>{
				            			if(itemRes.id == itemC.id){
				            				delCar.push(itemRes.cart_id)
				            			}
				            		})
				            	})		
				            	this_.$getApi("/App/Goods/del_car", {ids:delCar.toString()}, res => {
				            		console.log(res,"1212")
				            		this_.shopList = noSelFoot
				            		this_.delCar(this_.shopList)
				            	})
				            })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
				
				
			},
			payFoots() {
				let selFoot = _.filter(this.shopList, item => {
					return item.sel == 1
				})
				this.setOrderTrueFoot(selFoot)
				console.log(selFoot)
				let order_car = [];
				this.$getApi("/App/Goods/shop_car", {}, resCar => {
					console.log(resCar)
					_.map(resCar.data,itemCar=>{
						_.map(selFoot,item=>{
							console.log(item.id,itemCar.id)
							if(item.id == itemCar.id){
								order_car.push(itemCar.cart_id+"_"+item.num);
							}
						})
					})
					console.log(order_car.toString())
					
					let huanhouId = 0;
					if(this.itemHg && this.itemHg.id){
						huanhouId = this.itemHg.id
					}else{
						huanhouId = ""
					}
					this.$getApi("/App/Goods/shopping_cart", {shop_ids_num:order_car.toString(),change_goods_id:huanhouId}, res => {
						console.log(res,"1212")
						uni.navigateTo({
							url:"../order/orderTrue?strCode="+res.data
						})
					})
				})
				
				
			},
			allSel() {
				let selFoot = _.filter(this.shopList, item => {
					return item.sel == 1
				})
				console.log(selFoot.length, this.shopList.length)
				if (selFoot.length != this.shopList.length) {
					_.map(this.shopList, itemL => {
						itemL.sel = 1
					})
				} else {
					if (selFoot.length == 0) {
						_.map(this.shopList, itemL => {
							itemL.sel = 1
						})
					} else {
						_.map(this.shopList, itemL => {
							itemL.sel = 0
						})
					}
				}

			},
			selItem(item, index) {
				if (this.shopList[index].sel == 1) {
					this.shopList[index].sel = 0
				} else {
					this.shopList[index].sel = 1
				}
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
						this.$getApi("/App/Goods/shop_car", {}, resCar => {
							console.log(resCar.data,item.id,"item.id")
							let carId = _.filter(resCar.data,itemC=>{
								return itemC.id == item.id
							})[0].cart_id;
							this.$getApi("/App/Goods/change_car_num", {id:carId,num:item.num}, res => {
								this.jiaCar(item)
							})
						})
					}
				})	
			},
			foot2Jian(item) {
				console.log(item)
				let this_ = this;
				if (item.num == 1) {
					uni.showModal({
						title: '删除商品',
						content: '是否删除已选商品?',
						success: function(res) {
							if (res.confirm) {
								_.map(this_.shopList, fil => {
									if (fil.id == item.id) {
										item.num--;
										this_.$getApi("/App/Goods/shop_car", {}, resCar => {		
											let carId = _.filter(resCar.data,itemC=>{
												return itemC.id == item.id
											})[0].cart_id;
											this_.$getApi("/App/Goods/del_car", {ids:carId}, resCar => {
												this_.jianCar(item)
											})
										})
									}
								})

							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else {
					_.map(this_.shopList, fil => {
						if (fil.id == item.id) {
							item.num--;
							this_.$getApi("/App/Goods/shop_car", {}, resCar => {
								let carId = _.filter(resCar.data,itemC=>{
									return itemC.id == item.id
								})[0].cart_id;
								this_.$getApi("/App/Goods/change_car_num", {id:carId,num:item.num}, res => {
									this_.jianCar(item)
								})
							})
						}
					})

				}

			},
			toNav(el){
				if(el == 'huangou'){
					// if(this.allMoney >= this.huangou){
					// 	uni.navigateTo({
					// 		url:"./huangou"
					// 	})
					// }else{
					// 	this.$msg('满'+this.huangou+'元,可参加换购商品')
					// }
					uni.navigateTo({
						url:"./huangou"
					})
					
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
	.car_pay_sy {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		width: 750upx;
		background-color: #fff;
		left: 0;
		bottom: 0upx;
		/* #ifdef H5 */
		bottom: 100upx;
		/* #endif */
		
		z-index: 1000;
		.part1 {
			display: inline-flex;
			align-items: center;
			color: #999;
			padding-left: 26upx;
			.sel_s{
				position:relative;
				top:-4upx;
			}
			.text {
				margin-left: 20upx;
			}
		}

		.money_b {
			color: #333;
			display: inline-flex;
			font-weight: bold;
			font-size: 30upx;

			.c_text {
				font-weight: 100;
				margin-right: 6upx;
				font-size: 26upx;
			}

		}

		.buy_btn {
			width: 250upx;
			background-color: $uni-bl;
			color: #fff;
			text-align: center;
			padding: 26upx 0;
			font-size: 30upx;
		}

		.sel_s {
			width: 36upx;
			height: 36upx;

			border-radius: 50%;
			margin-left: 4upx;
			box-sizing: border-box;

			&.sel_c {
				border: 1upx solid #999;
			}

			&.iconyduizhengqueshixin {
				color: $uni-bl;
			}
		}

	}

	.shop_car {

		.huangou {
			padding: 6upx 0 20upx;

			.box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				border: 1upx solid $uni-bl;
				background-color: $uni-bl-bg;
				padding: 14upx 16upx 20upx;
				border-radius: 50upx;
				color: #666;

				.l_pt1 {
					display: inline-flex;
					align-items: center;

					.btn {
						background-color: $uni-red;
						padding: 10upx 16upx;
						color: #fff;
						transform: scale(.9);
						margin-right: 10upx;
					}
				}
			}
		}

		.ctrl_btn {
			background-color: #f0f0f0;
			display: flex;
			font-size: 30upx;
			align-items: center;
			color: #999;
			justify-content: space-between;
			padding: 16upx 32upx 10upx;
		}
		
		.shop_car_cc {
			/* #ifdef MP */
			height: calc(100vh);
			/* #endif */
			/* #ifndef MP */
			height: calc(100vh - 200upx);
			/* #endif */
			overflow-y: auto;
			background-color: #f0f0f0;

			.shop_list {
				padding: 20upx 26upx 300upx;
				&.huangou_c{
					padding: 10upx 0upx 0;
				}
				.for_item_box{
					background-color: #fff;
					border-radius: 12upx;
					margin-bottom: 20upx;
					padding: 40upx 20upx 30upx 10upx;
					&.huangou_ctrl{
						padding: 10upx 20upx 30upx 10upx;
						.ctrl_btn{
						display: flex;
						font-size: 30upx;
						align-items: center;
						color: #999;
						justify-content: space-between;
						padding: 16upx 32upx 10upx;
						background-color: #fff;
						}
					}
				}
				.maiyisongyi{
					display: flex;
					align-items: center;
					color: #666;
					padding-top: 20upx;
					.img_l{
						text-align: center;
						width: 240upx;
						.img{
							width: 90upx;
							height: 90upx;
						}
					}
					.text_r{
						display: inline-flex;
						justify-content: space-between;
						flex:1;
						align-items: center;
						.r_l{
							display: inline-flex;
							width: 360upx;
							.or{
								color: $uni-or;
								margin-right: 10upx;
							}
						}
					}
				}
				.item_box {
					
					display: flex;
					align-items: center;
					
					

					.sel_s {
						width: 36upx;
						height: 36upx;

						border-radius: 50%;
						margin-left: 4upx;
						box-sizing: border-box;

						&.sel_c {
							border: 1upx solid #999;
						}
					}

					.iconyduizhengqueshixin {
						color: $uni-bl;
					}

					.right_info {
						display: inline-flex;
						padding-left: 20upx;
						flex: 1;

						.img {
							width: 160upx;
							height: 160upx;
						}

						.text {
							flex: 1;
							display: inline-flex;
							flex-direction: column;
							justify-content: space-between;
							padding-left: 20upx;

							.title {
								font-weight: bold;
								color: #666;
								display: inline-flex;
								align-items: center;
								.maiyisong{
									background-color: $uni-or;
									padding: 6upx 0upx 8upx;
									color: #fff;
									border-radius: 4upx;
									margin-right: 6upx;
									transform: scale(.8);
									width: 130upx;
									text-align: center;
									flex-shrink: 0;
								}
							}

							.money_num {
								display: inline-flex;
								justify-content: space-between;
								align-items: baseline;

								.money {
									font-weight: bold;
									color: #666;
									&.or{
										color: $uni-or;
									}
									.price {
										font-size: 34upx;

									}
								}
							}
						}
					}
				}
			}

			.num_add_sy {
				display: inline-flex;

				.n {
					width: 50upx;
					text-align: center;
				}

				.iconfont {
					padding: 6upx 8upx;
					border-radius: 50%;
				}

				.iconjian {
					background-color: #f0f0f0;
					color: #666;
				}

				.iconjia {
					background-color: #f0f0f0;
					color: #666;
					// background-color: #fec40b;
					// color: #fff;
				}
			}
		}
	}
</style>
