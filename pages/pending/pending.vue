<template>
	<view class="wrap">
		<!-- uniapp获取节点信息，根据节点信息调整写需求。 -->
		<u-sticky>
			<scroll-view scroll-with-animation :scroll-left="scrollLeft" class="nav" enable-flex scroll-x>
				<view class="nav-item" v-for="(item,index) in tabs" :key="index" @click="change(index)"
					:class="{active:index == current}">
					{{item.name}}
				</view>
			</scroll-view>
		</u-sticky>
		<scroll-view scroll-y class="work-scroll" :scroll-into-view="scroll_into_view" scroll-with-animation="true"
			@scroll="scroll_detail" @scrolltolower="$u.throttle(scroll_bottom, 100)">
			<view v-for="(item,index) in tabs" :key="index" :id="'id'+index" class="work-item"
				:style="{height:index == tabs.length-1 ? '1334rpx !important;' : ''}">
				<u-gap height="40" bg-color="#bbb"></u-gap>
				<view style="background: red;">{{item.name}}</view>
				<u-gap height="20" bg-color="#bbb"></u-gap>
				<view v-for="(ite,ind) in item.list" :key="ind">{{ite}}</view>
			</view>
		</scroll-view>
		<u-tabbar :list="tabar" :mid-button="true"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabar: this.$store.state.tabar, // 底部tabar数据
				current: 0, //导航栏索引
				tabs: [{
						name: "手机",
						list: ["iphone12", "华为p40", "vivo90", "oppoy77", "三星手机"]
					},
					{
						name: "电脑",
						list: ["Mac pro", "联想yoga910", "华硕911", "联想811", "三星电脑"]
					},
					{
						name: "水果",
						list: ["香蕉", "苹果", "西瓜", "榴莲", "山竹"]
					},
					{
						name: "饮料",
						list: ["coke可乐", "脉动", "红牛", "冰糖雪梨", "果汁"]
					},
					{
						name: "饮料",
						list: ["coke可乐", "脉动", "红牛", "冰糖雪梨", "果汁"]
					},
					{
						name: "饮料",
						list: ["coke可乐", "脉动", "红牛", "冰糖雪梨", "果汁"]
					},
					{
						name: "饮料",
						list: ["coke可乐", "脉动", "红牛", "冰糖雪梨", "果汁"]
					},
					{
						name: "饮料",
						list: ["coke可乐", "脉动", "红牛", "冰糖雪梨", "果汁"]
					},
					{
						name: "饮料",
						list: ["coke可乐", "脉动", "红牛", "冰糖雪梨", "果汁"]
					},
					{
						name: "饮料",
						list: ["coke可乐", "脉动", "红牛", "冰糖雪梨", "果汁"]
					},
					{
						name: "饮料",
						list: ["coke可乐", "脉动", "红牛", "冰糖雪梨", "果汁"]
					},
				],
				// scroll 描点定位
				scroll_into_view: "",
				//节点top值
				top_list: [],
				contentScrollW: 0, // 导航区宽度
				scrollLeft: 0, // 横向滚动条位置
			}
		},
		mounted() {
			// 获取标题区域宽度，和每个子元素节点的宽度
			this.getScrollW()
		},
		methods: {
			// 获取标题区域宽度，和每个子元素节点的宽度以及元素距离左边栏的距离
			getScrollW() {
				const query = uni.createSelectorQuery().in(this);

				query.select('.nav').boundingClientRect(data => {
					// 拿到 scroll-view 组件宽度
					this.contentScrollW = data.width
				}).exec();

				query.selectAll('.nav-item').boundingClientRect(data => {
					let dataLen = data.length;
					for (let i = 0; i < dataLen; i++) {
						//  scroll-view 子元素组件距离左边栏的距离
						this.tabs[i].left = data[i].left;
						//  scroll-view 子元素组件宽度
						this.tabs[i].width = data[i].width
					}
				}).exec()
			},
			//切换
			change(index) {
				this.current = index;
				this.navChange(index);
				//利用uniapp组件的配置信息。
				this.scroll_into_view = 'id' + index;
				//解决最后一个 ***来回*** 问题 (由于点击左侧导航，右侧锚点位置信息变化，此时滚动事件也随之滚动。)
				uni.setStorageSync("resolve", "last");
				setTimeout(() => {
					uni.clearStorageSync("resolve")
				}, 400);
			},
			//滚动过程
			scroll_detail(options) {
				//options  为滚动信息。  options.detail.scrollTop  值为相对于scroll-view。
				if (!uni.getStorageSync("resolve")) {
					this.get_node_details(options);
				};
			},
			//获取节点信息
			get_node_details(options) {
				const query = uni.createSelectorQuery().in(this); //获得实力
				//获取多个节点方式
				query.selectAll(".work-item").boundingClientRect(data => {
					this.top_list = data.map(item => {
						return Math.ceil(item.top);
					});
					this.$u.throttle(this.async_detail_msg(options), 10)
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
						this.navChange(i);
						break;
					} else if (node2 && top_page === node2) {
						this.current = i + 1;
						this.navChange(i+ 1);
						break;
					}
				}
			},
			//滚动到底部
			scroll_bottom(options) {
				this.current = this.tabs.length - 1;
				this.navChange(this.current);
			},
			// 导航栏发生变化
			navChange(index) {
				// 效果三(当前点击子元素居中展示)  不受子元素宽度影响
				this.scrollLeft = this.tabs[index].left - this.contentScrollW / 2 + this.tabs[index].width / 2;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.active {
		color: red;
	}

	.wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));

		/* #endif */
		.nav {
			display: flex;
			height: 50rpx;
			width: 100%;

			.nav-item {
				flex-shrink: 0;
				width: 50rpx;
				margin-right: 40rpx;
				background-color: pink;
				white-space: nowrap;

			}
		}

		.sticky {
			height: 80rpx;
		}

		.work-scroll {
			margin: 0 auto;
			height: 1334rpx;
			width: 710rpx;

			.work-item {
				height: 500rpx;
				background-color: pink;
			}

			.work-item:last-child {
				color: blue;
			}
		}
	}
</style>
