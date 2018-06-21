
//let CoreModalHTML = 'text!FrameWorks/CoreModal/CoreModal.html'
//let CoreModalCSS = 'css!FrameWorks/CoreModal/CoreModal.css'

define([LayUIKey], function() {
	
	layui.use('layer', function(){
		
	   window.layer = layui.layer;
	  
	});     

	function CoreModalClass(){}; window.cm = new CoreModalClass;
	
	CoreModalClass.prototype.bg_dismiss=true
	
	CoreModalClass.prototype.show2 = function(url,width="100%",height="100%",name="page",opacity=0.2){
		cm.bg_dismiss = true
		this.show(url,width,height,name,opacity)
	}
	
	
	CoreModalClass.prototype.show = function(url,width="100%",height="100%",name="page",opacity=0.05){
		
		let url_full = "/YouKa/App" + url
		
		layer.open({
		  type: 2, 
		  anim: 0,
		  resize :false,
		  closeBtn: 0,
		  shadeClose:true,
		  scrollbar:false,
		  area: [width, height],
		  shade: [opacity, '#000'],
		  content: [url_full, 'no']
		}); 
		
		setTimeout(function(){
		     let body = document.body
		let navBar_dom = document.querySelector(".NavBar")
		if(navBar_dom != undefined){navBar_dom.classList.add("blur")}
		let first_dom = body.children[0]
		first_dom.classList.add("blur")   
		},0.5)

		page.modal=101
	}
	
	CoreModalClass.prototype.dismiss = function(name="page",closure){
		
		layer.close(layer.index);
		
		
		let body = document.body
		let first_dom = body.children[0]
		first_dom.classList.remove("blur")
		
		//如果有navbar，一并取消模糊
		let navBar_dom = document.querySelector(".NavBar")
		if(navBar_dom != undefined){navBar_dom.classList.remove("blur")}
		
		page.modal=102
	}
	
	window.clickBgAction = function(){
		
		if(!cm.bg_dismiss){return}
		
		cm.dismiss()
		
	}
	
	return CoreModalClass
})
