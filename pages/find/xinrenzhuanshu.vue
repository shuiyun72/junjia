<template>
	<view class="find_xinren">
		<view class="pubuliu m26">
			<view class="left_box">
				<sy-pubuli :item='item' v-for="(item,index) in arrtL" @click="foot2Click" :moneyText="'新人价'">
					<view class="num_add_sy1">
						<view class="iconfont iconjian" v-if="item.num > 0" @click.stop="foot2JianJs(item)"></view>
						<view class="n" v-if="item.num > 0">{{ item.num }}</view>
						<view class="iconfont iconjia show" @click.stop="foot2JiaJs(item)"></view>
					</view>
				</sy-pubuli>
			</view>
			<view class="right_box">
				<sy-pubuli :item='item' v-for="(item,index) in arrtR" @click="foot2Click" :moneyText="'新人价'">
					<view class="num_add_sy1">
						<view class="iconfont iconjian" v-if="item.num > 0" @click.stop="foot2JianJs(item)"></view>
						<view class="n" v-if="item.num > 0">{{ item.num }}</view>
						<view class="iconfont iconjia show" @click.stop="foot2JiaJs(item)"></view>
					</view>
				</sy-pubuli>
			</view>
		</view>
		<view class="buy_car iconfont icongouwuche" @click="toShopCar">
			<view class="text" v-if="carShowNum>0">
				{{carShowNum}}
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
				arrtL: [],
				arrtR: [],
				footList: [{
					id: 1001,
					title: "1新品推荐新品",
					num: 0,
					price: 7.9,
					sel: 1
				}, {
					id: 1002,
					title: "2新品推荐新品推荐新品新品推荐新品",
					num: 0,
					price: 7.9,
					sel: 1
				}, {
					id: 1003,
					title: "2新品推荐新品推荐新品新品推荐新品",
					num: 0,
					price: 7.9,
					sel: 1
				}],
				pageTitle:"",
				timer:true
				
			};
		},
		onLoad(ph) {
			if(ph.title == "新人专属"){
				uni.setNavigationBarTitle({
					title:ph.title
				})
				this.pageTitle = ph.title;
				this.$getApi('/App/Goods/getGoodsList',{new_one:1},res=>{
					console.log(res)
					this.getFootList(res.data)
					// let allClass = [{name:"全部"}]
					// this.findList = allClass.concat(res.data)
				})
			}
		},
		watch: {
			shopCar: {
				handler: function(newVal, oldVal) {
					this.initShopCar()
				},
				deep: true,
				immediate: true
			}
		},
		onShow() {
			
		},
		computed:{
			...mapState(["httpp", "SystemInfo", "userInfo", "shopCar", "location"]),
			carShowNum() {
				let carShowNum = 0;
				_.map(this.shopCar, itemC => {
					carShowNum += itemC.num
				})
				return carShowNum;
			}
		},
		methods:{
			...mapMutations(["jiaCar", "jianCar", "setLocation","setClassify","setReCar"]),
			
			getFootList(footList){
				_.map(footList, itemL => {
					_.map(this.shopCar, (itemC, index) => {
						if (itemL.id == itemC.id) {
							// this.shopList[index].num = itemC.num
							this.$set(footList[index], "num", itemC.num)
						}
					})
				})
				this.footList = footList;
				this.footPbL(this.footList)
			},
			footPbL(footList) {
				let arrtL = [];
				let arrtR = [];
				_.map(footList, (item, index) => {
					console.log(item, index)
					if (index % 2 == 0) {
						arrtL.push(item)
					} else {
						arrtR.push(item)
					}
				})
				this.arrtL = arrtL;
				this.arrtR = arrtR;
				console.log(arrtL)
				console.log(arrtR)
			},
			toShopCar() {
				uni.switchTab({
					url: "../shopCar/shopCar"
				})
			},
			foot2Click(item) {
				console.log(item)
				uni.navigateTo({
					url: '../detail/detail?id=' + item.id
				})
			},
			foot2JianJs(item) {
				this.foot2JianItem(item)
			},
			foot2JiaJs(item) {
				console.log(item)
				this.foot2JiaItem(item)
			},
			initShopCar() {
				this.computList(this.footList)
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
			computList(list) {
				_.map(list, item => {
					if (this.shopCar.length > 0) {
						_.map(this.shopCar, itemCar => {
							if (item.id == itemCar.id) {
								item.num = itemCar.num
							}
						})
					} else {
						item.num = 0
					}
				})
			},
			foot2JiaItem(item, el) {
				console.log(item)
				if (this.timer) {
					this.timer = false;
					this.$getApi("/App/Goods/shop_car", {}, resCar1 => {
						let idCarId = _.filter(resCar1.data, itemC => {
							return itemC.id == item.id
						});
						if (idCarId.length == 0) {
							this.$getApi("/App/Goods/add_car", {
								goods_id: item.id,
								num: 1
							}, resItem => {
								this.$getApi("/App/Goods/shop_car", {}, resCar2 => {
									this.setReCar(resCar2.data)
									this.timer = true;
								})
							})
						} else {
							let carId = idCarId[0].cart_id;
							this.$getApi("/App/Goods/change_car_num", {
								id: carId,
								num: (item.num + 1)
							}, resItem => {
								this.$getApi("/App/Goods/shop_car", {}, resCar2 => {
									this.setReCar(resCar2.data)
									this.timer = true;
								})
							})
						}
			
					})
					setTimeout(()=>{
						this.timer = true;
					},1000)
				}
			},
			foot2JianItem(item, el) {
				if (this.timer) {
					this.timer = false;
					this.$getApi("/App/Goods/shop_car", {}, resCar1 => {
						let idCarId = _.filter(resCar1.data, itemC => {
							return itemC.id == item.id
						})[0];
						if (idCarId.num == 1) {
							this.$getApi("/App/Goods/del_car", {
								ids: idCarId.cart_id
							}, resItem => {
								this.$getApi("/App/Goods/shop_car", {}, resCar2 => {
									this.setReCar(resCar2.data)
									item.num = 0;
									this.timer = true;
								})
							})
						} else {
							this.$getApi("/App/Goods/change_car_num", {
								id: idCarId.cart_id,
								num: (item.num - 1)
							}, resItem => {
								this.$getApi("/App/Goods/shop_car", {}, resCar2 => {
									this.setReCar(resCar2.data)
									this.timer = true;
								})
							})
						}
			
					})
					setTimeout(()=>{
						this.timer = true;
					},1000)
				}
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.find_xinren{
		min-height: 100vh;
		background-color: #f0f0f0;
		padding: 26upx 0 0 0;
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
		z-index:10;
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
	.pubuliu {
		display: flex;
	
		justify-content: space-between;
		.num_add_sy1 {
			display: inline-flex;
		
			.n {
				width: 30upx;
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
				transform: scale(.8);
			}
		
			.iconjia {
				background-color: #f0f0f0;
				color: #666;
				transform: scale(.8);
		
				&.show {
					background-color: $uni-bl;
					color: #fff;
				}
			}
		}
	}
</style>