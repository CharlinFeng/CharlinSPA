function PageMaker(name, page_model){
	
	let page_model_new = {}
	page_model_new.name = name
	page_model_new.v = page_model.v
	page_model_new.path = page_model.path
		
	return page_model_new
}

let Home = {name: "Home", path: "/Home/"} 
let Detail = {name: "Detail", path: "/Home/Detail/"} 

let RootVC = Home

let page_models = [Home,Detail]

// let page_models = [ CheXianShiSuan,MaiCheXian,MaiCheXian1, ShouJiChongZhi]

function load_all(){
	
	for (var i = 0; i < page_models.length; i++) {
		
		let page_model = page_models[i]
		
		//加载html
		get_path_html(page_model,function(type,html_str){
			
			//加载入口页面的css,js
			load_path_resources(page_model,function(){
				
				setTimeout(function(){
					// delete page_model.name;
					delete page_model.path;
				},100)
				
			},false)
		})
		
		
	}
	
}