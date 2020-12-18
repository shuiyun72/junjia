<template>
	<view>
		<view class="iconfont iconjiantouarrowhead7 back_fenxiang" @click="back"></view>
		<view class="fenxiang_bg">
			<view class="fen_pt1">
				<view class="title">
					邀请好友得现金积分
				</view>
				<image src="../../static/img/yaoqlc.png" class="pt1_img" mode=""></image>
				<view class="text_group">
					<view class="item_t">
						邀请好友
					</view>
					<view class="item_t">
						注册成功
					</view>
					<view class="item_t">
						积分奖励
					</view>
				</view>
				<view class="fen_btn"  @click="yaoqing">
					立即邀请好友
				</view>
			</view>
			<view class="fen_pt2">
				<view class="title">
					规则
				</view>
				<view class="v_p">
					1、活动期间（即日起）,未注册过的新用户在受邀后（点击邀请链接14天内完成用户注册、即视为邀请成功
				</view>
				<view class="v_p">
					2、每邀请一个好友便获取10积分，积分可直接下单抵扣使用
				</view>
				<view class="v_p">
					3、解释权归君佳优选所有
				</view>
			</view>
			
			<view class="fen_btn_bt" @click="yaoqing">
				立即邀请好友
			</view>
		</view>
		<uni-popup type="bottom" ref="btPop">
			<view class="bt_pop" @click="fenxiang">
				<view class="text1">
					分享到
				</view>
				<image src="../../static/img/weix.png" class="bt_weapp" mode=""></image>
				<view class="text1">
					微信好友
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		mounted() {
			
		},
		beforeDestroy() {
			this.$refs.btPop.close()
		},
		methods:{
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			yaoqing(){
				this.$refs.btPop.open()
			},
			fenxiang(){
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 1,
				    summary: "我在君佳优选购物，赶紧跟我一起来体验！",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			}
			
		}
	}
</script>

<style lang="scss" scoped>
.fenxiang_bg{
	background: url(../../static/img/yaoqhyy.jpg) no-repeat center top;
	height: 150vh;
	background-size: 750upx auto;
	position:relative;
	.fen_pt1{
		padding: 760upx 40upx 0;
		text-align: center;
		.title{
			font-size: 36upx;
			color: #666;
			margin-bottom: 30upx;
		}
		.pt1_img{
			width: 600upx;
			height: 110upx;
		}
		.text_group{
			display: flex;
			justify-content: space-between;
			padding: 0 30upx;
			font-size: 32upx;
			color: #666;
		}
		.fen_btn{
			width: 620upx;
			margin: 50upx auto 0;
			height: 80upx;
			line-height: 80upx;
			background-color: $uni-ye;
			border-radius: 60upx;
			color: #fff;
			font-size: 32upx;
		}
	}
	.fen_pt2{
		margin: 130upx auto 0;
		background-color: #fff;
		border-radius: 20upx;
		width: 680upx;
		box-sizing: border-box;
		padding: 20upx 40upx 50upx;
		.title{
			font-size: 34upx;
			color: #333;
			text-align: center;
			padding-bottom: 30upx;
		}
		.v_p{
			margin-bottom: 20upx;
			color: #999;
			font-size: 30upx;
		}
	}
	.fen_btn_bt{
		width: 620upx;
		margin: 150upx auto 0;
		height: 80upx;
		line-height: 80upx;
		background-color: $uni-ye;
		border-radius: 60upx;
		color: #fff;
		font-size: 32upx;
		text-align: center;
	}
}
.bt_pop{
	background-color: #fff;
	text-align: center;
	padding: 40upx 0;
	font-size: 32upx;
	color: #666;
	.bt_weapp{
		width: 80upx;
		height: 80upx;
		padding: 30upx 0;
	}
}
.back_fenxiang{
	position:fixed;
	top: 60upx;
	left: 10upx;
	color: #fff;
	z-index:12;
	width: 80upx;
	height: 80upx;
	line-height: 80upx;
	text-align: center;
	font-size: 46upx;
	border: 1upx solid rgba(200,200,200,.5);
	border-radius: 50%;
}
</style>
