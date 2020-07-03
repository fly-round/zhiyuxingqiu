<template>
	<view class="container">
		<view class="memberad" @click="naviageToPage('/pages/member/notmemeber')">
			<image src="../../static/member/banner6@3x.png"></image>
			<view class="fenge"></view>
		</view>
		<view class="membervideo">
			<text><image src="../../static/member/会员@3x.png" style="width: 25px;height: 22px;"></image>会员</text>
			<view class="courses_list">
				<view class="course_item" @click="naviageToPage('/pages/member/goldVideo')">
					<image src="../../static/member/banner2@3x.png"></image>
					<view class="course_title" @click="naviageToPage('/pages/member/member')">
						<text>黄金会员</text>
						<text>已购</text>
					</view>
					<view class="course_introd">
						<text>短视频新手、抖音爱好者</text>
						<view class="price">
							<text>¥698</text>
							<text>¥1688</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fenge"></view>
		<view class="membervideo">
			<view class="courses_list">
				<view class="course_item" @click="naviageToPage('/pages/member/9800member/9800member')">
					<image src="../../static/member/banner备份@3x.png"></image>
					<!-- <image src="../../static/temp/banner4.jpg" style="position: absolute;z-index: 2;"></image> -->
					<view class="course_title" @click="naviageToPage('/pages/member/goldVideo')">
						<text>铂金会员</text>
						<text>已购</text>
					</view>
					<view class="course_introd">
						<text>周末直播课、导师录播、平台实战演练</text>
						<view class="price">
							<text>¥2980</text>
							<text>¥3980</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fenge"></view>
		<view class="membervideo">
			<view class="courses_list">
				<view class="course_item" @click="naviageToPage('/pages/member/member')">
					<image src="../../static/member/banner备份 2@3x.png" style="position: relative;-webkit-filter: brightness(50%);
filter: brightness(50%);"></image>
					<image src="../../static/member/icon-导师@3x.png" style="position: absolute;
					z-index: 2;
					width: 50px;
					left: 158px;
					bottom: -320px;
					height: 50px;"></image>
					<view class="course_title" @click="naviageToPage('/pages/member/member')">
						<text>钻石会员</text>
						<button>抢购</button>
					</view>
					<view class="course_introd">
						<text>专属导师晋升研修课程</text>
						<view class="price">
							<text>¥9800</text>
							<text>¥12800</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fenge"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				vipType: 2,
			}
		},
		methods: {
			naviageToPage(page) {
				if(page=='/pages/member/member' && this.vipType!=3){
					uni.showToast({
						title:'开通会员才能享受会员待遇哦',
						duration:2000
					})
				}else{
					uni.navigateTo({
						url: page
					})
				}
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
				height: 160px;
			}
			.course_title{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				font-size: 18px;
				justify-content: space-between;
				// line-height: 38px;
				margin-top: 5px;
				text:nth-child(2){
					color: #262626;
					font-size: 13px;
					margin:0px 12px 0 0;
					text-align:right;
					width: 300rpx;
				}
				button{
					width: 60px;
					height: 30px;
					line-height: 30px;
				    background: #51e3e3;
				    color: #FFFFFF;
				    margin-left: 190px;
				}
			}
			.course_introd{
				// margin-top: 5px;
				width: 100%;
				color: #9d9d9d;
				display: flex;
				flex-wrap: wrap;
				font-size: 10px;
				text{
					display: flex;
					font-size: 15px;
					margin-top: 5px;
				}
				.price{
					color: #E35151;
					display: flex;
					font-size: 20px;
					text{
						font-size: 18px;
					}
					text:nth-child(2){
						color: #C0C0C0;
						font-size: 15px;
						margin-left: 17rpx;
						text-decoration: line-through;
						margin-top: 8px;
					}
				}
		}
	}
	.video-play{
		text-align:center
	}
}
	
	
</style>
