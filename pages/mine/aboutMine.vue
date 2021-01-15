<template>
	<view class="page">
		<view class="hezuo_img">
			<image src="../../static/img/logo.png" mode="widthFix" class="img"></image>
		</view>
		<view class="text_p1">
			<rich-text type="text" class="pc_text" :nodes="textHtml"></rich-text>
		</view>
		<view class="h20">
			
		</view>
		<uni-list>
			<uni-list-item title="商务合作电话"  :rightText="phone" :showArrow="false" @click="telPhone"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import _ from "../../until/lodash";
	export default {
		data() {
			return {
				textHtml:"",
				phone:""
			};
		},
		mounted() {
			this.$getApi('/App/Public/getArticle', {type:1}, resLei => {
				console.log(resLei.data.content,"关于我们")
				this.textHtml = resLei.data.content
			})
			this.$getApi("/App/Index/getSysConfig",{},res=>{
				// let swM = res.data.content;
				let phoneL = _.filter(res.data,item=>{
					return item.remark.indexOf("平台客服电话") != -1
				})
				if(phoneL.length > 0){
					this.phone = phoneL[0].value;
				}
				
				// const regex = new RegExp('<img[\s\S]+?', 'gi')
				// swM = swM.replace(regex, `<img style="width:100%;height:auto;display:block;margin:10px 0;"`);
				// this.swMsg = this.formatRichText(res.data.content);
			})
		},
		methods: {
			telPhone(){
				uni.makePhoneCall({
				    phoneNumber: this.phone //仅为示例
				});
			},
			formatRichText(html) { //控制小程序中图片大小
				let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
					console.log(match.search(/style=/gi));
					
					if(match.search(/style=/gi) == -1){
						match = match.replace(/\<img/gi,'<img style=""');
					}
					return match;
				});
				
				newContent = newContent.replace(/style="/gi, '$& max-width:100% !important; ');
				newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				return newContent;
			}
		}
	}
</script>

<style lang="scss" scoped>
.page{
	background-color: #f0f0f0;
	min-height: 100vh;
}
.p10_l{
	margin: 20upx 0;
}
.hezuo_img{
	text-align: center;
	padding: 50upx 0 30upx;
	background-color: #fff;
	.img{
		width: 200upx;
	}
}
.text_p1{
	background-color: #fff;
	padding: 20upx 36upx;
	line-height: 80upx;
	font-size: 30upx;
	color: #666;
}
</style>
