<template>
	<view class="home">
		<view class="guodu_header" :style="{'padding-top':SystemInfoL.menu.top+'px'}">
			<view class="user_click">
				<view class="left">
					<view class="name">
						{{userInfo.name}}
					</view>
					<view class="name_info">
						配送员 已驻场{{userInfo.days}}天
					</view>
				</view>
				<view class="right_btn" v-if="isJiedan" @click="startOrder">
					停止接单
				</view>
			</view>
			<view class="order_title_num">
				<view class="item">
					<view class="num">
						{{userInfo.today_salary}}
					</view>
					<view class="text">
						今日收入
					</view>
				</view>
				<view class="item">
					<view class="num">
						{{userInfo.month_salary}}
					</view>
					<view class="text">
						本月收入
					</view>
				</view>
				<view class="item">
					<view class="num">
						{{userInfo.total_salary}}
					</view>
					<view class="text">
						累计收入
					</view>
				</view>
			</view>
		</view>
		<view class="home_body" v-if="!isJiedan">
			<view class="img_bb">
				<image src="../../static/img/kaiq.png" mode="" class="jiedan_img" @click="startOrder"></image>
			</view>
				
			
		</view>
		<view class="home_body" v-if="isJiedan">
			<view class="nav_list_sy">
				<view class="item" v-for="(item,index) in tabList" :class="{'active':index == tabSel}" @click="selectTab(item,index)">{{item.text}} 
				<view class="sm_num" v-if="item.num > 0">
				{{item.num}}	
				</view>
				</view>
			</view>
			<view class="no_foot" v-if="orderList.length == 0">
				<image src="../../static/img/none.png" class="no_img" mode=""></image>
				<view class="no_text">
					暂无订单
				</view>
			</view>
			<view class="order_list" v-if="orderList.length>0">
				<view class="order_item" v-for="item in orderList">
					<view class="hang_t">
						<view class="name">
							送达时间 :
						</view>
						<view class="text">
							{{clacTimeDate(item.receive_time)}}
						</view>
					</view>
					<view class="hang_t">
						<view class="name">
							送达地址 :
						</view>
						<view class="text" v-if="item.user_address">
							{{item.user_address.split('undefined')[0]}}
						</view>
					</view>
					<view class="btn_grow" >
						<view class="btn blue round sm" @click="orderTo('qiangdan',item)" v-if="tabSel == 0">
							抢单
						</view>
						<view class="btn blue round sm" @click="orderTo('jiedan',item)" v-if="tabSel == 1">
							接单
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup type="center" ref="orderPopup">
			<view class="qiangdan_pop">
				<view class="title_top">
					<view class="tit_l">
						{{tabSel == 0 ? '抢单成功' :'接单成功'}}
					</view>
					<view class="iconfont iconyduicuowushixin" @click="closePop">		
					</view>
				</view>
				<view class="body_cc">
					<view class="code_text" v-if="thisDetail">
						<view class="name">
							送达时间 :
						</view>
						<view class="text">
							{{clacTimeDate(thisDetail.receive_time)}}
						</view>
					</view>
					<view class="code_text" @click.stop="mapTo(item.lat,item.lng)">
						<view class="name">
							送达地址 :
						</view>
						<view class="text">
							<view class="" v-if="thisDetail.user_address">
							{{thisDetail.user_address.split('undefined')[0]}}
							</view>
							<view class="iconfont iconzhifeiji"></view>
						</view>
					</view>
					<view class="code_text">
						<view class="name">
							姓名
						</view>
						<view class="text">
							{{thisDetail.user_name}}
						</view>
					</view>
					<view class="code_text" @click.stop="phoneTo(thisDetail.user_phone)">
						<view class="name">
							电话
						</view>
						<view class="text">
							<view class="">
								{{thisDetail.user_phone}}
							</view>
							<view class="iconfont iconweibiaoti-"></view>
						</view>
					</view>
					<view class="code_text">
						<view class="name">
							备注 :
						</view>
						<view class="text">
							{{thisDetail.remark}}
						</view>
					</view>
					<view class="code_text or">
						<view class="name">
							取货码 :
						</view>
						<view class="text">
							{{thisDetail.code}}
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
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
				isJiedan:false,
				tabList: [{
						text: "抢单",
						type: 1,
						num:0
					}, {
						text: "派单",
						type: 2,
						num:0
					}
				],
				tabSel: 0,
				timer:"",
				orderList:[],
				thisDetail:''
			};
		},
		computed: {
			userInfo(){
				return this.$store.state.userInfo;
			},
			canDatin() {
				if (this.orderItemSel != "") {
					let pd = _.filter(this.orderItemSel.olist, item => {
						return item.sel == 0
					})
					if (pd.length > 0) {
						return false
					} else {
						return true
					}
				} else {
					return false
				}
			},
			SystemInfoL() {
				// #ifdef MP
				return JSON.parse(this.SystemInfo)
				// #endif
				// #ifndef MP
				return {
					'barHeight': 64,
					'menu': {
						'bottom': 58,
						'height': 32,
						'left': 263,
						'right': 350,
						'top': 26,
						'width': 87
					},
					'statusBarHeight': 20
				}
				// #endif

			}
		},
		onShow() {
			this.$getApi('/App/Public/riderInfo',{},res=>{
				console.log(res,"获取骑手信息")
				this.isJiedan = res.data.working == 1 ? true :false;
			})
			let this_ = this;
			this_.getData();
			this.timer = setInterval(()=>{
				this_.getData()
			},2000)
		},
		onPullDownRefresh() {
			let this_ = this;
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			setTimeout(function() {
		
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		onHide() {
			clearInterval(this.timer);
			this.timer = ""
		},
		methods:{
			clacTimeDate(time){
				console.log(time.indexOf('尽快送达') != -1 )
				if(time.indexOf('尽快送达') != -1){
					return this.$getDate('','s-s-s') +" "+time.split("预计")[1].split("送达")[0]
				}else{		
					return time
				}
			},
			mapTo(lat,lng){
				console.log(lat,lng,"导航")
			},
			phoneTo(phone){
				console.log(phone,"电话")
				uni.makePhoneCall({
				    phoneNumber: phone //仅为示例
				});
			},
			closePop(){
				this.$refs.orderPopup.close()
			},
			getData(){
				if(this.isJiedan){
					this.$getApi('/App/Goods/orderHall',{type:this.tabSel+1},res=>{
						console.log(res,"抢单、派单大厅")
						
						let orderList = [];
						_.map(res.data.data,item=>{
							if(item.user_address){
								orderList.push(item)
							}
						})
						this.orderList = orderList
						console.log(this.orderList)
					})
				}
			},
			orderTo(el,item){
				console.log(el)
				let this_ = this;
				if(el == 'qiangdan'){
					this.$getApi('/App/Goods/handleOrder',{type:this.tabSel+1,order_id:item.id},res=>{
						console.log(res,"骑手抢单、派单")
						this.thisDetail = res.data
					})
				}
				if(el == 'jiedan'){
					
				}
				this.$refs.orderPopup.open()
			},
			selectTab(el, i) {
				this.tabSel = i;
				// this.getOrder(el.type);
			},
			startOrder(){
				let isJiedan = 0;
				if(this.isJiedan){
					isJiedan = 2
				}else{
					isJiedan = 1
				}
				this.$getApi('/App/User/setWorking',{status:isJiedan},res=>{
					if(this.isJiedan){
						this.isJiedan = false
					}else{
						this.isJiedan = true
					}
				})
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
	.home {
		.no_foot{
			text-align: center;
			font-size: 40upx;
			padding-top: 100upx;
			.no_img{
				width: 500upx;
				height: 500upx;
			}
			.no_text{
				font-size: 40upx;
				color: #999;
				padding-top: 60upx;
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
				.tit_l{
					font-size: 32upx;
					color: $uni-bl;
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
		
		.img_bb{
			text-align: center;
			padding-top: 300upx;
			.jiedan_img{
				width: 220upx;
				height: 220upx;
			}
		}
		
		.order_list{
			padding: 20upx 26upx 30upx;
			box-sizing: border-box;
			height: calc( 100vh - 500upx );
			overflow-y: auto;
			.order_item{
				background-color: #fff;
				border-radius: 16upx;
				padding: 20upx;
				margin-bottom: 26upx;
				.hang_t{
					display: flex;
					.name{
						color: #999;
						width: 140upx;
						flex-shrink: 0;
						padding-top: 6upx;
					}
					.text{
						font-size: 32upx;
						color: #666;
					}
				}
			}
			.btn_grow {
				display: flex;
				justify-content: space-between;
				padding-top: 40upx;
				flex-direction: row-reverse;
				align-items: center;
				.text_or{
					color: $uni-or;
				}
				.btn {
					border: 1upx solid #999;
					background-color: #999;
					color: #fff;
					width: 160upx;
					text-align: center;
					&.blue {
						background-color: #007AFF;
						border: 1upx solid #007AFF;
					}
				}
			}
		}
		.nav_list_sy {
			display: flex;
			font-size: 32upx;
			border-top: 2upx solid #eee;
			color: #999;
			padding-top: 70upx;
			
			
			.item {
				border-bottom: 6upx solid transparent;
				padding: 20upx 0 16upx;
				margin-left: 50upx;
				position: relative;
				.sm_num{
					position:absolute;
					top: 0upx;
					right:-30upx;
					width: 50upx;
					height: 50upx;
					background-color: $uni-bl;
					opacity: .7;
					text-align: center;
					color: #fff;
					line-height: 50upx;
					border-radius: 50%;
					transform: scale(.5);
				}
				&.active {
					color: $uni-bl;
					border-bottom: 6upx solid $uni-bl;
				}
			}
		}
		.guodu_header {
			background-color: $uni-bl;
			border-radius: 0 0 10% 10%;
			height: 18vh;
			box-sizing: border-box;
			position: relative;
			.order_title_num {
				display: inline-flex;
				justify-content: space-between;
				width: 690upx;
				position:absolute;
				bottom: -60upx;
				left: 50%;
				margin-left: -345upx;
				box-sizing: border-box;
				background-color: #fff;
				padding: 30upx 60upx;
				border-radius: 20upx 20upx 0 0;
				.item {
					text-align: center;

					.num {
						font-size: 32upx;
						margin-bottom: 10upx;
						color: $uni-bl;
						font-weight: bold;
					}

					.text {
						font-size: 28upx;
					}
				}
			}

			.user_click {
				padding: 10upx 26upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #ddd;

				.left {
					.name {
						font-size: 30upx;
					}
				}

				.right_btn {
					border: 1upx solid #fff;
					padding: 10upx 26upx;
					border-radius: 30upx;
				}
			}
		}
	}
</style>
