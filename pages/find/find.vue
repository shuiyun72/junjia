<template>
	<view class="find">
		<sy-scroll-x class="p26">
			<view class="find_auto">
				<view class="find_nav_box" :class="{'active':index == itemIndex}" v-for="(item,index) in findList" @click="itemClick(item,index)">
					{{item.name}}
				</view>
			</view>
		</sy-scroll-x>
		<view class="pubuliu m26">
			<view class="left_box">
				<view class="item_pl_sy"  @click.stop="itemDetail(item)" v-for="(item,index) in arrtL">
					<view class="it_img">
						<image src="../../static/img/home/or.png" class="img" mode=""></image>
					</view>
					<view class="title">
						{{item.title}}
					</view>
					<view class="t2">
						{{item.difficulty}}
					</view>
				</view>
			</view>
			<view class="right_box">
				<view class="item_pl_sy"  @click.stop="itemDetail(item)" v-for="(item,index) in arrtR">
					<view class="it_img">
						<image src="../../static/img/home/or.png" class="img" mode=""></image>
					</view>
					<view class="title">
						{{item.title}}
					</view>
					<view class="t2">
						{{item.difficulty}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex";
	import _ from "../../until/lodash";
	export default {
		data() {
			return {
				itemIndex:0,
				findList:[{name:"全部",sel:0},{name:"轻视食谱",sel:1},{name:"轻视食1",sel:2},{name:"轻视食谱",sel:3},{name:"轻视食2",sel:4},{name:"轻视食谱",sel:5}],
				arrtL: [],
				arrtR: [],
				footPb: [{
					id: 1001,
					title: "1新品推荐新品",
					num: 0,
					price: 7.9,
					sel: 1
				}, {
					id: 1002,
					title: "2新品推荐新品推荐新品新品推荐新品",
					num: 0,
					price: 7.9,
					sel: 1
				}, {
					id: 1003,
					title: "2新品推荐新品推荐新品新品推荐新品",
					num: 0,
					price: 7.9,
					sel: 1
				}],
				
				
			};
		},
		onShow() {
			this.$getApi('/App/Circle/getCircleType',{},res=>{
				console.log(res)
				let allClass = [{name:"全部"}]
				this.findList = allClass.concat(res.data)
			})
			this.findSel();
			
		},
		beforeDestroy() {
			
		},
		computed:{
			...mapState(["httpp", "SystemInfo", "userInfo", "shopCar", "location"]),
		},
		methods:{
			...mapMutations(["jiaCar", "jianCar", "setLocation","setClassify"]),
			itemClick(item,index){
				this.itemIndex = index;
				this.findSel(item.id)
			},
			itemDetail(item){
				console.log(item)
				uni.navigateTo({
					url:'./findDetail?findId='+item.id
				})
			},
			findSel(id){
				id = id || "";
				this.$getApi('/App/Circle/circleRecord',{category_id:id},res=>{
					console.log(res)
					this.footPb = res.data;
					// let allClass = [{name:"全部"}]
					// this.findList = allClass.concat(res.data)
					this.footPbL()
				})
			},
			footPbL(type) {
				let arrtL = [];
				let arrtR = [];
				_.map(this.footPb, (item, index) => {
					console.log(item, index)
					if (index % 2 == 0) {
						arrtL.push(item)
					} else {
						arrtR.push(item)
					}
				})
				this.arrtL = arrtL;
				this.arrtR = arrtR;
				console.log(arrtL)
				console.log(arrtR)
			},
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.find_auto{
		display: flex;
		
		.find_nav_box{
			flex-shrink: 0;
			padding: 6upx 20upx 10upx;
			background-color: #f0f0f0;
			border-radius: 26upx;
			margin-right: 20upx;
			letter-spacing:4upx;
			&.active{
				background-color: $uni-bl-bg;
				color: $uni-bl;
			}
		}
		
	}
	.pubuliu {
		display: flex;
		justify-content: space-between;
		.item_pl_sy {
			background-color: #fff;
			padding: 10upx 20upx 20upx;
			margin-bottom: 20upx;
			width: 303upx;
			border-radius: 12upx;
		
			.it_img {
				text-align: center;
				position:relative;
				.it_img_case{
					position: absolute;
					top: 0;
					left: 0;
					z-index: 11;
					background-color: #0077AA;
					color: #fff;
					border-radius: 0 20upx 20upx 20upx ;
					padding: 0 16upx;
				}
				.img {
					width: 280upx;
					height: 280upx;
				}
			}
		
			.title {
				font-size: 32upx;
				padding: 10upx;
				color: #444;
			}
		
			.t2 {
				color: #999;
				padding-left: 10upx;
			}
		
			.ctrl {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
		
				.left {
					display: inline-flex;
					align-items: baseline;
		
					.m {
						font-size: 30upx;
						font-weight: bold;
					}
		
					.m2 {
						text-decoration: line-through;
						color: #999;
					}
				}
		
				.iconjia1 {
					font-size: 46upx;
					color: $uni-bl;
				}
			}
			
		}
	}
</style>