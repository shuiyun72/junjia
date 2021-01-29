<template>
	<view class="home">

		<view class="guodu_header" :style="{'padding-top':SystemInfoL.menu.top+75+'px',
					'background-image':'linear-gradient(to bottom, '+lunboList[lunboIndex].color+' 0%, '+lunboList[lunboIndex].color+' 30%, #fff 100%)'}" v-if="lunboList.length>0">
			<view class="h_fixed" :class="{'fixed':isFixed}" :style="{'padding-top':SystemInfoL.menu.top+'px'}">
				<view class="msg_info m26 zindex10" :style="{ 'line-height': (SystemInfoL.menu.bottom - SystemInfoL.menu.top) + 'px'}">
					<view class="address">
						<button type="primary" @tap="chooseLocation" class="address_text shengluehao"><text class="iconfont icondingwei1"></text>{{location.address}}</button>
						<view class="iconfont iconjiantou"></view>
					</view>
				</view>
				<view class="fuceng">
					<view class="trans">
						<view class="home_search_sy zindex10" @click="toSearch" :style="{ 'line-height': (SystemInfoL.menu.bottom - SystemInfoL.menu.top -4) + 'px'}">


							<view class="placeholder_no">
								<view class="iconfont iconsousuo"></view>
								<view class="">
									邀请邻居 限时福利加码
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 新品推荐一级菜单 -->
			<view class="home_nav1 zindex10">
				<view class="item" v-for="item in homeNav1" @click="turnTo(item)">
					{{item.name}}
				</view>
			</view>

			<view class="bt_img zindex10">
				<swiper :autoplay="true" :circular="true" :interval="4000" :duration="1000" @change="changeLunbo">
					<swiper-item v-for="item in lunboList">
						<view class="swiper-item" @click="tiaozhuan(item)">
							<image :src="item.pic" class="img1"></image>
						</view>
					</swiper-item>
				</swiper>

			</view>
		</view>
		<!-- 头部 end-->
		<view class="home_nav2 m26">
			<view class="item" v-for="item in firstNavList1" @click="toClassify(item)">
				<image :src="item.icon" class="nav2_img"></image>
				<view class="text">
					{{item.name}}
				</view>
			</view>
		</view>
		<!-- 二级菜单 -->
		<view class="nav_first_sy">
			<view class="nav_box">
				<view v-for="item in firstNavList2" @click="toClassify(item)" class="item">
					<image :src="item.icon_small" class="nav_img" mode=""></image>
				</view>
			</view>
		</view>
		<view class="mine_title m26">
			<image src="../../static/img/ts1.png" class="left_bobao_img" mode=""></image>
			<uni-notice-bar :scrollable="true" :single="true" :text="bobaoText" class="bobao_text" background-color="#fff" color="#333" />
		</view>
		<!-- 酒水区 -->
		<view class="jiushui_qu_sy">
			<view class="ab_img">
				<image src="../../static/img/home/img-bt.png" class="img" mode=""></image>
			</view>
			<swiper :autoplay="true" :interval="3000" :duration="1000" height="100">
				<swiper-item>
					<view class="jiushui_box">
						<view class="item" v-for="item in jiuleiList" @click="itemClick(item)">
							<image :src="item.thumb" mode="" class="img"></image>
							<view class="money">
								￥<text class="num">{{item.price}}</text>
							</view>
							<view class="text">
								{{item.name}}
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 限时抢购 -->
		<view class="time_limit_sy m26" v-if="qiaogouTimeEnd">
			<view class="" @click="turnTo({name:'限时抢购'})">
				<view class="pt1">
					<view class="iconfont iconshijian1"></view>
					<view class="title">
						限时抢购
					</view>
					<view class="iconfont iconjiantou"></view>
				</view>
				<view class="pt2_time_sy">
					<view class="start_time">
						{{qiaogouTime}}
					</view>
					<view class="text">
						即将开始
					</view>
					<view class="to_time red">
						距离开始: {{toTime}}
					</view>
				</view>
			</view>
			<view class="time_limit_box">  
				<view class="item" v-for="item in qiangouList" @click="itemClick(item)">
					<view class="img_box">
						<image :src="item.thumb" class="img" mode=""></image>
					</view>
					<view class="red">
						￥{{item.price}}
					</view>
					<view class="name bl shengluehao">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<!-- 本周上新 -->
		<view class="weke_new" v-if="benzhouList.length > 0">
			<view class="weke_new_header_sy">
				<view class="left">
					<image src="../../static/img/home/icon-bzsx.png" mode="" class="t_img"></image>
					<view class="title1">
						本周上新
					</view>
					<view class="title2">
						爆款最热商品
					</view>
				</view>
				<view class="right" @click="turnTo({name:'本周上新'})">
					<view class="">
						更多
					</view>
					<view class="iconfont iconjiantou"></view>
				</view>
			</view>
			<sy-scroll-x class="p26">
				<view class="weke_box_item" v-for="item in benzhouList" @click="itemClick(item)">
					<image :src="item.thumb" class="t_img" mode=""></image>
					<view class="title1 shengluehao">
						{{item.name}}
					</view>
					<view class="money red">
						￥<text class="m">{{item.price}}</text>
					</view>
				</view>

			</sy-scroll-x>
		</view>
		<view class="bgcf0f0f0 pt26">
			<view class="hont_find m26">
				<sy-header1 @click="turnTo({name:'买一送一'})" :item="title1"></sy-header1>
				<view class="shop_case_box">
					<view class="shop_auto">
						<sy-foot1 @click="part1Num" :item="item" v-for="item in maiyisongyiList"></sy-foot1>
					</view>
				</view>
			</view>

			<view class="hont_find2 m26">
				<sy-header1 @click="turnTo({name:'团购产品'})" :item="title2"></sy-header1>
				<view class="shop_case_box">
					<view class="shop_auto">
						<sy-foot1 :isTuan='true' @click="part1Num" :isTuangou="true" :item="item" v-for="item in tuangouList"></sy-foot1>
					</view>
				</view>
			</view>
			<sy-scroll-x class="p26">  
				<view class="item_nav1" v-for="(item,index) in firstNavList1" :class="{'active':index == nav2dex}" @click="toClassify(item)">
					<view class="title1">
						限量抢购
					</view>
					<view class="money">
						{{item.name}}
					</view>
				</view>
			</sy-scroll-x>
			<!-- 新鲜水果 -->
			<view class="new_foot_box m26">
				<view class="title_img">
					<image src="../../static/img/home/banner2.png" class="img" mode=""></image>
				</view>
				<view class="shop_list_c">
					<sy-foot2 v-for="item in shuiguoList" :item="item" @click="foot2Click(item)">
						<view class="num_add_sy">
							<view class="iconfont iconjian" v-if="item.num > 0" @click.stop="foot2Jian(item)"></view>
							<view class="n" v-if="item.num > 0">{{ item.num }}</view>
							<view class="iconfont iconjia show" @click.stop="foot2Jia(item)"></view>
						</view>
					</sy-foot2>
				</view>
				<view class="more"  @click="toNavAll('水果')">
					查看全部<text class="iconfont iconjiantou"></text>
				</view>
			</view>
			<!-- 新鲜蔬菜 -->
			<view class="new_foot_box m26">
				<view class="title_img">
					<image src="../../static/img/home/banner3.png" class="img" mode=""></image>
				</view>
				<view class="shop_list_c">
					<sy-foot2 v-for="item in shucaiList" :item="item" @click="foot2Click(item)">
						<view class="num_add_sy">
							<view class="iconfont iconjian" v-if="item.num > 0" @click.stop="foot2scJian(item)"></view>
							<view class="n" v-if="item.num > 0">{{ item.num }}</view>
							<view class="iconfont iconjia show" @click.stop="foot2scJia(item)"></view>
						</view>
					</sy-foot2>
				</view>
				<view class="more" @click="toNavAll('蔬菜')">
					查看全部<text class="iconfont iconjiantou" ></text>
				</view>
			</view>
			<!-- 底部商品 -->
			<view class="title_img_jx">
				<view class="t1">
					精选好物
				</view>
				<view class="t2">
					超值优惠 猜你喜欢
				</view>
			</view>
			<view class="pubuliu m26">
				<view class="left_box">
					<sy-pubuli :item='item' v-for="(item,index) in arrtL" @click="foot2Click">
						<view class="num_add_sy1">
							<view class="iconfont iconjian" v-if="item.num > 0" @click.stop="foot2JianJs(item)"></view>
							<view class="n" v-if="item.num > 0">{{ item.num }}</view>
							<view class="iconfont iconjia show" @click.stop="foot2JiaJs(item)"></view>
						</view>
					</sy-pubuli>
				</view>
				<view class="right_box">
					<sy-pubuli :item='item' v-for="(item,index) in arrtR" @click="foot2Click">
						<view class="num_add_sy1">
							<view class="iconfont iconjian" v-if="item.num > 0" @click.stop="foot2JianJs(item)"></view>
							<view class="n" v-if="item.num > 0">{{ item.num }}</view>
							<view class="iconfont iconjia show" @click.stop="foot2JiaJs(item)"></view>
						</view>
					</sy-pubuli>
				</view>
			</view>
		</view>
		<uni-popup type="center" ref="showimage">
			<view class="pop_youhui">

				<image src="../../static/img/ts3.png" class="quan_img1" mode=""></image>
				<view class="quan_list">
					<view class="list_body">
						<view class="list_body_i">
							<view class="item" v-for="item in youhuiquanList">
								<view class="left red">
									￥<text class="money">{{item.money}}</text>
								</view>
								<view class="right">
									<view class="t1_l">
										{{item.title}}
									</view>
									<view class="t2_l">
										有效期至 {{item.end_time}}
									</view>
								</view>
							</view>
						</view>
					</view>

					<view class="quan_img2" @click="getPopup">
						立即领取
					</view>
				</view>

				<view class="iconfont iconyduicuowushixin" @click="closePopup"></view>
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
				isFixed: false,
				bobaoText: "平台上线了,快来下单吧",
				classifyList: [],
				shuiguoList: [],
				shucaiList: [],
				shopList2: [],
				nav2dex: 0,
				lunboList: [],
				lunboIndex: 0,
				erjiNav: [],
				loadStatus: 'loading',
				footPb: [],
				homeNav1: [{
					name: "新品推荐",
					type: 1
				}, {
					name: "新鲜水果",
					type: 1
				}, {
					name: "新人专属",
					type: 1
				}, {
					name: "本周上新",
					type: 1
				}],
				homeNav2: [],
				arrtL: [],
				arrtR: [],
				toTime: "",
				timer: 0,
				title1: {
					t1: "买一送一",
					t2: "买就送同款商品",
					url: "33"
				},
				title2: {
					t1: "团购产品",
					t2: "平台推荐商品",
					url: "33"
				},
				youhuiquanList: [],
				benzhouList: [],
				shuiguoId: "",
				shucaiId: "",
				page: 1,
				qiaogouTimeList: [],
				qiaogouTime: "",
				qiaogouTimeEnd:"",
				maiyisongyiList: [],
				tuangouList: [],
				qiangouList: [],
				jiuleiList:[],
				isCeshi:false,
				yindaoPop:true,
				yindaoImg:"",
				timer:true
			};
		},
		//发送给朋友
		onShareAppMessage(res) {
			let userInfoId = this.userInfo.id;
			// 此处的distSource为分享者的部分信息，需要传递给其他人
			uni.share({
			    provider: "weixin",
			    scene: "WXSceneSession",
			    type: 1,
			    summary: "欢迎使用君佳优选商城！",
			    success: function (res) {
			        console.log("success:" + JSON.stringify(res));
			    },
			    fail: function (err) {
			        console.log("fail:" + JSON.stringify(err));
			    }
			});
		},
		mounted() {
			let this_ = this;
			uni.getLocation({
			    type: 'wgs84',
				geocode:true,
			    success: function (res) {
					
					let position = {};
					// "address":{"country":"中国","province":"河南省","city":"郑州市","district":"中原区","street":"药厂街","streetNum":"154号","poiName":"河南省国家大学科技园西区","cityCode":"0371"}
					position.name = res.address.poiName;
					position.address = res.address.province+res.address.city+res.address.district+res.address.street;
					this_.setLocation(position)
					console.log('当前位置：' + JSON.stringify(res));
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
			    }
			});
		},
		//分享到朋友圈
		onShareTimeline(res) {
			uni.share({
			    provider: "weixin",
			    scene: "WXSenceTimeline",
			    type: 1,
			    summary: "欢迎使用君佳优选商城！",
			    success: function (res) {
			        console.log("success:" + JSON.stringify(res));
			    },
			    fail: function (err) {
			        console.log("fail:" + JSON.stringify(err));
			    }
			});
		},
		onReachBottom() { //上拉触底函数
			console.log("more")
			this.jingxuanFoot("more")
		},
		
		watch: {
			shopCar: {
				handler: function(newVal, oldVal) {
					this.initShopCar()
				},
				deep: true,
				immediate: true
			}
		},
		computed: {
			...mapState(["hasLogin","httpp", "SystemInfo", "userInfo", "shopCar", "location"]),

			firstNavList1() {
				return _.take(this.classifyList, 10)
			},
			firstNavList2() {
				return _.slice(this.classifyList, 10)
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
		onReachBottom(){  //上拉触底函数
			this.page++;
			this.jingxuanFoot("more")	  
		},
		onHide() {
			console.log("cccc")
			this.closePopup();
			clearInterval(this.timer)
			// uni.pageScrollTo({
			// 	scrollTop: 0,
			// 	duration: 100,
			// });
			this.page = 1;
		},
		onShow() {
			
			this.page = 1;
			console.log(this.page,"this.page")

			let this_ = this;
			if(!this.hasLogin){
				// #ifdef MP
				this.weappLogin()
				// #endif
				// #ifndef MP
				this_.openP()
				// #endif
			}else{
				// 获取购物车
				this.$getApi("/App/Goods/shop_car", {}, res => {
					console.log(res.data, "获取购物车")
					let carInfo = res.data == "" ? [] : res.data;
					this.setReCar(carInfo)
				})
				
				if(this.userInfo.status == 1 && Number(this.userInfo.newVip) == 0 ){
					this.openP()
				}else{
					try{
						this.closePopup();
					}catch(e){
						//TODO handle the exception
					}
				}
			}
			this.init();
			this.initShopCar();
			clearInterval(this.timer)
			this.startTime();
			this.footPbL();
			console.log(this.shopCar)
			_.map(this.shuiguoList, itemL => {
				_.map(this.shopCar, (itemC, index) => {
					if (itemL.id == itemC.id) {
						this.$set(this.shuiguoList[index], "num", itemC.num)
					}
				})
			})
			_.map(this.shucaiList, itemL => {
				_.map(this.shopCar, (itemC, index) => {
					if (itemL.id == itemC.id) {
						this.$set(this.shucaiList[index], "num", itemC.num)
					}
				})
			})

			_.map(this.shopList2, itemL => {
				_.map(this.shopCar, (itemC, index) => {
					if (itemL.id == itemC.id) {
						this.$set(this.shopList2[index], "num", itemC.num)
					}
				})
			})
			try{
				uni.hideLoading();
			}catch(e){
				//TODO handle the exception
			}

		},
		onPullDownRefresh() {
			let this_ = this;
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			setTimeout(function() {

				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		onPageScroll(res) {
			// console.log(res.scrollTop)
			if (res.scrollTop > 6) {
				this.isFixed = true;
			} else {
				this.isFixed = false;
			}
		},
		methods: {
			...mapMutations(["jiaCar", "jianCar", "setLocation", "setClassify","setReCar"]),
			tiaozhuan(item){
				if(item.url){
					window.location.href = item.url
				}else{
					this.$msg("没有跳转链接")
				}
			},
			toNavAll(el){
				console.log(el)
				let this_ = this;
				let shuiguoId = {};
				if(el == "水果"){
					shuiguoId = _.filter(this_.classifyList, item => {
						return item.name.includes('水果')
					})[0];
				}
				if(el == "蔬菜"){
					shuiguoId = _.filter(this_.classifyList, item => {
						return item.name.includes('蔬菜')
					})[0];
				}
				console.log(shuiguoId)
				uni.navigateTo({
					url:"../home/searchResult?fromType=more&searchName="+shuiguoId.name
				})
			},
			init() {
				let this_ = this;
				// 轮播图
				this_.$getApi("/App/Index/banner", {}, res => {
					console.log(res.data, "ccccc")
					this_.lunboList = res.data
				})
				// 获取一级菜单
				this_.$getApi("/App/Goods/getCategory", {}, res => {
					console.log(res.data, "获取一级菜单")
					this_.classifyList = res.data;
					this_.shuiguoId = _.filter(this_.classifyList, item => {
						return item.name.includes('水果')
					})[0].id;
					
					// 获取水果
					// this_.$getApi("/App/Goods/getGoodsList", {
					// 	category_id: this_.shuiguoId
					// }, res => {
					// 	console.log(res.data, "获取水果")
					// 	this_.shuiguoList = res.data.slice(0, 3)
					// })
					this_.$getApi("/App/Goods/getGoodsListByCate", {keyword:"水果",
					p:1}, res => {
						let shucaiL =  [];
						_.map(res.data,item=>{
							item.num = 0;
							item.sel = 1;
							shucaiL.push(item)
						})
						this_.shuiguoList = shucaiL.slice(0, 3)
					})
					this_.shucaiId = _.filter(this_.classifyList, item => {
						return item.name.includes('蔬菜')
					})[0].id;
					// 获取蔬菜
					// this_.$getApi("/App/Goods/getGoodsList", {
					// 	category_id: this_.shucaiId
					// }, res => {
					// 	console.log(res.data, "获取蔬菜")
					// 	this_.shucaiList = res.data.slice(0, 3)
					// })
					this_.$getApi("/App/Goods/getGoodsListByCate", {keyword:"蔬菜",
					p:1}, res => {
						let shucaiL =  [];
						_.map(res.data,item=>{
							item.num = 0;
							item.sel = 1;
							shucaiL.push(item)
						})
						this_.shucaiList = shucaiL.slice(0, 3)
					})
					
					// 酒类专区
					this_.$getApi("/App/Goods/getGoodsListByCate", {keyword:"酒"}, res => {
						console.log(res.data, "酒类专区")
						this.jiuleiList = res.data;
					},"false")

				})
				// 获取商品列表
				this_.$getApi("/App/Goods/getGoodsList", {}, res => {
					console.log(res.data, "ccccc3")
					// this_.classifyList  =res.data
				})
				//maiyisongyiList
				// 获取商品列表买一送一
				this_.$getApi("/App/Goods/getGoodsList", {
					on_sale: 1
				}, res => {
					console.log(res.data, "买一送一")
					this_.maiyisongyiList = res.data
				})
				// 获取商品列表团购
				this_.$getApi("/App/Goods/getGoodsList", {
					group_buy: 1
				}, res => {
					console.log(res.data, "团购")
					this_.tuangouList = res.data
				})

				// 获取系统配置信息
				this_.$getApi("/App/Index/getSysConfig", {}, res => {
					console.log(res, "获取系统配置信息")
					this_.bobaoText = _.filter(res.data, item => {
						return item.remark.includes('热点播报')
					})[0].value;
					console.log(this_.bobaoText, '热点播报')
				})


				// 本周新品
				this_.$getApi("/App/Goods/getNewGoods", {
					category_id: 1
				}, res => {
					console.log(res.data, "本周新品")
					this.benzhouList = res.data ? res.data : []
				})
				// 获取抢购时间
				this_.$getApi("/App/Goods/getShoppingTypes", {}, res => {
					console.log(res.data,"获取抢购时间")
					// this.qiaogouTimeList = [
					// {start_time:"14:00",end_time:"15:00"}
					// ,{start_time:"15:43",end_time:"16:44"}
					// ,{start_time:"16:44",end_time:"17:45"}
					// ]
					this.qiaogouTimeList = res.data;
				})
				
				
				this.jingxuanFoot()
			},
			jingxuanFoot(more) {
				this.$getApi("/App/Goods/getGoodsList", {
					p: this.page,
					recommend: 1
				}, res => {
					console.log(res.data, "精选好物")
					let resData = res.data ? res.data : [];
					if(more == "more"){
						this.footPb = this.footPb.concat(resData)
					}else{
						this.footPb = resData
					}
					
					if(this.footPb.length > 0 && this.shopCar.length>0){
						_.map(this.footPb, (itemL,indexL) => {
							_.map(this.shopCar, (itemC, index) => {
								if (itemL.id == itemC.id) {
									this.$set(this.footPb[indexL], "num", itemC.num)
								}
							})
						})
					}
					this.footPbL(this.footPb);
				})
			},
			nShareAppMessage: function(e) {
				let title = '君佳优选'
				return {
					title: title,
					path: 'pages/home/home'
				}
			},
			toClassify(item) {
				this.setClassify(item)
				uni.switchTab({
					url: '../classify/classify'
				})

			},
			initShopCar() {
				let numb = 0;
				_.map(this.shopCar, item => {
					numb += item.num
				})
				if (numb > 0) {
					let numbStr = numb.toString();
					uni.setTabBarBadge({
						index: 3,
						text: numbStr
					})
				} else {
					uni.removeTabBarBadge({
						index: 3
					})
				}
			},
			async isNoLogin(){
				if(!this.hasLogin){
					// #ifndef APP-PLUS
					this.closePopup();
					uni.navigateTo({
						url:"../login/login"
					})
					// #endif
					// #ifdef MP
					this.weappLogin('login')
					// #endif
					return false
				}
			},
			weappLogin(isLoginC) {
				console.log("quanxian")
				let this_ = this;
				uni.getSetting({
					success(resShouquan) {
						console.log("授权：", resShouquan);
						if (!resShouquan.authSetting['scope.userInfo']) {
							//这里调用授权
							console.log("当前未授权");
							if(isLoginC == 'login'){
								uni.navigateTo({
									url:"../login/login"
								})
							}else{
								this_.openP()
							}
							
						} else {
							//用户已经授权过了
							console.log("当前已授权");
							
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									// 弹出正在登录的弹框
									
									console.log(loginRes, "微信权限信息");
									this_.$getApi("/App/Public/getOpenid", {
										code: loginRes.code
									}, resOpen => {
										console.log(resOpen, "ccccc")
										// uni.showLoading({
										// 	mask: true,
										// 	title: '正在登录···',
										// 	complete: () => {}
										// });
										
										uni.getUserInfo({
											provider: 'weixin',
											success: (info) => { //这里请求接口
												console.log(info, "527");
												let dataLogin = {
													open_id: resOpen.data.openid,
													nickname: info.userInfo.nickName,
													avatar: info.userInfo.avatarUrl,
													type:"3"
												}
												console.log(dataLogin)
												// uni.showModal({
												//     title: '提示',
												//     content: '为了更好的购物体验,购买商品及加入购物车,收藏商品等需要登录,是否确认登录',
												//     success: function (res) {
												//         if (res.confirm) {
												//             console.log('用户点击确定');
															this_.$getApi("/App/Public/thirdLogin", dataLogin, res => {
																console.log(res, "登录")
																// uni.hideLoading();
																this_.$store.commit("login", res.data)
																// 获取购物车
																this_.$getApi("/App/Goods/shop_car", {}, resCarC => {
																	console.log(resCarC.data, "获取购物车")
																	let carInfo = resCarC.data == "" ? [] : resCarC.data;
																	this_.setReCar(carInfo)
																})
																console.log(res.data)
																if(res.data.status == 1 &&  Number(this.userInfo.newVip) != 1){
																	this_.openP()
																}else{
																	try{
																		this_.closePopup();
																	}catch(e){
																		//TODO handle the exception
																	}
																	
																}
																
															})
												//         } else if (res.cancel) {
												//             console.log('用户点击取消');
												// 			this_.$msg("取消登录")
												// 			uni.hideLoading();
												//         }
												//     }
												// });
												
											},
											fail: () => {
												// uni.showToast({
												// 	title: "微信登录授权失败",
												// 	icon: "none"
												// });
												uni.hideLoading();
											}
										})
									})
			
								}
							});
						}
					}
				})
			},
			getPopup() {
				let this_ = this;
				this.closePopup();
				// #ifndef MP
				if(!this.hasLogin){
					
					uni.navigateTo({
						url:"../login/login"
					})
				}else{
					let youhuiArr = [];
					_.map(this_.youhuiquanList, item => {
						youhuiArr.push(item.id)
					})
					let youhuiStr = youhuiArr.toString()
					this_.$getApi("/App/lincoupon/user_draw_coupon", {
						coupon_id: youhuiStr
					}, res => {
						console.log(res, "领取优惠券")
						this_.$msg('领取成功')
					})
					setTimeout(()=>{
						this_.closePopup()
					},500)
				}
				// #endif
				// #ifdef MP
				uni.getSetting({
					success(res) {
						console.log("授权：", res);
						if (!res.authSetting['scope.userInfo']) {
							//这里调用授权
							console.log("当前未授权");
							uni.navigateTo({
								url: "../login/login"
							})
						} else {
							//用户已经授权过了
							console.log("当前已授权");
							// 弹出正在登录的弹框
							let youhuiArr = [];
							_.map(this_.youhuiquanList, item => {
								youhuiArr.push(item.id)
							})
							let youhuiStr = youhuiArr.toString()
							this_.$getApi("/App/lincoupon/user_draw_coupon", {
								coupon_id: youhuiStr
							}, res => {
								console.log(res, "领取优惠券")
								this_.$msg('领取成功')
								this_.closePopup()
							})
						}
					}
				})
				// #endif

			},
			closePopup() {
				
			},
			openP() {
				this.$getApi("/App/lincoupon/get_coupon_lists", {}, res => {
					console.log(res, "优惠券")
					this.youhuiquanList = res.data;
					this.$refs.showimage.open()
				})
			},
			toSearch() {
				console.log("ccc1")
				if(!this.isCeshi){
					console.log("ccc2")
					this.isNoLogin()
					console.log("ccc3")
				}
				console.log("ccc4")
				uni.navigateTo({
					url: "./search"
				})
			},
			chooseLocation() {
				let this_ = this;
				uni.chooseLocation({
					success: (res) => {
						console.log(res)
						this_.setLocation(res)
						// this.location = formatLocation(res.longitude, res.latitude),
						// this.locationAddress = res.address
					},
					complete: (res) => {
						console.log(res)
						// this.location = formatLocation(res.longitude, res.latitude),
						// this.locationAddress = res.address
					}

				})
			},
			itemNav2(item, index) {
				this.nav2dex = index;
			},
			part1Num(item) {
				console.log(item)
				this.itemClick(item)
			},
			changeLunbo(el) {
				setTimeout(() => {
					this.lunboIndex = el.detail.current;
				}, 1000)

				// opacity
				// this.$refs.isGdref.style = "opacity:0";
			},
			footPbL(footPbList) {
				let arrtL = [];
				let arrtR = [];
				_.map(footPbList, (item, index) => {
					console.log(item, index)
					if (index % 2 == 0) {
						arrtL.push(item)
					} else {
						arrtR.push(item)
					}
				})
				this.arrtL = arrtL;
				this.arrtR = arrtR;
				console.log(arrtL)
				console.log(arrtR)
			},
			startTime() {
				let this_ = this;
				this_.toLastTime()
				
				this_.timer = setInterval(() => {
					if (this.toTime != '00:00:00') {
						this_.toLastTime()
					}
				}, 1000)
			},
			toLastTime() {
				// console.log("888----------------",this.qiaogouTimeList)
				let this_ = this;
				if (this.qiaogouTimeList.length > 0) {
					let timeDate = this.$getDate("", "s-s-s")
					let thisDateTime = new Date().getTime();
					for (let itTime = 0; itTime < this.qiaogouTimeList.length; itTime++) {
						// console.log(itTime,"894")
						let startTimeLL = new Date(timeDate + " " + this.qiaogouTimeList[itTime].start_time);
						let endTime = new Date(timeDate + " " + this.qiaogouTimeList[itTime].end_time);
						if (thisDateTime < startTimeLL && thisDateTime < endTime) {
							console.log(itTime)
							let stTime = this.qiaogouTimeList[itTime].start_time;
							console.log(stTime, "121212")
							// 抢购商品
							this_.$getApi("/App/Goods/getShoppingGoods", {
								time: stTime
							}, res => {
								console.log(res.data, "抢购商品")
								if (res.data.length > 0) {
									this.qiangouList = res.data.slice(0, 8);
								} else {
									this.qiangouList = []
								}
							})
							this.qiaogouTime = this.qiaogouTimeList[itTime].start_time;
							
							this.qiaogouTimeEnd = this.qiaogouTimeList[itTime].end_time;
							console.log(this.qiaogouTimeEnd)
							let toTime = timeDate + " " + this.qiaogouTime;
							this.toTime = this.$lastDate(toTime, "s:s:s")

							break;
						}
					}
				}
			},
			turnTo(item) {
				console.log(item)
				if (item.name == '新品推荐') {
					uni.navigateTo({
						url: "../recommend/recommend?title=" + item.name
					})
				}
				if (item.name == '新鲜水果') {
					uni.navigateTo({
						url: "./searchResult?searchName=新鲜水果&fromType=home"
					})
				}
				if (item.name == '买一送一') {
					uni.navigateTo({
						url: "../recommend/recommend?title=" + item.name
					})
				}
				if (item.name == '团购产品') {
					uni.navigateTo({
						url: "../recommend/recommend?title=" + item.name
					})
				}
				if (item.name == '本周上新') {
					uni.navigateTo({
						url: "../recommend/recommend?title=" + item.name
					})
				}
				if (item.name == '限时抢购') {
					uni.navigateTo({
						url: "../recommend/noTimeRecommend"
					})
				}

				if (item.name == '新人专属') {
					uni.navigateTo({
						url: "../find/xinrenzhuanshu?title=" + item.name
					})
				}
			},
			foot2Click(item) {
				console.log(item)
				uni.navigateTo({
					url: '../detail/detail?id=' + item.id
				})
			},
			itemClick(item) {
				console.log(item)
				uni.navigateTo({
					url: '../detail/detail?id=' + item.id
				})
			},

			foot2Jia(item) {
				this.foot2JiaItem(item, 1)
			},
			foot2iJia(item) {
				this.foot2JiaItem(item, 2)
			},
			foot2JiaJs(item) {
				this.foot2JiaItem(item, 3)
			},
			foot2scJia(item) {
				this.foot2JiaItem(item, 4)
			},
			foot2Jian(item) {
				this.foot2JianItem(item, 1)
			},
			foot2iJian(item) {
				this.foot2JianItem(item, 2)
			},
			foot2JianJs(item) {
				this.foot2JianItem(item, 3)
			},
			foot2scJian(item) {
				this.foot2JianItem(item, 4)
			},
			foot2JiaItem(item, el) {
				if(this.timer){
				this.timer = false;
				setTimeout(()=>{
					this.timer = true;
				},500)
				let list = [];
				if (el == 1) {
					list = this.shuiguoList
				} else
				if (el == 2) {
					list = this.shopList2
				} else
				if (el == 3) {
					list = this.footPb
				}
				if (el == 4) {
					list = this.shucaiList
				}
				_.map(list, fil => {
					if (fil.id == item.id) {
						item.num++;
						if (item.num == 1) {
							// App/Goods/add_car
							this.$getApi("/App/Goods/add_car", {
								goods_id: item.id,
								num: item.num
							}, resCar => {
								this.timer = true;
								this.jiaCar(item)
							})
						} else {
							this.$getApi("/App/Goods/shop_car", {}, resCar => {
								console.log(resCar.data, item.id, "item.id")
								let carId = _.filter(resCar.data, itemC => {
									return itemC.id == item.id
								})[0].cart_id;
								this.$getApi("/App/Goods/change_car_num", {
									id: carId,
									num: item.num
								}, res => {
									this.timer = true;
									this.jiaCar(item)
								})
							})
						}
					}
				})
				}
			},
			foot2JianItem(item, el) {
				if(this.timer){
				this.timer = false;
				setTimeout(()=>{
					this.timer = true;
				},500)
				let list = [];
				if (el == 1) {
					list = this.shuiguoList
				} else
				if (el == 2) {
					list = this.shopList2
				} else
				if (el == 3) {
					list = this.footPb
				}
				if (el == 4) {
					list = this.shucaiList
				}
				_.map(list, fil => {
					if (fil.id == item.id) {
						item.num--;
						if (item.num == 0) {
							// App/Goods/add_car
							this.$getApi("/App/Goods/shop_car", {}, resCar => {
								console.log(resCar, item, "1212")

								let carId = _.filter(resCar.data, itemC => {
									return itemC.id == item.id
								})[0].cart_id;

								this.$getApi("/App/Goods/del_car", {
									ids: carId
								}, resCar => {
									this.timer = true;
									this.jianCar(item)
								})
							})
						} else {
							this.$getApi("/App/Goods/shop_car", {}, resCar => {
								let carId = _.filter(resCar.data, itemC => {
									return itemC.id == item.id
								})[0].cart_id;
								this.$getApi("/App/Goods/change_car_num", {
									id: carId,
									num: item.num
								}, res => {
									this.timer = true;
									this.jianCar(item)
								})
							})
						}
					}
				})
				}
			}
		}
	}
</script>
<style lang="scss">
	.jiushui_qu_sy {
		swiper {
			height: 260upx;

			swiper-item {
				height: 260upx;
			}
		}
	}
</style>
<style lang="scss" scoped>
	.pt26 {
		padding-top: 26upx;
	}

	.h_fixed {
		position: fixed;
		width: 750upx;
		left: 0;
		top: 0;
		background-color: rgba(24, 179, 87, 0);
		transition: all .5s;

		&.fixed {
			background-color: rgba(24, 179, 87, 1);
			z-index: 10;
		}
	}

	.item_nav1 {
		width: 170upx;
		flex-shrink: 0;
		text-align: center;

		&.active {
			.title1 {
				color: $uni-bl;
			}

			.money {
				color: #fff;
				background-color: $uni-bl;
			}
		}

		.title1 {
			font-weight: bold;
			font-size: 30upx;
			padding-bottom: 6upx;
		}

		.money {
			color: #999;
			padding: 6upx 12upx;
			transform: scale(.8);
			border-radius: 30upx;
		}
	}

	.hont_find {
		background-color: $uni-bl;
		border-radius: 22upx 22upx;
		margin-bottom: 26upx;
	}

	.hont_find2 {
		background-color: $uni-bl;
		border-radius: 22upx 22upx;
		margin-bottom: 26upx;
	}

	.shop_case_box {
		.shop_auto {
			background-color: #fff;
			border-radius: 22upx;
			padding: 26upx;
			box-sizing: border-box;
			display: flex;
			overflow-x: auto;
		}
	}

	.time_limit_sy {
		background-color: $uni-bl;
		margin-bottom: 26upx;
		border-radius: 22upx;

		.pt1 {
			display: flex;
			justify-content: center;
			color: #fff;
			padding: 20upx 0 10upx;
			align-items: center;

			.iconshijian1 {
				font-size: 40upx;
			}

			.title {
				font-size: 40upx;
				transform: skewX(-12deg);
				padding: 0 20upx 10upx;
				letter-spacing: 2px;
			}
		}

		.pt2_time_sy {
			display: flex;
			justify-content: center;
			color: #fff;
			padding-bottom: 20upx;

			.text {
				padding: 0 20upx;
			}

			.to_time {
				background-color: #f0f0f0;
				padding: 0 20upx;
				border-radius: 20upx;
			}
		}

		.time_limit_box {
			display: flex;
			flex-wrap: wrap;
			padding: 0 0upx 20upx 12upx;
			// justify-content: space-around;

			.item {
				width: 22%;
				background-color: #fff;
				text-align: center;
				border-radius: 16upx;
				margin-bottom: 16upx;
				margin-left: 2%;
				.img_box {

					.img {
						width: 110upx;
						height: 120upx;
					}
				}

				.name {
					border-radius: 16upx;

					&.bl {
						background-color: #CDF3DD;
						color: $uni-bl;
					}

					&.zi {
						background-color: #EAE5FF;
						color: #A897FF;
					}

					&.fen {
						background-color: #FFDFF9;
						color: #FF88E6;
					}

					&.ye {
						background-color: #FEE9CB;
						color: $uni-ye;
					}
				}
			}
		}
	}

	.jiushui_qu_sy {
		margin: 100upx 26upx 20upx;
		border: 20upx solid $uni-bl;
		border-top: 130upx solid $uni-bl;
		position: relative;

		.ab_img {
			position: absolute;
			top: -210upx;
			left: -30upx;

			.img {
				width: 714upx;
				height: 200upx;
			}
		}

		.jiushui_box {
			display: flex;
			justify-content: space-around;
			padding-top: 10upx;

			.item {
				text-align: center;

				.img {
					width: 150upx;
					height: 150upx;
				}

				.money {
					background-color: $uni-red;
					transform: scale(.9);
					color: #fff;
					border-radius: 20upx;

					.num {
						font-size: 30upx;
					}

				}

				.text {
					font-size: 28upx;
					padding-top: 6upx;
				}
			}
		}
	}

	.nav_first_sy {
		width: 750upx;
		overflow-x: auto;
		padding: 10upx 0 20upx;

		.nav_box {
			display: flex;

			.item {
				display: inline-flex;
				// width: 200upx;
				flex-shrink: 0;
				margin-left: 20upx;
				background-color: #f0f0cc;
				justify-content: center;
				align-items: center;
				padding: 10upx 12upx;
				border-radius: 12upx;

				.nav_img {
					width: 160upx;
					height: 48upx;
				}

				.text {
					font-size: 26upx;
					margin-left: 10upx;
				}
			}
		}
	}

	.home {
		// padding-bottom: 50upx;
		// background-color: #f0f0f0;
		.mine_title {
			display: flex;
			align-items: center;

			.left_bobao_img {
				width: 140upx;
				height: 26upx;
				margin-bottom: 10px;
			}

			.bobao_text {
				flex: 1
			}
		}

		.guodu_header {
			position: relative;

			.guodu {
				position: absolute;
				width: 750upx;
				height: 100%;
				top: 0;
				left: 0;
				z-index: 1;
				transition: opacity 2s;
			}
		}

		.zindex10 {
			z-index: 10;
		}

		.header_title {
			text-align: center;
			color: #fff;
			font-size: 36upx;
		}

		.msg_info {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0upx 0upx;

			.address {
				display: inline-flex;
				align-items: center;
				color: #fff;

				.address_text {
					padding: 0 6upx 0upx 10upx;
					font-size: 32upx;
					max-width: 420upx;
					background-color: transparent;
					border: none;
					outline: none;

					&::after {
						border: none;
					}

				}

				.icondingwei1 {
					font-size: 32upx;
					position: relative;
					top: 4upx
				}

				.iconjiantou {
					font-size: 28upx;
					position: relative;
					top: 4upx
				}
			}
		}

		.home_nav1 {
			display: flex;
			justify-content: space-between;
			padding: 26upx 26upx;
			width: 698upx;

			.item {
				background-color: rgba(255, 255, 255, .2);
				padding: 4upx 30upx;
				border-radius: 40upx;
				color: #fff;
				font-weight: bold;
			}
		}

		.bt_img {
			.swiper-item {
				text-align: center;
			}

			.img1 {
				width: 700upx;
				height: 300upx;

			}
		}

		.home_nav2 {
			display: flex;

			flex-wrap: wrap;

			.item {
				width: 130upx;
				text-align: center;
				padding: 10upx 10upx 10upx 0;

				.nav2_img {
					width: 96upx;
					height: 96upx;
				}
			}
		}
	}

	.fuceng {
		height: 88upx;
		width: 750upx;
		position: relative;

		.trans {
			width: 700upx;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 10;
			padding: 10upx 26upx;

		}

	}

	.home_search_sy {
		// border: 1upx solid $uni-bl;
		border-radius: 40upx;
		background-color: #fff;
		transition: width 2s;

		.placeholder_no {
			color: #666;
			display: flex;
			justify-content: center;
			align-items: center;

			.iconsousuo {
				font-size: 26upx;
				padding-right: 20upx;

			}
		}
	}

	.pubuliu {
		display: flex;

		justify-content: space-between;
	}

	.weke_new {
		.weke_new_header_sy {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 10upx;
			margin: 20upx 26upx;

			.left {
				display: inline-flex;
				align-items: center;

				.t_img {
					width: 30upx;
					height: 30upx;
				}

				.title1 {
					font-size: 30upx;
					margin: 0 20upx;
					font-weight: bold;
				}

				.title2 {
					color: #999;
				}
			}

			.right {
				display: inline-flex;
				align-items: center;
				color: #999;
			}
		}


		.weke_box_item {
			width: 170upx;
			margin-right: 20upx;

			.t_img {
				width: 170upx;
				height: 170upx;
			}

			.title1 {
				color: #666;
				padding: 12upx 0 4upx;
			}

			.m {
				font-weight: bold;
			}
		}

	}

	.new_foot_box {
		background-color: #fff;
		padding-bottom: 30upx;
		margin-bottom: 20upx;
		border-radius: 20upx;

		.more {
			text-align: center;
			color: #666;
			border-top: 1upx solid #f0f0f0;
			padding-top: 16upx;

			.iconjiantou {
				position: relative;
				top: 4upx;
			}
		}

		.title_img {
			text-align: center;

			.img {
				width: 680upx;
				height: 200upx;
			}
		}

		.shop_list_c {
			padding: 0 20upx;
		}
	}

	.title_img_jx {
		text-align: center;
		padding: 20upx 0 30upx;

		.t1 {
			background: url(../../static/img/home/icon-jingx.png) no-repeat top center;
			background-size: 260upx 50upx;
			font-size: 32upx;
			font-weight: bold;
			color: #333;
			padding-top: 16upx;
		}

		.t2 {
			color: #999;
		}
	}

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

	.num_add_sy1 {
		display: inline-flex;

		.n {
			width: 30upx;
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
			transform: scale(.8);
		}

		.iconjia {
			background-color: #f0f0f0;
			color: #666;
			transform: scale(.8);

			&.show {
				background-color: $uni-bl;
				color: #fff;
			}
		}
	}

	.pop_youhui {
		width: 580upx;

		.quan_img1 {
			width: 580upx;
			height: 360upx;
			vertical-align: bottom;
		}

		.quan_list {
			background-color: #FF2734;
			height: 560upx;
			position: relative;
			overflow: hidden;

			.list_body {
				padding: 0upx 40upx 0upx;
				height: 560upx;
				overflow-y: auto;

				.list_body_i {
					padding: 20upx 0upx 100upx;

					.item {
						background: url(../../static/img/youcc.png) no-repeat center center;
						width: 500upx;
						height: 160upx;
						background-size: 500upx 160upx;
						margin-bottom: 20upx;
						display: flex;
						align-items: center;

						.left {
							width: 166upx;
							text-align: center;

							.money {
								font-size: 42upx;
							}
						}

						.right {
							.t1_l {
								font-size: 32upx;
								color: #333;
							}

							.t2_l {
								margin-top: 10upx;
								color: #999;
							}
						}
					}
				}
			}

			.quan_img2 {
				background: url(../../static/img/ts4.png) no-repeat center center;
				background-size: 580upx 120upx;
				position: absolute;
				bottom: -2upx;
				left: 0;
				width: 580upx;
				height: 120upx;
				text-align: center;
				line-height: 140upx;
				font-size: 42upx;
				color: #fff;
			}
		}

		.iconyduicuowushixin {
			margin: 20upx 0;
			text-align: center;
			font-size: 60upx;
			color: #fff;
		}
	}
</style>
