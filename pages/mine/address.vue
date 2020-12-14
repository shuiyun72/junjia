<template>
	<view class="page">
		<uni-nav-bar color="#333333" background-color="#ffffff" 
		:status-bar="true" left-icon="arrowleft" :title="pageTitle" @clickLeft="back" />
		<view class="h20">
			
		</view>
		<view class="add_list_address" :class="{'active':index == dataSel}" v-for="(item,index) in dataList" @click="selAddress(item,index)">
			<view class="p_list">
				<view class="item_p">
					<view class="name">
						{{item.name}}
					</view>
					<view class="phone">
						{{item.phone}}
					</view>
				</view>
			</view>
			<view class="info">
				{{item.receive_address}}{{item.address}}
			</view>
			<view class="part2" v-if="pageTitle != '地址选择'">
				<view class="left">
					<view class="iconfont iconyduizhengqueshixin"></view>
					<view class="ccl">
						默认发货地址
					</view>
				</view>
				<view class="right">
					<view class="item2" @click.stop="editP(item)">	
							<text class="iconfont icontianxiegongdan-kuozhan-hebing"></text>
							<text>编辑</text>
					</view>
					<view class="item2" @click.stop="deleteP(item)">
						<text class="iconfont iconqingkongshanchu"></text>
						<text>删除</text>
					</view>
				</view>
				
			</view>
		</view>

			<view class="add_car_btn" @click="addAdd">
				<text class="iconfont icontianjia"></text>
				<text>新建地址</text>
			</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataSel:0,
				dataList: [],
				item:{},
				pageTitle:"地址管理",
				formC:""
			}
		},
		onShow() {
			this.addressInit();
		},
		onLoad(ph) {
			if(ph.title){
				this.pageTitle = ph.title
			}
		},
		// onBackPress() {
		// 	uni.switchTab({
		// 		url:"../mine/mine"
		// 	})  
		// 	return true; 
		// },
		methods: {
			addAdd(){
				if(this.pageTitle == "地址选择"){
					uni.navigateTo({
						url:"../mine/addAddress?fromTitle=地址选择"
					})
				}else{
					uni.navigateTo({
						url:"../mine/addAddress"
					})
				}
				
			},
			selAddress(item,index){
				this.dataSel = index;
				if(this.pageTitle == '地址选择'){
					console.log(item)
					this.$store.commit("setAddress",item)
					console.log(item,"ad")
					uni.navigateBack({
						delta:1
					})
				}
			},
			back(){
				if(this.pageTitle == "地址选择"){
					uni.navigateBack({
						delta:1
					})
				}else{
					uni.switchTab({
						url:"../mine/mine"
					}) 
				}
			},
			closeJuan(){
				// this.$refs['juan0'].close();
			},
			deleteBtn(){
				// this.$getApi("/api/user/address/del",{id:this.item.id},resl=>{
				// 	// this.$refs['juan0'].close();
				// 	this.addressInit()
				// })
			},
			addressInit(){
				this.$getApi("/App/User/getUserAddress",{},res=>{
					console.log(res)
					this.dataList = res.data;
					// uni.navigateTo({
					// 	url:'../mine/addAddress'
					// })
				});
			},
			editP(item){
				if(this.pageTitle == "地址选择"){
					uni.navigateTo({
						url:"../mine/addAddress?fromTitle=地址选择&edit=1&item="+JSON.stringify(item)
					})
				}else{
					uni.navigateTo({
						url:"../mine/addAddress?edit=1&item="+JSON.stringify(item)
					})
				}
			},
			deleteP(item){
				// this.$refs['juan0'].open();
				this.item = item;
				let this_ = this;
				uni.showModal({
					title: "删除",
					content: "是否确认删除?",
					confirmText: "确定",
					cancelText: "取消",
					success: function(res) {
						if (res.confirm) {
						this_.$getApi("/App/User/delUserAddress",{id:this_.item.id},resl=>{
							// this.$refs['juan0'].close();
							this_.addressInit()
							this_.$msg("删除成功")
						})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.juan_body {
		background-color: #fff;
		position: relative;
		padding: 26upx 36upx;
		width: 440upx;
		border-radius: 26upx;
	
		.iconguanbi {
			position: absolute;
			top: 20upx;
			right: 16upx;
			font-size: 26upx;
		}
	
		.ju_title {
			text-align: center;
			font-size: 36upx;
			margin-bottom: 30upx;
		}
	
		.t {
			text-align: center;
			font-size: 26upx;
			color: #666;
			line-height: 46upx;
			margin-bottom: 20upx;
		}
	
		.t_btn {
			display: flex;
	
			.btn {
				width: 40%;
			}
		}
	}
	.add_car_btn{
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: $uni-bl;
		width: 750upx;
		text-align: center;
		color: #fff;
		padding: 26upx 0;
		font-size: 36upx;
		.icontianjia{
			margin-right: 20upx;
		}
	}
	.page{
		background-color: #f0f0f0;
		min-height: 100vh;
	}
	.h20{
		height: 20upx;
		background-color: #f0f0f0;
	}
	.add_list_address {
		background-color: #fff;
		margin-bottom: 20upx;
		padding: 10upx 26upx;
		&.active{
			.part2{
				.iconyduizhengqueshixin{
					color: $uni-bl;
				}
			}
		}
		.part2{
			display: flex;		
			color: #999;
			padding: 14upx 0upx 16upx;
			margin-top: 10upx;
			border-top: 1upx solid #eee;
			display: flex;
			justify-content: space-between;
			.iconyduizhengqueshixin{
				font-size: 40upx;
				margin-right: 20upx;
				color: #999;
			}
			.left{
				display: inline-flex;
			}
			.right{
				display: inline-flex;
			}
			.item2{
				margin-left: 40upx;
				.iconfont{
					margin-right: 20upx;
				}
			}
		}
		.info{
			font-size: 28upx;
			color: #666;
			padding: 0upx 0upx 20upx;
		}
		.p_list {
			display: flex;
			flex-wrap: wrap;
			padding: 20upx 0upx;

			.item_p {
				margin-bottom: 6upx;
				display: flex;
				font-size: 32upx;
				color: #666;
				.phone{
					margin-left: 30upx;
				}
			}
		}
	}
</style>
