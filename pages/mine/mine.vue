<template>
	<view class="mine">
		<view class="">
			<!-- #ifdef MP -->
			<view class="user_info" :style="{ 'padding-top': (SystemInfoL.menu.top) + 'px' }">
				<!-- #endif -->
				<!-- #ifndef MP -->
				<view class="user_info">
					<!-- #endif -->

					<view class="left_info" @click="navsTo('mineMsg')">
						<image src="../../static/img/car/gouwc3.png" class="user_img" mode=""></image>
						<view class="name_c">
							<view class="name">俏皮女王</view>
							<view class="name2">我爱买买买></view>
						</view>
					</view>
					<view class="right_set">
						<image src="../../static/img/mine/xiaox.png" class="msg1_img" mode=""  @click="navsTo('xiaoxi')"></image>
						<image src="../../static/img/mine/shez.png" class="msg1_img" mode="" @click="navsTo('set')"></image>

					</view>
					<view class="mine_order">
						<view class="title">
							<view class="">
								我的订单
							</view>
							<view class="iconfont iconjiantou"></view>
						</view>
						<view class="o_box">
							<view class="item" v-for="item in orderList" @click="toOrder(item.ins)">
								<view class="img_c">
									<view class="num" v-if="item.num>0">
										{{item.num}}
									</view>
									<image :src="'../../static/img/mine/'+item.img" mode="" class="bg_img_c"></image>
								</view>
								<view class="">
									{{item.text}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="mine_body">
				<image src="../../static/img/mine/yaoqhy.png" class="mine_img" mode=""></image>
				<view class="mine_serve">
					<view class="title">
						我的服务
					</view>
					<view class="o_box">
						<view class="item" v-for="item in serveList" @click="navTo(item.text)">
							<view class="img_c">
								<image :src="'../../static/img/mine/'+item.img" mode="" class="bg_img_c"></image>
							</view>
							<view class="">
								{{item.text}}
							</view>
						</view>
						<view class="item" @click="navTo('联系客服')">
							<view class="img_c">
								<image src="../../static/img/mine/fw-lx.png" mode="" class="bg_img_c"></image>
							</view>
							<!-- #ifdef MP -->
							<button  open-type="contact" class="kf_btn">联系客服</button>
							<!-- #endif -->
							<!-- #ifndef MP -->
							<button  open-type="contact" class="kf_btn">联系客服</button>
							<!-- <view class="">
								联系客服
							</view> -->
							<!-- #endif -->
						</view>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				mineInfo: [],
				orderList: [{
						ins: 1,
						img: "daish.png",
						text: "待付款",
						num: 0
					},
					{
						ins: 2,
						img: "daifk.png",
						text: "待收货",
						num: 1
					},
					{
						ins: 3,
						img: "daipj.png",
						text: "待评价",
						num: 0
					},
					{
						ins: 0,
						img: "quanb.png",
						text: "全部",
						num: 0
					}
				],
				serveList: [{
						img: "fw-youhj.png",
						text: "优惠券"
					},
					{
						img: "fw-dz.png",
						text: "收货地址"
					},
					{
						img: "fw-pj.png",
						text: "我的评价"
					},
					{
						img: "fw-sc.png",
						text: "我的收藏"
					},
					{
						img: "fw-jf.png",
						text: "我的积分"
					},
					{
						img: "fw-fp.png",
						text: "发票"
					},
					{
						img: "fw-ps.png",
						text: "配送范围"
					},
					{
						img: "fw-gy.png",
						text: "关于我们"
					},
					{
						img: "fw-yj.png",
						text: "意见反馈"
					}
				]
			};
		},
		computed: {
			...mapState(["httpp", "SystemInfo", "userInfo"]),
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

			}
		},
		mounted() {
			// this.$getApi('/api/user/info',"",res=>{
			// 	console.log(res)
			// 	this.mineInfo = res.data
			// })
			console.log(this.SystemInfoL)
		},
		methods: {
			toOrder(ins) {
				uni.navigateTo({
					url: "../order/order?ins=" + ins
				})
			},
			navsTo(item) {
				console.log(item);
				if (item == 'mineMsg') {
					uni.navigateTo({
						url: './mineMsg'
					})
				}
				if (item == 'set') {
					uni.navigateTo({
						url: './set'
					})
				}
				if (item == 'xiaoxi') {
					uni.navigateTo({
						url: './xiaoxi'
					})
				}
			},
			navTo(text) {
				if (text == '优惠券') {
					uni.navigateTo({
						url: './youhuiquan'
					})
				} else
				if (text == '收货地址') {
					uni.navigateTo({
						url: './address'
					})
				} else
				if (text == '我的评价') {
					uni.navigateTo({
						url: './pingjia'
					})
				} else
				if (text == '我的收藏') {
					uni.navigateTo({
						url: '../home/searchResult?fromType=shoucang&searchName=我的收藏'
					})
				} else
				if (text == '我的积分') {
					uni.navigateTo({
						url: './jifen'
					})
				} else
				if (text == '发票') {
					uni.navigateTo({
						url: './fapiao'
					})
				} else
				if (text == '配送范围') {
					uni.navigateTo({
						url: './fanwei'
					})
				} else
				if (text == '关于我们') {
					uni.navigateTo({
						url: './aboutMine'
					})
				} else
				if (text == '意见反馈') {
					uni.navigateTo({
						url: './ideaFor'
					})
				} else
				if (text == '联系客服') {
					// #ifdef MP
					console.log("1212")
					// #endif
					// #ifndef MP
					uni.makePhoneCall({
						phoneNumber: "000-88888"
					});
					// #endif
					// this.$getApi('/api/common/service',"",res=>{
					// 	console.log(res)
					// 	uni.makePhoneCall({
					// 	    phoneNumber: res.data.mobile 
					// 	});
					// })
				} 
			}
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #f0f0f0;
	}

	.mine {
		background-color: #f0f0f0;
		/* #ifdef MP */
		min-height: calc(100vh - 100upx);
		/* #endif */
		/* #ifndef MP */
		min-height: calc(100vh - 160upx);
		/* #endif */
		font-size: 32upx;
		color: #333;
		display: flex;
		flex-direction: column;
		.kf_btn{
			font-size: 26upx;
			line-height: inherit;
			font-size: 32upx;
			color: #666;
			padding: 0;
		}
		.mine_body {
			// background-color: #fff;
			flex: 1;
			padding: 160upx 26upx 0upx;

			.mine_img {
				width: 698upx;
				height: 160upx;
				margin-bottom: 20upx;
			}
		}

		.mine_serve {
			background-color: #fff;
			padding: 26upx;
			border-radius: 16upx;

			.title {
				font-weight: bold;
				padding-bottom: 40upx;
			}

			.o_box {
				display: flex;
				flex-wrap: wrap;

				.item {
					width: 25%;
					text-align: center;
					margin-bottom: 35upx;
					color: #666;
				}

				.img_c {
					margin-bottom: 10upx;

					.bg_img_c {
						width: 60upx;
						height: 60upx;
					}
				}
			}
		}

		.header_title {
			text-align: center;
			color: #fff;
			font-size: 36upx;
		}

		.user_info {
			display: flex;
			align-items: baseline;
			padding: 40upx 40upx 120upx;
			justify-content: space-between;
			background-color: $uni-bl;
			position: relative;

			.mine_order {
				position: absolute;
				width: 700upx;
				bottom: -140upx;
				padding: 26upx 26upx 32upx;
				box-sizing: border-box;
				border-radius: 16upx;
				left: 50%;
				margin-left: -350upx;
				background-color: #fff;

				.title {
					font-weight: bold;
					padding-bottom: 20upx;
					display: flex;
					justify-content: space-between;

					.iconjiantou {
						color: #999;
					}
				}

				.o_box {
					display: flex;
					justify-content: space-around;

					.item {
						width: 20%;
						text-align: center;
						color: #999;
					}

					.img_c {
						position: relative;

						.num {
							background-color: $uni-red;
							color: #fff;
							width: 60upx;
							height: 60upx;
							line-height: 60upx;
							border-radius: 50%;
							position: absolute;
							z-index: 1;
							transform: scale(.5);
							text-align: center;
							top: -30upx;
							left: 50%;
							margin-left: 0upx;
						}

						.bg_img_c {
							width: 60upx;
							height: 60upx;
						}
					}
				}
			}

			.left_info {
				display: flex;

				.user_img {
					width: 120upx;
					height: 120upx;
					border-radius: 50%;
					overflow: hidden;
				}

				.name_c {
					color: #fff;
					margin-left: 20upx;
					display: inline-flex;
					justify-content: space-between;
					flex-direction: column;

					.name {
						font-size: 40upx;
					}

					.name2 {
						color: #ddd;
					}

				}

			}

			.right_set {
				.msg1_img {
					width: 40upx;
					height: 40upx;
					margin-left: 40upx;
				}
			}

		}
	}
</style>
