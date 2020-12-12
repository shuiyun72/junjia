<template>
	<view>
		<view class="pingjia_box_sy2" v-for="ic in 6">
			<view class="pingjia_user">
				<view class="left">
					<image src="../../static/img/toux.png" class="img" mode=""></image>
					<view class="left2">
						<view class="name shengluehao">
							dsadsadd
						</view>
						<view class="time">
							2020-08-01
						</view>
					</view>
				</view>
				<view class="right">
					<uni-rate color="#bbb" active-color="#F59005" :readonly="true" :size="18" v-model="value" class="rate_pj"></uni-rate>
				</view>
			</view>
			
			<view class="wa_text">
				橘子很甜,很好吃
			</view>
			<swiper :interval="3000" :duration="1000" class="pingjia_img_box" display-multiple-items=3>
				<swiper-item v-for="item in pingjiaImg" >
					<view class="img_item" :style="'backgroundImage: url(../../static/img/liucheng/'+item.img+')'"></view>
				</swiper-item>
			</swiper>
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
				}]
			};
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
