<template>
	<view class="fapiao">
		<view class="fp_item" v-for="(item,index) in fapiaoList" @click="selFP(item,index)">
			<view class="iconfont iconyduizhengqueshixin" :class="{'active':item.sel==1}"></view>
			<view class="right">
				<view class="code">
					订单编号 : {{item.order_num}}
				</view>
				<view class="">
					共{{item.num}}件 <text class="ttl">金额 : </text> {{item.credit}}元
				</view>
			</view>
		</view>
		<view class="bottom_content">
			<view class="shuoming">
				<view class="" @click="toNav('shuoming')">
					发票说明
				</view>
				<view class="iconfont iconshouye_shugang_shijiantixing">
					
				</view>
				<view class="" @click="toNav('lishi')">
					开票历史
				</view>
			</view>
			<view class="btn_box">
				<view class="lef">
					<view class="all_sel" @click="allSel">
						<view class="iconfont " :class="allSelClass?'iconyduizhengqueshixin':'iconyk_yuanquan'"></view>
						<view class="">
							全选
						</view>
					</view>
					<view class="money">
						<text class="text">合计 : </text>
						<text class="mmc">￥{{calcMoney}}</text>
					</view>
				</view>
				<view class="right_btn" @click="next">
					下一步
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
				fapiaoList:[]
			};
		},
		onShow() {
			this.$getApi("/App/Goods/invoiceOrders", {}, res => {
				console.log(res.data)
				let fapiaoList = [];
				if(res.data.length == 0){
					this.fapiaoList = [];
				}else{
					_.map(res.data,item=>{
						item.sel = 1
						fapiaoList.push(item)
					})
					this.fapiaoList = fapiaoList
				}
			});
		},
		computed:{
			allSelClass(){
				let noSel = _.filter(this.fapiaoList,item=>{
					return item.sel == 0
				})
				if(this.fapiaoList.length>0){
					return noSel.length == 0 ? true : false;
				}else{
					return false
				}
				
			},
			calcMoney(){
				let mnum = 0;
				_.map(this.fapiaoList,item=>{
					if(item.sel == 1){
						mnum += item.credit*100
					}
					
				})
				return mnum/100
			}
		},
		methods:{
			toNav(el){
				if(el == "shuoming"){
					uni.navigateTo({
						url:"./fapiaoShuoming"
					})
				}else
				if(el == "lishi"){
					uni.navigateTo({
						url:"./fapiaoLishi"
					})
				}
			},
			selFP(item,index){
				if(this.fapiaoList[index].sel == 1){
					this.fapiaoList[index].sel = 0
				}else{
					this.fapiaoList[index].sel = 1
				}
			},
			allSel(){
				let noSel = _.filter(this.fapiaoList,item=>{
					return item.sel == 1
				})
				if(noSel.length == this.fapiaoList.length){
					if(noSel.length == 0){
						_.map(this.fapiaoList,(item,index)=>{
							this.$set(this.fapiaoList[index],"sel",1)
						})
					}else{
						_.map(this.fapiaoList,(item,index)=>{
							this.$set(this.fapiaoList[index],"sel",0)
						})
					}
				}else{
					_.map(this.fapiaoList,(item,index)=>{
						this.$set(this.fapiaoList[index],"sel",1)
					})
				}
			},
			next(){
				let canSel = _.filter(this.fapiaoList,item=>{
					return item.sel == 1
				})
				if(canSel.length>0){
					let addFapiao = []
					_.map(this.fapiaoList,item=>{
						if(item.sel == 1){
							addFapiao.push(item.id)
						}
					})
					uni.navigateTo({
						url:'./fapiaoAdd?orderStr='+addFapiao.toString()+"&allMoney="+this.calcMoney
					})
				}else{
					this.$msg("您没有选择开票内容")
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.fapiao{
	background-color: #f0f0f0;
	padding: 20upx 26upx;
	min-height: 100vh;
	.bottom_content{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 750upx;
		box-sizing: border-box;
		.shuoming{
			display: flex;
			padding-bottom: 36upx;
			justify-content: center;
			color: #666;
			font-size: 36upx;
			align-items: center;
			.iconshouye_shugang_shijiantixing{
				margin: 0 10upx;
				position:relative;
				top: 4upx;
			}
		}
		.btn_box{
			display: flex;
			background-color: #fff;
			justify-content: space-between;
			height: 96upx;
			.lef{
				display: inline-flex;
				flex:1;
				justify-content: space-between;
				line-height: 96upx;
				.all_sel{
					display: inline-flex;
					align-items: center;
					color: #666;
					font-size: 32upx;
					.iconfont{
						padding: 0 10upx;
						font-size: 38upx;
						color: #999;
						&.iconyduizhengqueshixin{
							color: $uni-bl;
						}
					}
				}
				.money{
					padding-right: 40upx;
					font-size: 28upx;
					.tetx{
						color: #666;
					}
					.mmc{
						font-weight: bold;
					}
				}
			}
			.right_btn{
				background-color: $uni-bl;
				color: #fff;
				line-height: 96upx;
				
				width: 280upx;
				text-align: center;
				font-size: 32upx;
			}
		}
	}
	.fp_item{
		background-color: #fff;
		margin-bottom: 20upx;
		padding: 20upx;
		border-radius: 20upx;
		display: flex;
		align-items: center;
		.iconyduizhengqueshixin{
			color: #f0f0f0;
			margin-right: 30upx;
			&.active{
				color: $uni-bl;
			}
		}
		.right{
			color: #666;
			.code{
				font-size: 32upx;
				margin-bottom: 10upx;
			}
			.ttl{
				font-size: 28upx;
				margin: 0 20upx 0 40upx;
			}
		}
	}
}
</style>
