<template>
	<view class="container">
		<view class="top">
			<view class="bkg"><image src="../../static/user/背景@3x.png"></image></view>
			<text>188</text>
			<text>累计积分总数</text>
			<view style="background: #FFFFFF;height: 100pt;
		width: 355px;position: absolute;
    margin-top: -140px;margin-left: 2px;">
				<view><text style="    margin-top: 10px;
    margin-left: 5px;
    position: absolute;width: 106pt;
height: 25pt;
font-size: 14pt;
font-family: PingFangSC, PingFangSC-Medium;
font-weight: 500;
text-align: left;
color: #222222;
line-height: 20pt;">已连续签到 7 天</text></view>
				<view class="week">
					<view class="day">
						<text>周三</text>
						<text>07.1</text>
						<image src="../../static/user/对@3x.png"></image>
					</view>
					<view class="day">
						<text>周四</text>
						<text>07.2</text>
						<image src="../../static/user/对@3x.png"></image>
					</view>
					<view class="day">
						<text>周五</text>
						<text>07.3</text>
						<image src="../../static/user/对@3x.png"></image>
					</view>
					<view class="day">
						<text>周六</text>
						<text>07.4</text>
						<image src="../../static/user/对@3x.png"></image>
					</view>
					<view class="day">
						<text>周日</text>
						<text>07.5</text>
						<image src="../../static/user/对@3x.png"></image>
					</view>
					<view class="day">
						<text>周一</text>
						<text>07.6</text>
						<image src="../../static/user/对@3x.png"></image>
					</view>
					<view class="day">
						<text>周二</text>
						<text>07.7</text>
						<image src="../../static/user/对@3x.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="task">
			<view class="title"> 
				<text>I</text>
				<text>日常任务</text>
			</view>
			<view class="daytask">
				<view style="display: grid;">
					<text>连续签到七天</text>
					<text style="margin-left: 100px;font-size: 11px;color: #C1C1C1;">2/7</text>
				</view>
				<image src="../../static/user/积分@3x.png"></image>
				<text>100</text>
				<button>领取</button>
			</view>
			<view class="daytask">
				<view style="display: grid;">
					<text>分享社区文案</text>
					<text style="margin-left: 100px;font-size: 11px;color: #C1C1C1;">1/7</text>
				</view>
				<image src="../../static/user/积分@3x.png"></image>
				<text>20</text>
				<button>领取</button>
			</view>
			<view class="daytask">
				<view style="display: grid;">
					<text>下载会员视频</text>
					<text style="margin-left: 100px;font-size: 11px;color: #C1C1C1;">3/7</text>
				</view>
				<image src="../../static/user/积分@3x.png"></image>
				<text>60</text>
				<button>领取</button>
			</view>
			<view class="daytask">
				<view style="display: grid;">
					<text>分享会员视频</text>
					<text style="margin-left: 100px;font-size: 11px;color: #C1C1C1;">5/7</text>
				</view>
				<image src="../../static/user/积分@3x.png"></image>
				<text>50</text>
				<button>领取</button>
			</view>
			<view class="daytask">
				<view style="display: grid;">
					<text>分享热门新品</text>
					<text style="margin-left: 100px;font-size: 11px;color: #C1C1C1;">7/7</text>
				</view>
				<image src="../../static/user/积分@3x.png"></image>
				<text>200</text>
				<button>领取</button>
			</view>
		</view>
		<view class="task">
			<view class="title">
				<text>I</text>
				<text>积分任务</text>
			</view>
			<view class="daytask">
				<image src="../../static/user/编组3@3x.png" style="width: 40pt;height: 40pt;"></image>
				<view style="width: 210px;margin-top: 5px;">
					<text>邀请知域星球新用户赚取积分</text>
					<text style="margin-left: 10px;font-size: 11pt;">2888积分</text>
				</view>
				<button style="margin:10px 2px 0 6px; font-size: 14px;width: 90px;">立即前往</button>
			</view>
		</view>
		<view class="task">
			<view class="title">
				<text>I</text>
				<text>积分兑换</text>
				<text style="margin-left: 200px;">更多</text>
			</view>
			<view class="group-section-1">
				<view>
					<image src="../../static/user/包@3x.png"></image>
					<text>充棉小挂包</text>
					<text>88积分</text>
				</view>
				<view>
					<image src="../../static/user/截屏2020-06-08下午1.58.59@3x.png"></image>
					<text>咆哮猛兽渔夫帽</text>
					<text>188积分</text>
				</view>
				<view>
					<image src="../../static/user/截屏2020-06-08下午1.59.13@3x.png"></image>
					<text>黑色电镀印花腰带</text>
					<text>288积分</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.bkg {
	image {
		height: 300px;
		width: 375px;
	}
}
.group-section-1{
		background: #fff;
		display: inline-flex;
		image{
			margin-left: 15px;
			margin-top: 10px;
			width: 90px;
			height: 90px;
		}
		text{
			margin-left: 20px;
		}
		text:nth-child(3){
			margin-left: 30px;
			color: #E35151;
		}
	}
.task{
		.title{
			height: 35pt;
			display: flex;
			background: #FFFFFF;
			padding: 5px;
			line-height: 30pt;
			text:nth-child(1){
				margin-right: 6px;
				margin-bottom: 5px;
				color: #51e3e2;
				font-size: 30px;
				font-weight: 1000;
				border-radius: 5pt;
			}
			text:nth-child(2){
				margin-right: 6px;
				margin-bottom: 15px;
				font-size: 22px;
				border-radius: 5pt;
			}
		}
		.daytask{
			margin-top: 1px;
			margin-bottom: 1px;
			padding: 3px 0 3px 5px;
			background: #FFFFFF;
			display: flex;
			image{
				width: 10pt;
				height: 10px;
				margin-top: 8px;
			}
			button{
				width: 60pt;
				height: 25pt;
				background: #ffffff;
				border: 1pt solid #51e3e2;
				margin-left: 100px;
				line-height: 25pt;
				color: #51e3e2;
				border-radius: inherit;
			}
			text:nth-child(1){
				width: 78pt;
				height: 20pt;
				font-size: 11pt;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: left;
				color: #222222;
				line-height: 20pt;
				margin-left: 10px;
				margin-right: 5px;
			}
			text:nth-child(3){
				width: 20pt;
				height: 17pt;
				font-size: 9pt;
				font-family: PingFangSC, PingFangSC-Regular;
				font-weight: 400;
				text-align: left;
				color: #f8d14f;
				margin-left: 10px;
				margin-top: 3px;
				line-height: 17pt;
			}
		}
		.skill{
			text-align: right;
			  padding-right: 20px;
			  line-height: 40px;
			  color: white;
		}
}
.top {
	text:nth-child(2) {
		width: 97pt;
		height: 84pt;
		font-size: 60pt;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: 500;
		text-align: center;
		color: #ffffff;
		line-height: 84pt;
		margin-top: -290px;
		margin-left: 120px;
		position: absolute;
	}
	text:nth-child(3) {
		width: 84pt;
		height: 20pt;
		font-size: 14pt;
		font-family: PingFangSC, PingFangSC-Medium;
		font-weight: 500;
		text-align: center;
		color: #ffffff;
		line-height: 20pt;
		margin-top: -170px;
		margin-left: 130px;
		position: absolute;
	}
	.week {
		padding: 0 2px 0 2px;
		display: flex;
		// background: #ffffff;
		height: 100pt;
		width: 355px;
		// margin-top: -140px;
		margin-left: 2px;
		position: absolute;
		text {
			width: 106pt;
			height: 25pt;
			font-size: 14pt;
			font-family: PingFangSC, PingFangSC-Medium;
			font-weight: 500;
			text-align: left;
			color: #222222;
			line-height: 20pt;
		}
		.day {
			margin-top: 50px;
			padding-top: 5px;
			width: 38pt;
			height: 55pt;
			margin-right: 2px;
			background: #51e3e2;
			border-radius: 1pt;
			image {
				width: 15pt;
				height: 20pt;
				margin-top: 19px;
				margin-left: 16px;
			}
			text:nth-child(1) {
				width: 16pt;
				height: 11pt;
				font-size: 8pt;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				text-align: center;
				color: #ffffff;
				line-height: 11pt;
				margin-left: 10pt;
			}
			text:nth-child(2) {
				width: 22pt;
				height: 11pt;
				font-size: 8pt;
				font-family: PingFangSC, PingFangSC-Medium;
				font-weight: 500;
				text-align: center;
				color: #ffffff;
				line-height: 11pt;
				margin-top: 20px;
				margin-left: -28px;
				position: absolute;
			}
		}
	}
}
</style>
