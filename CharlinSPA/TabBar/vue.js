
//vue准备
page.vuePrepare = function(){
	
	page.vue = new Vue({
		
		el:".page_content",
		
		data:{
			
			html:"",
			viewControllers: [Home, FaXian, WoDe],
			
			lastIndex: null,
			currentIndex: 0,
			
			
		}
		
	})
	
	//加载对应的tab页面
	page.load_first_page()
	
	//事件监听
	page.vue.$nextTick(function(){
		page.actionPrepare()
		
	})
	
	setTimeout(function(){
	    launchOver()
	},100)
	
}
