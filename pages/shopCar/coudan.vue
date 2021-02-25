<template>
	<view class="find_coudan">
		<view class="top_bg">
			<view class="text1">
				全场商品
			</view>
			<view class="c_or">
				全场实付满{{huangou}}元选购超值换购1件(不含换购商品及赠品)
			</view>
		</view>
		<view class="h20"></view>
		<view class="pubuliu m26">
			<view class="left_box">
				<sy-pubuli :item='item' v-for="(item,index) in arrtL" @click="foot2Click">
					<view class="num_add_sy1">
						<view class="iconfont iconjian" v-if="item.num > 0" @click.stop="foot2JianJs(item)"></view>
						<view class="n" v-if="item.num > 0">{{ item.num }}</view>
						<view class="iconfont iconjia show" @click.stop="foot2JiaJs(item)"></view>
					</view>
				</sy-pubuli>
			</view>
			<view class="right_box">
				<sy-pubuli :item='item' v-for="(item,index) in arrtR" @click="foot2Click">
					<view class="num_add_sy1">
						<view class="iconfont iconjian" v-if="item.num > 0" @click.stop="foot2JianJs(item)"></view>
						<view class="n" v-if="item.num > 0">{{ item.num }}</view>
						<view class="iconfont iconjia show" @click.stop="foot2JiaJs(item)"></view>
					</view>
				</sy-pubuli>
			</view>
		</view>
		<view class="bottom_btn_zu_sy">
			<view class="btn1">
				<view>合计 :</view>
				<view class="red">
					￥<text class="big">{{allMoney}}</text>
				</view>
			</view>
			<view class="btn_b or" @click="toNav('gouwuche')">
				去购物车
			</view>
			<view class="btn_b bl" @click="toNav('huangou')">
				去换购
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
				footPb: [],
				pageTitle:"",
				xitongMsg:"",
				huangou:0
			};
		},
		mounted() {
			this.$getApi("/App/Goods/getGoodsList", {
				recommend: 1
			}, res => {
				console.log(res.data, "精选好物")
				let resData = res.data ? res.data : [];
				this.footPb = resData
				if(this.footPb.length > 0 && this.shopCar.length>0){
					_.map(this.footPb, (itemL,indexL) => {
						_.map(this.shopCar, (itemC, index) => {
							if (itemL.id == itemC.id) {
								this.$set(this.footPb[indexL], "num", itemC.num)
							}
						})
					})
				}
				this.footPbL(this.footPb);
			})
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
		onLoad(ph) {
			if(ph.title){
				uni.setNavigationBarTitle({
					title:ph.title
				})
				this.pageTitle = ph.title
			}
		},
		onShow() {
			_.map(this.footPb, itemL => {
				_.map(this.shopCar, (itemC, index) => {
					if (itemL.id == itemC.id) {
						// this.shopList[index].num = itemC.num
						this.$set(this.footPb[index], "num", itemC.num)
					}
				})
			})
		},
		beforeDestroy() {
			
		},
		computed:{
			...mapState(["httpp", "SystemInfo", "userInfo", "shopCar", "location"]),
			carShowNum() {
				let carShowNum = 0;
				_.map(this.shopCar, itemC => {
					carShowNum += itemC.num
				})
				return carShowNum;
			},
			allMoney() {
				let money = 0;
				_.map(this.shopCar, item => {
					if (item.sel == 1) {
						money += (item.price * 1000 * item.num)
					}
					console.log(money)
				})
				return money / 1000
			},
		},
		methods:{
			...mapMutations(["jiaCar", "jianCar", "setLocation","setClassify"]),
			toNav(el){
				if(el == 'gouwuche'){
					uni.switchTab({
						url:"./shopCar"
					})
				}
				if(el == 'huangou'){
					uni.navigateBack({
						delta:1
					})
				}
			},
			footPbL(footPb) {
				let arrtL = [];
				let arrtR = [];
				_.map(footPb, (item, index) => {
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
			foot2Click(item) {
				console.log(item)
				uni.navigateTo({
					url: '../detail/detail?id=' + item.id
				})
			},
			foot2JianJs(item) {
				this.foot2JianItem(item, 3)
			},
			foot2JiaJs(item) {
				this.foot2JiaItem(item, 3)
			},
			foot2JiaItem(item, el) {
				let list = [];
				if (el == 1) {
					list = this.shopList
				} else
				if (el == 2) {
					list = this.shopList2
				}else
				if (el == 3) {
					list = this.footPb
				}
				_.map(list, fil => {
					if (fil.id == item.id) {
						item.num++;
						if (item.num == 1) {
							// App/Goods/add_car
							this.$getApi("/App/Goods/add_car", {
								goods_id: item.id,
								num: item.num
							}, resCar => {
								this.timer = true;
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
									this.timer = true;
									this.jiaCar(item)
								})
							})
						}
					}
				})
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
			foot2JianItem(item, el) {
				let list = [];
				let this_ = this;
				if (el == 1) {
					list = this.shopList
				} else
				if (el == 2) {
					list = this.shopList2
				}else
				if (el == 3) {
					list = this.footPb
				}
				_.map(list, fil => {
					if (fil.id == item.id) {
						
						if (item.num == 1) {
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
					}
				})
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
			toShopCar() {
				uni.switchTab({
					url: "../shopCar/shopCar"
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.find_coudan{
		min-height: 100vh;
		background-color: #f0f0f0;
		// padding: 26upx 0 0 0;
		.top_bg{
			background-color: #FFE8CA;
			padding: 30upx 26upx;
			.text1{
				font-size: 30upx;
				color: #333;
			}
			.c_or{
				font-size: 28upx;
			}
		}
		.bottom_btn_zu_sy{
			display: flex;
			position:fixed;
			bottom: 0;
			left: 0;
			width: 750upx;
			align-items: center;
			background-color: #fff;
			.btn1{
				flex:1;
				display: inline-flex;
				padding-left: 26upx;
				align-items: center;
				color: #666;
				.big{
					font-size: 36upx;
				}
			}
			.btn_b{
				width: 230upx;
				color: #fff;
				text-align: center;
				font-size: 34upx;
				padding: 30upx 0;
				&.or{
					background-color: $uni-or;
				}
				&.bl{
					background-color: $uni-bl;
				}
			}
		}
	}

	.pubuliu {
		display: flex;
	
		justify-content: space-between;
		padding-bottom: 120upx;
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