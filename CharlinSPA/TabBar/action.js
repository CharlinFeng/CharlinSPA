page.actionPrepare = function(){
	
	let doms = document.querySelectorAll(".tab_bar_item")
	
	for (let i = 0; i < doms.length; i++) {
		
		let dom = doms[i]
		
		dom.addEventListener("touchstart",function(e){
			
			let target = e.target
			
			let index = target.dataset.index
			
			if(page.vue.currentIndex == index) {return}
			
			page.vue.lastIndex = page.vue.currentIndex
			
			page.vue.currentIndex = index
			
			//加载对应的tab页面
			page.load_path_files()
			
			
		},false)
		
	}
	
	
	
}