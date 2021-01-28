import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
console.log(uni.getStorageSync("userInfo"))
let hasLogin = (uni.getStorageSync("userInfo") && uni.getStorageSync("userInfo").id) ? true :false;
let userInfo = uni.getStorageSync("userInfo")? uni.getStorageSync("userInfo") : {};
console.log("111",hasLogin)
const store = new Vuex.Store({
	state: {
		hasLogin: hasLogin,
		userInfo: userInfo,
		httpp:"https://www.junjiayouxuan.com",
		selCity:"郑州",
		back:1
	},
	mutations: {
		login(state, provider) {
			console.log("change login")
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		},
		setCity(state, data){
			state.selCity = data;
			uni.setStorageSync('carBrand',data);
		},
	},
	actions: {
		
	}
})

export default store
