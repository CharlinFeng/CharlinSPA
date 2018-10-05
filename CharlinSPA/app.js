// APP_VERSION 控制CharlinSPA.css
let APP_VERSION = "1.0"
let APP_DEBUG = false
let APP_NAME = "CharlinSPA"
let BASE_URL_FRAMEWORKS = "/" + APP_NAME + "/FrameWorks"
let BASE_URL_APP = "/" + APP_NAME + "/App"

let ua = navigator.userAgent;

window.ios = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 

//动态引入页面js cache_need_force:如果有缓存的话,强制使用缓存
function importJS(path, loadClosure, cache_need_force = false) {

	let body = document.body
	let script = document.createElement('script')

	script.type = 'text/javascript'

	script.src = path

	body.appendChild(script);

	script.onload = function(e) {

		if(loadClosure != undefined) {
			loadClosure(e)
		}

		getLocalFile(path)
	}

}

//动态引入页面css
function importCSS(path, loadClosure, cache_need_force = false) {

	let head = document.querySelector("head")

	let link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = path

	head.appendChild(link);

	link.onload = function() {

		if(loadClosure != undefined) {
			loadClosure()
		}

		getLocalFile(path)
	}

}

//加载文件
function getLocalFile(path, closure) {

	//步骤一:创建异步对象
	let ajax = new XMLHttpRequest();
	//步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端

	ajax.open('get', path, true);
	//步骤三:发送请求
	ajax.send();
	//步骤四:注册事件 onreadystatechange 状态改变就会调用
	ajax.onreadystatechange = function(res) {

	}

	ajax.onload = function() {

		let js_content = ajax.responseText
		js_content = js_content.replace("\\r", "")
		js_content = js_content.replace("\\n", "")
		js_content = js_content.replace("\\t", "")
		if(closure != null) {
			closure(js_content);
		}
	}

	ajax.onerror = function() {
		if(closure != null) {
			closure();
		}
	}

	ajax.ontimeout = function() {
		if(closure != null) {
			closure();
		}
	}

}

let RequireJS = BASE_URL_FRAMEWORKS + "/requirejs/require.min.js"
let mainJS = BASE_URL_FRAMEWORKS + "/requirejs/main.js"
let AppPageJS = "./app.page.js"
let NavVCKey = "./NavVC/NavVC.js"
let WeuiCssKey = "css!FrameWorks/weui/weui.min"
let MobileJS = "./app.mobile.js"
let CharlinSPACSSKey = "css!/" + APP_NAME + "/CharlinSPA/app.css"

//引入RequireJS
importJS(RequireJS, function() {

	//再引入main.js
	importJS(mainJS, function() {

		let app_arr = [VueKey, WEUIKey, FastClickKey, WeuiCssKey, CoreSVPKey, CoreActionSheetKey, AppPageJS,
			CharlinSPACSSKey, CoreExtensionKey, NavVCKey, AnimateCssKey, AppHttpKey, SwiperKey, CoreArchiveKey,
			CorePickerKey, MobileJS, CoreAlertViewKey, CoreListKey
		]

		require(app_arr, function(Vue, weui, FastClick) {

			window.Vue = Vue
			window.weui = weui

			appDidLoad()

			FastClick.attach(document.body);
		})
	})
})

//SPA页面加载完成
function appDidLoad() {

	//SPA页面Vue初始化
	spaVuePrepare()

	load_rootVC()
	load_all()
	gesture()
}

function gesture() {

	let body = document.body

	let s_time = 0
	let e_time = 0

	let startX = 0
	let endX = 0

	body.ontouchstart = function(e) {

		startX = e.changedTouches[0].pageX
		if(startX >= 20) {
			return
		}
		s_time = Date.parse(new Date())
	}

	body.ontouchend = function(e) {

		if(startX >= 20) {
			return
		}

		e_time = Date.parse(new Date())

		endX = e.changedTouches[0].pageX

		let resT = e_time - s_time
		let resX = endX - startX

		if(resT > 0) {
			return
		}
		if(resX <= 20) {
			return
		}

		nav.pop()

	}
}

//填充内容  closure回调: 101本地数据, 102异步数据
function get_path_html(page_model, closure) {

	//加载入口页面html
	let path = page_model.path
	let name = page_model.name
	let tabbar_page_path = "/" + APP_NAME + "/CharlinSPA/" + name + "/"
	let page_path = name == "TabBar" ? tabbar_page_path : BASE_URL_APP + path

	let path_full = page_path + "page.html?t=" + Date.parse(new Date())

	//异步读取本地html文件
	getLocalFile(path_full, function(html_get) {

		let name_lower = name.substring(0, 1).toLowerCase() + name.substring(1)

		html_get = html_get.replace(/\page/g, name_lower)

		//记录html
		page_model.html_str = html_get

		if(closure != null) {
			closure(102, html_get)
		}
	})

}

//加载页面的css,js 获取上一个页面传递的数据
function load_path_resources(page_model, closure, create_dom = true) {

	//加载入口页面html
	let path = page_model.path
	let name = page_model.name
	let tabbar_page_path = "/" + APP_NAME + "/CharlinSPA/" + name + "/"
	let page_path = name == "TabBar" ? tabbar_page_path : BASE_URL_APP + path

	let arr = ["index", "vue", "navbar", "host", "list", "other", "action"]

	let t = Date.parse(new Date())

	//加载css
	let css_path = "css!" + page_path + "page.css?t=" + t

	let page_arr = arr.map(function(m, index, arr) {
		return "text!" + page_path + m + ".js?t=" + t
	})

	page_arr.push(css_path)

	require(page_arr, function(str0, str1, str2, str3, str4, str5, str6, css_str) {
		let name_lower = name.substring(0, 1).toLowerCase() + name.substring(1)
		let name_space_str = "window." + name_lower + "={}; page.data='$data'; \n"

		for(let i = 0; i < 7; i++) {

			name_space_str += eval("str" + i) + "\n"
		}

		//调用
		let methods_cal_str = "\n"
		let methods = ["vuePrepare", "navBarPrepare", "hostPrepare", "listPrepare", "otherPrepare", "viewDidLoad"]
		methods.forEach(function(m, i, a) {
			let func_str = "page." + m
			let func_str_full = "if(" + func_str + "!= null){" + func_str + "();};"
			methods_cal_str += func_str_full
		})
		name_space_str += methods_cal_str

		//ios直接调用load
		let load_call_for_ios_str = "\n if(ios && page.load != null){page.load()};"
		name_space_str += load_call_for_ios_str
		name_space_str = name_space_str.replace(/\page/g, name_lower)
		// css_str = css_str.replace(/ /g, "")
		let js_str = name_space_str

		//记录script_dom
		let script_dom = document.createElement("script")
		script_dom.innerHTML = js_str
		script_dom.setAttribute("name", name)
		page_model.script_dom = script_dom
		page_model.js_str = js_str

		if(closure != null) {
			closure(js_str)
		}

		if(create_dom) {

			//			document.head.appendChild(style_dom)

			document.body.appendChild(script_dom)
		}
	})
}

//SPA页面的vue准备
function spaVuePrepare() {

	window.vue = new Vue({

		el: ".spa",

		data: {

			controllers: [], //push栈
			ppvs: [], //ppvs栈
			top_vc_model: null,

			ios: ios,

		},

		methods: {
			
			beforeEnter: function(el) {
				
			},
			
			enter: function(el, done) {
				setTimeout( function(){done() },400)
			},
			
			afterEnter: function(el) {
				let vc = this.controllers[this.controllers.length-1]	
				if(vc == null) {return}
				let name = vc.name	
				let name_lower = name.substring(0,1).toLowerCase()+name.substring(1)
				let page = window[[name_lower]]
				if(page.viewDidAppear != null) {
					page.viewDidAppear()
				}
			},
			
			enterCancelled: function(el) {
				
			},
			
			beforeLeave: function(el) {
				
			},
			
			leave: function(el, done) {
				setTimeout( function(){done() },600)
			},
			
			afterLeave: function(el) {
				let vc = this.controllers[this.controllers.length-1]	
				if(vc == null) {return}
				let name = vc.name	
				let name_lower = name.substring(0,1).toLowerCase()+name.substring(1)
				let page = window[[name_lower]]
				if(page.viewDidAppear != null) {
					page.viewDidAppear()
				}
			},
			
			leaveCancelled: function(el) {
			},

			calZindex: function(index) { //pushr的zindexyy为10的倍数

				let style_str = "z-index: " + (index + 1) * 10 + ";";

				return style_str
			},

			calAnimIn: function() {
				//slideInRight
				let anim_push_in = "slideInRight flex"
				let anim_modal_in = "slideInUp"

				let anim = ""

				let vc = this.controllers[this.controllers.length - 1]

				let add_type = vc == undefined ? 101 : vc.add_type

				if(add_type == 101 && this.controllers.length > 1) {
					anim = anim_push_in
				}

				if(add_type == 102) {
					anim = anim_modal_in
				}

				return anim

			},

			calAnimOut: function() {
				//slideOutRight
				let anim_push_in = "slideOutRight"
				let anim_modal_in = "slideOutDown"

				let anim = ""

				let m = this.top_vc_model

				let add_type = m == undefined ? 101 : m.add_type

				if(add_type == 101) {
					anim = anim_push_in
				}

				if(add_type == 102) {
					anim = anim_modal_in
				}

				return anim

			},

		}

	})
}