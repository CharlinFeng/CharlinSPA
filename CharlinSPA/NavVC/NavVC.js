if(typeof StatusBarType == "undefined") {　　　　　　　　　　　
	window.StatusBarType = {}; //电池栏样式　　　　　　　　　　　
	StatusBarType.white = 0 //白色(默认)　　　　　　　　　　
	StatusBarType.black = 1　//黑色　　　　　　
}



define([], function() {

	function NavVC() {}; window.nav = new NavVC()
	
	NavVC.prototype.popAction = null
	
	//重启
	NavVC.prototype.restart = function(){
		
		window.location.href = "charlin://restart"
	}
	
	
	//push
	NavVC.prototype.push = function(page_model, data=null, bartype = StatusBarType.white){
		
		if(page_model.html_str == null) {
			
			let weak_self = this
		
			load(page_model, function(page_model_new){
			
				weak_self.push0(page_model_new, data, bartype)
			})
			
		}else {
			this.push0(page_model, data, bartype)
		}
	}
	
	//push
	NavVC.prototype.push0 = function(page_model, data=null, bartype = StatusBarType.white){
		
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

		let length = vue.controllers.length
		
		if(length>0){
			
			let top_vc = vue.controllers[length-1]
			
			if(page_model.name == top_vc.name){
				return
			}
		}
		
		if(page_model.html_str==null){return}
		
		let name = page_model.name
		
		//加载css
//		document.head.appendChild(page_model.style_dom)
		
		//传递数据
		let js_str = page_model.js_str
		
		if(js_str == null) {return}
		
		let data_obj = data || {}
		let data_str = JSON.stringify(data_obj)
		let js_data_str = "JSON.parse('"+data_str+"');"
		js_str = js_str.replace("'$data'",js_data_str) 

		let script_dom = document.createElement("script")
		script_dom.innerHTML = js_str
		script_dom.setAttribute("name",name)
		
		if(add_type <= 102){
			
			//记录top_vc
			vue.top_vc_model = page_model
		}
//		page_model.html_str = page_model.html_str.replace(" ", "")
		
		page_model.add_type = add_type

		if(add_type <= 102){
			
			let controllers = document.querySelectorAll(".controller")
			let pre = controllers[vue.controllers.length-1]
			
			this.addDom(pre)
			vue.controllers.push(page_model)
			
			
		}else{
			
			//ppv
			vue.ppvs.push(page_model)
			
		}

		vue.$nextTick(function(){
			
			document.body.appendChild(script_dom)
			
		})
	}
	
	//remove
	NavVC.prototype.remove = function(add_type,index=-1){
		
		if(add_type <= 102){//push
		
			let controllers = document.querySelectorAll(".controller")
			let pre = controllers[controllers.length-2]
	
			this.removeDom(pre)
			
		}else{
			
		}
		
		
		let vcs = add_type <= 102 ? vue.controllers : vue.ppvs
		
		let length = vcs.length
		
		if(length <= 0) {return}
		
		let vc = vcs[length-1]
		
		//干掉mvc
		delete vc.html_str
		delete vc.js_str
		delete vc.script_dom
		
		let name = vc.name
		
		if(index==0){
			
		}else{
			vcs.splice(length - 1, 1)
		}
		
		vue.$nextTick(function(){
			
		    // setTimeout(function(){
		    	
		    	//干掉对应的页面指针
				let name_lower = name.substring(0,1).toLowerCase()+name.substring(1)
				delete window[[name_lower]]
			
				//移除js
				let doms_js = document.getElementsByName(name)
				
				doms_js.forEach(function(m,i,a){m.remove()})
			
			// },450)
		    
		})

	}
	
	
	NavVC.prototype.addDom = function(dom){
		
		if(dom==null){return}

		let mask_dom = document.createElement("div")
		mask_dom.addEventListener("click",function(e){
			
			e.stopPropagation()
			
			mask_dom.remove()
			
		})
		mask_dom.classList.add("mask_view")
		mask_dom.classList.add("cover_view")
		mask_dom.classList.add("animated")
		mask_dom.classList.add("fadeIn")
		dom.append(mask_dom)
		
		dom.classList.add("animated")
		dom.classList.remove("slideInLeft")
		dom.classList.add("slideOutLeft")
		
		
	}
	
	NavVC.prototype.removeDom = function(dom){
		
		let mask_dom = dom.querySelector(".mask_view")
		if(mask_dom == null){return}
		mask_dom.classList.remove("fadeIn")
		mask_dom.classList.add("fadeOut")
		
		dom.classList.remove("slideOutLeft")
		dom.classList.add("slideInLeft")
		
		setTimeout(function(){
			mask_dom.remove()
		},400)
		
	}
	
	
	
	//安卓手机点击了返回按钮
	NavVC.prototype.back= function(){
		
		
		
	}
	
	

	
	return NavVC
})







