<template>
	<view class="appraise">
		<view class="pt_p1">
			<!-- <view class="t1">订单已完成</view>
			<view class="t2">请评价一下吧</view> -->
		
			<view class="t3">评价订单</view>
			<view class="rate_bg_sy">
				<view class="rate_i_sy">
					<view class="rate_i iconfont iconxingxing yellow" v-for="ra in calcNum(star)" @click="selStat(ra)"></view>
					<view class="rate_i iconfont iconxingxing" v-for="ra in calcNum(5 - star)"  @click="selStat(star+ra)"></view>
				</view>
				<!-- <view class="right">{{ star }}.0</view> -->
			</view>
		</view>
		<view class="bgff">
			
		
		<view class="">
			<textarea v-model="textT" class="textarea_t" placeholder="请写下对订单的评价" />
		</view>
		<view class="p26">
			<view class="photo_list_sy">
				<view class="item" @click="upImg">
					<image src="../../static/img/tianjtp.png" class="img_f" mode=""></image>
					<view class="text_po">
						添加图片
					</view>
				</view>
				<view v-for="(item,index) in imgList">
					<view class="item_l" :style="'background-image: url('+httpp+item+');'">
						<view class="iconfont iconyduicuowushixin" @click="delItemImg(index)"></view>
					</view>
				</view>
			</view>
		</view>
		</view>
		<view class="bh80">
			
		</view>
		<view class="bg_btn_sub_sy"><view class="btn" @click="nativeTo">提交</view></view>
	</view>
</template>

<script>
	import _ from "../../until/lodash";
export default {
	data() {
		return {
			star:5,
			textT:"",
			orderItem:"",
			imgList:[],
			httpp:""
		};
	},
	onLoad(ph) {
		this.orderItem = JSON.parse(ph.orderItem)
		console.log(this.orderItem)
		this.httpp = this.$apiUrl;
		console.log(this.httpp)
	},
	methods:{
		calcNum(num) {
			let arrayL = [];
			for (let i = 0; i < num; i++) {
				arrayL.push(i);
			}
			return arrayL;
		},
		selStat(star){
			console.log(star)
			this.star = star+1
		},
		nativeTo(){
			uni.showLoading({
			    title: '加载中,请稍后'
			});
			if(!this.textT){
				this.$msg("请填写评价内容")
				return;
			}
			let imgList = this.imgList.length > 0 ?this.imgList.join(";"):""
			let data = {
				order_id:this.orderItem.id,
				goods_id:this.orderItem.goods_list[0].goods_id,
				content:this.textT,
				pic:imgList,
				star:this.star
			}
			this.$getApi("/App/Goods/addComment", data, res => {
				console.log(res.data,"ccccc3161")
				uni.hideLoading()
				uni.navigateTo({
					url:"../home/msg?title=评价成功"
				})
			})
			
		},
		delItemImg(index){
			console.log(index)
			this.imgList.splice(index,1)
			this.$msg("图片删除成功")
		},
		upImg(){
			let this_ = this;
			
			
			uni.chooseImage({
			    count: 3, //默认9
			    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['camera','album'], //从相册选择
			    success: function (resImg) {
					console.log(resImg);
			        console.log(JSON.stringify(resImg.tempFilePaths));
	
					let beiyongLIst = resImg.tempFilePaths;
					console.log(beiyongLIst,beiyongLIst.length)
										
					
					for(let i=0;i< beiyongLIst.length;i++){
						console.log(beiyongLIst[i])
						uni.uploadFile({
							url:this_.$apiUrl + '/App/Goods/saveFiles',
							filePath: beiyongLIst[i],
							name: 'file',
							success(res1) {
								console.log(res1)
								console.log(JSON.parse(res1.data).data)
								this_.imgList.push(JSON.parse(res1.data).data)
								this_.imgList = this_.imgList.slice(0,3)
								this_.$msg("图片上传成功")
							}
						});
					}
			    }
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	.bh80{
		height: 80upx;
	}
.appraise {
	font-size: 28upx;
	color: #666;
	padding: 0 26upx;
	.bgff{
		background-color: #f0f0f0;
		border-radius: 10upx;
		margin: 0 26upx;
		.p26{
			padding: 26upx;
		}
	}
	.photo_list_sy{
		display: flex;
		flex-wrap: wrap;
		.item_l{
			width: 120upx;
			height: 120upx;
			background: no-repeat center center;
			background-size: 120upx auto;
			margin-right: 20upx;
			position:relative;
			.iconfont{
				position:absolute;
				top:-10upx;
				right:-10upx;
				color: $uni-red;
			}
		}
		.item{
			width: 120upx;
			height: 120upx;
			margin-right: 20upx;
			position: relative;
			.text_po{
				text-align: center;
				position:absolute;
				bottom: 20upx;
				width: 120upx;
				left: 0;
				color: #999;
				transform: scale(.8);
			}
			.img_f{
				width: 100%;
				height: 100%;
			}
		}
	}
	.bg_btn_sub_sy {
		padding: 0 52upx;
		.btn {
			background-color: $uni-bl;
			color: #fff;
			padding: 32upx;
			text-align: center;
			border-radius: 60upx;
		}
	}
	.textarea_t{
		font-size: 28upx;
		padding: 26upx;
		// border: 1upx solid #ccc;
		width: 100%;
		box-sizing: border-box;
		border-radius: 10upx;
	}
	.rate_bg_sy {
		display: flex;
		.rate_i_sy {
			display: flex;
			justify-content: space-around;
			flex:1;
			.iconxingxing {
				color: #ccc;
				font-size: 50upx;
				
				&.yellow {
					color: #fec40b;
				}
			}
		}
		.right {
			color: #999;
			font-size: 28upx;
		}
	}
	.pt_p1{
		padding: 60upx 160upx;
		text-align: center;
		.t1{
			font-size: 44upx;
			margin-bottom: 20upx;
			color: #333;
		}
		.t2{
			border-bottom: 1upx dashed #999;
			padding-bottom: 40upx;
			margin-bottom: 40upx;
		}
		.t3{
			color: #999;
			margin-bottom: 30upx;
		}
	}
}
</style>
