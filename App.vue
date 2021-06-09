<script>
	export default {
		onShow() {
			// #ifdef QY-WEIXIN
			/* ----------------------------- 检查程序更新情况 ----------------------------- */
			const updateManager = uni.getUpdateManager();
			// 当向小程序后台请求完新版本信息
			updateManager.onCheckForUpdate(function(res) {
				console.log("有更新：", res.hasUpdate); // 请求完新版本信息的回调
			});
			// 当新版本下载完成
			updateManager.onUpdateReady(function(res) {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启以应用？',
					success(res) {
						if (res.confirm) {
							updateManager.applyUpdate(); // 新的版本已经下载好
						}
					}
				});
			});
			// 当新版本下载失败
			updateManager.onUpdateFailed(function(res) {
				uni.showModal({
					title: '提示',
					content: '新版小程序下载失败\n请自行退出程序，手动卸载本程序，再运行',
					confirmText: "知道了"
				});
			});
			// #endif
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";

	/*每个页面公共css */
	// 隐藏scroll-view的滚动条
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}
</style>
