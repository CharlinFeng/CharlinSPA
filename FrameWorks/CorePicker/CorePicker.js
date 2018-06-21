define([], function() {

	function CorePicker() {};
	window.picker = new CorePicker()

	//单列picker
	CorePicker.prototype.show1 = function(models,selected_value_arr,chooseClosure,cancelClosure) {
		
		var defaultValue = selected_value_arr
		
		if(defaultValue == null) {defaultValue = [models[0].value]}
		
		weui.picker(models, 
			
			{
			   className: null,
			   container: 'body',
			   defaultValue: defaultValue,
			   onChange: function (result) {
			       
			   },
			   onConfirm: function (result) {
			       
			       if(chooseClosure != null) {chooseClosure(result[0])}
			   },
			   
			   onClose: function(){
			   	
			   		if(cancelClosure != null) {cancelClosure()}
			   },
			   id: 'singleLinePicker'
			}
		);
	}
	
	//多列：两列或多列
	CorePicker.prototype.show23 = function(models,selected_value_arr,chooseClosure,cancelClosure) {
		
		// 级联picker
		weui.picker(models, {
		   className: 'custom-classname',
		   container: 'body',
		   defaultValue: [1, 3],
		   onChange: function (result) {
		     
		   },
			onConfirm: function (result) {
					       
		       if(chooseClosure != null) {chooseClosure(result[0],result[1],result[2])}
		   },
		   
		   onClose: function(){
		   	
		   		if(cancelClosure != null) {cancelClosure()}
		   },
		   id: 'doubleLinePicker'
		});
	}
	
	
	//日期选取
	CorePicker.prototype.datePicker = function(selected_day_ts,chooseClosure,cancelClosure) {
		
		let d = selected_day_ts == undefined ? new Date() : new Date(selected_day_ts * 1000)

		let year_num = d.getFullYear()
		let month_num = d.getMonth() + 1
		let day_num = d.getDate()

		let defaultValue = [year_num, month_num, day_num]
		
		// 示例1：
		weui.datePicker({
		    start: 1970,
		    end: 3000,
		    defaultValue: defaultValue,
		    onChange: function(result){
		        
		    },
		    onConfirm: function(result){
		    	
		    	let year_str = result[0].value + ""
		    	let month_str = result[1].value + ""
		    	if(month_str<10){month_str = "0"+month_str}
		    	
		    	let day_str = result[2].value + ""
		    	if(day_str<10){day_str = "0"+day_str}
		        
		        let full_str = year_str + "/" + month_str + "/" + day_str
		        
		        let ts = (Date.parse(new Date(full_str))/1000) + ""
		        
		        if(chooseClosure != null) {chooseClosure(ts)}
		        
		    },
		    
		    onClose: function(){
		   	
		   		if(cancelClosure != null) {cancelClosure()}
		   },
		    id: 'datePicker'
		});
		
	}
	
	//时间选取
	CorePicker.prototype.timePicker = function(selected_time_ts,chooseClosure,cancelClosure) {
		
		var hours = []
		for (var i=0;i<24;i++) {
		                
		    let h = {
		    	
		    	value:i,
		    	label:i
		    }
		                
		    hours.push(h)                        
		}
		
		var mins = []
		for (var i=0;i<60;i++) {
		                
		    let min = {
		    	
		    	value:i,
		    	label:i
		    }
		                
		    mins.push(min)                        
		}
		
		// 多列picker
		weui.picker(hours, mins, {
		    defaultValue: ['3', 'A'],
		    onChange: function (result) {
		        console.log(result);
		    },
		    onConfirm: function (result) {
		        
		        let h = result[0].value
		        let min = result[1].value
		        
		        if(chooseClosure != null) {chooseClosure(h, min)}
		    },
		    onClose: function(){
		   	
		   		if(cancelClosure != null) {cancelClosure()}
		    },
		    id: 'multiPickerBtn'
		});
				
		
	}


	return CorePicker
})