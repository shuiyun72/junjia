<template>
	<view class="home">
		<view class="guodu_header" :style="{'padding-top':SystemInfoL.menu.top+'px'}">
			<view class="h_set">
				<view class="tit">
					待配货
				</view>
				<view class="right">
					<image src="../../static/img/xiaox.png" class="xiaoxi" mode="" @click="toNav('xiaoxi')"></image>
					<view class="iconfont iconshezhi" @click="toNav('set')">

					</view>
				</view>
			</view>
		</view>
		<view class="home_body">
			<view class="no_foot"  v-if="orderList.length == 0">
				<image src="../../static/img/none.png" class="no_img" mode=""></image>
				<view class="no_text">
					暂无订单
				</view>
			</view>
			<view class="order_item_sy" v-for="orderItem in orderList">
				<view class="o_title">
					<view class="time_or">
						{{shengyuTime(orderItem.receive_time)}}
					</view>
					<view class="last_time">
						最晚完成时间 : {{clacTimeDateC(orderItem.receive_time)}}
					</view>
				</view>
				<view class="o_it" v-for="item in orderItem.goods_list">
					<view class="content">
						{{item.name}}
					</view>
					<view class="num">
						x{{item.num}}
					</view>
				</view>
				<view class="code_text">
					订单编号 : {{orderItem.code}}
				</view>
				<view class="btn_grow">
					<view class="btn blue round sm" @click="dayin(orderItem)">
						确认配送
					</view>
				</view>
			</view>
		</view>
		<uni-popup type="center" ref="peisongPop">
			<view class="order_item_sy pop">
				<view class="o_title">
					<view class="time_or">
						正在配货
					</view>
					<view class="last_time" v-if="orderItemSel">
						{{shengyuTime(orderItemSel.receive_time)}}
					</view>
				</view>
				<view class="o_it" v-for="(item,index) in orderItemSel.olist" @click.stop="selItem(item,index)">
					<view class="content">
						{{item.content}}
					</view>
					<view class="num">
						x{{item.num}}
					</view>
					<view class="iconfont" :class="item.sel == 1?'iconyduizhengqueshixin':'iconyk_yuanquan'">
						
					</view>
				</view>
				<view class="code_text">
					订单编号 : {{orderItemSel.code}}
				</view>
				<view class="btn_grow">
					<view class="btn round sm" :class="canDatin?'blue':''" @click="dayinTrue()">
						完成打印
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList:[],
				orderItemSel:"",
				timer:""
			}
		},
		computed: {
			canDatin(){
				if(this.orderItemSel != ""){
					let pd = _.filter(this.orderItemSel.olist,item=>{
						return item.sel == 0
					})
					if(pd.length > 0){
						return false
					}else{
						return true
					}
				}else{
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
			let this_ = this;
			this_.getOrderList();
			this.timer = setInterval(()=>{
				this_.getOrderList();
			},2000)
		},
		onHide() {
			try{
				this.$refs.peisongPop.close();
			}catch(e){
				//TODO handle the exception
			}
			
			let this_ = this;
			clearInterval(this_.timer)
		},
		mounted() {
			
			
		},
		methods: {
			//计算剩余时间
			shengyuTime(time){
				let timeL = this.clacTimeDate(time);
				let timeL2 = timeL.split(" ")[0] +" "+ timeL.split("-")[3];
				console.log(timeL2)
				let lastT = this.$lastDate(timeL2,"d-s:s:s-c")
				if(lastT != "00:00:00"){
					return "剩余:"+lastT
				}else{
					return "已超时"
				}
				
				
			},
			clacTimeDateC(time){
				let timeL = this.clacTimeDate(time);
				let timeLength = timeL.split("-").length;
				return timeL.split(" ")[0].split("-")[1]+"-"+timeL.split(" ")[0].split("-")[2]+" " + timeL.split("-")[timeLength-1] 
			},
			clacTimeDate(time){
				console.log(time.indexOf('尽快送达') != -1 )
				if(time.indexOf('尽快送达') != -1){
					return this.$getDate('','s-s-s') +" "+time.split("预计")[1].split("送达")[0]
				}else{		
					return time
				}
			},
			getOrderList(){
				this.$getApi("/App/User/getUnDonePackage", {}, res => {
					// this.hisList = [];
					console.log(res,"库管待配货")
					this.orderList = res.data;
					
				})
			},
			dayin(item){
				
				this.$getApi("/App/User/doPackage", {order_id:item.order_id}, res => {
					// this.hisList = [];
					console.log(res,"库管待配货")
					// this.orderList = res.data;
					this.orderItemSel  = item;
					this.$refs.peisongPop.open();
				})
				
			},
			selItem(item,index){
				console.log(item,index,this.orderItemSel)
				if(item.sel == 1){
					this.$set(this.orderItemSel.olist[index],"sel",0)
				}else{
					this.$set(this.orderItemSel.olist[index],"sel",1)
				}
			},
			dayinTrue(){
				if(this.canDatin){
					this.$refs.peisongPop.close();
					this.$msg('完成打印')
				}else{
					this.$msg('请选择全部商品')
				}
			},
			toNav(el){
				if(el == 'xiaoxi'){
					uni.navigateTo({
						url:"../msg/msg"
					})
				}
				if(el == 'set'){
					uni.navigateTo({
						url:"../set/set"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		position: relative;
		background-color: #f0f0f0;
		height: 100vh;
		.no_foot{
			text-align: center;
			font-size: 40upx;
			padding-top: 220upx;
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
		.home_body {
			position:absolute;
			width: 690upx;
			top: 160upx;
			
			
			left: 50%;
			margin-left: -345upx;

			height: calc( 100vh - 280upx );
			overflow-y: auto;
			
		}
		.order_item_sy{
			padding: 26upx;
			font-size: 30upx;
			color: #666;
			margin-bottom: 20upx;
			background-color: #fff;
			border-radius: 20upx;
			&.pop{
				width: 640upx;
			}
			.o_title{
				display: flex;
				justify-content: space-between;
				border-bottom: 1upx solid #f0f0f0;
				padding-bottom: 10upx;
				margin-bottom: 10upx;
				.time_or{
					color: $uni-or;
				}
			}
			.o_it{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10upx 0;
				.content{
					min-width: 500upx;
				}
				.num{
					width: 60upx;
					text-align: right;
					flex-shrink: 0;
				}
				.iconfont{
					font-size: 42upx;
					width: 50upx;
					flex-shrink: 0;
					margin-left: 20upx;
				}
				.iconyduizhengqueshixin{
					color: #0f0;
				}
			}
			.code_text{
				padding: 20upx 0;
				color: #999;
				border-bottom: 1upx solid #f0f0f0;
			}
			.btn_grow{
				display: flex;
				justify-content: flex-end;
				padding-top: 20upx;
				.btn{
					border: 1upx solid #999;
					background-color: #999;
					color: #fff;
					&.blue{
						background-color: #007AFF;
						border: 1upx solid #007AFF;
					}
				}
			}
		}
		.guodu_header {
			background-color: $uni-bl;
			border-radius: 0 0 10% 10%;
			height: 26vh;
			box-sizing: border-box;

			.h_set {
				display: flex;
				padding: 20upx 26upx;
				color: #fff;
				justify-content: space-between;
				align-items: center;

				.tit {
					font-size: 40upx;
				}

				.right {
					display: inline-flex;
					align-items: center;

					.xiaoxi {
						width: 60upx;
						height: 60upx;
					}

					.iconshezhi {
						font-size: 50upx;
						margin-left: 50upx;
					}
				}
			}
		}
	}
</style>
