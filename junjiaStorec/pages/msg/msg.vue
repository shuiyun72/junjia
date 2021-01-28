<template>
	<view>
		<view class="xiaoxi_list">
			<view class="item" v-for="item in xiaoxiListXT">
				<view class="time">
					{{getDateL(item.time)}}
				</view>
				<view class="box">
					<view class="c_title">
						{{item.title}}
					</view>
					<view class="content">
						{{item.content}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xiaoxiListXT: [{ //系统消息
					time: "2020-05-17",
					title: "系统消息",
					content: "消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容"
				}, {
					time: "2020-05-17",
					title: "系统消息",
					content: "消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容"
				}, {
					time: "2020-05-17",
					title: "系统消息",
					content: "消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容"
				}, {
					time: "2020-05-17",
					title: "系统消息",
					content: "消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容消息内容"
				}],
			};
		},
		onShow() {
			this.$getApi('/App/Index/myMessage',{type:1},res=>{
				console.log(res.data,"获取系统信息")
				this.xiaoxiListXT = res.data
			})
		},
		methods: {
			getDateL(date) {
				return this.$getDate(date, '年-月-日',"c")
			}
		}
	}
</script>

<style lang="scss">
	.xiaoxi_list {
		padding: 20upx 26upx;
		background-color: #f0f0f0;
		min-height: 100vh;

		.item_daohuo {
			padding-bottom: 30upx;

			.time {
				color: #666;
				text-align: center;
				padding-bottom: 20upx;
			}

			.box {
				background-color: #fff;
				padding: 20upx 26upx 40upx;
				border-radius: 20upx;
				color: #666;

				.c_title {
					font-size: 36upx;
					text-align: center;
					padding-bottom: 20upx;
				}

				.content_flex {
					display: flex;
					align-items: center;

					.c_img {
						width: 90upx;
						height: 90upx;
						flex-shrink: 0;
					}

					.content {
						padding: 0 30upx;
					}
				}

				.content {
					font-size: 30upx;
				}
			}
		}

		.item {
			padding-bottom: 30upx;

			.time {
				color: #666;
				text-align: center;
				padding-bottom: 20upx;
			}

			.box {
				background-color: #fff;
				padding: 20upx 26upx 40upx;
				border-radius: 20upx;
				color: #666;

				.c_title {
					font-size: 36upx;
					text-align: center;
					padding-bottom: 20upx;
				}

				.content {
					font-size: 30upx;
				}
			}
		}
	}
</style>
