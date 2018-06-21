define([], function() {

	function CoreAlertView() {};
	window.alertView = new CoreAlertView()

	//一个按钮的弹窗
	CoreAlertView.prototype.showAlert1 = function(title, content, label1 = "知道了", resClosure) {
		weui.alert(content, {
			title: title,
			buttons: [{
				label: label1,
				type: 'primary',
				onClick: function(){
					if(resClosure != undefined) {resClosure()}
				}
			}]
		});
	}

	//两个按钮的弹窗
	CoreAlertView.prototype.showAlert2 = function(title, content, resClosure) {
		
		weui.confirm(content, {
			title: title,
			buttons: [{
				label: '取消',
				type: 'default',
				onClick: function(){
					if(resClosure != undefined) {resClosure(0)}
				}
			}, {
				label: '确定',
				type: 'primary',
				onClick: function(){
					if(resClosure != undefined) {resClosure(1)}
				}
			}]
		});
	}

	return CoreAlertView
})