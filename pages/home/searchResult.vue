<template>
	<view class="">
		
		<view class="" v-if="isClassify" class="search_box_sy">
			<view class="part1">
				<view class="show_item" :class="{'active':(index==search1Sel && item.sel)}" v-for="(item,index) in search1" @click="phandlePaixu(item,index)">
					<view class="text">
						{{item.name}}
					</view>
					<view class="iconfont iconshangxia"></view>
				</view>
			</view>
			<!-- <view class="part2" v-if="isClassifySearch">
				<view class="fenlei_item" :class="{'active':index==search2Sel}" v-for="(item,index) in search2" @click="search2Show(item,index)">
					{{item}}
				</view>
			</view> -->
			
		</view>
		<view class="foot_list_show">
			<view class="buy_car iconfont icongouwuche" @click="toShopCar">
				<view class="text" v-if="carShowNum>0">
					{{carShowNum}}
				</view>
			</view>
			<view class="">
				<view class="rec_body_sy" v-if="shopList.length > 0">
					<view >
						<sy-foot2 v-for="(item,index) in shopList" :item="item" @click="foot2Click" :isPaihang="isPaihang" :itemIndex="index">
							<view class="num_add_sy" v-if="item.state != 3">
								<view class="iconfont iconjian" v-if="item.num > 0" @click.stop="foot2Jian(item)"></view>
								<view class="n" v-if="item.num > 0">{{ item.num }}</view>
								<view class="iconfont iconjia show" @click.stop="foot2Jia(item)"></view>
							</view>
							<view class="btn_qiang" v-if="item.state == 3" @click.stop="foot2Jia(item)">
								立即抢
							</view>
						</sy-foot2>
					</view>
				</view>
				<view class="no_foot" v-if="shopList.length == 0">
					<image src="../../static/img/none.png" class="no_img" mode=""></image>
					<view class="no_text">
						暂无商品
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex";
	import _ from "../../until/lodash";
	export default {
		
		onLoad(ph) {
			// 来自分类
			if (ph.fromType == 'classify') {
				uni.setNavigationBarTitle({
					title: ph.searchName
				})
				this.phSearchName = ph.searchName
				this.isClassify = true;
				this.footId = ph.footId;
				this.phFromType = ph.fromType;
				this.page = 1;
				this.$getApi("/App/Goods/getGoodsListByCate", {keyword:this.phSearchName,
					p:this.page}, res => {
					console.log(res.data,"ccccc3")
					this.clacCar(res.data)
				})
				console.log(this.phSearchName.split("/"))
				let nameFenlei = this.phSearchName.split("/");
				if( nameFenlei.length > 1){
					this.isClassifySearch = true;
					let search2 = ["全部"]
					this.search2 = search2.concat(nameFenlei)
				}else{
					this.isClassifySearch = false
				}
				
			}else
			//sgTop10 来自水果排行
			if (ph.fromType == 'sgTop10') {
				uni.setNavigationBarTitle({
					title: '本周前十'
				})
				this.isPaihang = true;
				this.page = 1;
				this.phFromType = ph.fromType;
				console.log(this.classify)
				this.$getApi("/App/Goods/getTopTenGoods", {category_id:this.classify,
					p:this.page}, res => {
					console.log(res.data,"本周水果前十")
					this.clacCar(res.data)
				})
			}			
			if(ph.fromType == 'home'){
				if(ph.searchName == '新鲜水果'){
					this.page = 1;
					this.$getApi("/App/Goods/getGoodsListByCate", {keyword:ph.searchName,
					p:this.page}, res => {
						console.log(res.data,"新鲜水果新列表")
						this.clacCar(res.data)
						// this.shopList  = res.data;
						// this.calcList();
					})
				}
				uni.setNavigationBarTitle({
					title: ph.searchName
				})
				this.phSearchName = ph.searchName;
				this.phFromType = ph.fromType;
			}
			if(ph.fromType == 'shoucang'){
				uni.setNavigationBarTitle({
					title: ph.searchName
				})
				this.phSearchName = ph.searchName;
				this.phFromType = ph.fromType;
				this.page = 1;
				this.$getApi("/App/User/myCollect", {page:this.page}, res => {
					console.log(res.data,"收藏列表")
					this.clacCar(res.data)
					// this.shopList  = res.data;
					// this.calcList();
				})
			}
			//search 来自搜索
			
			if(ph.fromType == 'search'){
				uni.setNavigationBarTitle({
					title: ph.searchName
				})
				this.phSearchName = ph.searchName;
				this.phFromType = ph.fromType;
				this.page = 1;
				this.phKeyword = ph.keyword;
				this.searchResult(ph.keyword)
			}
			// 更多水果/蔬菜
			if(ph.fromType == 'more'){
				uni.setNavigationBarTitle({
					title: ph.searchName
				})
				this.page = 1;
				this.phSearchName = ph.searchName;
				this.phFromType = ph.fromType;
				this.$getApi("/App/Goods/getGoodsListByCate", {keyword:this.phSearchName ,
				p:this.page}, res => {
					this.clacCar(res.data)
				})
				
			}
			if(ph.searchId){
				uni.setNavigationBarTitle({
					title: ph.searchName
				})
				this.phSearchName = ph.searchName;
				this.phSearchId = ph.searchId;
				
				this.page = 1;
				this.$getApi("/App/Goods/getGoodsList", {
					category_id: ph.searchId,
					p:this.page
				}, res => {
					console.log(res.data, "获取商品")
					this.clacCar(res.data)
				})
				
			}
		},
		onReachBottom() { //上拉触底函数
			console.log("more")
			this.jingxuanFoot("more")
		},
		data() {
			return {
				phSearchName:"",
				page:1,
				search1:[
					{name:"有货",ins:"has_stock",sel:false},
					{name:"新品",ins:"is_new",sel:false},
					{name:"折扣",ins:"is_discount",sel:false}
					// ,
					// {name:"筛选",ins:false}
				],
				search1Sel:0,
				search2:[],
				search2Sel:0,
				
				classifyNav: [{
						name: "水果"
					},
					{
						name: "蔬菜"
					},
					{
						name: "肉禽"
					},
					{
						name: "海鲜水产"
					},
					{
						name: "粮油调料"
					}
				],
				classifyIndex: 0,
				shopList: [],
				isClassify: false,
				isClassifySearch:false,
				isPaihang:false,
				footId:"",
				qiehuan:true,
				page:1,
				phFromType:"",
				phSearchId:"",
				phKeyword:""
			};
		},
		onPageScroll() {

		},
		watch:{
			shopCar: {
				handler: function(newVal, oldVal) {
					let numb = 0;
					_.map(this.shopCar, item => {
						numb += item.num
					})
					if (numb > 0) {
						let numbStr = numb.toString();
						uni.setTabBarBadge({
							index: 2,
							text: numbStr
						})
					} else {
						uni.removeTabBarBadge({
							index: 2
						})
					}
				},
				deep: true,
				immediate: true
			}
		},
		computed: {
			...mapState(["httpp", "SystemInfo", "userInfo", "shopCar","classifyId","classify"]),
			carShowNum() {
				let carShowNum = 0;
				_.map(this.shopCar, itemC => {
					carShowNum += itemC.num
				})
				return carShowNum;
			}
		},
		
		methods: {
			...mapMutations(["jiaCar", "jianCar"]),
			jingxuanFoot(more){
				if(more == "more"){
					this.page++;
					if (this.phFromType == 'classify') {
						this.phandlePaixu("","","more")
					}else
					if(this.phFromType == 'home'){
						if(this.phSearchName == '新鲜水果'){
							this.$getApi("/App/Goods/getGoodsListByCate", {keyword:this.phSearchName,
							p:this.page}, res => {
								console.log(res.data,"新鲜水果新列表")
								let shopList = this.shopList.concat(res.data)
								this.clacCar(shopList)
							})
						}
					}
					if(this.phFromType == 'shoucang'){
						this.$getApi("/App/User/myCollect", {page:this.page}, res => {
							console.log(res.data,"收藏列表")
							let shopList = this.shopList.concat(res.data)
							this.$forceUpdate()
							this.clacCar(shopList)
							// this.shopList  = res.data;
							// this.calcList();
						})
					}
					//search 来自搜索
					
					if(this.phFromType == 'search'){
						this.$forceUpdate()
						this.searchResult(this.phKeyword,"more")
					}
					if(this.phFromType == 'more'){
						
						this.$getApi("/App/Goods/getGoodsListByCate", {
						keyword:this.phSearchName ,
						p:this.page}, res => {
						
							console.log(res.data, "获取商品")
							let shopList = this.shopList.concat(res.data)
							this.$forceUpdate()
							this.clacCar(shopList)
						})
						
					}
				}else{
					this.page = 1;
				}
			},
			phandlePaixu(item,index,more){
				if(index != "" || index === 0){
					console.log("cc1")
					this.search1Sel = index;
				}else{
					console.log("cc2")
					index = this.search1Sel;
				}
				if(!item){
					item = this.search1[this.search1Sel]
					console.log(item,this.search1,this.search1Sel)
				}
				if(more != "more"){
					this.shopList = [];
					this.page = 1;
				}
				_.map(this.search1,(itemList,index)=>{
					if(itemList.ins == item.ins){
						if(this.search1[index].sel == true){
							this.search1[index].sel = false
						}else{
							this.search1[index].sel = true
						}
					}
				})
				console.log(item)
				
				
				let dataL = {};
				if(item.ins == "has_stock"){
					dataL = {
						keyword:this.phSearchName,
						has_stock:this.search1[0].sel ? 1 : 2
					}
				}
				if(item.ins == "is_new"){
					dataL = {
						keyword:this.phSearchName,
						is_new:this.search1[1].sel ? 1 : 2
					}
				}
				if(item.ins == "is_discount"){
					dataL = {
						keyword:this.phSearchName,
						is_discount:this.search1[2].sel ? 1 : 2
					}
				}
				dataL.p = this.page
				this.$getApi("/App/Goods/getGoodsListByCate", dataL, res => {
					console.log(res.data,"ccccc3")
					if(more == "more"){
						let shopList = this.shopList.concat(res.data)
						this.clacCar(shopList)
					}else{
						this.clacCar(res.data)
					}
				})
				// console.log(this.phSearchName.split("/"))
				// let nameFenlei = this.phSearchName.split("/");
				// if( nameFenlei.length > 1){
				// 	this.isClassifySearch = true;
				// 	let search2 = ["全部"]
				// 	this.search2 = search2.concat(nameFenlei)
				// }else{
				// 	this.isClassifySearch = false
				// }
			},
			clacCar(data){
				let newList = [];
				_.map(data,item=>{
					if(item.old_price == item.price){
						item.state2 = 1
					}else{
						item.state2 = 2
					}
					//团购商品
					if(item.group_buy == 1){
						item.state = 5
					}else
					if(item.on_sale == 1){
						item.state = 4
					}else{
						//团购折扣率
						if(item.sale_rate == 0){
							if(item.old_price != item.price){
								item.state = 2
							}else{
								item.state = 6
							}
						}else
						if(item.sale_rate != 0){
							item.state = 1
						}
					}
					newList.push(item)
				})
				this.shopList  = newList;
				console.log("ccc1",newList)
				this.$forceUpdate()
				this.calcList();
			},
			searchResult(el,more){
				el = el || "";
				this.$getApi("/App/Goods/getGoodsListByCate", {keyword:el,p:this.page}, res => {
					console.log(res.data,"ccccc3")
					if(more == "more"){
						let shopList = this.shopList.concat(res.data)
						this.$forceUpdate()
						this.clacCar(shopList)
					}else{
						this.$forceUpdate()
						this.clacCar(res.data)
					}
					
				})
			},
			calcList(){
				_.map(this.shopList, itemL => {
					_.map(this.shopCar, itemC => {
						if (itemL.id == itemC.id) {
							itemL.num = itemC.num
						}
					})
				})
				this.$forceUpdate()
			},
			search2Show(name,index2){
				this.search1 = [
					{name:"有货",ins:"has_stock",sel:false},
					{name:"新品",ins:"is_new",sel:false},
					{name:"折扣",ins:"is_discount",sel:false}
				];
				let this_ = this;
				console.log("121212--",this.qiehuan)
				if(this.qiehuan == true){
					this.qiehuan = false;
					this.search2Sel = index2;
					this.searchList(name);
					setTimeout(()=>{
						this_.qiehuan = true;
					},1000)
				}else{
					this.$msg('商品正在加载中,请勿切换过快')
				}
			},
			searchList(name){
				name = name == '全部' ? "" :name;
				this.$getApi("/App/Goods/getGoodsListByCate", {category_id:this.footId,keyword:name,p:this.page}, res => {
					console.log(res.data,"ccccc3")
					this.clacCar(res.data)
				})
			},
			toShopCar() {
				uni.switchTab({
					url: "../shopCar/shopCar"
				})
			},
			foot2Click(item) {
				console.log(item)
				uni.navigateTo({
					url:"../detail/detail?id="+item.id
				})
			},
			foot2Jia(item) {
				console.log("foot2Jia",item)
				_.map(this.shopList, fil => {
					console.log(item)
					if (fil.id == item.id) {
						item.num++;
						console.log(item.num,"item.num")
						if(item.num == 1){
							// App/Goods/add_car
							this.$getApi("/App/Goods/add_car", {goods_id:item.id,num:item.num}, resCar => {
								this.jiaCar(item)
							})
						}else{
							this.$getApi("/App/Goods/shop_car", {}, resCar => {
								console.log(resCar.data,item.id,"item.id")
								let carId = _.filter(resCar.data,itemC=>{
									return itemC.id == item.id
								})[0].cart_id;
								this.$getApi("/App/Goods/change_car_num", {id:carId,num:item.num}, res => {
									this.jiaCar(item)
								})
							})
						}
						
					}
				})
			},
			foot2Jian(item) {
				console.log("foot2Jian",item)
				_.map(this.shopList, fil => {
					if (fil.id == item.id) {
						item.num--;
						// this.jianCar(item)
						if(item.num == 0){
							// App/Goods/add_car
							this.$getApi("/App/Goods/shop_car", {}, resCar => {
								console.log(resCar,item,"1212")
						
								let carId = _.filter(resCar.data,itemC=>{
									return itemC.id == item.id
								})[0].cart_id;
								
								this.$getApi("/App/Goods/del_car", {ids:carId}, resCar => {
									this.jianCar(item)
								})
							})
						}else{
							this.$getApi("/App/Goods/shop_car", {}, resCar => {
								let carId = _.filter(resCar.data,itemC=>{
									return itemC.id == item.id
								})[0].cart_id;
								this.$getApi("/App/Goods/change_car_num", {id:carId,num:item.num}, res => {
									this.jianCar(item)
								})
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
	.search_box_sy{
		padding: 0 0 20upx;
		.part1{
			display: flex;
			justify-content: space-between;
			padding: 10upx 26upx;
			color: #666;
			.show_item{
				display: inline-flex;
				align-items: center;
				padding: 6upx 20upx 10upx;
				.text{
					font-size: 30upx;
				}
				
				.iconshangxia{
					font-size: 26upx;
					color: #999;
					transform: scale(.8);
				}
				&.active{
					.iconshangxia{
						color: $uni-bl;
					}
				}
			}
		}
		.part2{
			display: flex;
			padding: 10upx 26upx;
			flex-wrap: wrap;
			.fenlei_item{
				padding: 6upx 26upx 12upx;
				margin-right: 20upx;
				margin-bottom: 20upx;
				background-color: #f0f0f0;
				border-radius: 30upx;
				color: #666;
				&.active{
					color: $uni-bl;
					background-color: $uni-bl-bg;
				}
			}
		}
	}
	.foot_list_show {
		background-color: #f0f0f0;
		min-height: 100vh;
		padding: 20upx 26upx 200upx;

		.num_add_sy {
			display: inline-flex;

			.n {
				width: 50upx;
				text-align: center;
				position: relative;
				top: 8upx;
			}

			.iconfont {
				padding: 6upx 8upx;
				border-radius: 50%;
			}

			.iconjian {
				// background-color: #f0f0f0;
				// color: #666;
				background-color: $uni-bl;
				color: #fff;
			}

			.iconjia {
				background-color: #f0f0f0;
				color: #666;

				&.show {
					background-color: $uni-bl;
					color: #fff;
				}
			}
		}

		.buy_car.icongouwuche {
			position: fixed;
			bottom: 40upx;
			right: 40upx;
			font-size: 70upx;
			background-color: $uni-bl;
			color: #fff;
			width: 120upx;
			height: 120upx;
			text-align: center;
			line-height: 120upx;
			border-radius: 50%;

			.text {
				background-color: $uni-or;
				position: absolute;
				top: 16upx;
				right: 16upx;
				font-size: 26upx;
				width: 36upx;
				height: 36upx;
				line-height: 36upx;
				border-radius: 50%;
				transform: scale(.8);
			}
		}

		.rec_body_sy {
			background-color: #fff;
			border-radius: 12upx;
			padding: 10upx 26upx;
		}
	}
</style>
