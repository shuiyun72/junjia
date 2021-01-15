<template>
	<view class="appraise">
		<view class="appraise_body">
			<view class="item" v-for="(item,pIndex) in pingjiaList">
				<view class="a_title">
					<text class="ping">评</text>
					<text class="ps">订单编号: </text>
					<text class="ps"> {{item.order_num}}</text>
				</view>
				<view class="pj_time">
					<view class="star_box">
						<uni-rate :value="Number(item.star)" :margin="5" :size="18" :disabled="true"/>
						<text class="star_n">{{starC(item.star)}}</text>
					</view>
					<view class="time">
						{{item.time}}
					</view>
				</view>
				<view class="a_raise">
					{{item.content}}
				</view>
				<view class="img_box" >
					<view class="item_img" :style="'background-image: url('+imgL+');'" v-for="(imgL,index) in item.pic" @click="showImg(pIndex,index)">
					</view>
				</view>
				<view class="foot_l">
					<image :src="item.goods_thumb" class="foot_img" mode=""></image>
					<view class="text_cc">
						{{item.name}}
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import _ from "../../until/lodash";
	export default {
		data() {
			return {
				pingjiaList:[]
			};
		},
		onShow() {
			this.$getApi('/App/Goods/myCommentList',{},res=>{
				console.log(res.data,"我的评价")
				this.pingjiaList = res.data;
			})
		},
		computed:{
			httpp(){
				return this.$store.state.httpp;
			}
		},
		methods:{
			gitData(){
				
			},
			starC(n){
				n = Number(n);
				switch(n){
				    case 1 : return "差评"; 
				       break; //可选
				    case 2 : return "中评";
				       break; //可选
					case 3 : return "好评";
					   break; //可选
					case 4 : return "好评";
					   break; //可选
				    default : return "好评"
				}
			},
			showImg(pindex,index){
				let imgs = this.pingjiaList[pindex].pic;
				console.log(imgs)
				 uni.previewImage({
					urls: imgs,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.appraise{
	height: 100vh;
	background-color: $uni-def;
}

.appraise_body{
	.item{
		background-color: #fff;
		margin-bottom: 26upx;
		padding: 24upx;
		.a_raise{
			font-size: 30upx;
			color: #888;
			padding: 20upx 0;
		}
		.foot_l{
			display: flex;
			align-items: center;
			margin: 20upx 0upx;
			padding: 20upx;
			background-color: #f0f0f0;
			.foot_img{
				width: 80upx;
				height: 80upx;
			}
			.text_cc{
				font-size: 32upx;
				color: #666;
				margin-left: 20upx;
			}
		}
		.img_box{
			display: flex;
			flex-wrap: wrap;
			.item_img{
				width: 226upx;
				height: 226upx;
				background-color: #f0f;
				margin-left: 10upx;
				margin-bottom: 10upx;
				background: no-repeat center center;
				background-size: 226upx auto;
				
			}
		}
		.a_title{
			margin-bottom: 20upx;
			display: flex;
			align-items: center;
			border-bottom: 1upx solid #eee;
			font-size: 30upx;
			font-weight: bold;
			.ping{
				display: inline-flex;
				width: 60upx;
				height: 60upx;
				background-color: $uni-bl;
				color: #fff;
				font-size: 36upx;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				transform: scale(.7);
				margin-right: 10upx;
			}
			.ps{
				margin-right: 10upx;
				color: #777;
			}
		}
		.pj_time{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.time{
				color: #999;
			}
		}
		.star_box{
			display: inline-flex;
			align-items:baseline;
			.star_n{
				align-items:baseline;
				font-size: 30upx;
				margin-left: 30upx;
			}
		}
	}
}
</style>
