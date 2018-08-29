
//other准备
page.otherPrepare = function(){
	

}


page.load_first_page = function () {
	
	let currentIndex = page.vue.currentIndex
	
	let page_model = page.vue.viewControllers[currentIndex]
	
	let page_content = document.querySelector(".tab_main")
	
	//加载html
	get_path_html(page_model,function(type,html_str){

		page.vue.html = page_model.html_str
		
		let name = page_model.name
		
		load_path_resources(page_model, function(){
			
			//加载所有页面
		    setTimeout(function(){
		         load_all() 
		    },200)
		    
		}, true)

	})
		
}


page.load_path_files = function(){
	
	page.remove_path_files()
	
	let currentIndex = page.vue.currentIndex
	
	let page_model = page.vue.viewControllers[currentIndex]

	if(page_model.js_str == null) {
		
		setTimeout(function(){
		      page.load_path_files()  
		},100)
		return;
	}

	let page_content = document.querySelector(".tab_main")

	let html_str = page_model.html_str
	
	page.vue.html = html_str

	let name = page_model.name
	
	//加载js
	let script_dom = document.createElement("script")
	script_dom.innerHTML = page_model.js_str
	script_dom.type = "text/javascript"
	script_dom.setAttribute("name",name)
	
	page.vue.$nextTick(function(){
		
		document.body.appendChild(script_dom)
		
	})

}


//remove
page.remove_path_files = function(){
	
	let lastIndex = page.vue.lastIndex
	
	if(lastIndex == null) {lastIndex = 0}
	
	let page_model = page.vue.viewControllers[lastIndex]
	
	let name = page_model.name

	// window.t_remove_path_files = setTimeout(function(){
		
		//移除js
		let doms_js = document.getElementsByName(name)
		
		doms_js.forEach(function(m,i,a){m.remove()})
		
//		let doms_js2 = document.getElementsByName(name)
//		
//		doms_js2.forEach(function(m,i,a){m.remove()})
		
	// },600)
}


