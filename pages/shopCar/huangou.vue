<template>
	<view class="huangou">
		<view class="ke_hg" v-if="allMoney < isCanNum">
			<text class="or">再购买{{isCanNum - allMoney}}元</text><text>可换购以下商品</text>
		</view>
		<view class="ke_hg" v-if="allMoney >= isCanNum">
			<text class="or">已满{{isCanNum}}元,</text><text>可换购以下商品(最多可换购1件)</text>
		</view>
		<view class="h20"></view>
		<view class="huangou_food">
			<view class="item" v-for="(item,index) in huanhouList" @click="selItemFoot(item,index)">
				<image :src="item.thumb" class="left_img" mode=""></image>
				<view class="right_c">
					<view class="tt1">
						<view class="title_hg">
							{{item.name}}
						</view>
						<view class="tc2">
							{{item.introduction}}
						</view>
					</view>
					<view class="tt2">
						<view class="ll_tt">
							<view class="or">
								换购价￥<text class="big">{{item.change_price}}</text>
							</view>
							<view class="dele">
								￥{{item.price}}
							</view>
						</view>
						<view class="btn" v-if="!isCanSel">
							选择
						</view>
						<view class="btn bl" v-if="isCanSel && item.sel==0">
							选择
						</view>
						<view class="btn or" v-if="isCanSel && item.sel==1">
							取消选择
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed_btn" @click="toNav('coudan')">
			{{!itemHg?'去凑单':"完成"}}
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
				selN: 0,
				selItem: "",
				isCanNum: 0,
				huanhouList: [],
				shopList: [],
				xitongMsg:[],
				huangou:0
			};
		},
		computed: {
			...mapState(["httpp", "shopCar", "itemHg"]),
			
			allMoney() {
				let money = 0;
				_.map(this.shopList, item => {
					if (item.sel == 1) {
						money += (item.price * 1000 * item.num)
					}
					console.log(money)
				})
				return money / 1000
			},
			isCanSel() {
				if (this.allMoney >= this.isCanNum) {
					return true
				} else {
					return false
				}
			},
		},
		onShow() {
			this.shopList = this.shopCar || [];
			
			
		},
		mounted() {
			this.$getApi('/App/Index/getSysConfig',{},res=>{
				console.log(res.data,"获取系统配置信息")
				this.xitongMsg = res.data;
				// this.huangou  = 0.02;
				this.isCanNum  = _.filter(this.xitongMsg,item=>{
					return item.remark.indexOf("换购门槛") != -1
				})[0].value;
				console.log(this.isCanNum)
			})
			this.$getApi("/App/Goods/changeGoods", {}, res => {
				console.log(res,"换购商品")
				_.map(res.data,item=>{
					item.sel = 0
				})
				this.huanhouList = res.data
			})
			
			if (this.itemHg) {
				_.map(this.huanhouList, (item, index) => {

					if (this.itemHg.id == item.id) {
						if (this.huanhouList[index].sel == 1) {
							this.$set(this.huanhouList[index], "sel", 0)
						} else {
							this.$set(this.huanhouList[index], "sel", 1)
						}
					} else {
						this.$set(this.huanhouList[index], "sel", 0)
					}
				})
			}
		},
		methods: {
			...mapMutations(["setItemHg"]),
			toNav(el) {
				if (el == "coudan") {
					if (this.itemHg) {
						uni.switchTab({
							url: "./shopCar"
						})
					} else {
						uni.navigateTo({
							url: "./coudan"
						})
					}

				}
			},
			selItemFoot(itemCC, index) {
				_.map(this.huanhouList, (item, index) => {
					if (itemCC.id == item.id) {
						if (this.huanhouList[index].sel == 1) {
							this.$set(this.huanhouList[index], "sel", 0)
							this.setItemHg("")
						} else {
							this.$set(this.huanhouList[index], "sel", 1)
							this.setItemHg(itemCC)
						}
					} else {
						this.$set(this.huanhouList[index], "sel", 0)
					}
				})


				// if(!this.itemHg){
				// 	this.setItemHg(itemCC)
				// }else{
				// 	this.setItemHg("")
				// }
				// if(this.itemHg){
				// 	let selItemSession = _.fiter(this.huanhouList,item=>{
				// 		return item.id == itemCC.id
				// 	})

				// 	_.map(this.huanhouList,(item,index)=>{
				// 		if(this.itemHg.id == item.id){
				// 			this.huanhouList[index].sel = 1;
				// 			this.selItem = item
				// 		}else{
				// 			this.huanhouList[index].sel = 0
				// 		}
				// 	})
				// }else{
				// 	_.map(this.huanhouList,(item,index)=>{
				// 		this.huanhouList[index].sel = 0
				// 	})
				// }
			}
		}
	}
</script>

<style lang="scss" scoped>
	.huangou {
		color: #333;

		.ke_hg {
			padding: 20upx 26upx;
			font-size: 30upx;

			.or {
				color: $uni-or;
			}
		}

		.huangou_food {
			padding: 0upx 26upx 0upx 10upx;

			.item {
				display: flex;
				// align-items: center;
				padding: 20upx 0upx 20upx 0upx;

				&+.item {
					border-top: 1upx solid #f0f0f0;
				}

				.left_img {
					width: 180upx;
					height: 180upx;
					flex-shrink: 0;
					margin-right: 10upx;
				}

				.right_c {
					display: inline-flex;
					flex-direction: column;
					justify-content: space-between;
					flex: 1;
					padding: 10upx 0;

					.tt1 {
						.title_hg {
							font-size: 32upx;
							font-weight: bold;
							color: #666;
						}

						.tc2 {
							color: #999;
						}
					}

					.tt2 {
						display: inline-flex;
						justify-content: space-between;

						.ll_tt {
							display: inline-flex;
							align-items: baseline;

							.or {
								color: $uni-or;

								.big {
									font-size: 36upx;
								}
							}

							.dele {
								text-decoration: line-through;
								color: #999;
							}
						}

						.btn {
							background-color: #ccc;
							color: #fff;
							padding: 8upx 40upx 6upx;
							border-radius: 30upx;

							&.bl {
								background-color: $uni-bl;
							}

							&.or {
								background-color: $uni-or;
							}
						}
					}
				}
			}
		}

		.fixed_btn {
			font-size: 36upx;
			color: #fff;
			background-color: $uni-bl;
			position: fixed;
			width: 600upx;
			bottom: 30upx;
			left: 50%;
			margin-left: -300upx;
			text-align: center;
			padding: 20upx 0;
			border-radius: 60upx;
		}
	}
</style>
