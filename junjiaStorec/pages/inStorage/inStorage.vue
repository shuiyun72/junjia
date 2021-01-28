<template>
	<view class="ruku">
		<view class="big_text">
			商品扫码入库
		</view>
		<view class="text2">
			扫面商品上的条形码获取商品信息
		</view>
		<view class="text2">
			输入商品数量即可入库成功
		</view>
		<image src="../../static/img/ruk.png" class="img_rk" mode=""></image>
		<view class="sub_top">
			<button class="btn  ms round" @click="rukuerweima">扫码入库</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			rukuerweima(){
				
				let this_ = this;
				uni.scanCode({
				    onlyFromCamera: true,
					 scanType: ['barCode'],
					 
				    success: function (res) {
				        console.log('条码类型：' + JSON.stringify(res));
				        console.log('条码内容：' + res.result);
						uni.navigateTo({
							url:"./rukuFoot?code="+res.result
						})
				    },
				});
			}
		}
	}
</script>

<style lang="scss">
.ruku{
	text-align: center;
	.big_text{
		padding-top: 90upx;
		font-size: 46upx;
		font-weight: bold;
		color: #333;
	}
	.img_rk{
		width: 400upx;
		height: 440upx;
		padding-top: 100upx;
	}
	.text2{
		color: #666;
		font-size: 30upx;
		padding: 10upx 0 0;
	}
	.sub_top {
		margin-top: 80upx;
		padding: 0 80upx;
		.btn{
			background-color: $uni-bl;
			color: #fff;
		}
	}
}
</style>
