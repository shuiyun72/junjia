<template>
	<view class="mine_msg">
		<uni-list>
			<sy-list-item title="头像" note=""  :showArrow="false">
				 <template v-slot:right="">
					<image class="slot-image" :src="userInfo.avatar" mode="widthFix"></image>
				</template>
			</sy-list-item>
			<sy-list-item title="昵称" note="" :rightText="userInfo.nickname" :showArrow="false"></sy-list-item>
			<sy-list-item title="手机号" note="" :rightText="userInfo.phone" :showArrow="false"></sy-list-item>
			<!-- <sy-list-item title="昵称" note="" :rightText="userInfo.name2" :showArrow="false"></sy-list-item> -->
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{
					img:"",
					name1:"调皮女王",
					phone:"1365333333",
					name2:"我爱买买买"
				}
			};
		},
		onShow() {
			this.$getApi('/App/User/userInfo',{},res=>{
				console.log(res)
				this.userInfo = res.data
				// uni.navigateTo({
				// 	url:"../home/msg?title=修改成功"
				// })
			})
		}
	}
</script>

<style lang="scss" scoped>
.mine_msg{
	height: 100vh;
	background-color: #f0f0f0;
	.slot-image{
		width: 100upx;
		height: 100upx;
	}
}
</style>
