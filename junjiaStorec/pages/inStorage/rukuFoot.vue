<template>
	<view class="ruku_foot">
		<view class="foot_detail">
			<image :src="footDetail.thumb" class="foot_img" mode=""></image>
			<view class="right">
				<view class="t1">
					<view class="name">
						商品货号 :
					</view>
					<view class="text">
						{{footDetail.mark}}
					</view>
				</view>
				<view class="t1">
					<view class="name">
						商品名称 :
					</view>
					<view class="text">
						{{footDetail.name}}
					</view>
				</view>
				<view class="t1">
					<view class="name">
						商品规格 :
					</view>
					<view class="text">
						{{footDetail.specifications}}
					</view>
				</view>
				<view class="t1">
					<view class="name">
						商品产地 :
					</view>
					<view class="text">
						{{footDetail.goods_origin}}
					</view>
				</view>
				<view class="t1">
					<view class="name">
						供应商名称 :
					</view>
					<view class="text">
						{{footDetail.supplier}}
					</view>
				</view>
			</view>
		</view>
		<view class="ctrl">
			<view class="title">
				入库操作
			</view>
			<input type="number" placeholder="请输入商品数量" v-model="num" class="f_input"/>
		</view>
		<view class="sub_top">
			<button class="btn  ms round" @click="rukuTrue">确认入库</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num:"",
				footDetail:{}
			};
		},
		onLoad(ph) {
			this.$getApi('/App/Goods/scanBarcode',{code:ph.code},res=>{
				console.log(res,JSON.stringify(res.data),"条码")	
				this.footDetail = res.data;
			})
		},
		methods:{
			rukuTrue(){
				let contentText = "商品货号:"+this.footDetail.mark+"\r\n商品名称:"+this.footDetail.name+"\r\n商品规格:"+this.footDetail.specifications+"\r\n商品数量:"+this.num;
				let this_ = this;
				if(this.num < 1){
					this.$msg("请输入入库数量")
					return false;
				}
				uni.showModal({
				    title: '确认入库',
				    content: contentText,
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							this_.$getApi('/App/Goods/inputStock',{num:this_.num,goods_id:this_.footDetail.id},res=>{
								console.log(res)	
								uni.reLaunch({
									url:"./kuMsg"
								})
							})
							
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>
<style>
page{
	background-color: #f0f0f0;
}
</style>
<style lang="scss" scoped>
.ruku_foot{
	padding: 20upx 26upx;
	color: #666;
	font-size: 30upx;
	.sub_top {
		margin-top: 80upx;
		padding: 0 30upx;
		.btn{
			background-color: $uni-bl;
			color: #fff;
		}
	}
	.foot_detail{
		display: flex;
		background-color: #fff;
		align-items: center;
		padding: 20upx 0;
		border-radius: 20upx;
		margin-bottom: 20upx;
		.foot_img{
			width: 200upx;
			height: 200upx;
			flex-shrink: 0;
		}
		.right{
			margin-left: 30upx;
			.t1{
				display: flex;
				.name{
					width: 180upx;
					flex-shrink: 0;
				}
			}
		}
	}
	.ctrl{
		padding: 20upx 26upx 100upx;
		background-color: #fff;
		.title{
			font-size: 32upx;
			margin-bottom: 60upx;
		}
		.f_input{
			background-color: #f0f0f0;
			padding: 20upx;
		}
	}
}
</style>
