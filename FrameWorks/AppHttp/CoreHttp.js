 
let AxiosKey = "FrameWorks/AppHttp/Lib/axios.min"

define([AxiosKey, DeviceKey], function(axios, Device) {
	

	window.CoreHttp = {
		
		device: null,
		
		token:"",
	
		lang:"",
		px:"",
		os:"",
		oem:"",
		version:"",
		browser:"",
		
		config : {
			
			method: 'POST',
			baseURL: 'http://oil.xiaomubiao2018.com',
			headers: {
				'Content-Type': 'application/json',
			},
			
			timeout: 9*1000,
			responseType: 'json',
		},
		
		//POST请求:
		post : function(url, params, successBlock, errorBlock) {


			
			this.handleConfig()
			
			axios.post(url, params,this.config).then(function (response) {
				
				if(successBlock != undefined) {successBlock(response)}
			   
			}).catch(function (error) {

				if(errorBlock != undefined) {errorBlock(error)}
				
			});

		},
		
		
		//upload请求:
		upload : function(url, params, file_obj, successBlock, errorBlock) {
			
			this.handleConfig(true)
			
			let form_data = new FormData()
			
			for(var file_key in file_obj) {
				
				let v_arr = file_obj[[file_key]]
				
				if(typeof v_arr == "function"){continue}
				
				if(v_arr == undefined) {continue}
				
				for (var i=0;i<v_arr.length;i++) {
			                
				    let file = v_arr[i]
				    form_data.append(file_key,file, file.file_name)                     
				}
			}
				
			for (var k in params){
				
				let v = params[[k]]
				
				form_data.append(k,v)
			}

			axios.post(url, form_data,this.config).then(function (response) {
				
				if(successBlock != undefined) {successBlock(response)}
			   
			}).catch(function (error) {
				
				if(errorBlock != undefined) {errorBlock(error)}
				
			});

		},
		
		//处理Headers:
		handleConfig: function(upload=false){
			
			let weak_self = this
			
			axios.interceptors.request.use(function (config) {
					
				config.headers["Content-Type"] = upload ? 'multipart/form-data' : 'application/json'
				
			    if(weak_self.device == null) {weak_self.device = new Device(window.navigator.userAgent)}
			    
			    //os
			    if(weak_self.os == '') {weak_self.os = weak_self.device.os()}
			    config.headers.os = weak_self.os
			    
			    //version
			    if(weak_self.os == "iOS"){
			    	
				    if(weak_self.version == '') {weak_self.version = weak_self.device.version("iPhone")}
				    config.headers.version = weak_self.version
			    	
			    }else{
			    	
				    if(weak_self.version == '') {weak_self.version = weak_self.device.version("Android")}
				    config.headers.version = weak_self.version
			    }
			    
			    //px
			    if(weak_self.px == '') {
			    	
			    	let w = window.screen.width
			    	let h = window.screen.height
			    	
			    	weak_self.px = w+"*"+h
			    }
			    config.headers.px = weak_self.px
			    
			    //oem
			    if(weak_self.oem == '') {weak_self.oem = weak_self.device.mobile()}
			    config.headers.oem = weak_self.oem
			    
			    //browser
			    if(weak_self.browser == '') {weak_self.browser = weak_self.device.userAgent()}
			    config.headers.browser = weak_self.browser
			    
			    //version
			    if(weak_self.version == '') {weak_self.version = weak_self.device.os()}
			    config.headers.os = weak_self.os

			    config.headers.lang = "zh"
			    
			    //uuid
			    var uuid = localStorage.getItem("uuid")

			    //设置头信息
			    config.headers.uuid = uuid
			    
				//token
				let u_json = localStorage.getItem("um")
				let u = JSON.parse(u_json)
				
				if(u != undefined) {
					weak_self.token = u.token
				}

				weak_self.token = 'e10adc3949ba59abbe56e057f20f883e';
				
			    config.headers.token = weak_self.token
				
			    return config

			});
			
		}
	}
	
	return CoreHttp
})