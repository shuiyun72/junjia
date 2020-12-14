<template>
	<view class="detail" v-if="itemDetail.comment_list">
		<view class="swiper_box">
			<swiper :autoplay="false" :interval="3000" :duration="1000" class="h_lunbo" @change="detailSw">
				<swiper-item v-for="item in itemDetail.pic">
					<view class="swiper-item">
						<image :src="item" mode="" class="img_lub"></image>
					</view>
				</swiper-item>
			</swiper>
			<view class="show_bi_num">
				<view class="cbc">
					{{imgsIndex+1}}/{{itemDetail.pic.length}}
				</view>
			</view>
		</view>
		<view class="detail_info">
			<view class="money_num">
				<view class="left">
					<view class="red">
						<text>￥</text>
						<text class="m_n">{{itemDetail.price}}</text>
					</view>
					<view class="old_m">
						￥{{itemDetail.old_price}}
					</view>
					<view class="all_num">
						剩余{{itemDetail.stock}}件
					</view>
				</view>
				<view class="right">
					<image src="../../static/img/liucheng/sp-fenx.png" mode="" class="liucheng_img"></image><text>推荐给好友</text>
				</view>
			</view>
			<view class="t_title">
				{{itemDetail.name}}
			</view>
		</view>
		<view class="bgf20"></view>
		<uni-list>
			<uni-list-item :title="'商品评价('+itemDetail.comment_list.length+')'"  rightText="查看全部" @click="showAllRate"></uni-list-item>
		</uni-list>
		<view class="" v-if="itemDetail.comment_list.length > 0">
		<view class="pingjia_box_sy">
			<view class="pingjia_user">
				<view class="left">
					<image :src="itemPj.avatar" class="img" mode=""></image>
					<view class="name shengluehao">
						{{itemPj.nickname}}
					</view>
				</view>
				<view class="time">
					{{itemPj.time}}
				</view>
			</view>
			<view class="rate_pj">
				<uni-rate color="#bbb" active-color="#F59005" :readonly="true" :size="18" v-model="itemPj.star" ></uni-rate>
			</view>
			
			<view class="wa_text">
				{{itemPj.content}}
			</view>
			<swiper :interval="3000" :duration="1000" class="pingjia_img_box" display-multiple-items=3>
				<swiper-item v-for="itemImg in itemPj.pic" >
					<view class="img_item" :style="'background-image: url(../../static/img/liucheng/'+itemImg+')'"></view>
				</swiper-item>
			</swiper>
		</view>
		</view>
		<view class="bgf20"></view>
		<!-- 本周上新 -->
		<view class="weke_new">
			<view class="weke_new_header_sy  m26">
				<view class="left">
					<image src="../../static/img/home/icon-bzsx.png" mode="" class="t_img"></image>
					<view class="title1">
						一起买
					</view>
					<view class="title2">
						更多精品好物一起购买吧
					</view>
				</view>
				<view class="right">
					<!-- <view class="">
						更多
					</view>
					<view class="iconfont iconjiantou"></view> -->
				</view>
			</view>
			<sy-scroll-x class="p26">
				<view class="weke_box_item" v-for="item in 10" @click="itemClick(item)">
					<image src="../../static/img/img-sp17.png" class="t_img" mode=""></image>
					<view class="title1 shengluehao">
						陆地枸杞9打开拉肚肚
					</view>
					<view class="zhuijia">
						<view class="money red">
							￥<text class="m">12.8</text>
						</view>
						<view class="iconfont iconjia1"></view>
					</view>
					
				</view>
		
			</sy-scroll-x>
		</view>
		<view class="xingqing_title">
			<view class="v"></view>
			<view class="t">
				商品详情
			</view>
			<view class="v"></view>
		</view>
		<view class="img_bg_box">
			<view class="img_c" v-for="item in itemFoot.imgs2">
				<image :src="'../../static/img/liucheng/'+item.img" class="img" mode="widthFix"></image>
			</view>
		</view>
		<view class="bottom_btn_group_sy">
			<view class="left">
				<view class="item shoucao" :class="isShoucang?'active':''" @click="handleC('shoucang')">
					<view class="iconfont iconshoucang"></view>
					<view class="text">
						{{isShoucang?'已收藏':'收藏'}}
					</view>
				</view>
				<view class="item car" @click="handleC('car')">
					<view class="iconfont icongouwuche"></view>
					<view class="text">
						购物车
					</view>
				</view>
			</view>	
			<view class="btn_blue" v-if="itemDetail.num == 0" @click="foot2Jia">
				加入购物车
			</view>
			<view class="btn_group" v-if="itemDetail.num > 0">
				<view class="btn" @click="foot2Jian">
					<view class="iconfont iconjian"></view>
				</view>
				<view class="btn num">
					<view class="">
						{{itemDetail.num}}
					</view>
				</view>
				<view class="btn " @click="foot2Jia">
					<view class="iconfont iconjia"></view>
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
		data() {
			return {
				value:5,
				itemId: 0,
				itemFoot: {
					imgs: [{
						img: "gouwc2.png"
					}, {
						img: "gouwc2.png"
					}, {
						img: "gouwc2.png"
					}, {
						img: "gouwc2.png"
					}, {
						img: "gouwc2.png"
					}, {
						img: "gouwc2.png"
					}],
					imgs2:[],
					// imgs2: [{
					// 	img: "sp-czxq1.png"
					// }, {
					// 	img: "sp-czxq2.png"
					// }, {
					// 	img: "sp-czxq3.png"
					// }, {
					// 	img: "sp-czxq4.png"
					// }, {
					// 	img: "sp-czxq5.png"
					// }, {
					// 	img: "sp-czxq6.png"
					// }, {
					// 	img: "sp-czxq7.png"
					// }, {
					// 	img: "sp-czxq8.png"
					// }, {
					// 	img: "sp-czxq9.png"
					// }, {
					// 	img: "sp-czxq10.png"
					// }],
					pingjiaImg:[{
						img: "img-pingj1.png"
					}, {
						img: "img-pingj2.png"
					}, {
						img: "img-pingj3.png"
					}]
				},
				imgsIndex: 0,
				itemDetail:{},
				isShoucang:false
			};
		},
		onLoad(ph) {
			this.itemId = ph.id;
			this.$getApi("/App/Goods/goodsInfo", {id:this.itemId}, res => {
				console.log(res.data,"商品详情")
				let itemDetail = res.data;
				this.isShoucang = itemDetail.goodsKeep == 'yes'?true:false;
				itemDetail.num = 0;
				itemDetail.sel = 1;
				this.itemDetail  = itemDetail
			})
		},
		computed:{
			...mapState(["httpp", "SystemInfo", "userInfo", "shopCar","classifyId"]),
		},
		methods: {
			...mapMutations(["jiaCar", "jianCar"]),
			itemClick(item){
				this.$getApi("/App/Goods/goodsInfo", {id:item.id}, res => {
					console.log(res.data,"商品详情")
					let itemDetail = res.data;
					this.isShoucang = itemDetail.goodsKeep == 'yes'?true:false;
					itemDetail.num = 0;
					itemDetail.sel = 1;
					this.itemDetail  = itemDetail
				})
			},
			detailSw(el) {
				this.imgsIndex = el.detail.current;
			},
			showAllRate(){
				console.log("dsd")
				uni.navigateTo({
					url:"./allRate"
				})
			},
			handleC(el){
				if(el == 'shoucang'){	
					this.$getApi("/App/Goods/collect", {tid:this.itemDetail.id}, res => {
						console.log(res.data,"shoucang")
						if(res.data.state == 1){
							this.isShoucang = true
						}else{
							this.isShoucang = false
						}
					})
				}
				if(el == 'car'){
					uni.switchTab({
						url:"../shopCar/shopCar"
					})
				}
			},
			foot2Jia() {
				let item = this.itemDetail;
				console.log("foot2Jia",item)
				++item.num;
				console.log(item.num)
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
			},
			foot2Jian() {
				let item = this.itemDetail;
				console.log("foot2Jian",item)
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
		}
	}
</script>

<style lang="scss" scoped>
	.bottom_btn_group_sy{
		display: flex;
		position:fixed;
		width: 750upx;
		bottom: 0;
		left: 0;
		z-index: 10;
		
		justify-content: space-between;
		box-sizing: border-box;
		padding-left: 10upx;
		background-color: #fff;
		align-items: center;
		.left{
			display: flex;
			.item{
				text-align: center;
				color: #999;
				width: 120upx;
				.iconfont{
					font-size: 44upx;
					position:relative;
					top:8upx;
				}
				&.active{
					color: $uni-or;
				}
			}
		}
		.btn_blue{
			height: 100upx;
			line-height: 100upx;
			width: 330upx;
			text-align: center;
			font-size: 32upx;
			background-color: $uni-bl;
			color: #fff;
		}
		.btn_group{
			display: flex;
			
			color: #fff;
			height: 100upx;
			width: 330upx;
			.btn{
				width: 33%;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				opacity: 0.9;
				background-color: $uni-bl;
				&.num{
					opacity: 1;
				}
			}
		}
	}
	.pingjia_box_sy{
		padding: 0 26upx;
		.pingjia_user{
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #666;
			padding-right: 20upx;
			.left{
				display: inline-flex;
				align-items: center;
				
				.img{
					width: 80upx;
					height: 80upx;
				}
				.name{
					font-size: 30upx;
					margin-left: 20upx;
					max-width: 420upx;
				}
			}
		}
		.rate_pj{
			padding: 30upx 0 30upx;
		}
		.wa_text{
			font-size: 30upx;
			color: #666;
			padding-bottom: 20upx;
		}
		.pingjia_img_box{
			// padding: 0 26upx;
			height: 230upx;
			padding-bottom: 30upx;
			.img_item{
				width: 226upx;
				height: 226upx;
				background: no-repeat center center;
				background-size: 262upx auto;
			}
		}
	}
	.detail {
		font-size: 26upx;

		.bgf20 {
			width: 750upx;
			height: 20upx;
			background-color: #f0f0f0;
		}

		.detail_info {
			padding: 0 26upx;

			.money_num {
				display: flex;
				justify-content: space-between;

				.left {
					display: inline-flex;
					align-items: baseline;

					.red {
						display: inline-flex;
						align-items: baseline;

						.m_n {
							font-weight: bold;
							font-size: 38upx;
						}
					}

					.old_m {
						text-decoration: line-through;
						color: #999;
						margin: 0 30upx;
					}

					.all_num {
						color: #999;
					}
				}

				.right {
					background-color: $uni-bl-bg;
					color: $uni-bl;
					padding: 8upx 20upx 0;
					border-radius: 30upx;
					display: inline-block;
					transform: scale(.9);

					.liucheng_img {
						width: 20upx;
						height: 20upx;
						margin-right: 10upx;
					}
				}
			}

			.t_title {
				font-size: 36upx;
				color: #666;
				padding: 20upx 0 40upx;
			}
		}

		.xingqing_title {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 26upx 0;
			background-color: #f0f0f0;

			.v {
				width: 100upx;
				height: 2upx;
				background-color: #999;
			}

			.t {
				padding: 0 30upx;
				color: #666;
				font-size: 32upx;
			}
		}

		.swiper_box {
			position: relative;

			.show_bi_num {
				display: flex;
				justify-content: flex-end;
				padding: 0 26upx;
				position: absolute;
				bottom: 0;
				right: 0upx;

				.cbc {
					background-color: #999;
					padding: 6upx 30upx 8upx;
					border-radius: 40upx;
					color: #fff;
					transform: scale(.8);
					font-size: 32upx;
				}
			}
		}


		.h_lunbo {
			margin-bottom: 20upx;
			height: 700upx;

			.swiper-item {
				text-align: center;

				.img_lub {
					width: 700upx;
					height: 700upx;
				}
			}
		}

		.img_bg_box {
			.img_c {
				line-height: inherit;

				.img {
					line-height: initial;
					width: 750upx;
					vertical-align: bottom
				}
			}
		}
		.weke_new {
			padding: 30upx 0 10upx;
			.weke_new_header_sy {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 10upx;
		
				.left {
					display: inline-flex;
					align-items: center;
		
					.t_img {
						width: 30upx;
						height: 30upx;
					}
		
					.title1 {
						font-size: 30upx;
						margin: 0 20upx;
						font-weight: bold;
					}
		
					.title2 {
						color: #999;
					}
				}
		
				.right {
					display: inline-flex;
					align-items: center;
					color: #999;
				}
			}
		
		
			.weke_box_item {
				width: 170upx;
				margin-right: 20upx;
				.t_img {
					width: 170upx;
					height: 170upx;
				}
		
				.title1 {
					color: #666;
					padding: 12upx 0 4upx;
				}
				.zhuijia{
					display: flex;
					justify-content: space-between;
					padding: 10upx 0;
					.m {
						font-weight: bold;
					}
					.iconjia1{
						color: $uni-bl;
					}
				}
				
			}
		
		}
		
	}
</style>
