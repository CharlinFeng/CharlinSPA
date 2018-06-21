let CoresvpCssKey = "css!FrameWorks/CoreSVP/css/coresvp"
define([CoresvpCssKey], function(css) {

	function CoreSVP() {}; window.svp = new CoreSVP()
	
	//成功
	CoreSVP.prototype.debug = function(obj) {
		
		this.showSuccess(JSON.stringify(obj),null,100000)
		
	}
	
	//成功
	CoreSVP.prototype.showSuccess = function(str = "操作成功", resClosure,d=2000) {
		
		this.dismiss()
//		this.dismiss(function() {
			weui.toast(str, {
				duration: d,
				className: 'custom-classname',
				callback: function() {
					if(resClosure != undefined) {
						resClosure()
					}
				}
			});
//		})
	}

	//失败
	CoreSVP.prototype.showError = function(str = "操作失败", resClosure) {
	
		this.dismiss()
//		this.dismiss(function() {
		let html="<div class='svp_content fadeIn'>"+str+"</div>"
			weui.topTips(html, {
				duration: 
				2000,
				className: 'custom-classname',
				callback: function() {
					if(resClosure != undefined) {
						resClosure()
					}
				}
			});
//		})
	}

	//加载中
	CoreSVP.prototype.showLoading = function(str = "加载中") {
	
		this.dismiss()
		let weak_self = this
//		this.dismiss(function() {
			
			weak_self.loading = weui.loading(str, {
				className: 'custom-classname'
			});
//		})
	}

	//关闭
	CoreSVP.prototype.dismiss = function(resClosure) {

//		if(this.loading == undefined) {
//			if(resClosure != undefined) {
//				resClosure()
//			};
//			return
//		}
		
		
		if(this.loading == undefined){return}
		
		this.loading.hide(function() {
			if(resClosure != undefined) {
				resClosure()
			}
		});
	}

	return CoreSVP
})

