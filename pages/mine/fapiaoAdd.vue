<template>
	<view class="return_msg">
		<view class="re_title">普通发票</view>
		<uni-list>
			<sy-list-item title="发票抬头"  :showArrow="false">
				<template v-slot:right="">
					<input type="text" v-model="taitou" placeholder="营业执照上的法定名称" class="addr_input" />
				</template>
			</sy-list-item>
			<sy-list-item title="税号"  :showArrow="false">
				<template v-slot:right="">
					<input type="text" v-model="shuihao" placeholder="纳税人识别号" class="addr_input" />
				</template>
			</sy-list-item>
		</uni-list>
		<view class="re_title">收件人邮箱<text class="sm">电子发票会发送到您的邮箱中</text></view>
		<uni-list>
			<sy-list-item title="邮箱"  :showArrow="false">
				<template v-slot:right="">
					<input type="text" v-model="youxiang" placeholder="请填写邮箱" class="addr_input" />
				</template>
			</sy-list-item>
		</uni-list>
		<view class="bh160"></view>
		<view class="bg_btn_sub_sy"><view class="btn" @click="nativeTo">提交</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			taitou: '',
			shuihao: '',
			youxiang:"",
			orderStr:"",
			allMoney:""
		};
	},
	onLoad(ph) {
		if(ph.orderStr && ph.allMoney){
			this.orderStr = ph.orderStr;
			this.allMoney = ph.allMoney;
		}
	},
	methods: {
		nativeTo() {
			uni.navigateTo({
				url: '../home/msg?title=提交成功&msgShow=发票'
			});
			let data = {
				order_str:this.orderStr,
				invoice_name: this.taitou,
				invoice_num:this.shuihao,
				credit:this.allMoney,
				email:this.youxiang
			}
			this.$getApi('/App/Goods/addInvoice',data,res=>{
				console.log(res)
				uni.navigateTo({
					url: '../home/msg?title=提交成功&msgShow=发票'
				});
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.return_msg {
	background-color: #f0f0f0;
	height: 100vh;
	.addr_input {
		font-size: 28upx;
		width: 90%;
		text-align: right;
	}
	.bh160{
		height: 160upx;
	}
	.bg_btn_sub_sy {
		padding: 0 26upx;
		.btn {
			background-color: $uni-bl;
			color: #fff;
			padding: 32upx;
			text-align: center;
			border-radius: 60upx;
		}
	}
	.re_title {
		padding: 26upx;
		font-size: 32upx;
		color: #666;
		.sm{
			font-size: 26upx;
			color: #999;
			margin-left: 20upx;
		}
	}
	.textarea_l {
		background-color: #fff;
		font-size: 28upx;
		padding: 26upx;
		width: 100%;
		box-sizing: border-box;
		&.t1 {
			height: 150upx;
		}
		&.t2 {
			height: 90upx;
		}
	}
	.msg_btn {
		padding: 0 60upx;
	}
}
</style>
