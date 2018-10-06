
//vue准备
page.vuePrepare = function(){
	
	let data = page.data
		
	page.vue = new Vue({
		
		el:".page_content",
		
		data:{
			title:data.title
		}
		
	})
}
