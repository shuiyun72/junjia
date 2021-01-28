<template>
	<view class="have_detail">
		<view class="have_detail_body">
			<view class="money_card">
				<view class="header_have">
					<view class="m_title_l">账户余额 (元)</view>
					<view class="cp2">
						<view class="money">{{yuMoney}}</view>
						<view class="text_btn" @click="addMoney">提现</view>
					</view>
				</view>
			</view>

			<view class="c_pa2">
				<view class="tab_list_sy">
					<view class="item" v-for="(item, index) in tabList" :class="{ active: index == tabSel }" @click="selectTab(item, index)">{{ item.text }}</view>
				</view>
				<view class="people">
					<view class="sel_month" v-if="tabSel == 0">

						<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
							<view class="peisong_timje">{{timeText}}<text class="iconfont iconai-arrow-down"></text></view>
						</picker>

						<view class="">
							+{{mounthMoney}}元
						</view>
					</view>
					<view class="item" v-for="item in moneyList" @click="showDetail(item)">
						<view class="l">
							<view class="phone">
								<view class="p" v-if="tabSel == '0'">配送收益</view>
								<view class="p" v-if="tabSel == '1'">{{calcTixian(item.type)}}</view>	
								<view class="time" v-if="tabSel == '0'">订单编号:{{item.order_num}}</view>
								<view class="time" v-if="tabSel == '1'">{{getDateTime(item.create_time)}}</view>
							</view>
						</view>
						<view class="l" v-if="tabSel == '0'">
							<view class="phone">
								<view class="name" >
									+{{item.money}}元
								</view>
								<view class="time">{{getDateTime(item.create_time)}}</view>
							</view>
						</view>
						
						<view class="name" v-if="tabSel == '1'">-{{item.money}}元</view>
					</view>
				</view>
				<!-- <view class="more_btn">
					点击加载更多
				</view> -->
			</view>
		</view>
		<uni-popup type="center" ref="orderPopup">
			<view class="qiangdan_pop">
				<view class="title_top">
					<view class="tit">
						已完成
					</view>
					<view class="iconfont iconyduicuowushixin" @click="closePop">		
					</view>
				</view>
				<view class="body_cc">
					<view class="code_text">
						<view class="name">
							送达时间 :
						</view>
						<view class="text">
							{{thisOrderItem.receipt_time}}
						</view>
					</view>
					<view class="code_text">
						<view class="name">
							送达地址 :
						</view>
						<view class="text">
							<view class="" v-if="thisOrderItem.user_address">
							{{thisOrderItem.user_address.split('undefined')[0]}}
							</view>
							<!-- <view class="iconfont iconzhifeiji"></view> -->
						</view>
					</view>
					<view class="code_text">
						<view class="name">
							姓名
						</view>
						<view class="text">
							{{thisOrderItem.user_name}}
						</view>
					</view>
					<view class="code_text">
						<view class="name">
							电话
						</view>
						<view class="text">
							<view class="">
								{{thisOrderItem.user_phone}}
							</view>
							<!-- <view class="iconfont iconweibiaoti-"></view> -->
						</view>
					</view>
					<view class="code_text">
						<view class="name">
							备注 :
						</view>
						<view class="text">
							{{thisOrderItem.remark}}
						</view>
					</view>
					<view class="code_text">
						<view class="name">
							订单编号 :
						</view>
						<view class="text">
							{{thisOrderItem.order_num}}
						</view>
					</view>
					<view class="o_it" v-for="item in thisOrderItem.goods_list">
						<view class="content">
							{{item.name}}
						</view>
						<view class="num">
							x{{item.num}}
						</view>
					</view>
					<view class="code_text">
						<view class="name">
							取件时间 :
						</view>
						<view class="text">
							{{thisOrderItem.fetch_time}}
						</view>
					</view>
					<view class="code_text">
						<view class="name">
							完成时间 :
						</view>
						<view class="text">
							{{thisOrderItem.confirm_time}}
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import _ from "../../until/lodash";
	export default {
		data() {
			return {
				olist: [{
						content: "放松放松范德萨放松放松范德萨放松放松范德萨",
						num: 1,
						sel: 1
					},
					{
						content: "放松放松范德萨",
						num: 2,
						sel: 0
					},
					{
						content: "放松放松范德萨",
						num: 1,
						sel: 1
					}
				],
				tabSel: 0,
				tabList: [{
						text: '收入账单',
						type: 0
					},
					{
						text: '提现账单',
						type: 1
					}
				],
				multiArray: [
					["2020年","2021年","2022年","2023年","2024年","2025年","2026年","2027年","2028年","2029年"],
					["01月","02月","03月","04月","05月","06月","07月","08月","09月","10月","11月","12月"]
				],
				multiIndex: [0, 9],
				timeText: "10月",
				subTime:"",
				yuMoney:0,
				moneyList:[],
				thisOrderItem:{}
			};
		},
		onHide() {
			this.$refs.orderPopup.close()
		},
		onShow() {
			this.$getApi("/App/Public/riderInfo", {}, res => {
				// this.hisList = [];
				console.log(res)
				
				this.yuMoney = res.data.money;
				
			})
			let mounth = this.$getDate("","s-s-s").split("-")[1];
			console.log(mounth)
			this.timeText = mounth+"月";
			this.multiIndex[1] = mounth-1;
			this.getDate()
			this.selectTab("",0,mounth)
			// this.$refs.orderPopup.open()
		},
		computed:{
			mounthMoney(){
				if(this.tabSel == 0){
					let moneyN = 0
					_.map(this.moneyList,item=>{
						moneyN += (Number(item.money)*100)
					})
					return moneyN/100
				}else{
					return 0
				}
				
			}
		},
		methods: {
			calcTixian(type){
				if(type == "1"){
					return  "银行卡提现"
				}
				if(type == "2"){
					return  "微信提现"
				}
				if(type == "3"){
					return  "支付宝提现"
				}
			},
			getDateTime(time){
				return this.$getDate(time,"s-s-s","c")
			},
			selectTab(el, i,mounth) {
				let mounthNum  = 0;
				console.log(el, i,mounth)
				if(mounth){
					mounthNum = mounth
				}else{
					mounthNum = this.subTime.split("-")[1]
				}
				let yearNum =  this.subTime.split("-")[0]
				console.log(this.subTime)
				if(i || i == 0){
					this.tabSel = i;
				}else{
					i = this.tabSel;
				}
				
				this.$getApi("/App/User/getRiderBalance", {type:i+1,month:mounthNum,year:yearNum}, res => {
					this.moneyList = res.data;
					console.log(res)
					
				})
			},
			showDetail(item){
				this.$getApi("/App/User/getBalanceDetail", {id:item.id}, res => {
					this.thisOrderItem = res.data;
					this.$refs.orderPopup.open()
				})
				
			},
			closePop(){
				this.$refs.orderPopup.close()
			},
			changeTj() {
				uni.navigateTo({
					url: './changeTj'
				});
			},
			addMoney() {
				uni.navigateTo({
					url: './tixian'
				});
			},
			bindMultiPickerColumnChange: function(el) {
				// console.log(el)
				if(el.detail.column == 0 ){
					this.multiIndex[0] = el.detail.value
					this.getDate()
				}else
				if(el.detail.column == 1 ){
					this.multiIndex[1] = el.detail.value;
					console.log(el.detail.value)
					let selMounth = el.detail.value+1;
					this.getDate()
				}
			},
			async getDate(){
				let subT = this.multiArray[0][this.multiIndex[0]].split("年")[0]+"-"+this.multiArray[1][this.multiIndex[1]].split("月")[0];
				console.log(subT)
				this.timeText = this.multiArray[1][this.multiIndex[1]];
				this.subTime = subT;
				this.selectTab()
			}
		}
	};
</script>

<style lang="scss" scoped>
	.o_it {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10upx 0;
	
		.content {
			min-width: 500upx;
		}
	
		.num {
			width: 60upx;
			text-align: right;
			flex-shrink: 0;
		}
	
		.iconfont {
			font-size: 42upx;
			width: 50upx;
			flex-shrink: 0;
			margin-left: 20upx;
		}
	
		.iconyduizhengqueshixin {
			color: #0f0;
		}
	}
	.qiangdan_pop{
		background-color: #fff;
		border-radius: 20upx;
		box-sizing: border-box;
		width: 680upx;
		padding: 20upx 26upx;
		.title_top{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 0 20upx;
			.tit{
				font-size: 32upx;
				// color: $uni-bl;
			}
			.iconyduicuowushixin{
				color: #999;
				font-size: 44upx;
			}
		}
		.body_cc{
			.code_text {
				padding: 10upx 0;
				color: #999;
				display: flex;
				&.or{
					color: $uni-or;
					.text{
						color: $uni-or;
					}
				}
				.name{
					width: 160upx;
					flex-shrink: 0;
				}
				.text{
					display: inline-flex;
					align-items: center;
					color: #666;
					.iconfont{
						margin-left: 10upx;
						color: $uni-bl;
					}
				}
				// border-bottom: 1upx solid #f0f0f0;
			}
		}
	}
	
	.have_detail {
		color: #333;

		.money_card {
			// padding: 26upx;
		}

		.header_have {
			background: url(../../static/img/qianbbg.png) no-repeat center center;
			background-size: 750upx 360upx;
			padding: 80upx 60upx;
			border-radius: 12upx;
			width: 750upx;
			height: 360upx;
			box-sizing: border-box;

			.m_title_l {
				color: #fff;
				margin-bottom: 30upx;
			}

			.cp2 {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.money {
					font-size: 56upx;
					color: #fff;
				}

				.text_btn {
					// background-color: #fff;
					border: 1upx solid #fff;
					border-radius: 40upx;
					padding: 8upx 46upx;
					color: #fff;
				}
			}
		}

		.tab_list_sy {
			display: flex;
			font-size: 36upx;
			justify-content: space-around;
			background-color: #fff;
			border-top: 26upx solid #eee;

			.item {
				border-bottom: 6upx solid transparent;
				padding: 20upx 0 16upx;

				&.active {
					color: $uni-bl;
					border-bottom: 6upx solid $uni-bl;
				}
			}
		}

		.have_detail_body {
			font-size: 28upx;
			color: #666;

			.c_pa2 {
				background-color: #fff;

				.more_btn {
					font-weight: bold;
					text-align: center;
					color: #666;
					padding-bottom: 40upx;
					font-size: 32upx;
					letter-spacing: 22upx;
				}

				.people {
					padding: 26upx 0;

					.sel_month {
						background-color: #f0f0f0;
						display: flex;
						justify-content: space-between;
						padding: 26upx 26upx 26upx 44upx;
						.iconfont {
							font-size: 28upx;
							margin-left: 6upx;
						}
					}

					.item {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 20upx 26upx;

						&+.item {
							border-top: 1upx solid #eee;
						}

						.img {
							width: 70upx;
							height: 70upx;
						}

						.l {
							display: inline-flex;
							align-items: center;
						}

						.phone {
							margin-left: 20upx;

							.p {
								font-size: 34upx;
							}

							.time {
								color: #999;
								padding-top: 20upx;
							}
							.name {
								text-align: right;
							}
						}

						.name {
							font-weight: bold;
							font-size: 34upx;
							color: #777;
						}
					}
				}
			}
		}
	}
</style>
