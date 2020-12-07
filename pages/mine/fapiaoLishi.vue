<template>
	<view class="fapiao_lishi">
		<view class="f_item" v-for="item in lishiList">
			<view class="hang">
				<view class="name">
					发票抬头 :
				</view>
				<view class="text">
					{{item.title}}
				</view>
			</view>
			<view class="hang">
				<view class="name">
					公司税号 :
				</view>
				<view class="text">
					{{item.shuihao}}
				</view>
			</view>
			<view class="hang">
				<view class="name">
					发票金额 :
				</view>
				<view class="text">
					{{item.money}}
				</view>
			</view>
			<view class="hang">
				<view class="name">
					收件邮箱 :
				</view>
				<view class="text">
					{{item.email}}
				</view>
			</view>
			<view class="hang">
				<view class="name">
					申请时间 :
				</view>
				<view class="text">
					{{item.time}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lishiList:[{
					title:"河南优秀有限公司",
					shuihao:"1254545dads5115",
					money:"83.88",
					email:"454545145@qq.com",
					time:"2020-11-16"
				},{
					title:"河南优秀有限公司",
					shuihao:"1254545dads5115",
					money:"83.88",
					email:"454545145@qq.com",
					time:"2020-11-16"
				}]
			};
		}
	}
</script>

<style lang="scss" scoped>
.fapiao_lishi{
	background-color: #f0f0f0;
	min-height: 100vh;
	padding: 20upx 26upx;
	.f_item{
		background-color: #fff;
		margin-bottom: 20upx;
		padding: 26upx 20upx 30upx;
		border-radius: 20upx;

		.hang{
			display: flex;
			font-size: 30upx;
			color: #666;
			 letter-spacing:4upx;
			 padding: 5upx 0;
			.name{
				width: 160upx;
				flex-shrink: 0;
			}
		}
	}
}
</style>
