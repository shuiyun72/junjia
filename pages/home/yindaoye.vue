<template>
	<view class="yindaoye">
		<image :src="yindaoImg" mode="widthFix" class="img_l" v-if="yindaoImg != '暂无引导页'"></image>
		<view class="zwyd" v-if="yindaoImg == '暂无引导页'">
			暂无引导页
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yindaoImg:"暂无引导页"
			};
		},
		onShow() {
			uni.showLoading({
			    title: '加载中'
			});
			this.$getApi("/App/Index/guidePage", {}, res => {
				console.log(res.data, "APP启动图")
				uni.hideLoading()
				try{
					this.yindaoImg = res.data[0].pic
				}catch(e){
					//TODO handle the exception
				}
				setTimeout(()=>{
					uni.switchTab({
						url:'./home'
					})
				},2000)
			})
		}
	}
</script>

<style lang="scss">
.yindaoye{
	width: 100vw;
	height: 100vh;
	display: flex;
	
	align-items: center;
	justify-content: center;
	.img_l{
		width: 100%;
	}
	.zwyd{
		color: #999;
		font-size: 40upx;
	}
}
</style>
