<template>
	<view class="content">
		<button type="primary" @click="onClickStartRecord()">视频拍摄</button>
		<button type="primary" @click="onClickStartImport()">视频编辑</button>
		<button type="primary" @click="onClickStartCrop()">视频裁剪</button>
	</view>
</template>

<script>
	//插件对象
	var sdkWX = uni.requireNativePlugin('Ali-SVSdkWX');
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			onClickStartRecord() {
				//视频拍摄
				sdkWX.startRecord({
					minDuration:2000,//最小时长，大于0
					maxDuration:15000,//最大时长，不超过300000即300s
					gop:250,//关键帧间隔，建议1-300
					videoQuality:1,//视频质量，取值0-5，分别表示SSD, HD, SD, LD, PD, EPD
					ratioMode:2,//视频比例，取值0-2，分别表示3:4，1:1，9:16
					resolutionMode:3,//分辨率，取值0-3，分别表示360P，480P，540P，720P
					videoCodecs:0,//视频编码方式，取值0-2，分别表示H264_HARDWARE(硬编)，H264_SOFT_OPENH264(软编)，H264_SOFT_FFMPEG(软编)
					videoRenderingMode:0,//高级美颜，取值0-1，分别表示FaceUnity，Race
					isUseFlip:false,//是否镜像输出
					shootMode:0//拍摄方式，取值0-1，分别表示普通，合拍
				});
			},
			onClickStartImport() {
				//视频编辑
				sdkWX.startImport({
					frameRate:30,//帧率，建议20-30
					gop:250,//关键帧间隔，建议1-300
					videoQuality:1,//视频质量，取值0-5，分别表示SSD, HD, SD, LD, PD, EPD
					ratioMode:2,//视频比例，取值0-2，分别表示3:4，1:1，9:16
					resolutionMode:3,//分辨率，取值0-3，分别表示360P，480P，540P，720P
					scaleMode:1,//裁剪模式，取值0-1，分别表示画面裁剪，画面填充
					hasTailAnimation:false,//是否添加片尾水印
					videoCodecs:0//视频编码方式，取值0-2，分别表示H264_HARDWARE(硬编)，H264_SOFT_OPENH264(软编)，H264_SOFT_FFMPEG(软编)
				});
			},
			onClickStartCrop() {
				//视频裁剪
				sdkWX.startCrop({
					frameRate:30,//帧率，建议20-30
					gop:250,//关键帧间隔，建议1-300
					videoQuality:1,//视频质量，取值0-5，分别表示SSD, HD, SD, LD, PD, EPD
					ratioMode:2,//视频比例，取值0-2，分别表示3:4，1:1，9:16
					resolutionMode:3,//分辨率，取值0-3，分别表示360P，480P，540P，720P
					scaleMode:1,//裁剪模式，取值0-1，分别表示画面裁剪，画面填充
					videoCodecs:0//视频编码方式，取值0-2，分别表示H264_HARDWARE(硬编)，H264_SOFT_OPENH264(软编)，H264_SOFT_FFMPEG(软编)
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
