// 接口正式域名
// const http = 'www.baidu.com';

// 接口mock域名
const http = 'https://www.fastmock.site/mock/8e1666266b7ec47c6516c389753072a9/v1';

// 获取用户信息
const getUserInfoList = http + '/api/getUserInfo';
// 创建用户
const createUser = http + 'v2/createUser';
// 用户登录
const loginUrl = http + '/api/login';
// 工作台数据
const getWork = http + '/api/getWork';
// 接口请求
const install = (Vue, vm) => {

	// 接口示例 获取用户信息
	let getUserInfo = (params = {}) => vm.$u.get(getUserInfoList);
	// 接口示例创建用户
	let createUser = (params = {}) => vm.$u.post(createUser, params);
	// 登录接口
	let login = (params = {}) => vm.$u.get(loginUrl, params);
	// 工作台接口
	let getWorkList = (params = {}) => vm.$u.get(getWork);

	// 将个接口，统一挂在到vm.$u.api （vm就是this，也就是this.$u.api）
	vm.$u.api = {
		getUserInfo,
		createUser,
		login,
		getWorkList
	};
}
export default {
	install
}
