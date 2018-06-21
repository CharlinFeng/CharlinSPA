
define([MinRefresh_Applet_Key,MinRefresh_css_Key, MinRefresh_css_Applet_Key], function(MiniRefreshTools,c1,c2) {
	
	function CoreList(){}; corelist = new CoreList()
	
	CoreList.prototype.dataList = []
	oreList.prototype.cls = ".CoreList"
	
	

	CoreList = {
		
		dataList : [],

		//刷新对应的class
		cls:null,
		//刷新对应的key
		dataListKey: null,
		
		prepare: function(url, params, refreshNow = true) {

			this.url = url
			this.params = params
			
			controller.corelist = this

			this.CoreList_vue = vue
			
			this.page = 0 //服务器默认page = 1，框架默认为底部刷新，且底部刷新会立即page自增1
			this.page_size = 40
			this.refreshStatus = 0 //0没有刷新， 1顶部刷新中， 2底部刷新中
			this.needBottomRefresh = true //是否还需要底部刷新，默认是需要。如果顶部刷新就一页数据都不够，则不需要。
			let weak_self = this
			
			let cls = this.cls

			//让父级支持滚动
			let p_dom = document.querySelector(cls).parentNode
			p_dom.classList.add("pscroll")

			if(this.dataListKey == null && controller.vue.dataList == undefined) {
				console.error("请配置dataListKey，默认值为dataList")
				return
			}
			
			if(this.dataListKey != null && controller.vue[[this.dataListKey]] == undefined) {
				console.error("CoreList提醒： 您已配置dataListKey "+this.dataListKey+"，请在当前页面的Vue的data中也配置 "+this.dataListKey)
				return
			}
			
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
					dampRateBegin: 0.5,
					dampRate: 0.12,
					bounceTime: 300,
					offset:75,
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
		
		refreshWithPage: function(isHeaderRefresh) {

			if(!isHeaderRefresh){
				
				if(!this.needBottomRefresh) {
					this.miniRefresh.endUpLoading(true, "加载失败");
					return
				}
			}
		
			if (this.refreshStatus != 0) {
				
				if (isHeaderRefresh){
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
			
			let weak_self = this
			
			appHttp.post(url, params, 0, function(o) {

				var dataListKey = weak_self.dataListKey || "dataList"

				// console.log(url,params)
				weak_self.dataList = isHeaderRefresh ? o : weak_self.dataList.concat(o)
	
				weak_self.CoreList_vue[[dataListKey]] = weak_self.dataList
				
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
				
				layer.msg(msg+"："+code, {
					time: 1000
				})
				weak_self.miniRefresh.endUpLoading(false, "加载失败");
				weak_self.miniRefresh.endDownLoading(false, "加载失败");

				
			})
		},
		
		refresh: function(params = null){
			
			if(params != null) {this.params = params}

			this.page = 1
			
			this.refreshWithPage(true)
			
		},

	}

	return CoreList
});







