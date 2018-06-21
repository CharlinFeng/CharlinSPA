
let html_ResView = 'text!/YouKa/FrameWorks/CoreList/ResView/ResView.html'
let css_ResView = 'css!/YouKa/FrameWorks/CoreList/ResView/ResView.css'

define([MinRefresh_Applet_Key,MinRefresh_css_Key, MinRefresh_css_Applet_Key,html_ResView,css_ResView], function(MiniRefreshTools,c1,c2,html_ResView,css) {
	
	function CoreList(){}; window.corelist = new CoreList()
	CoreListClass = CoreList
	CoreList.prototype.cls=".CoreList",
	CoreList.prototype.dataListKey="dataList",
	
	CoreList.prototype.prepare = function(url, params, refreshNow = true) {

		this.url = url
		this.params = params
		
		this.page = 0 //服务器默认page = 1，框架默认为底部刷新，且底部刷新会立即page自增1
		this.page_size = 40
		this.refreshStatus = 0 //0没有刷新， 1顶部刷新中， 2底部刷新中
		this.needBottomRefresh = true //是否还需要底部刷新，默认是需要。如果顶部刷新就一页数据都不够，则不需要。
		let weak_self = this
		
		let cls = this.cls
		
		let dom = document.querySelector(cls)
		if(dom == undefined){return}
		
		let div_dom_create = document.createElement("div")
		div_dom_create.innerHTML = html_ResView
		div_dom_create.onclick = function(){
		    weak_self.refresh()
		}
		div_dom_create.style.display = "none"
		dom.appendChild(div_dom_create)
		weak_self.div_dom_create = div_dom_create
		
		// 引入任何一个主题后，都会有一个 MiniRefresh 全局变量
		weak_self.miniRefresh = new MiniRefresh({
			container: cls,
			down: {
				
				callback: function() {
					
					weak_self.refreshStatus = 0
					weak_self.page = 1
					weak_self.refreshWithPage(true)
				},
				isAuto: false,
				dampRateBegin: 0.4,
				dampRate: 0.1,
				bounceTime: 250,
				offset:70,
				successAnim:{isEnable:true,duration:100}
				
			},
			up: {
				callback: function() {
					// 上拉事件
					weak_self.page += 1
					weak_self.refreshWithPage(false)
				},
				isAuto: refreshNow,
				offset:30,
				isShowUpLoading:true
			},
			isUseBodyScroll: false,
			isLockX:true,
			isScrollBar:false,
			
		});
	
	},
	
	//数据刷新成功的回调
	CoreList.prototype.dataClosure = null
	
	CoreList.prototype.refreshWithPage = function(isHeaderRefresh) {
		
		let weak_self = this
		
		if(!isHeaderRefresh){
			
			if(!this.needBottomRefresh) {
				this.miniRefresh.endUpLoading(true, "加载失败");
				return
			}
		}
	
		if (this.refreshStatus != 0) {
			
			if (isHeaderRefresh){
				weak_self.div_dom_create.style.display="flex"
				// 每次下拉刷新后，上拉的状态会被自动重置
				this.miniRefresh.endDownLoading(true);
			}else{
				this.miniRefresh.endUpLoading(true, "加载失败");
			}
			
			return
		}
	
		let url = this.url
		let params = this.params
		params["page"] = this.page
		params["page_size"] = this.page_size
		this.refreshStatus = isHeaderRefresh ? 1 : 2
		
		
		
		ah.post(url, params, 0, function(o) {
			
			if(weak_self.dataClosure != null) {weak_self.dataClosure(o)}
			
			console.log(params,o.length)
		
			weak_self.div_dom_create.style.display = o.length > 0 ? "none" : "flex"

			var dataListKey = weak_self.dataListKey

			let dataListTemp = vue[[dataListKey]]
			vue[[dataListKey]] = isHeaderRefresh ? o : dataListTemp.concat(o)

			let has_more_data = o.length >= weak_self.page_size
			
			if(!has_more_data) {
				weak_self.page -= 1
			}
		
			if (isHeaderRefresh){
				
				weak_self.needBottomRefresh = has_more_data
				
				// 每次下拉刷新后，上拉的状态会被自动重置
				weak_self.miniRefresh.endDownLoading(true);
				
				if(!has_more_data){
					weak_self.miniRefresh.endUpLoading(!has_more_data, "加载失败");
				}
				
			}else{
				
				weak_self.miniRefresh.endUpLoading(!has_more_data, "加载失败");
			}
			
			weak_self.refreshStatus = 0
	
		}, function(code,msg) {
			
			let error_msg = code+"："+msg
			
			svp.showError(error_msg)

			weak_self.miniRefresh.endUpLoading(false, "加载失败");
			weak_self.miniRefresh.endDownLoading(false, "加载失败");

			
		})
	},
	
	CoreList.prototype.refresh = function(params = null){
			
		if(params != null) {this.params = params}

		this.page = 1
		
		this.refreshWithPage(true)
		
	}
	
	

	CoreList = CoreList
	
	return CoreList
	
});







