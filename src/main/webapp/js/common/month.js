/*easyui-datebox日期框修改为选择月份插件，调用month(id)方法，传入的id为input的id名*/
function month(id){
	$(function () {
		 $('#'+id).datebox({  
		        onShowPanel: function () {
		            span.trigger('click');  
		            if (!tds) setTimeout(function () {  
		                tds = p.find('div.calendar-menu-month-inner td');  
		                tds.click(function (e) {  
		                    e.stopPropagation();  
		                    var year = /\d{4}/.exec(span.html())[0] 
		                            , month = parseInt($(this).attr('abbr'), 10); 
		                    if (month<10){month='0'+month;}
		                    $('#'+id).datebox('hidePanel')
		                            .datebox('setValue',year+'-'+month);
		                    queryParam = year + month;
		                    
		                });  
		            }, 0)  
		        },  
		        parser: function (s) {  
		            if (!s) return new Date();  
		            var arr = s.split('-');  
		            return new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, 1);  
		        },  
		        formatter: function (d) { 
		        	var month=d.getMonth()+1;
		        	if (month<10){month='0'+month;}
		        	return d.getFullYear() + '-' + month; }  
		    });  
		    var p = $('#'+id).datebox('panel'),
		            tds = false, 
		            span = p.find('span.calendar-text');
		    var myDate = new Date(); 
			var myYear = myDate.getFullYear();   
			var myMonth = myDate.getMonth()+1; 
			myMonth = (myMonth < 10 ? "0" + myMonth : myMonth); 
			queryParam = myYear + myMonth;
			//$('#int1').datebox('setValue',myYear + '-' + myMonth);
	});
	
		
}

   
