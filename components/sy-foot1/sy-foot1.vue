<template>
	<view class="case_item_sy" @click="handleClick(item)">
		<view class="t_center">
			<image :src="'../../static/img/home/'+item.img" class="img_c" mode=""></image>
		</view>
		<view class="text_l">
			{{item.t1}}
		</view>
		<view class="ctrl">
			<view class="">
				<view class="red">
					￥<text>{{item.m1}}</text>
				</view>
				<view class="red sc9" v-if="isTuan">
					团购价
				</view>
				<view class="del" v-if="!isTuan">
					￥<text>{{item.m2}}</text>
				</view>
			</view>
			<view class="iconfont iconjia1"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
			};
		},
		props:["item","isTuan"],
		methods:{
			handleClick(item){
				this.$emit('click',item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.case_item_sy {
		width: 170upx;
		margin-right: 30upx;
		flex-shrink: 0;

		.img_c {
			width: 160upx;
			height: 160upx;
		}

		.text_l {
			color: #333;
			width: 180upx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;

		}
		.sc9{
			transform: scale(.9);
		}
		.ctrl {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.del {
				text-decoration: line-through;
				color: #999;
			}

			.iconjia1 {
				color: $uni-bl;
			}
		}
	}
</style>
