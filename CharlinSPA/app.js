
// APP_VERSION 控制CharlinSPA.css
let APP_VERSION = "1.0"
let APP_DEBUG = true
let APP_NAME = "CharlinSPA"
let BASE_URL_FRAMEWORKS="/"+APP_NAME+"/FrameWorks"
let BASE_URL_APP="/"+APP_NAME+"/App" 

//动态引入页面js cache_need_force:如果有缓存的话,强制使用缓存
function importJS(path,loadClosure,cache_need_force=false){

	let js_content = localStorage[[path]]

	var body = document.body
	var script = document.createElement('script')

	script.type = 'text/javascript'
	
	if((cache_need_force  && js_content != null) || (js_content != null &&　APP_DEBUG == false)) {

		script.innerHTML = js_content
		body.appendChild(script);

		if(loadClosure != undefined) {loadClosure()}

	}else {

		script.src = path
		body.appendChild(script);

		script.onload = function(e){

			if(loadClosure != undefined) {loadClosure(e)}

			getLocalFile(path)
		}
	}
}


//动态引入页面css
function importCSS(path,loadClosure,cache_need_force=false){
	
	let css_content = localStorage[[path]]
	let head = document.querySelector("head")
	
	if((cache_need_force  && js_content != null) || (css_content != null &&　APP_DEBUG == false)) {

		let style = document.createElement("style")
		style.type = 'text/css'

		style.innerHTML = css_content
		head.appendChild(style);
		if(loadClosure != undefined) {loadClosure()}

	}else{

		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = path

		head.appendChild(link);

		link.onload = function(){

			if(loadClosure != undefined) {loadClosure()}

			getLocalFile(path)
		}
	}
}


//加载文件
function getLocalFile(path, closure){

	//步骤一:创建异步对象
	var ajax = new XMLHttpRequest();
	//步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端

	ajax.open('get',path,true);
	//步骤三:发送请求
	ajax.send();
	//步骤四:注册事件 onreadystatechange 状态改变就会调用
	ajax.onreadystatechange = function (res) {
		

	}
	
	ajax.onload = function(){
		
		let js_content = ajax.responseText
		
		if(closure != null) {closure(js_content);}
	　　
		//缓存　
		localStorage[[path]] = js_content
	}
	
	ajax.onerror = function(){if(closure != null) {closure(); console.log("timeout: "+path)}}
	
	ajax.ontimeout = function(){if(closure != null) {closure();console.log("timeout: "+path)}}
	
}


let RequireJS = BASE_URL_FRAMEWORKS+"/requirejs/require.min.js"
let mainJS = BASE_URL_FRAMEWORKS+"/requirejs/main.js"


//引入RequireJS
importJS(RequireJS,function(){

	//再引入main.js
	importJS(mainJS,function(){
		
		var app_arr = [VueKey, CoreSVPKey, CoreAlertViewKey, CoreActionSheetKey,CorePageManagerKey, 
		CharlinSPACSSKey, CoreExtensionKey, NavVCKey, AnimateCssKey]

		require(app_arr, function(Vue,page_html_require) {
			
			window.Vue = Vue
			
			appDidLoad()
		})
	})
})


//SPA页面加载完成
function appDidLoad(){
	
	//SPA页面Vue初始化
	spaVuePrepare()
	
	let page_content = document.querySelector(".page_content")
	
	//加载入口页面html
	let rootVC = Home
	let v = rootVC.v
	let path = rootVC.path
	let page_path = BASE_URL_APP + path
	let name = rootVC.name
	
	get_path_html(name,page_path,v,function(type,html_str){
		page_content.innerHTML = html_str
	})
	
	//加载入口页面的css,js
	load_page_resources(name,page_path, v, null)
}


//加载页面的css,js 获取上一个页面传递的数据
function load_page_resources(name,page_path, v, data){

	let arr = ["index", "vue", "navbar", "host", "list", "other", "action"]
	//加载css
	let css_path = "css!"+page_path + "page.css"
	
	var page_arr = arr.map(function(m,index,arr){return "text!"+page_path+m+".js"})
	
	page_arr.push(css_path)
	
	var body = document.body
	
	require(page_arr, function(str0,str1,str2,str3,str4,str5,str6,css_import) {
		
		var name_space_str = "window."+name+"={} \n"
		
		//传递数据
		let data_obj = data || {}
		let data_str = JSON.stringify(data_obj)
		
		let data_js = "page.data=JSON.parse('"+data_str+"')"
		
		name_space_str += data_js
		
		for (let i=0;i<7;i++) {
			
			name_space_str += eval("str"+i) + "\n"
		}
		
		//调用
		var methods_cal_str = "\n"
		let methods = ["vue","navBar","host","list","other","index"]
		methods.forEach(function(m,i,a){methods_cal_str += "page."+m+"Prepare();"})
		name_space_str += methods_cal_str
		name_space_str = name_space_str.replace(/\page/g,name)
		// console.log(name_space_str)
		let script_dom = document.createElement("script")
		script_dom.type = 'text/javascript'
		script_dom.setAttribute("name", name)
		script_dom.innerHTML = name_space_str
		body.appendChild(script_dom)
	})
}






//填充内容  closure回调: 101本地数据, 102异步数据
function get_path_html(name,page_path, v, closure){
	
	let path_version_key = page_path + "_v"
	
	let v_cache = localStorage.getItem(path_version_key)
	let html_content_cache = localStorage.getItem(page_path)
	
	if(closure != null) {closure(101,html_content_cache)}
	
	let path_full = page_path + "page.html"
	
	
	if(v_cache == null || html_content_cache==null || v_cache<v || APP_DEBUG){
		// console.log("没有缓存")
		//异步读取本地html文件
		getLocalFile(path_full,function(html_get){
			
			html_get = html_get.replace(/\page/g,name)
			
			if(closure != null) {closure(102,html_get)} 
		})
		
		//存入版本号
		localStorage.setItem(path_version_key, v)
		
	}else{
		// console.log("有缓存")
		//有缓存,也要再更新一下最新的数据到缓存
		getLocalFile(path_full,null)
	}
}


//SPA页面的vue准备
function spaVuePrepare(){
	
	window.vue = new Vue({
		
		el:".spa",
		
		data:{
			
			controllers:[], //push栈
			ppvs:[], //ppvs栈
			top_vc_model:null,
			
			
		},
		
		methods:{
			
			calAnimIn: function(){
				
				let anim_push_in = "slideInRight"
				let anim_modal_in = "slideInUp"
				
				var anim = ""
				
				let vc = this.controllers[this.controllers.length-1]
				
				let add_type = vc==undefined ? 101 : vc.page_model.add_type
				
				if(add_type == 101){anim = anim_push_in}
				
				if(add_type == 102){anim = anim_modal_in}
				
				return anim
				
			},
			
			calAnimOut: function(){
				
				let anim_push_in = "slideOutRight"
				let anim_modal_in = "slideOutDown"
				
				var anim = ""
				
				let m = this.top_vc_model
				
				let add_type = m==undefined ? 101 : m.add_type
				
				if(add_type == 101){anim = anim_push_in}
				
				if(add_type == 102){anim = anim_modal_in}
				
				return anim
				
			},
			
			
		}
		
	})
}