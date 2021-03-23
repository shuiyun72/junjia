<template>
	<view>
		<view class="iconfont iconjiantouarrowhead7 back_fenxiang" @click="back"></view>
		<view class="fenxiang_bg">
			<image src="../../static/img/yaoqhyy.png" mode="" class="bgc_img"></image>
			<view class="poacc">
				
			
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
				<!-- #ifdef MP -->
				<button class="fen_btn_bt" open-type="share">
					立即邀请好友
				</button>
				<!-- #endif -->
				<!-- #ifndef MP -->
				<view class="fen_btn_bt" @click="yaoqing">
					立即邀请好友
				</view>
				<!-- #endif -->
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
			<!-- #ifdef MP -->
			<button class="fen_btn_bt" open-type="share">
				立即邀请好友
			</button>
			<!-- #endif -->
			<!-- #ifndef MP -->
			<view class="fen_btn_bt" @click="yaoqing">
				立即邀请好友
			</view>
			<!-- #endif -->
			
			</view>
		</view>
		<uni-popup type="bottom" ref="btPop" style="z-index:100">
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
				fenxiangImg:"",
				fenxiangText:""
			};
		},
		onShow() {
			let this_ =  this;
			// 获取系统配置信息
			this_.$getApi("/App/Index/getSysConfig", {}, res => {
				console.log(res, "获取系统配置信息")
				this_.fenxiangText = _.filter(res.data, item => {
					return item.remark.includes('分享文字')
				})[0].value;
				this_.fenxiangImg = _.filter(res.data, item => {
					return item.remark.includes('分享图片')
				})[0].value;
				console.log(this_.bobaoText, '热点播报')
			})
		},
		//发送给朋友
		onShareAppMessage(res) {
			// let userInfoId = this.userInfo.id;
			// 此处的distSource为分享者的部分信息，需要传递给其他人
			let this_ = this;
			uni.share({
			    provider: "weixin",
			    scene: "WXSceneSession",
			    type: 1,
			    summary: this_.fenxiangText,
			    success: function (res) {
			        console.log("success:" + JSON.stringify(res));
					this_.$msg("完成分享")
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},500)
					
			    },
			    fail: function (err) {
			        console.log("fail:" + JSON.stringify(err));
			    }
			});
		},
		//分享到朋友圈
		onShareTimeline(res) {
			let this_ = this;
			uni.share({
			    provider: "weixin",
			    scene: "WXSenceTimeline",
			    type: 1,
			    summary: this_.fenxiangText,
			    success: function (res) {
			        console.log("success:" + JSON.stringify(res));
					this_.$msg("完成分享")
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},500)
			    },
			    fail: function (err) {
			        console.log("fail:" + JSON.stringify(err));
			    }
			});
		},
		beforeDestroy() {
			this.$refs.btPop.close()
		},
		methods:{
			back(){
				let pages = getCurrentPages() // 获取栈实例
				let prevPage = pages[pages.length - 2]
				if(prevPage){
					uni.navigateBack({
						delta:1
					})
				}else{
					uni.switchTab({
						url:"../home/home"
					})
				}
			},
			yaoqing(){
				this.$refs.btPop.open()
			},
			fenxiang(){
				let this_ = this;
				let userInfo = this.$store.state.userInfo;
				let myId = userInfo.id?userInfo.id:0
			// #ifndef MP
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 0,
				    href: "http://hongyingedu.top/yindaoye/index.html?cname=fx&uid="+myId,
				    title: "君佳优选",
				    summary: "欢迎来到君佳优选,安装app快来和我们一下抢购商品吧",
				    imageUrl: this_.fenxiangImg,
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
						this_.$msg("完成分享")
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},500)
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			// #endif
				// #ifdef MP
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 1,
				    summary: this_.fenxiangText,
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
						this_.$msg("完成分享")
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},500)
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
				// #endif
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.bgc_img{
		width: 750upx;
		height: 1900upx;
	}
.fenxiang_bg{ 
	// height: 150vh;
	background-size: 750upx 2200upx;
	position:relative;
	.poacc{
		position:absolute;
		top: 0;
		left: 0;
		width: 750upx;
	}
	.fen_pt1{
		padding: 720upx 40upx 0;
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
		margin: 50upx auto 0;
		/* #ifdef MP */
		margin: 70upx auto 0;
		/* #endif */
		
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
