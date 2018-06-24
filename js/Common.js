define("Common", ["lodash", "jquery"], function(_, $) {
	
	function Common() {
		
	}
	/*
	Common.clone = function(obj) {
		//return _.cloneDeep(obj);
		return $.extend(true, {}, obj);
	}
	*/
	Common.clone = function(obj) {
		if(typeof obj !== "object") {
			return obj;
		}
		
		var ret = Array.isArray(obj)?[]:{};
		var wm = new WeakMap();
		var queue = [
			{
				"old": obj,
				"new": ret
			}
		];
		var it;
		wm.set(obj, ret);
		while(queue.length) {
			it = queue.shift();
			
			for(var key in it["old"]) {
				if(typeof it["old"][key] !== "object") {
					it["new"][key] = it["old"][key];
				}else if(wm.has(it["old"][key])){
					it["new"][key] = wm.get(it["old"][key]);
				}else{
					it["new"][key] = Array.isArray( it["old"][key] )?[]:{};
					wm.set(it["old"][key], it["new"][key]);
					queue.push({
						"old": it["old"][key],
						"new": it["new"][key]
					});
				}				
			}
		}
		return ret;
	}
	
	return Common;
});