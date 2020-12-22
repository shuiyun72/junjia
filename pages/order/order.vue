<template>
	<view class="order">
		<uni-nav-bar color="#333333" background-color="#ffffff" :status-bar="true"  :title="barTitle" left-icon="arrowleft"
		 @clickLeft="back" />
		<view class="tab_list_sy">
			<view class="item" v-for="(item,index) in tabList" :class="{'active':index == tabSel}" @click="selectTab(item,index)">{{item.text}}</view>
		</view>
		<view class="order_list">
			<view class="order_box" v-for="parent in orderList" @click="toDetail(parent)">
				<view class="title_c">
					<view class="left" :class="parent.status == -1 ?'or':parent.status == 1?'blue':parent.status == 2 ?'blue2':''">
						{{orderText(parent.status)}}
					</view>
					<view class="right">
						{{orderItem.receive_time}}
					</view>
				</view>
				<view class="o_item" v-for="item in parent.goods_list">
					<view class="left">
						<image :src="item.goods_thumb" class="img_c" mode=""></image>
						<view class="title shengluehao">
							{{item.goods_name}}
						</view>
					</view>
					<view class="right">
						x{{item.num}}
					</view>
				</view>
				<view class="last_money">
					<view class="left">
						
					</view>
					<view class="right">
						<view class="sm">
							共{{parent.goods_list.length}}件 实付 :
						</view>
						<view class="money">
							<text class="red">{{parent.credit}}</text> 元
						</view>
					</view>
				</view>
				<view class="btn_box" v-if="parent.status == -1">
					<view class="btn blue sm round" @click.stop="toNav('quzhifu',parent)">
						去支付
					</view>
				</view>
				<!-- 备货中 -->
				<view class="btn_box" v-if="parent.status == 2">
					<view class="btn blue sm round"  @click.stop="toNav('zailaiyidan',parent)">
						再来一单
					</view>
				</view>
				<!-- 配送中 -->
				<view class="btn_box" v-if="parent.status == 3 || parent.status == 4" >
					<view class="btn blue sm round" @click.stop="toNav('zailaiyidan',parent)">
						再来一单
					</view>
				</view>
				
				<view class="btn_box" v-if="parent.status == 5" >
					<view class="btn blue sm round" @click.stop="toNav('shouhuo',parent)">
						确认收货
					</view>
				</view>
				<!-- 待评价 -->
				<view class="btn_box" v-if="parent.status == 6"  >
					<view class="btn blue_n sm round" @click.stop="toNav('zailaiyidan',parent)">
						再来一单
					</view>
					<view class="btn blue sm round" @click.stop="toNav('pingjia',parent)">
						去评价
					</view>
				</view>
				<view class="btn_box" v-if="parent.status == 7"  >
					<view class="btn blue sm round" @click.stop="toNav('zailaiyidan',parent)">
						再来一单
					</view>
				</view>
				<view class="btn_box" v-if="parent.status == 8">
					<view class="btn blue sm round">
						再来一单
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import _ from "../../until/lodash";
	export default {
		data() {
			return {
				barTitle:"订单",
				orderList:[],
				tabSel: 1,
				tabList: [{
						text: "全部",
						type: 0
					}, {
						text: "待付款",
						type: 1
					}, {
						text: "待收货",
						type: 2
					},
					{
						text: "待评价",
						type: 3
					}
				],
				page:1
			};
		},
		onLoad(ph) {
			this.tabSel = ph.ins;
			console.log(ph.ins)
			this.getOrederList(this.tabSel)
		},
		async onReachBottom() {
			console.log("onReachBottom");
			this.page++;
			this.getOrederList(this.tabSel,"more")
		},
		onPullDownRefresh() {
			let this_ = this;
			this.getOrederList(this.tabSel)
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			setTimeout(function() {
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		onShow() {
			this.getOrederList(this.tabSel)
			this.page = 1;
		},
		methods: {
			back(){
				uni.switchTab({
					url:"../home/home"
				})
			},
			orderText(num){
				if(num == -1){
					return "等待支付"
				}
				if(num == 1 || num == 2){
					return "备货中"
				}
				if(num == 3 || num == 4){
					return "运送中"
				}
				if(num == 5){
					return "已送达"
				}
				if(num == 6){
					return "待评价"
				}
				if(num == 7 || num == 8){
					return "已完成"
				}
			},
			getOrederList(fromNum,more){
				let getState  = ""
				if(fromNum == 0){
					getState = ""
				}
				if(fromNum == 1){
					getState = -1
				}
				if(fromNum == 2){
					getState = 9
				}
				if(fromNum == 3){
					getState = 6
				}
				this.$getApi("/App/User/userOrder", {status:getState,page:this.page}, res => {
					console.log(res.data,"ccccc3161")
					if(more == "more"){
						this.orderList  = this.orderList.concat(res.data) 
					}else{
						this.orderList  = res.data;
						this.page = 1
					}
					
				})
			},
			toNav(el,parentOrder){
				console.log(parentOrder)
				if(el == 'quzhifu'){
					uni.navigateTo({
						url:'./orderPay?orderId='+parentOrder.id
					})
				}
				if(el == 'pingjia'){
					uni.navigateTo({
						url:'./appraise?orderItem='+JSON.stringify(parentOrder)
					})
				}
				if(el == 'zailaiyidan'){
					uni.navigateTo({
						url:'./orderTrue?orderId='+parentOrder.id
					})
				}
				if(el == 'shouhuo'){
					this.$getApi("/App/Goods/confirmOrder", {id:parentOrder.id}, res => {
						console.log(res.data,"ccccc3161")
						this.tabSel = 3;
						this.getOrederList(3)
					})
				}
			
				
			},
			toDetail(items){
				console.log(items)
				uni.navigateTo({
					url:"./orderDetail?orderId="+items.id
				})
			},
			selectTab(el, i) {
				this.tabSel = i;
				this.getOrederList(i)
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f0f0f0;
	}
	.order_list{
		padding: 0upx 26upx 20upx;
		.order_box{
			background-color: #fff;
			padding: 20upx;
			border-radius: 16upx;
			margin-bottom: 20upx;
			.title_c{
				display: flex;
				justify-content: space-between;
				align-items: baseline;
				.left{
					font-weight: bold;
					font-size: 32upx;
					color: #666;
					&.or{
						color: $uni-or;
					}
					&.blue2{
						color: #72C9CB;
					}
				}
				.right{
					color: #999;
					font-size: 28upx;
				}
			}
			.o_item{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 16upx 0;
				.left{
					display: inline-flex;
					align-items: center;
					.img_c{
						width: 80upx;
						height: 80upx;
					}
					.title{
						margin-left: 20upx;
						width: 520upx;
						color: #333;
					}
				}
			}
			.last_money{
				display: flex;
				justify-content: space-between;
				.left{
					color: #999;
				}
				.right{
					display: inline-flex;
					.sm{
						color: #999;
						transform: scale(.8);
						position: relative;
						top:4upx;
					}
				}
			}
			.btn_box{
				display: flex;
				justify-content: flex-end;
				padding: 20upx 0 0;
				.btn{
					padding: 10upx 0;
					width: 160upx;
					text-align: center;
					margin-left: 20upx;
					
				}
			}
		}
	}
	.tab_list_sy {
		display: flex;
		font-size: 32upx;
		justify-content: space-around;
		background-color: #fff;
		margin-bottom: 26upx;
		border-top: 2upx solid #eee;
		color: #999;
		.item {
			border-bottom: 6upx solid transparent;
			padding: 20upx 0 16upx;

			&.active {
				color: $uni-bl;
				border-bottom: 6upx solid $uni-bl;
			}
		}
	}
</style>
