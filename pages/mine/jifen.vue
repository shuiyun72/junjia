<template>
	<view class="jifen">
		<view class="header_jifen">
			<image :src="userInfo.avatar" class="img" mode=""></image>
			<view class="name">
				{{userInfo.nickname}}
			</view>
			<view class="jif">
				<text>{{allJifen}}</text>积分
			</view>
		</view>
		<view class="jf_body">
			<view class="t_name">
				积分明细
			</view>
			<view class="j_item" v-for="item in jifenList">
				<view class="left">
					<view class="title_m">
						邀请好友
					</view>
					<view class="time">
						{{item.create_time}}
					</view>
				</view>
				<view class="right">
					{{item.money}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import _ from "../../until/lodash";
	export default {
		data() {
			return {
				jifenList:[]
			};
		},
		onShow() {
			this.$getApi('/App/User/getUserBalance',{},res=>{
				console.log(res.data,"我的积分")
				this.jifenList = res.data;
			})
		},
		computed:{
			...mapState(["httpp", "SystemInfo", "userInfo", "hasLogin"]),
			allJifen(){
				let allN = 0
				_.map(this.jifenList,item=>{
					allN+= Number(item.money)
				})
				return allN
			}
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
