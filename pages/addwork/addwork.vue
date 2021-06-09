<template>
	<view>
		新增页面
		<u-tabbar :list="tabar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabar: this.$store.state.tabar,
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
