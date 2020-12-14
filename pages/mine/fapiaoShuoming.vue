<template>
	<view class="fapiao_shuoming">
		<view class="fapiao_t1">
			Q1:如何申请开发票？
		</view>
		<view class="fapiao_t2">
			可以在订单签收后进入APP【我】→【发票】，然后选择您要申请开发票的订单，填写发票抬头与查收电子发票的邮箱即可，可多个订单合并开具发票。
		</view>
		<view class="fapiao_t1">
			Q2:发票可以累计开吗？
		</view>
		<view class="fapiao_t2">
			发票可以累计开，您可以在申请开票的时候选择您要开票的多个订单即可，一般可以开1年内的发票！
		</view>
		<view class="fapiao_t1">
			Q3:可以提供纸质发票吗？
		</view>
		<view class="fapiao_t2">
			目前只支持开具电子发票，电子发票与纸质发票具有相同法律效力，如需报销，可将电子文档进行打印。
		</view>
		<view class="fapiao_t1">
			Q4:购买的是食品，可以开日用品发票吗？
		</view>
		<view class="fapiao_t2">
			发票开具的明细必须与您订单购买的商品一致，按实际购买
			商品种类开具发票。
		</view>
		<view class="fapiao_t1">
			Q5:为什么申请不了发票？
		</view>
		<view class="fapiao_t2">
			请更新到最新版本的APP,在您的订单签收成功后，可以申
			请开具电子发票。
		</view>
		<!-- <rich-text type="text" :nodes="textHtml"></rich-text> -->
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
			this.$getApi('/App/Public/getArticle', {type:5}, resLei => {
				console.log(resLei.data.content,"发票说明")
				this.textHtml = resLei.data.content
			})
		}
	}
</script>

<style lang="scss" scoped>
.fapiao_shuoming{
	padding: 20upx 26upx;
	.fapiao_t1{
		font-size: 36upx;
		padding: 20upx 0;
		color: #333;
	}
	.fapiao_t2{
		font-size: 30upx;
		padding-bottom: 30upx;
		color: #999;
	}
}
</style>
