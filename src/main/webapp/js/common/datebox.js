/**
 * 修改时间显示格式
 */
$.fn.datebox.defaults.formatter = function(date){
	 var y = date.getFullYear();
		var m ,d= '';
		if(date.getMonth()+1<10){
			m='0'+(date.getMonth()+1);
		}else{
			m=date.getMonth()+1;
		}
		if(date.getDate()<10){
			d='0'+date.getDate();
		}else{
		 d = date.getDate();
		}
		return y+''+m+''+d;	
};
$.fn.datebox.defaults.parser = function (s){
	if (!s) return new Date();
	var y = parseInt(String(s).substr(0,4),10);
	var m = parseInt(String(s).substr(4,2),10);
	var d = parseInt(String(s).substr(6,2),10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
		return new Date(y,m-1,d);
	} else {
		return new Date();
	}
};