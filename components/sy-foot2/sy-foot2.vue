<template>
	<view class="shop_item_sy" @click.stop="itemClick">
		<view class="left_img" :class="{'n_c':isPaihang}">
			<image :src="item.thumb" class="img" mode=""></image>
			<view class="c1" v-if="item.state2 == 1 && !isPaihang">
				折扣
			</view>
			<view class="c2" v-if="item.state2 == 2 && !isPaihang">
				特价
			</view>
			<view class="c2" v-if="item.state2 == 3 && !isPaihang">
				精选
			</view>
			<view class="c2 img_t2" v-if="isPaihang && itemIndex<3">
				<view class="iconfont iconjiangbei" :class="'nth'+itemIndex">
					
				</view>
				<view class="c_num">
					{{itemIndex+1}}
				</view>
			</view>
			<view class="c2 img_t3" v-if="isPaihang && itemIndex >= 3">
				
				<view class="round"></view>
				<view class="c_num">
					{{itemIndex+1}}
				</view>
			</view>
		</view>
		<view class="right_info">
			<view class="">
				<view class="title">
					{{item.name}}
				</view>
				<view class="js">
					{{item.introduction}}
				</view>
				<view class="case zhekou" v-if="item.sale_rate">
					{{item.sale_rate}} 折
				</view>
				<view class="case jian" v-if="item.jian">
					已减 {{item.jian}} 元
				</view>
				<view class="yu" v-if="item.zong">
					<view class="jindutiao">
						<view class="jindu_bg" :style="'width:'+(item.chu/item.zong)*100+'%'">	
						</view>
						<view class="jindu_text">
							剩余{{clacJD(item.chu,item.zong)}}%
						</view>
						
					</view>
				</view>
			</view>

			<view class="ctrl">
				<view class="money">
					<text class="c1" v-if="item.group_buy == '1'">团购价</text>
					<text class="c1">￥</text>
					<text class='c2'>{{item.price}}</text>
					<text class='c3'>￥{{item.old_price}}</text>
				</view>
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemL: this.item
			};
		},
		props: ["item","isPaihang","itemIndex"],
		methods: {
			itemJian() {
				this.$emit('clickJian', this.item)
			},
			itemJia() {
				this.$emit('clickJia', this.item)
			},
			itemClick() {
				this.$emit('click', this.item)
			},
			clacJD(now,all){
				return (all-now)/all *100;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shop_item_sy {
		display: flex;
		padding: 14upx 0;

		&+.shop_item_sy {
			border-top: 1upx solid #f0f0f0;
		}

		.left_img {
			.img {
				width: 160upx;
				height: 160upx;
				padding: 10upx 0;
			}

			position:relative;
			
			.c1,
			.c2 {
				font-size: 26upx;

				display: inline-block;
				position: absolute;
				top: -10upx;
				left: -20upx;
				border-radius: 20upx;
				padding: 0 20upx 10upx;
				color: #fff;
				transform: scale(.7);
				&.img_t3{
					transform: scale(.8);
					border-radius: 50%;
					width: 50upx;
					height: 50upx;
					box-sizing: border-box;
					line-height: 50upx;
					padding: 0;
					text-align: center;
					left: 0;
					font-size: 32upx;
				}
				&.img_t2{
					background-color: transparent;
					transform: scale(.8);
					.iconjiangbei{
						font-size: 60upx;
						&.nth0{
							color: #FA6A8B;
						}
						&.nth1{
							color: $uni-ye;
						}
						&.nth2{
							color: $uni-ye;
						}
					}
					.c_num{
						position: absolute;
						top: 4upx;
						width: 50upx;
						left: 50%;
						margin-left: -25upx;
						text-align: center;
						font-size: 32upx;
					}
					.round{
						width: 60upx;
						height: 60upx;
						border-radius: 50%;
						background-color: $uni-ye;
					}
				}
			}

			.c1 {
				background-color: $uni-bl;
			}

			.c2 {
				background-color: $uni-or;
			}
		}

		.right_info {
			padding-left: 20upx;
			display: inline-flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;

			.title {
				font-size: 30upx;
				font-weight: bold;
				color: #333;
			}

			.js {
				color: #999;
				margin-bottom: 6upx;
			}
			.case{
				padding: 6upx 20upx 12upx;
				text-align: center;
				border-radius: 30upx;
				transform: scale(.8);
				position: relative;
				display: inline-flex;
				&.zhekou {
					background-color:$uni-bl-bg;
					color: $uni-bl;
					left: -12upx;
				}
				&.jian{
					background-color: $uni-red-bg;
					color: $uni-red;
					left: -12upx;
				}
			}
			.jindutiao{
				position: relative;
				width: 202upx;
				border: 1upx solid $uni-red;
				text-align: center;
				border-radius: 20upx;
				height: 38upx;
				transform: scale(.8);
				left: -12upx;
				.jindu_bg{
					position: absolute;
					top: 1upx;
					left: 1upx;
					background-color: $uni-red-bg;
					height: 36upx;
					border-radius: 20upx;
				}
				.jindu_text{
					position: absolute;
					top: 1upx;
					left: 1upx;
					width: 200upx;
					height: 36upx;
					line-height: 38upx;
					border-radius: 20upx;
					color: $uni-red;
				}
			}
			.ctrl {
				display: inline-flex;
				justify-content: space-between;
				align-items: baseline;

				.money {
					.c1 {
						color: $uni-red;
					}

					.c2 {
						color: $uni-red;
						font-size: 30upx;
						font-weight: bold;
					}

					.c3 {
						text-decoration: line-through;
						margin-left: 26upx;
						color: #999;
					}
				}

				.iconjia1 {
					font-size: 46upx;
				}
			}
		}
	}
</style>
