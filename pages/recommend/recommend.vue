<template>
	<view class="recommend">
		<view class="buy_car iconfont icongouwuche" @click="toShopCar">
			<view class="text" v-if="carShowNum>0">
				{{carShowNum}}
			</view>
		</view>
		<view class="posi_img">
			<image src="../../static/img/img-zhut3.png" mode="" class="img"></image>
		</view>
		<view class="classi_fixed" :class="{'istop':isTop}" :style="{top:classTop+'px'}" @click.stop="stopStop">
			<view class="classify_nav" :class="{'fixed':isFixed}">
				<view class="item" v-for="(item,index) in allClassList" :class="{'active':index == classifyIndex}" @click.stop="erNav(item,index)">
					{{item.name}}
				</view>
			</view>
		</view>

		<view class="scroll_fixed">

			<view class="scroll_foots">
				<view v-for="(parent,pIndex) in allClassList">
					<view class="title_recommend">
						<view class="text_query_ng" :id="'query'+pIndex" ref="titleName">
							{{parent.name}}
						</view>
					</view>
					<view class="rec_body_sy">
						<sy-foot2 v-for="item in parent.list" :item="item" @click="foot2Click(item)">
							<view class="num_add_sy">
								<view class="iconfont iconjian" v-if="item.num > 0" @click.stop="foot2Jian(item,pIndex)"></view>
								<view class="n" v-if="item.num > 0">{{ item.num }}</view>
								<view class="iconfont iconjia show" @click.stop="foot2Jia(item,pIndex)"></view>
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
			if (ph.title == '新品推荐') {
				uni.setNavigationBarTitle({
					title: ph.title
				})
				this.$getApi('/App/Goods/getActCate', {type:2}, resLei => {
					console.log(resLei,"新品推荐")
					let allClassList = [];
					_.map(resLei.data,itemClass=>{
						 this.getOrderLits(itemClass)
					})
					
					console.log(this.allClassList)
				})
			}
			if (ph.title == '本周上新') {
				uni.setNavigationBarTitle({
					title: ph.title
				})
				this.$getApi('/App/Goods/getActCate', {type:1}, resLei => {
					console.log(resLei,"本周上新")
					let allClassList = [];
					_.map(resLei.data,itemClass=>{
						 this.getOrderLits(itemClass)
					})
					
					console.log(this.allClassList)
				})

			}
			if (ph.title == '买一送一') {
				uni.setNavigationBarTitle({
					title: ph.title
				})
				this.$getApi('/App/Goods/getActCate', {type:3}, resLei => {
					console.log(resLei,"买一送一")
					let allClassList = [];
					_.map(resLei.data,itemClass=>{
						 this.getOrderLits(itemClass,"on_sale")
					})
					
					console.log(this.allClassList)
				})
			}
			if (ph.title == '团购产品') {
				uni.setNavigationBarTitle({
					title: ph.title
				})
				this.$getApi('/App/Goods/getActCate', {type:4}, resLei => {
					console.log(resLei,"团购产品")
					let allClassList = [];
					_.map(resLei.data,itemClass=>{
						 this.getOrderLits(itemClass,"group_buy")
					})
					
					console.log(this.allClassList)
				})
			}
		},
		data() {
			return {
				isTop: false,
				classTop: 0,
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
				shopList: [{
						id: 1,
						price: 7.9,
						num: 0,
						sel: 1
					}
				],
				firstClassifyType:0,
				allClassList:[]
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
			console.log(res.scrollTop)
			// #ifndef MP
			if (res.scrollTop <= 112) {
				this.classTop = 157 - res.scrollTop;
				this.isTop = false;
			} else {
				this.classTop = 0;
				this.isTop = true;
			}
			// #endif
			// #ifdef H5
			if (res.scrollTop <= 112) {
				this.classTop = 157 - res.scrollTop;
				this.isTop = false;
			} else {
				this.classTop = 45;
				this.isTop = true;
			}
			// #endif
			// #ifdef MP
			if (res.scrollTop <= 112) {
				this.classTop = 112 - res.scrollTop;
				this.isTop = false;
			} else {
				this.classTop = 0
				this.isTop = true;
			}
			// #endif
		},
		beforeMount() {
			// #ifndef MP
			this.classTop = 160;
			// #endif
			// #ifdef MP
			this.classTop = 115;
			// #endif
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
			
		},
		methods: {
			...mapMutations(["jiaCar", "jianCar"]),
			stopStop() {},
			async getOrderLits(itemClass,leiType){
				let dataL = {}
				
				if(leiType == "group_buy"){  //团购产品
					dataL = {
						category_id:itemClass.id,
						group_buy:1
					}
				}else
				if(leiType == "on_sale"){  //买一送一
					dataL = {
						category_id:itemClass.id,
						on_sale:1
					}
				}else{
					dataL = {
						category_id:itemClass.id
					}
				}
				this.$getApi('/App/Goods/getGoodsList', dataL, res => {
					console.log(res)
					let bingbingList = res.data
					_.map(bingbingList, itemL => {
						_.map(this.shopCar, itemC => {
							if (itemL.id == itemC.id) {
								itemL.num = itemC.num
							}
						})
					})
					
					this.allClassList.push({
						name:itemClass.name,
						list: bingbingList
					})
				})
			},
			erNav(item, index) {
				console.log(item, index)
				let this_ = this;
				this.classifyIndex = index;

				// #ifndef H5
				
				
				let query = wx.createSelectorQuery();
				let parentTop = 0;
				query.select(".recommend").boundingClientRect((res1) => {
					parentTop  = res1.top

				}).exec();
				query.select("#query" + index).boundingClientRect((res) => {
					uni.pageScrollTo({
						duration: 0,
						scrollTop: res.top - 53 - parentTop,
					})
				}).exec();
				// #endif
				// #ifdef H5
				let titleNames = this.$refs.titleName;
				_.map(titleNames, itemL => {
					if (item.name == itemL.$el.innerText) {
						console.log(itemL.$el.offsetTop)
						uni.pageScrollTo({
							duration: 0,
							scrollTop: itemL.$el.offsetTop - 53,
						})
					}
				})
				// #endif
			

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
			foot2Jia(item,pIndex) {
				console.log("111111111")
				_.map(this.allClassList[pIndex].list, fil => {
					console.log(item)
					if (fil.id == item.id) {
						item.num++;
						if(item.num == 1){
							// App/Goods/add_car
							this.$getApi("/App/Goods/add_car", {goods_id:item.id,num:item.num}, resCar => {
								this.jiaCar(item)
							})
						}else{
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
					}
				})
			},
			foot2Jian(item,pIndex) {
				console.log("2222222222")
				console.log(item)
				_.map(this.allClassList[pIndex].list, fil => {
					if (fil.id == item.id) {
						item.num--;
						if(item.num == 0){
							// App/Goods/add_car
							this.$getApi("/App/Goods/shop_car", {}, resCar => {
								console.log(resCar,item,"1212")
						
								let carId = _.filter(resCar.data,itemC=>{
									return itemC.id == item.id
								})[0].cart_id;
								
								this.$getApi("/App/Goods/del_car", {ids:carId}, resCar => {
									this.jianCar(item)
								})
							})
						}else{
							this.$getApi("/App/Goods/shop_car", {}, resCar => {
								let carId = _.filter(resCar.data,itemC=>{
									return itemC.id == item.id
								})[0].cart_id;
								this.$getApi("/App/Goods/change_car_num", {id:carId,num:item.num}, res => {
									this.jianCar(item)
								})
							})
						}
					}
				})
			}
		}
	}
</script>
<style>
	page{
		background-color: #f0f0f0;
	}
</style>
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

	.recommend {
		background-color: #f0f0f0;
		// min-height: 100vh;
		padding-bottom: 200upx;

		.classi_fixed {
			z-index: 20;
			width: 750upx;
			display: flex;
			justify-content: center;
			position: fixed;
			left: 0;
			background-color: rgba(255, 255, 255, 0);
			transition: .1s all;
			border-top: 1upx solid rgba(255, 255, 255, 0);
			border-bottom: 1upx solid rgba(255, 255, 255, 0);

			&.istop {
				background-color: rgba(255, 255, 255, 1);
				border-top: 1upx solid rgba(240, 240, 240, 1);
				border-bottom: 1upx solid rgba(240, 240, 240, 1);
			}

			.classify_nav {
				display: flex;
				// justify-content: space-between;
				background-color: rgba(255, 255, 255, .9);
				padding: 26upx 10upx 26upx;
				border-radius: 30upx 30upx 0 0;
				box-sizing: border-box;
				margin: 0 auto;
				width: 698upx;
				box-sizing: border-box;
				overflow-x: auto;
				.item {
					padding: 4upx 30upx 8upx;
					border-radius: 20upx;
					white-space: pre-wrap;
					flex-shrink: 0;
					margin-right: 16upx;
					&.active {
						background-color: $uni-bl;
						color: #fff;
					}
				}
			}
		}

		.scroll_fixed {
			padding: 40upx 26upx 20upx;
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
			height: 290upx;

			.img {
				width: 750upx;
				height: 290upx;
			}
		}



		.title_recommend {
			display: flex;
			justify-content: center;
			color: $uni-bl;
			font-weight: bold;
			font-size: 28upx;
			padding: 26upx 0;

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
