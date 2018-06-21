let Home = {name: "home", v:1.0, path: "/Home/"} 
let Detail = {name: "detail", v:1.0, path: "/Home/Detail/"} 


function PageMaker(name, page_model){
	
	let page_model_new = {}
	page_model_new.name = name
	page_model_new.v = page_model.v
	page_model_new.path = page_model.path
	
	return page_model_new
}