<template>
	<u-button @click="login()">登录</u-button>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods:{
			login() {
				// #ifdef QY-WEIXIN
				    wx.qy.login({
				      success: function(res) {
				        if (res.code) {
				          //发起网络请求
				          console.log(res);
				        } else {
				          console.log('登录失败！' + res.errMsg)
				        }
				      }
				    });
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
