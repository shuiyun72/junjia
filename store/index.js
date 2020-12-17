import Vue from 'vue'
import Vuex from 'vuex'
import _ from "../until/lodash"
Vue.use(Vuex)
console.log(uni.getStorageSync("userInfo"))
let hasLogin = (uni.getStorageSync("userInfo") && uni.getStorageSync("userInfo").id) ? true : false;
// uni.setStorage({ //缓存用户登陆状态
// 	key: 'userInfo',
// 	data: {
// 	avatar: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJLJSviajaYwLrWzrh8J9ZrYSHXWo3Pdb7otFsaeGXQVrgvf2Vib40iaTyVsTlqrcdcgMa4S32lZqB6A/132",
// 	id: "5",
// 	nickname: "阿木木",
// 	status: "1"
// 	}
// })
console.log("111", hasLogin)
const store = new Vuex.Store({
	state: {
		hasLogin: hasLogin,
		userInfo: uni.getStorageSync("userInfo") || {},
		httpp: "https://www.henankedou.com/uploads/",
		selCity: "郑州",
		location:{
			name:"",
			address:"选择定位"
		},
		back: 1,
		SystemInfo: "",
		shopCar: [],
		itemHg:"",
		classify:"",
		orderTrueFoot:[],
		address:"",
		youhuiquan:{}
	},
	mutations: {
		login(state, provider) {
			console.log("change login")
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({ //缓存用户登陆状态
				key: 'userInfo',
				data: provider
			})
		},
		setInit(state){
			state.shopCar = [];
			uni.setStorageSync('shopCar',state.shopCar)
			state.youhuiquan = {};
		},
		setReCar(state,items){
			state.shopCar = items;
			uni.setStorageSync('shopCar',items)
		},
		setYouhuiquan(state,items){
			state.youhuiquan = items
		},
		setAddress(state,items){
			state.address = items
		},
		setOrderTrueFoot(state,items){
			state.orderTrueFoot = items
		},
		setItemHg(state,item){
			state.itemHg = item
			console.log(item,"37hang")
		},
		setClassify(state,item){
			state.classify = item
		},
		setLocation(state,item){
			state.location = item
		},
		delCar(state,items){
			state.shopCar = _.filter(items,fil=>{
				return fil.sel == 0
			})
			uni.setStorageSync('shopCar',state.shopCar)
		},
		jiaCar(state,item) {
			console.log("我是加")
			let thisIndex = _.filter(state.shopCar,fil=>{
				return fil.id == item.id
			})
			if(thisIndex.length == 0){
				state.shopCar.push(item)	
			}else{
				let index = _.findIndex(state.shopCar,thisIndex[0]);
				console.log(index,"34")
				state.shopCar[index].num = item.num;
			}
			_.uniq(state.shopCar);
			uni.setStorageSync('shopCar',state.shopCar)
		},
		jianCar(state,item) {
			console.log("我是减")
			let thisIndex = _.filter(state.shopCar,fil=>{
				return fil.id == item.id
			})
			let index = _.findIndex(state.shopCar,thisIndex[0]);
			if(item.num == 0){
				state.shopCar.splice(index,1)
			}else{
				state.shopCar[index].num = item.num;
			}
			
			console.log(index,"51")
			_.uniq(state.shopCar);
			uni.setStorageSync('shopCar',state.shopCar)
		},
		clearCar(state, data) {
			state.shopCar = [];
			uni.setStorageSync('shopCar',state.shopCar)
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			})
		},
		setCity(state, data) {
			state.selCity = data;
			uni.setStorageSync('carBrand', data);
		},
		setSystemInfo(state, el) {
			state.SystemInfo = el;
		},
	},
	actions: {

	}
})

export default store
