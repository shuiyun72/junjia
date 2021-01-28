<template>
	<view>
		<uni-list>
			<uni-list-item title="提现金额" :showArrow="false">
				<template v-slot:right="">
					<input type="text" v-model="money" placeholder="请填写提现金额" class="add_car_input" />
				</template>
			</uni-list-item>
			<view class="bg10_f"></view>
			<uni-list-item title="提现至" :showArrow="false">
				<template v-slot:right="">
					<radio-group @change="radioChange" class="group_box">
						<label class="group_item" v-for="(item, index) in items" :key="index">
							<view class="vis">
								<radio :value="item.value" :checked="index === current" class="radio"/>
								<image :src="'../../static/img/'+item.img" mode="widthFix" class="w_img"></image>
								{{item.name}}
							</view>
						</label>
					</radio-group>

				</template>
			</uni-list-item>
			<uni-list-item title="姓名" :showArrow="false">
				<template v-slot:right="">
					<input type="text" v-model="name" placeholder="请填写您的真实姓名" class="add_car_input" />
				</template>
			</uni-list-item>
			<uni-list-item title="账号" :showArrow="false">
				<template v-slot:right="">
					<input type="text" v-model="account" :placeholder="'请填写'+items[current].name+'账号'" class="add_car_input" />
				</template>
			</uni-list-item>
		</uni-list>
		<view class="tixian_info">
			<view class="p1">
				提现说明
			</view>
			<view class="p2">
				1-7个工作日内提现到账,提现金额必须500元起,申请通过后将转入您的账户。
			</view>
			<view class="p1">
				注意事项
			</view>
			<view class="p2">
				由于转账信息过多,转账时间会有所延迟,请填写好您的信息,以便于我们及时转账,如有疑问可致电咨询400-000000
			</view>
		</view>
		<view class="sub_btn">
			<button class="btn blue round" @click="next">提 交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: "",
				name: "",
				items: [{
						value: 'YHK',
						name: '银行卡',
						img:"yinhk.png"
					},
					{
							value: 'WX',
							name: '微信',
							img:"weix.png"
						},
					{
						value: 'ZFB',
						name: '支付宝',
						img:"zhifb.png",
						checked: 'true'
					}
				],
				current:2,
				account:""
			};
		},
		methods: {
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			next(){
				let dataL = {
					type:this.current+1,
					money:this.money,
					account_name:this.name,
					account_no:this.account
					
				}
				console.log(dataL)
				let this_ = this;
				this.$getApi("/App/User/doWithdraw",dataL,res=>{
					console.log(res)
					uni.navigateTo({
						url:'../home/msg?pageTitle=提现申请成功'
					})
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg10_f {
		background-color: #f0f0f0;
		height: 20upx;
	}
	.tixian_info{
		padding: 0 26upx;
		background-color: #f0f0f0;
		font-size: 28upx;
		color: #666;
		.p1{
			padding: 30upx 0 10upx;
		}
		.p2{
			line-height: 40upx;
		}
	}
	.add_car_input {
		font-size: 26upx;
		text-align: right;
		color: #666;
	}
	.group_box{
		display: flex;
		.vis{
			display: inline-flex;
			align-items: center;
			.radio{
				transform: scale(.5);
				margin-left: 10upx;
			}
			.w_img{
				width: 36upx;
				margin-right: 10upx;
			}
		}
		
	}
	.sub_btn{
		padding:260upx 40upx 520upx;
		background-color: #f0f0f0;
		.btn{
			padding: 26upx 0;
		}
	}
</style>
