<template>
	<view>
		<view class="cate-section">
			<view v-for="(item, index) in categoryButtomList" :key="index" @click="naviageToPage(item.url)" class="cate-item">
				<image :src="item.imgUrl" @click="navTo(item.url)"></image>
				<text>{{item.title}}</text>
			</view>
		</view>
		<view style="padding-bottom: 2px;">
			<view class="user-info-box">
				<view class="portrait-box"><image class="portrait" src="/static/missing-face.png"></image></view>
				<view class="info-box">
					<text @click="toLogin" class="username">爱吃鱼干的二哈</text>
					<text>吃饭了吗</text>
				</view>
			</view>
		</view>
		<view style="padding-bottom: 2px;">
			<view class="user-info-box">
				<view class="portrait-box"><image class="portrait" src="/static/missing-face.png"></image></view>
				<view class="info-box">
					<text @click="toLogin" class="username">爱吃鱼干的二哈</text>
					<text>我吃了</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryButtomList: [{
							title:'产品动态',
							imgUrl:'../../static/index图标/产品动态@3x.png',
							url:'/pages/index/goodNew'
						},
						{
							title:'通知消息',
							imgUrl:'../../static/index图标/通知消息@3x.png',
							url:'/pages/index/mes'
						},{
							title:'优惠促销',
							imgUrl:'../../static/index图标/优惠促销@3x.png',
							url:'/pages/index/discount'
						},{
							title:'知域客服',
							imgUrl:'../../static/index图标/知域客服@3x.png',
							url:'/pages/user/onlineservice'
						}]
			};
		},
		methods:{
			naviageToPage(page) {
				uni.navigateTo({
					url: page
				})
			}
		}
	}
</script>

<style lang="scss">
.cate-section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap:wrap;
		padding: 30upx 22upx; 
		background: #fff;
		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
		}
		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width: 88upx;
			height: 88upx;
			margin-bottom: 14upx;
			border-radius: 50%;
			opacity: .7;
			box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
		}
	}
	.user-info-box {
		height: 160upx;
		display: flex;
		// align-items: center;
		position: relative;
		z-index: 1;
		background: #ffffff;
		.portrait-box{
			image{
				margin-top: 15px;
				width: 45px;
				height: 45px;
			}
		}
		.portrait {
			width: 130upx;
			height: 130upx;
			border: 5upx solid #fff;
			border-radius: 50%;
			margin-left: 19px;
			margin-top: 10px;
		}
		image{
			width: 40px;
			height: 40px;
		}
		.info-box {
			// display: flex;
			// background: #FFFFFF;
			padding-bottom: 2px;
			margin-top: 10px;
			display: grid;
			button {
				margin-left: 140px;
				background: #edfdfc;
				color: #94e8e9;
				height: 25px;
				width: 80px;
				font-size: 14px;
				line-height: 25px;
				&:after {
					border: 0px solid rgba(0, 0, 0, 0.2);
				}
			}
			text:nth-child(2){
				margin-left: 10px;
				color: #999999;
			}
		}
		.username {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-left: 20upx;
			margin-top: 10px;
		}
	}
</style>
