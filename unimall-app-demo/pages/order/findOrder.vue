<template>
	<view class="content">
		<view class="input">
			<input value="  请输入订单号"/>
		</view>
		<button @click="show">立即找回</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	methods: {
		show (){
			uni.showModal({
				title: '订单找回成功',
				content: '有问题请及时联系客服呦',
				cancelText: '联系客服',
				confirmText: '知道了',
				success: (e) => {
					if (e.cancel) {
						uni.navigateTo({
							url: '/pages/user/realserver'
						})
					}
				},
				fail: () => {},
				complete: () => {
					loginLock = false
				}
			})
		}
	}
};
</script>

<style lang="scss">
.content{
	background: #FFFFFF;
	height: 596px;
	.input{
		height: 100px;
		padding: 20px;
		input{
			// margin-left: 10px;
			background: #f6f6f6;
			height: 40px;
			color: #b8b8b8;
		}
	}
	button{
		width: 300px;
		background: #51E3E2;
		color: white;
	}
}	
</style>
