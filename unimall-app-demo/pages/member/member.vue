<template>
	<view class="container">
		<view class="memberad" @click="naviageToPage('/pages/member/notmemeber')">
			<image src="../../static/member/banner5@3x.png"></image>
			<view class="fenge"></view>
		</view>
		<view class="membervideo">
			
			<text><image src="../../static/member/视频@3x.png" style="width: 22px;height: 19px;margin-right: 10px;"></image>会员视频</text>
			<text @click="naviageToPage('/pages/member/videoCategory')">查看更多</text>
			<view class="courses_list">
				<view class="course_item" @click="naviageToPage('/pages/public/test')">
					<image src="../../static/member/banner@3x.png"></image>
					<view class="course_title">
						<text>uniapp从入门到放弃</text>
						<text></text>
					</view> 
					<view class="course_introd">
						<text>初级教学视频，适合前端工作爱好者学习</text>
					</view>
				</view>
			</view>
		</view>
		<view class="fenge"></view>
		<view class="membervideo">
			<text><image src="../../static/member/课程@3x.png" style="width: 22px;height: 19px;margin-right: 10px;"></image>会员课程</text>
			<text @click="naviageToPage('/pages/member/goldVideo')">查看更多</text>
			<!-- <video src="http://vt1.doubanio.com/201910131716/ff3b54448cd1c56470bfb9ff1451922c/view/movie/M/402300311.mp4"></video> -->
			<view class="courses_list">
				<view class="course_item" @click="naviageToPage('/pages/member/goldVideo')">
					<image src="../../static/member/banner@3x的副本 2.png"></image>
					<view class="course_title" @click="naviageToPage('/pages/member/goldVideo')">
						<text>uniapp从入门到放弃</text>
						<text></text>
					</view>
					<view class="course_introd">
						<text>初级教学视频，适合前端工作爱好者学习</text>
					</view>
				</view>
			</view>
		</view>
		<view class="fenge"></view>
		<view class="membervideo" @click="naviageToPage('/pages/member/goldteacher')">
			<text><image src="../../static/member/导师达人@3x.png" style="width: 22px;height: 19px;margin-right: 10px;"></image>名师一对一</text>
			<text>查看更多</text>
			<view class="courses_list">
				<view class="course_item">
					<image src="../../static/member/banner@3x的副本.png"></image>
					<view class="course_title" @click="naviageToPage('/pages/member/goldteacher')">
						<text>uniapp从入门到放弃</text>
						<text></text>
					</view>
					<view class="course_introd">
						<text>初级教学视频，适合前端工作爱好者学习</text>
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
				
			}
		},
		methods: {
			naviageToPage(page) {
				uni.navigateTo({
					url: page
				})
			},
		}
	}
</script>

<style lang="scss">
	.container{
		background: #FFFFFF;
	}
	.memberad{
		height: 150px;
		image{
			height: 150px;
			width: 375px;
			text-align: center;
		}
	}
	.fenge{
		background:#f8f8f8;
		margin: 5px 0 10px 0;
		height: 6px;
	}
	.membervideo{
		margin: 10px 8px 0 8px;
		padding: 15rpx 15rpx;
		display: flex;
		flex-wrap: wrap;
		font-size: 18px;
		justify-content: space-between;
		text:nth-child(2){
			color: #9d9d9d;
			font-size: 13px;
			margin:2px 10px 0 0;
			text-align:right;
			width: 300rpx;
		}
		.courses_list{
			margin-top: 5px;
			image{
				width: 100%;
				height: 150px;
			}
			.course_title{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				font-size: 18px;
				justify-content: space-between;
				text:nth-child(2){
					color: #262626;
					font-size: 13px;
					margin:0px 12px 0 0;
					text-align:right;
					width: 300rpx;
				}
			}
			.course_introd{
				margin-top: 8px;
				width: 100%;
				color: #9d9d9d;
				display: flex;
				flex-wrap: wrap;
				font-size: 10px;
		}
	}
	.video-play{
		text-align:center
	}
}
	
	
</style>
