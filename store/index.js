import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		tabar: [{
				iconPath: "https://i.loli.net/2021/06/07/gxzWG51b923Uldj.png",
				selectedIconPath: "https://i.loli.net/2021/06/07/vIOUtrwfFTxVsPd.png",
				text: '首页',
				pagePath: "/pages/index/index"
			},
			{
				iconPath: "https://i.loli.net/2021/06/07/vByn2IepizkDxKA.png",
				selectedIconPath: "https://i.loli.net/2021/06/07/WCD9QT5JniZxd1k.png",
				text: '代办',
				pagePath: "/pages/pending/pending"
			},
			{
				iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
				selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
				text: '',
				pagePath: "/pages/addwork/addwork",
				midButton: true,
				customIcon: false,
			},
			{
				iconPath: "https://i.loli.net/2021/06/07/7BhxLj8ClagqvMH.png",
				selectedIconPath: "https://i.loli.net/2021/06/07/vrQ9J8ljL2DzoBc.png",
				text: '工作',
				pagePath: "/pages/work/work"
			},
			{
				iconPath: "https://i.loli.net/2021/06/07/uaYDEdTRPHrVLNt.png",
				selectedIconPath: "https://i.loli.net/2021/06/07/EVpzoP4LNQJA6ks.png",
				text: '我的',
				pagePath: "/pages/my/my"
			}
		]
	},
	mutations: {},
	action: {}
})

export default store
