<template>
	<view class="content">
		首页
		<u-button @click="btn()">登录</u-button>
		<u-tabbar :list="tabar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				tabar: this.$store.state.tabar,
			}
		},
		onLoad() {},
		methods: {
			btn() {
				console.log(111);
				// this.$u.route('/pages/login/login')
				this.$u.api.getUserInfo().then((res) => {
					console.log(res);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
