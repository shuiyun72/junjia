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
					<sy-foot1 :isTuan='true' :isAdd='true' @click="part1Num" :item="item" v-for="item in catryItem.goods_list"></sy-foot1>
				</view>
			</view>
		</view>
		<view class="h20"></view>
		<view class="title_bc">
			相关食材
		</view>
		
		<!-- <uni-list>
			<uni-list-item title="大米"  rightText="100克" :showArrow="false"></uni-list-item>
			<uni-list-item title="皮蛋"  rightText="2个,切块" :showArrow="false"></uni-list-item>
			<uni-list-item title="瘦肉"  rightText="50克,切油条" :showArrow="false"></uni-list-item>
			<uni-list-item title="盐"  rightText="3克" :showArrow="false"></uni-list-item>
		</uni-list> -->
		<view class="v_content_cc" v-html="itemDetailContent">
			
		</view>
		<view class="h20"></view>
		<view class="title_bc">
			相关美食
		</view>
		<view class="concat_meishi">
			<view class="shop_case_box">
				<view class="shop_auto">
					<view class="item" v-for="item in footPb" @click="changeCaipu(item)">
						<image :src="item.pic" class="meishi_img" mode=""></image>
						<view class="f_t1">
							{{item.title}}
						</view>
						<view class="f_t2">
							{{item.difficulty}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="h20"></view>
	</view>
</template>

<script>
	import _ from "../../until/lodash";
	export default {
		data() {
			return {
				catryItem:{},
				footPb:[],
				phId:""
			};
		},
		computed:{
			itemDetailContent(){
				if(this.catryItem.info){
				return this.catryItem.info.replace(/<img/g,`<img style='vertical-align: top; width: 100%;' `)
				}else{
					return ""
				}
			}
		},
		onLoad(ph) {
			this.phId = ph.findId;
			this.initCaipu(ph.findId)
		},
		methods: {
			part1Num(item){
				console.log(item)
				uni.navigateTo({
					url:"../detail/detail?id="+item.id
				})
			},
			initCaipu(idLL){
				let this_ = this;  
				this.$getApi('/App/Circle/circleRecordDetail', {
					id: idLL
				}, res => {
					console.log(res)
					this.catryItem = res.data;
					// let allClass = [{name:"全部"}]
					// this.findList = allClass.concat(res.data)
					// this.footPbL()
				})
				this.$getApi('/App/Circle/circleRecord',{category_id:""},res=>{
					let resData =  _.remove(res.data,item=>{
						return item.id == idLL
					})
					this.footPb = res.data.slice(0,3);
					console.log(this.footPb)
				
				})
			},
			changeCaipu(item){
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
				this.initCaipu(item.id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.v_content_cc{
		padding: 0upx 26upx 20upx;
	}
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
