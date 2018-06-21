if(typeof StatusBarType == "undefined") {　　　　　　　　　　　
	window.StatusBarType = {}; //电池栏样式　　　　　　　　　　　
	StatusBarType.white = 0 //白色(默认)　　　　　　　　　　
	StatusBarType.black = 1　//黑色　　　　　　
}


let NavBarHTML = 'text!FrameWorks/NavVC/NavBar/NavBar.html'
let NavBarCSS = 'css!FrameWorks/NavVC/NavBar/NavBar.css'


define([NavBarHTML, NavBarCSS], function(html, css) {

	function NavVC() {}; window.nav = new NavVC()
	
	NavVC.prototype.popAction = null
	
	//重启
	NavVC.prototype.restart = function(){
		
		window.location.href = "charlin://restart"
	}
	
	//push
	NavVC.prototype.push = function(page_model, data=null, bartype = StatusBarType.white){
		
		this.add(101,page_model,data,bartype)
	}
	
	//pop
	NavVC.prototype.pop = function(index=-1){
	
		this.remove(101,index)
	}
	
	
	//modal: modal出一个页面
	NavVC.prototype.modal = function(page_model, data=null, bartype = StatusBarType.white){
		
		this.add(102,page_model,data,bartype)
	}
	
	//dismiss: 关闭一个modal页面
	NavVC.prototype.dismiss = function(index=-1){
	
		this.remove(102,index)
	}
	
	
	//open: 打开一个弹窗
	NavVC.prototype.open = function(page_model, data=null, bartype = StatusBarType.white){
		
		this.add(103,page_model,data,bartype)
	}
	
	//close: 关闭一个弹窗
	NavVC.prototype.close = function(index=-1){
	
		this.remove(103,index)
	}
	
	
	//push_ppv: 101 push, 103 ppv
	NavVC.prototype.add = function(add_type,page_model, data=null, bartype = StatusBarType.white){
		
		
		
		if(vue.controllers.length>0){
			
			let top_vc = vue.controllers[vue.controllers.length-1]
			
			if(page_model.name == top_vc.page_model.name){
				return
			}
		}
		
		
		if(add_type <= 102){
			
			//记录top_vc
			vue.top_vc_model = page_model
		
		}
		
		page_model.add_type = add_type
		
		let url =  page_model.path
		let v = page_model.v
		
		let url_src = BASE_URL_APP + url
		
		let name = page_model.name
		
		get_path_html(name, url_src, v, function(type,html_str){
			
			let count = add_type <= 102 ? vue.controllers.length : vue.ppvs.length
			
			let html_str_res = html_str || ""
			
			let controller = {full_path: url_src, html: html_str_res, page_model: page_model}
			
			if(type == 101){
				
				if(add_type <= 102){
					
					//push
					vue.controllers.push(controller)
					
				}else{
					
					//ppv
					vue.ppvs.push(controller)
					
				}
				
			}else{
				
				let index = count - 1
				
				//update
				if(add_type <= 102){
					
					//push
					vue.$set(vue.controllers,index,controller)
					
				}else{
					
					//ppv
					vue.$set(vue.ppvs,index,controller)
					
				}
				
			}
			
			if(html_str_res.length != 0){
				
				//加载入口页面的css,js
				load_page_resources(name,url_src, v, data)
				
			}
			
		})
	}
	
	//remove
	NavVC.prototype.remove = function(add_type,index=-1){
		
		let vcs = add_type <= 102 ? vue.controllers : vue.ppvs
		
		let length = vcs.length
		
		if(length <= 0) {return}
		
		let top_controller = vcs[0]
		
		let controllers = vcs.splice(length - 1, 1)
		
		let name = top_controller.page_model.name
	
		//移除js
		let doms_js = document.getElementsByName(name)
		
		doms_js.forEach(function(m,i,a){m.remove()})
		
	}
	
	
	//安卓手机点击了返回按钮
	NavVC.prototype.back= function(){
		
		
		
	}
	
	

	
	return NavVC
})







