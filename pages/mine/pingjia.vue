<template>
	<view class="appraise">
		<view class="appraise_body">
			<view class="item" v-for="item in myA">
				<view class="a_title">
					<text class="ping">评</text>
					<text class="ps">订单编号: </text>
					<text class="ps"> {{item.code}}</text>
				</view>
				<view class="pj_time">
					<view class="star_box">
						<uni-rate :value="item.star" :margin="5" :size="18" :disabled="true"/>
						<text class="star_n">{{starC(item.star)}}</text>
					</view>
					<view class="time">
						2020-08-18 18:00
					</view>
				</view>
				<view class="a_raise">
					{{item.content}}
				</view>
				<view class="img_box">
					<view class="item_img" :style="'background-image: url(../../static/img/'+imgL+');'" v-for="imgL in item.imgs">
					</view>
				</view>
				<view class="foot_l">
					<image src="../../static/img/img-sp17.png" class="foot_img" mode=""></image>
					<view class="text_cc">
						{{item.cc}}
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myA:[{
					code:"121212121212",
					operator:{
						
					},
					star:4,
					tags:[1,2],
					content:"特别好吃特别好吃特别好吃特别好吃特别好吃",
					imgs:["img-pingj1.png","img-pingj2.png","img-pingj3.png"],
					img:"img-pingj1.png",
					cc:"南非进口南非进口南非进口"
				},{
					code:"121212121212",
					operator:{
						
					},
					star:4,
					tags:[1,2],
					content:"特别好吃特别好吃特别好吃特别好吃特别好吃",
					imgs:["img-pingj1.png","img-pingj2.png","img-pingj3.png","img-pingj3.png","img-pingj1.png"],
					img:"img-pingj1.png",
					cc:"南非进口南非进口南非进口"
				}],
				orderReject:[
					{cause:"服务态度好",text:"两个订单距离太远,无法及时赶到",id:1003},
					{cause:"不错",text:"订单时间不够,无法及时赶到",id:1004},
					{cause:"汽车清洗的很干净",text:"订单订单过多,无法及时赶到",id:1005}
				],
				rejectIndex:0,
			};
		},
		onShow() {
			// this.$getApi('/api/user/my/comment',{},res=>{
			// 	console.log(res.data.data)
			// 	this.myA = res.data.data;
			// })
		},
		computed:{
			httpp(){
				return this.$store.state.httpp;
			}
		},
		methods:{
			gitData(){
				
			},
			starC(n){
				switch(n){
				    case 1 : return "差评"; 
				       break; //可选
				    case 2 : return "中评";
				       break; //可选
					case 3 : return "好评";
					   break; //可选
					case 4 : return "好评";
					   break; //可选
				    default : return "好评"
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.appraise{
	height: 100vh;
	background-color: $uni-def;
}

.appraise_body{
	.item{
		background-color: #fff;
		margin-bottom: 26upx;
		padding: 24upx;
		.a_raise{
			font-size: 30upx;
			color: #888;
			padding: 20upx 0;
		}
		.foot_l{
			display: flex;
			align-items: center;
			margin: 20upx 0upx;
			padding: 20upx;
			background-color: #f0f0f0;
			.foot_img{
				width: 80upx;
				height: 80upx;
			}
			.text_cc{
				font-size: 32upx;
				color: #666;
				margin-left: 20upx;
			}
		}
		.img_box{
			display: flex;
			flex-wrap: wrap;
			.item_img{
				width: 226upx;
				height: 226upx;
				background-color: #f0f;
				margin-left: 10upx;
				margin-bottom: 10upx;
				background: no-repeat center center;
				background-size: 226upx auto;
				
			}
		}
		.a_title{
			margin-bottom: 20upx;
			display: flex;
			align-items: center;
			border-bottom: 1upx solid #eee;
			font-size: 30upx;
			font-weight: bold;
			.ping{
				display: inline-flex;
				width: 60upx;
				height: 60upx;
				background-color: $uni-bl;
				color: #fff;
				font-size: 36upx;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				transform: scale(.7);
				margin-right: 10upx;
			}
			.ps{
				margin-right: 10upx;
				color: #777;
			}
		}
		.pj_time{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.time{
				color: #999;
			}
		}
		.star_box{
			display: inline-flex;
			align-items:baseline;
			.star_n{
				align-items:baseline;
				font-size: 30upx;
				margin-left: 30upx;
			}
		}
	}
}
</style>
