<template>
	<view class="jifen">
		<view class="header_jifen">
			<image src="../../static/img/toux.png" class="img" mode=""></image>
			<view class="name">
				俏皮女王
			</view>
			<view class="jif">
				<text>520</text>积分
			</view>
		</view>
		<view class="jf_body">
			<view class="t_name">
				积分明细
			</view>
			<view class="j_item" v-for="item in itemList">
				<view class="left">
					<view class="title_m">
						{{item.title}}
					</view>
					<view class="time">
						{{item.time}}
					</view>
				</view>
				<view class="right">
					{{item.num}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList:[
					{
						title:"邀请好友",
						num:"+10",
						time:"2020-10-21 08:08"
					},
					{
						title:"邀请好友",
						num:"+10",
						time:"2020-10-21 08:08"
					},
					{
						title:"邀请好友",
						num:"+10",
						time:"2020-10-21 08:08"
					},
					{
						title:"邀请好友",
						num:"+10",
						time:"2020-10-21 08:08"
					},
					{
						title:"邀请好友",
						num:"+10",
						time:"2020-10-21 08:08"
					}
				]
			};
		}
	}
</script>

<style lang="scss" scoped>
	.jifen {
		color: #333;
		.header_jifen {
			width: 750upx;
			height: 330upx;
			background-color: $uni-bl;
			text-align: center;
			color: #fff;
			box-sizing: border-box;
			padding-top: 40upx;

			.img {
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
			}

			.name {
				font-size: 36upx;
				padding: 10upx 0;
			}

			.jif {
				font-size: 30upx;
				color: #f0f0f0;
			}

		}
		.jf_body{
			.t_name{
				border-bottom: 1upx solid #f0f0f0;
				font-size: 38upx;
				padding: 26upx 26upx 20upx;
				font-weight: bold;
				color: #666;
			}
			.j_item{
				margin: 0 26upx;
				display: flex;
				justify-content: space-between;
				border-bottom: 1upx solid #f0f0f0;
				padding: 20upx 0;
				align-items: center;
				.left{
				.title_m{
					font-size: 34upx;
					margin-bottom: 6upx;
				}
				.time{
					color: #999;
				}
				}
				.right{
					font-size: 34upx;
					color: #666;
				}
			}
		}
	}
</style>
