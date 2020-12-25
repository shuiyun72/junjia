<template>
	<view class="find_coudan">
		<view class="top_bg">
			<view class="text1">
				全场商品
			</view>
			<view class="c_or">
				全场实付满68元选购超值换购1件(不含换购商品及赠品)
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
					￥<text class="big">105</text>
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
				footPb: [{
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
				pageTitle:""
				
			};
		},
		mounted() {
			
			this.footPbL()
			
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
			}
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
			footPbL(type) {
				let arrtL = [];
				let arrtR = [];
				_.map(this.footPb, (item, index) => {
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
						this.jiaCar(item)
					}
				})
				let numb = 0;
				_.map(this.shopCar, item => {
					numb += item.num
				})
				if (numb > 0) {
					let numbStr = numb.toString();
					uni.setTabBarBadge({
						index: 2,
						text: numbStr
					})
				} else {
					uni.removeTabBarBadge({
						index: 2
					})
				}
			},
			foot2JianItem(item, el) {
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
						item.num--;
						this.jianCar(item)
					}
				})
				let numb = 0;
				_.map(this.shopCar, item => {
					numb += item.num
				})
				if (numb > 0) {
					let numbStr = numb.toString();
					uni.setTabBarBadge({
						index: 2,
						text: numbStr
					})
				} else {
					uni.removeTabBarBadge({
						index: 2
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