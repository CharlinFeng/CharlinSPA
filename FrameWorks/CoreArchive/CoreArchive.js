

define([], function() {

	function CoreArchiveStore(){}; window.arc = new CoreArchiveStore()
	
	CoreArchiveStore.prototype.set = function(key,value){
	   
	    var value_string = null
	   	
	    if(typeof value == "string") {
	    	
	    	value_string = value
	    	
	    }else{
	    	
	    	value_string = JSON.stringify(value)
	    }
	        
	    localStorage[[key]] = value_string
	}
	
	
	CoreArchiveStore.prototype.get = function(key,is_obj = false){
	   
	    var value = null
	    
	    let cache_value = localStorage[[key]]
	    
	    if(cache_value == null) {return null}
	   	
	    if(is_obj) {
	    	
	    	value = JSON.parse(cache_value)
	    	
	    }else{
	    	
	    	value = cache_value
	    }
	        
	    return value
	}
	
	
	CoreArchiveStore.prototype.remove = function(key){
	   
	    localStorage.removeItem(key)
	}
	
	
	
	
	
	
	return CoreArchiveStore
})