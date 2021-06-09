<template>
	<view class="u-wrap">
		<view class="sticky">
			<u-sticky>
				<u-tabs bar-width='80' :bold="false" :list="tabs" :is-scroll="true" :current="current" @change="change">
				</u-tabs>
			</u-sticky>
		</view>
		<scroll-view :scroll-into-view="itemId" class="work-scroll"
			@scrolltolower="scroll_bottom()" scroll-y scroll-with-animation @scroll="workScroll">
			<view class="work-ctx" :id="'md' + index" v-for="(item,index) in tabs" :key="index">
				<view class="work-title">{{item.name}}</view>
				<view class="work-container">
					<view class="work-item">
						<!-- <image :src="item.img"></image> -->
						<view style="height:300rpx;"></view>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<u-tabbar :list="tabar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0, // 主体内容据顶部距离
				itemId: 'md0', // scroll的id 设置描点定位
				tabar: this.$store.state.tabar, // 底部tabar数据
				current: 0, //预设当前项的值
				tabs: [], // 选项卡数据
				pH: 0, // 窗口高度
				navHeight: 0, // 元素所需高度
				timer: null, // 定时器
				top_list: [], //节点集合数组
			}
		},
		onReady() {
			this.getData();
			this.getSystemHeight();
		},
		methods: {
			async getData() {
				const res = await this.$u.api.getWorkList();
				this.tabs = res;
			},
			// 对scroll-view进行高度自适应
			getSystemHeight() {
				let that = this;
				uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
					success(res) { //成功回调函数
						that._data.pH = res.windowHeight //windoHeight为窗口高度，主要使用的是这个
						let titleH = uni.createSelectorQuery().select(".work-scroll"); //想要获取高度的元素名（class/id）
						titleH.boundingClientRect(data => {
							let pH = that._data.pH;
							that._data.navHeight = pH - data.top //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
						}).exec()
					}
				})
			},
			// tabs切换索引
			change(index) {
				console.log(index)
				this.current = index;
				this.itemId = 'md' + index;
				// 解决最后一个 ***来回***问题
				uni.setStorageSync("resolve", "last");
				setTimeout(() => {
					uni.clearStorageSync("resolve")
				}, 400);
			},
			// 内容列表滚动
			workScroll(options) {
				//options  为滚动信息。  options.detail.scrollTop  值为相对于scroll-view。
				if (!uni.getStorageSync("resolve")) {
					this.get_node_details(options);
				};
			},
			//获取节点信息
			get_node_details(options) {
				const query = uni.createSelectorQuery().in(this); //获得实力
				//获取多个节点方式
				query.selectAll(".work-ctx").boundingClientRect(data => {
					this.top_list = data.map(item => {
						return Math.ceil(item.top);
					});
					// this.$u.throttle(this.async_detail_msg(options), 10)
					this.async_detail_msg(options)
				}).exec();
			},
			async_detail_msg(options) {
				//options  为滚动信息。  options.detail.scrollTop  值为相对于scroll-view。
				let top_page = options.detail.scrollTop + this.top_list[0];
				for (let i = 0; i < this.top_list.length; i++) {
					let node1 = this.top_list[i];
					let node2 = this.top_list[i + 1];
					if (node2 && top_page >= node1 && top_page < node2) {
						this.current = i;
						break;
					} else if (node2 && top_page === node2) {
						this.current = i + 1;
						break;
					}
				}
			},
			//滚动到底部
			scroll_bottom(options) {
				this.change(this.tabs.length - 1)
			},
		},
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));

		/* #endif */
		.sticky {
			height: 80rpx;
		}

		.work-scroll {
			height: 1334rpx;
			.work-ctx {
				margin: auto;
				width: 710rpx;
				background-color: red;

				.work-title {
					margin-top: 20rpx;
					font-size: 36rpx;
				}

				.work-container {
					width: 710rpx;
					display: flex;
					flex-wrap: wrap;
				}
			}
		}
	}
</style>
