
define([], function() {

	function CoreCountBtn() {}; window.countbtn = new CoreCountBtn()
	
	CoreCountBtn.prototype.num = 60
	CoreCountBtn.prototype.num_current = 0
	CoreCountBtn.prototype.count_div_dom = null

	//安装
	CoreCountBtn.prototype.setup = function(cls) {

		let btn_dom = document.querySelector(cls)
		
		btn_dom.parentNode.style.position = "relative"
		
		let count_div_dom = document.createElement("div")
		count_div_dom.style.position = "absolute"
		count_div_dom.style.left = 0
		count_div_dom.style.top = 0
		count_div_dom.style.height = "100%"
		count_div_dom.style.width = "100%"
		
		count_div_dom.style.textAlign = "center"
		count_div_dom.style.color = btn_dom.style.color
		count_div_dom.style.fontSize = btn_dom.style.fontSize
		
		count_div_dom.style.alignItems = "center"
		count_div_dom.style.justifyContent = "center"
		count_div_dom.style.background = "white"
		count_div_dom.style.fontWeight = "bold"
		count_div_dom.style.display = "none"
		
		this.count_div_dom = count_div_dom
		
		btn_dom.parentNode.appendChild(count_div_dom)
		
		let weak_self = this		
	}
	
	CoreCountBtn.prototype.counting = function() {
		
		this.num_current = this.num
		
		this.run()
	}
	
	//运行
	CoreCountBtn.prototype.run = function() {
		
		this.count_div_dom.style.display = "flex"
		
		this.count_div_dom.innerHTML = this.num_current+" 秒"
		
		let weak_self = this
		
		setTimeout(function(){
		      
		    weak_self.num_current = weak_self.num_current-1
		    
		    if(weak_self.num_current <= 0){
		    	
		    	weak_self.countOver()
		    	
		    }else {
		    	
		    	weak_self.run()
		    }
		     
		},1000)
	}
	
	//结束
	CoreCountBtn.prototype.countOver = function(){
		
		this.count_div_dom.style.display = "none"
	}
	

	return CoreCountBtn
})
