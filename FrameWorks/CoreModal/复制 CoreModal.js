
let CoreModalHTML = 'text!FrameWorks/CoreModal/CoreModal.html'
let CoreModalCSS = 'css!FrameWorks/CoreModal/CoreModal.css'

define([CoreModalHTML, CoreModalCSS], function(html, css) {

	function CoreModalClass(){}; window.cm = new CoreModalClass;
	
	CoreModalClass.prototype.bg_dismiss=true
	
	CoreModalClass.prototype.show2 = function(url,width="100%",height="100%",name="page",opacity=0.3){
		cm.bg_dismiss = true
		this.show(url,width,height,name,opacity)
	}
	
	
	CoreModalClass.prototype.show = function(url,width="100%",height="100%",name="page",opacity=0.1){
		
		let div_dom = document.createElement("div")
		
		if(this.div_dom_dict == undefined){
			this.div_dom_dict = {}
		}
		
		let name_final = name || "page"
		
		this.div_dom_dict[[name_final]] = div_dom
		
		div_dom.innerHTML = html
		
		let core_page_dom = div_dom.querySelector(".core_page")
		core_page_dom.style.background = "rgba(0,0,0,"+opacity+")"
		console.log(opacity)
		core_page_dom.classList.add("bg_fadeIn")
		
		let core_page_content_dom = div_dom.querySelector(".core_page_content")
		core_page_content_dom.style.width = width
		core_page_content_dom.style.height = height
		
		let iframe_dom = div_dom.querySelector("iframe")
		var url_use = url
		if(url_use.indexOf("/") == 0){url_use = "/YouKa/App" + url_use}
		
				
		iframe_dom.src = url_use
		
		core_page_content_dom.classList.add("zoom_anim")
		
		
		let body = document.body
		body.appendChild(div_dom)
		
		let first_dom = body.children[0]
		first_dom.classList.add("blur")
		
		//如果有navbar，一并模糊
		let navBar_dom = document.querySelector(".NavBar")
		if(navBar_dom != undefined){navBar_dom.classList.add("blur")}
		
		play_sound("http://pic.ibaotu.com/00/56/62/98X888piCmyI.mp3")
		
		page.modal=101
	}
	
	CoreModalClass.prototype.dismiss = function(name="page",closure){
		
		if(this.div_dom_dict == undefined){return}
		
		let name_final = name || "page"
		
		let div_dom = this.div_dom_dict[[name_final]]
		
		if(div_dom == undefined){return}
		
		let core_page_dom = div_dom.querySelector(".core_page")
		core_page_dom.classList.remove("bg_fadeIn")
		core_page_dom.classList.add("bg_fadeOut")
		
		let core_page_content_dom = div_dom.querySelector(".core_page_content")
		
		let body = document.body
		let first_dom = body.children[0]
		first_dom.classList.remove("blur")
		
		//如果有navbar，一并取消模糊
		let navBar_dom = document.querySelector(".NavBar")
		if(navBar_dom != undefined){navBar_dom.classList.remove("blur")}
		
		setTimeout(function(){
		    
		    div_dom.remove()
		    
		    if(closure != undefined){closure()}
		    
		},300)
		
		page.modal=102
	}
	
	window.clickBgAction = function(){
		
		if(!cm.bg_dismiss){return}
		
		cm.dismiss()
		
	}
	
	return CoreModalClass
})
