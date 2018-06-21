define([], function() {

	function CoreExtension() {};
	window.ce = new CoreExtension()
 
	//获取当前时间
	Date.prototype.timeInterVal = function() {

		return Date.parse(this) / 1000
	}

	Date.nowTimeInterVal = function() {
		let now = new Date()
		return now.timeInterVal()
	}

	CoreExtension.prototype.stopPropagation = function(){
		
		let event = this.getEvent()
		event.stopPropagation()
	}

	CoreExtension.prototype.getDataSet = function(key) {

		let e = window.event || arguments.callee.caller.arguments[0];

		return key == '' ? e.target.dataset : e.target.dataset[[key]]
	}

	CoreExtension.prototype.getTarget = function() {

		let e = window.event || arguments.callee.caller.arguments[0];
		
		if(e == undefined) {return null}
		
		return e.currentTarget
	}

	CoreExtension.prototype.getEvent = function() {

		return window.event || arguments.callee.caller.arguments[0];
	}

	CoreExtension.prototype.urlKeyValues = function() {
		var args = {};
		var match = null;
		var search = decodeURIComponent(location.search.substring(1));
		var reg = /(?:([^&]+)=([^&]+))/g;
		while((match = reg.exec(search)) !== null) {
			args[match[1]] = match[2];
		}

		return args;
	}

	CoreExtension.prototype.urlValueForKey = function(key) {
		var reg = new RegExp(key + '=([^&]*)');
		var results = location.href.match(reg);
		return results ? results[1] : null;
	}

	CoreExtension.prototype.fileName = function() {

		var href = location.href
		var href_split = href.split("/")
		var arr = href_split.slice(href_split.length - 1, href_split.length).toString(String).split(".")
		let arr_res = arr.slice(0, 1)

		return arr_res[0]
	}
	
	/* 格式化时间转时间戳 */
	String.prototype.contains = function(substr) {
	
		return this.indexOf(substr) >= 0;
	
	}
	
	
	function xiaoshudianhouliangwei(){
		
		let number = parseInt(parseFloat(this) * 100) /100
		return number
	}
	
	
	/* 时间戳转格式化时间 */
	String.prototype.f = function(fmt) {

		var date = null
		if(this == "") {
			date = new Date()
		} else {
			if(this.length == 13) {
				let time_int = parseInt(this)
				date = new Date(time_int)
			} else {
				let time_int = parseInt(this) * 1000
				date = new Date(time_int)
			}
		}

		var o = {
			"M+": date.getMonth() + 1, //月份 
			"d+": date.getDate(), //日 
			"h+": date.getHours(), //小时 
			"m+": date.getMinutes(), //分 
			"s+": date.getSeconds(), //秒 
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
			"S": date.getMilliseconds() //毫秒 
		};

		if(/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for(var k in o) {
			if(new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	}
	

	CoreExtension.prototype.removeWithIndex = function(i) {

		if(i >= this.length) {
			return
		}
	
		this.splice(i, 1)
	
		return this
	}

	

	return CoreExtension
})