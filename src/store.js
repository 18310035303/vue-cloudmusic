/*eslint-disable */
export default {
	get(key){ //获取
		return JSON.parse(window.localStorage.getItem(key||'[]'))
	},
	set(key,data){ //存储
		window.localStorage.setItem(key,JSON.stringify(data))
	}
}