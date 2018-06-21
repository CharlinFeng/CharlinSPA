
define([CoreHttpKey, CoreSVPKey], function(ch, CoreSVP) {
	
	let svp_ah = new CoreSVP()
	
	function AppHttp(){}
	
	
	//POST请求:
	AppHttp.prototype.post = function(url, params, type, successBlock, errorBlock) {
			
		let weak_self = this	
			
		if(type == 1){svp_ah.showLoading()}
		
		ch.post(url, params, function(o){
		   
		   	weak_self.handleSuccess(url,o,type,successBlock,errorBlock)
		   			        
		}, function(e){
			
			weak_self.handleError(e,type)
		})
	}
	
	//upload请求:
	AppHttp.prototype.upload = function(url, params, files_obj, type, successBlock, errorBlock) {
		
		let weak_self = this
		
		if(type == 1){svp_ah.showLoading()}
		
		ch.upload(url, params, files_obj, function(o){
		
		   	weak_self.handleSuccess(url,o,type,successBlock,errorBlock)
					        
		}, function(e){
			
			weak_self.handleError(e,type)
		})
	}
	
	
	//处理success
	AppHttp.prototype.handleSuccess = function(url,o, type, successBlock, errorBlock){
		
		svp_ah.dismiss()
	    let status = o.status
	    let statusText = o.statusText
	    
	    //服务器状态码不正确
	    if(status != 200) {
	    		
	    		let error = "code："+status +"，" + statusText
	    		
		    	console.log(error)
		    	
		    	if(errorBlock != undefined) {errorBlock(error)}
		    	
		    	svp_ah.showError(error)
		    	
		    	
		    	
		    	return
	    }
	   	
	    //API层
	    let data = o.data
	    let code = data.code
	    let desc = data.desc
	    
	    //api接口状态不正确
	    if(code != 200) {
	    	
    		let error = "code："+code +"，" + desc
	    
	    	if(errorBlock != undefined) {errorBlock(error)}
	    	
	    	svp_ah.showError(error);task_id
	    	
	    	if(code == 401){
	    		
	    		//用户当前登录无效
	    		//删除缓存
	    		arc.remove("um")
	    		
	    		iv.dismiss()
//  		   	let url_login = "/YouKa/App/"+Login
//				window.location.href = url_login
	    		
	    	}
	    	
	    	
	    	return
	    }
	    
	    
	    //数据全部正确
	    let data_correct = data.data
	    
	    if(type == 1) {svp_ah.dismiss()}
	    
	    if(successBlock != undefined) {successBlock(data_correct)}
		
	}
	
	//处理error:
	AppHttp.prototype.handleError = function(e, type){
		
		let err_str = typeof e == "string" ? e : "请求失败101" 
		
		if(type == 1) {svp_ah.showError(err_str)}
		
	}
	
	//生成files:
	AppHttp.prototype.blobDatasToFiles = function(blobDatas){
		
		var files = []
		
		console.log(blobDatas)
		
		for (var i=0;i<blobDatas.length;i++) {
			
			var blobData = blobDatas[i]
         
		    let file = this.dataURLtoFile(blobData,i)
			
			if(file == undefined) {continue}
			
		    files.push(file)
		}
		
		return files
	}
	
	//转换
	AppHttp.prototype.dataURLtoFile = function(blobData,i){
	
		
		if(blobData == null){return}
		if(blobData == undefined) {return}
		
		let arr = blobData.split(',')
		
		if(arr.length == 1) {return}
		
		let mimeType = arr[0].match(/:(.*?);/)[1]
		
		console.log(arr)
		
		bstr = atob(arr[1])
		
		n = bstr.length
		
		u8arr = new Uint8Array(n)
		
		while(n--){
			
		    u8arr[n] = bstr.charCodeAt(n);
		}
		
		var subfix = "jpg"
		
		if(mimeType == "image/jpeg") {subfix="jpg"}
		if(mimeType == "audio/mpeg") {subfix="mp3"}
		if(mimeType == "audio/x-mpeg") {subfix="mp3"}
		if(mimeType == "audio/x-wav") {subfix="wav"}
		if(mimeType == "audio/wav") {subfix="wav"}
		
		let file_name = i+"."+subfix
		
		let blob = new Blob([u8arr], {type:mimeType});
		blob.file_name = file_name
	
		let file = new File([blob], file_name)

		return blob
    }

	
	window.ah = new AppHttp()

	return AppHttp

})