function PageMaker(name, page_model) {

	let page_model_new = {}
	page_model_new.name = name
	page_model_new.v = page_model.v
	page_model_new.path = page_model.path

	return page_model_new
}

let TabBar = {name: "TabBar",path: "/TabBar/"}
let Home = {name: "Home",path: "/Home/",index: true}
let Mine = {name: "Mine",path: "/Mine/"}

let Detail = {name: "Detail",path: "/Home/Detail/",lazy: System.Android}
let Last = {name: "Last",path: "/Home/Detail/Last/"}
let RootVC = TabBar

let tabcontrollers = [Home, Mine]

function load_rootVC() {

	//加载首页的同时加载其他tab页面，最后再加载其他所有页面
	for(var i = 0; i < tabcontrollers.length; i++) {

		let page_model = tabcontrollers[i]

		load(page_model, function() {

			if(page_model.index) { //tab首页

				load(TabBar, function() {

					//显示tabbar
					nav.push(RootVC)

				})
			}
		})
	}
}

function loadRels(rels) {

	for(var i = 0; i < rels.length; i++) {

		let page_model = rels[i]

		load(page_model)
	}

}

function load(page_model, closure) {

	//加载html
	get_path_html(page_model, function(type, html_str) {

		//加载入口页面的css,js
		load_path_resources(page_model, function() {

			if(closure != null) {
				closure(page_model)
			}

		}, false)
	})

}