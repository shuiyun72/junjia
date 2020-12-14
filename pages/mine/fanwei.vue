<template>
	<view class="fanwei">
		<view class="h_img">
			<image src="../../static/img/mine/peiskd.png" mode="" class="img"></image>
		</view>
<!-- 		<view class="t_name">
			目前可配送范围
		</view> -->
		<view class="t_name2">
			<rich-text type="text" :nodes="textHtml"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textHtml:""
			};
		},
		mounted() {
			this.$getApi('/App/Public/getArticle', {type:4}, resLei => {
				console.log(resLei.data.content,"配送范围")
				this.textHtml = resLei.data.content
			})
		}
	}
</script>

<style lang="scss" scoped>
.fanwei{
	.h_img{
		text-align: center;
		padding: 10upx 0 30upx;
		.img{
			width: 300upx;
			height: 200upx;
		}
	}
	.t_name{
		border-bottom: 1upx solid #f0f0f0;
		font-size: 38upx;
		padding: 26upx 26upx 10upx;
		font-weight: bold;
		color: #666;
	}
	.t_name2
	{
		font-size: 32upx;
		padding: 16upx 26upx 20upx;
		color: #666;
	}
}
</style>
