<template>
	<view>
		<view class="pingjia_box_sy2" v-for="(itemDetail,pIndex) in pingjiaList">
			<view class="pingjia_user" >
				<view class="left">
					<image :src="itemDetail.avatar" class="img" mode=""></image>
					<view class="name shengluehao">
						{{itemDetail.nickname}}
					</view>
				</view>
				<view class="time">
					{{itemDetail.time}}
				</view>
			</view>
			<view class="rate_pj">
				<uni-rate color="#bbb" active-color="#F59005" :readonly="true" :size="18" v-model="itemDetail.star" ></uni-rate>
			</view>
			
			<view class="wa_text">
				{{itemDetail.content}}
			</view>
			<view class="pingjia_img_box">
				<view class="img_item" :style="'background-image: url('+itemImg+')'" v-for="itemImg in itemDetail.pic" @click="showImg(pIndex)"></view>
			</view>
		</view>
		<view class="no_foot" v-if="pingjiaList.length == 0">
			<image src="../../static/img/none.png" class="no_img" mode=""></image>
			<view class="no_text">
				暂无评价
			</view>
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
			},
			showImg(pindex){
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
	.no_foot{
		text-align: center;
		font-size: 40upx;
		padding-top: 100upx;
		.no_img{
			width: 500upx;
			height: 500upx;
		}
		.no_text{
			font-size: 40upx;
			color: #999;
			padding-top: 60upx;
		}
	}
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
			padding: 20upx 0;
		}
		.pingjia_img_box{
			// padding: 0 26upx;
			height: 230upx;
			padding-bottom: 30upx;
			display: flex;
			.img_item{
				width: 226upx;
				height: 226upx;
				background: no-repeat center center;
				background-size: 226upx auto;
				margin-right: 20upx;
			}
		}
	}
	
</style>
