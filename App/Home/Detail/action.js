page.back = function(){
	
	console.log("返回")
	home.vue.title = "修改后的首页"
	nav.pop()
	// nav.dismiss()
}

page.last = function(){
	nav.push(Last)
}