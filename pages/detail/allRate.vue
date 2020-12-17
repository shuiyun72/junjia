<template>
	<view>
		<view class="pingjia_box_sy2" v-for="item in pingjiaList">
			<view class="pingjia_user">
				<view class="left">
					<image :src="item.avatar" class="img" mode=""></image>
					<view class="left2">
						<view class="name shengluehao">
							{{item.nickname}}
						</view>
						<view class="time">
							{{item.time}}
						</view>
					</view>
				</view>
				<view class="right">
					<uni-rate color="#bbb" active-color="#F59005" :readonly="true" :size="18" :value="item.star" class="rate_pj"></uni-rate>
				</view>
			</view>
			
			<view class="wa_text">
				{{item.content}}
			</view>
			<swiper :interval="3000" :duration="1000" class="pingjia_img_box" display-multiple-items=3>
				<swiper-item v-for="itemImg in item.pic" >
					<view class="img_item" :style="'backgroundImage: url('+itemImg+')'"></view>
				</swiper-item>
			</swiper>
		</view>
		<view v-show="isLoadMore"> 
			<uni-load-more :status="loadStatus" ></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:5,
				pingjiaImg:[{
					img: "img-pingj1.png"
				}, {
					img: "img-pingj2.png"
				}, {
					img: "img-pingj3.png"
				}],
				page:1,
				pingjiaList:[],
				thisId:0,
				loadStatus:'loading',  //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
				isLoadMore:false,  //是否加载中
			};
		},
		onLoad(ph) {
			this.thisId = ph.id;
			this.getData()
		},
		methods:{
			getData(){
				this.$getApi("/App/Goods/pingjiaList", {p:this.page,id:this.thisId}, res => {
					console.log(res.data,"商品评价")
					this.isLoadMore = false;
					this.pingjiaList = this.pingjiaList.concat(res.data);
				})
			}
		},
		onReachBottom(){  //上拉触底函数
			  if(!this.isLoadMore){  //此处判断，上锁，防止重复请求
					this.isLoadMore=true
					this.page++;
					this.getData()
			  }
		}
		
	}
</script>

<style lang="scss" scoped>
.pingjia_box_sy2{
		padding: 0 26upx;
		margin-bottom: 10upx;
		.p26{
			padding: 0 26upx;
		}
		.pingjia_user{
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #666;
			padding-right: 20upx;
			.left{
				display: inline-flex;
				align-items: center;
				.left2{
					margin-left: 20upx;
				}
				.img{
					width: 80upx;
					height: 80upx;
				}
				.name{
					font-size: 30upx;
					
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
			padding: 20upx 0;
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
	
</style>
