<template>
	<view class="mine">
		<view class="" v-if="hasLogin">
			<view class="user_info" :style="{ 'padding-top': (SystemInfoL.menu.top) + 'px' }">
				<view class="left_info" @click="navsTo('mineMsg')">
					<image :src="userInfo.avatar" class="user_img" mode=""></image>
					<view class="name_c">
						<view class="name">{{userInfo.nickname}}</view>
						<view class="name2" v-if="userInfo.phone">{{userInfo.phone}}</view>
						<view class="name2 btn" v-if="!userInfo.phone" @click.stop="bangdingPhone">绑定手机号</view>
					</view>
				</view>
				<view class="right_set">
					
					<view class="msgPoint">
						<view class="point" v-if="xiaoxNum > 0">
							{{xiaoxNum}}
						</view>
						<image src="../../static/img/mine/xiaox.png" class="msg1_img" mode="" @click="navsTo('xiaoxi')"></image>
					</view>
					
					<image src="../../static/img/mine/shez.png" class="msg1_img" mode="" @click="navsTo('set')"></image>

				</view>
				<view class="mine_order">
					<view class="title">
						<view class="">
							我的订单
						</view>
						<!-- <view class="iconfont iconjiantou"></view> -->
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
			<image src="../../static/img/mine/yaoqhy.png" class="mine_img" mode="" @click="navsTo('fenxiang')"></image>
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
					<!-- #ifndef MP -->
					<view class="item" @click="navTo('联系客服')">
						<view class="img_c">
							<image src="../../static/img/mine/fw-lx.png" mode="" class="bg_img_c"></image>
						</view>
						<button open-type="contact" class="kf_btn">联系客服</button>
					</view>
					<!-- #endif -->
					<!-- #ifdef MP -->
					<view class="item">
						<view class="img_c" @click="navTo('联系客服')">
							<image src="../../static/img/mine/fw-lx.png" mode="" class="bg_img_c"></image>
						</view>
						<button open-type="contact" class="kf_btn">联系客服</button>
					</view>
					<!-- #endif -->
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
						num: 0
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
				],
				xitongMsg: [],
				xiaoxNum:0
			};
		},
		computed: {
			...mapState(["httpp", "SystemInfo", "userInfo", "hasLogin","waitC"]),
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
		onShow() {
			if(this.waitC == 1){
				uni.navigateTo({
					url: "../order/order?ins=1"
				})
			}
			if (this.hasLogin == false) {
				this.$msg('您还没有登录,请登录')
				setTimeout(() => {
					uni.navigateTo({
						url: "../login/login"
					})
				}, 1000)

			} else {
				this.$getApi('/App/Index/getSysConfig', {}, res => {
					console.log(res.data, "获取系统配置信息")
					this.xitongMsg = res.data
				})
				this.$getApi('/App/User/userInfo', {}, res => {
					console.log(res.data, "获取用户信息")
					this.$store.commit("login", res.data)
				})
				this.$getApi('/App/Index/getTipsNum', {
					type: 3
				}, res => {
					console.log(res.data, "订单数量")
					this.orderList[0].num = res.data.order_num1;
					this.orderList[1].num = res.data.order_num2;
					this.orderList[2].num = res.data.order_num3;
					// this.xitongMsg = res.data
				})
				this.$getApi('/App/Index/msgNum', {}, res => {
					console.log(res);
					let xiaoxNum = 0;
					xiaoxNum = xiaoxNum + Number(res.data.num1);
					xiaoxNum = xiaoxNum + Number(res.data.num2);
					xiaoxNum = xiaoxNum + Number(res.data.num3);
					this.xiaoxNum = xiaoxNum;
				})
			}

		},
		mounted() {
			console.log(this.SystemInfoL)
			this.$getApi('/App/Index/getSysConfig', {}, res => {
				console.log(res.data, "获取系统配置信息")
				this.xitongMsg = res.data
			})

		},
		methods: {
			bangdingPhone(){
				uni.navigateTo({
					url:"../login/bangPhone?uid="+this.userInfo.id
				})
			},
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
				if (item == "fenxiang") {
					uni.navigateTo({
						url: './fenxiang'
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
					let phoneL = _.filter(this.xitongMsg, item => {
						return item.remark.indexOf("客服电话") != -1
					})[0].value;
					console.log(phoneL)
					uni.makePhoneCall({
						phoneNumber: phoneL
					});
				}
			}
		}
	};
</script>
<style>
	page {
		background-color: #f0f0f0;
	}
</style>
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

		.kf_btn {
			font-size: 26upx;
			line-height: inherit;
			font-size: 32upx;
			color: #666;
			padding: 0;
			background-color: #fff;
			outline: none;
			border: none;

			&:after {
				border: none;
			}
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
					padding-bottom: 10upx;
					.name {
						font-size: 40upx;
					}

					.name2 {
						color: #ddd;
						border: 1upx solid transparent;
						
						&.btn{
							border: 1upx solid #f0f0f0;
							padding: 4upx 10upx ;
							border-radius: 10upx;
						}
					}

				}

			}

			.right_set {
				display: inline-flex;
				.msgPoint{
					position:relative;
					.point{
						width: 30upx;
						height: 30upx;
						text-align: center;
						line-height: 30upx;
						background-color: $uni-red;
						color: #fff;
						padding: 6upx;
						z-index:1;
						position:absolute;
						top:-10upx;
						right:-15upx;
						border-radius: 50%;
						transform: scale(.7);
					}
					
				}
				.msg1_img {
					width: 50upx;
					height: 50upx;
					margin-left: 40upx;
				}
			}

		}
	}
</style>
