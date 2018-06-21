
define([], function() {

	function CoreActionSheet() {};
	window.actionSheet = new CoreActionSheet()

	//展示
	CoreActionSheet.prototype.show = function(labels, resClosure) {
		
		let weak_self = this
		
		weak_self.res = -1

		let itemModels = []

		for(var i = 0; i < labels.length; i++) {

			let label = labels[i]
			let clickClosure = function() {
				
				let index = labels.indexOf(label)
				let index_use = index+1
				weak_self.res = index_use
				if(resClosure != undefined) {resClosure(index_use)}
			}

			let itemModel = {
				"label": label,
				"onClick": function(){
					if(resClosure != undefined) {clickClosure()}
				}
			}
			
			itemModels.push(itemModel)
		}

		weui.actionSheet(itemModels, [{
			
			label: '取消',
			onClick: function() {if(resClosure != undefined) {weak_self.res = 0; resClosure(0)}}
			
		}], {
			onClose: function() {
				
				if(resClosure != undefined) {
					
					if(weak_self.res == -1) {
						resClosure(-1)
					}
					
				}
			}
		});
	}

	return CoreActionSheet
})

