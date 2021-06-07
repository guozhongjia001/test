
const install = (Vue,vm) => {
	// 请求配置
	Vue.prototype.$u.http.setConfig({
		baseUrl: '', // 请求的本域名
		method: 'POST',
		// 设置为json，返回后会对数据进行一次JSON.parse()
		dataType: 'json',
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		// 配置请求头信息
		header: {
			'content-type': 'application/json;charset=UTF-8'
		},
	});
	
	// 拦截器
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// config.header.token = uni.getStorageSync('token');
		config.header.token = '123456'
		return config;
	}
	
	// 响应拦截器
	Vue.prototype.$u.http.interceptor.response = (res) => {
		// 对状态码进行判断
		if(res.code == 200) {
			return res.result;
		} else if(res.code == 201) {
			vm.$u.toast('验证失败，请重新登录');
			setTimeout(() => {
				// uUview路由方法
				vm.$u.route('/pages/user/login')
			},1500)
			return false;
		} else {
			return false;
		}
	}
}

export default {
	install
}