<template>
	<view class="find_detail">
		<image :src="catryItem.pic" class="f_d_img" mode=""></image>
		<view class="caipu_info">
			<view class="pt1">
				<view class="title">
					{{catryItem.title}}
				</view>
				<view class="blue">
					{{catryItem.difficulty}}
				</view>
			</view>
			<view class="pt2">
				来源 : {{catryItem.source}}
			</view>
			<view class="pt3">
				{{catryItem.content}}
			</view>
		</view>
		<view class="h20"></view>
		<view class="title_bc">
			相关商品
		</view>
		<view class="caipu_foot">
			<view class="shop_case_box">
				<view class="shop_auto">
					<sy-foot1 :isTuan='true' @click="part1Num" :item="item" v-for="i in 6"></sy-foot1>
				</view>
			</view>
		</view>
		<view class="h20"></view>
		<view class="title_bc">
			相关食材
		</view>
		<uni-list>
			<uni-list-item title="大米" note="" rightText="100克" :showArrow="false"></uni-list-item>
			<uni-list-item title="皮蛋" note="" rightText="2个,切块" :showArrow="false"></uni-list-item>
			<uni-list-item title="瘦肉" note="" rightText="50克,切油条" :showArrow="false"></uni-list-item>
			<uni-list-item title="盐" note="" rightText="3克" :showArrow="false"></uni-list-item>
		</uni-list>
		<view class="h20"></view>
		<view class="title_bc">
			相关美食
		</view>
		<view class="concat_meishi">
			<view class="shop_case_box">
				<view class="shop_auto">
					<view class="item" v-for="item in 4">
						<image src="../../static/img/meis1.png" class="meishi_img" mode=""></image>
						<view class="f_t1">
							快手麦烧
						</view>
						<view class="f_t2">
							速度快,20分钟
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="h20"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {
					t1: "绿地枸杞9900从萨达",
					img: "or.png",
					m1: "12.8",
					m2: "16.8",
					id: "2"
				},
				catryItem:{}
			};
		},
		onLoad(ph) {

			this.$getApi('/App/Circle/circleRecordDetail', {
				id: ph.findId
			}, res => {
				console.log(res)
				this.catryItem = res.data;
				// let allClass = [{name:"全部"}]
				// this.findList = allClass.concat(res.data)
				// this.footPbL()
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.find_detail {
		.f_d_img {
			width: 750upx;
			height: 450upx;
		}

		.shop_case_box {
			.shop_auto {
				background-color: #fff;
				border-radius: 22upx;
				padding: 26upx;
				box-sizing: border-box;
				display: flex;
				overflow-x: auto;
			}
		}
		.caipu_info{
			padding: 20upx 26upx;
			.pt1{
				font-size: 34upx;
				color: #333;
				display: flex;
				justify-content: space-between;
				align-items: baseline;
				.blue{
					font-size: 30upx;
				}
			}
			.pt2{
				color: #999;
				padding: 10upx 0 26upx;
				font-size: 28upx;
			}
			.pt3{
				color: #999;
				font-size: 28upx;
				line-height: 38upx;
			}
		}
		.title_bc{
			padding: 20upx 26upx;
			font-size: 34upx;
			color: #333;
		}
		.concat_meishi{
			.item{
				width: 220upx;
				margin-right: 24upx;
				.meishi_img{
					width: 220upx;
					height: 250upx;
				}
				.f_t1{
					padding: 10upx 0;
					color: #333;
					font-size: 32upx;
				}
				.f_t2{
					color: #999;
				}
			}
		}
	}
</style>
