function showDocument(product,page){
	$.ajax({
		async : false,
		url:'./base/documentation/showDocument',
		data :{'product':product,'page':page}, 
		type:'post',
		dataType : 'json',
		success : function(r) {
			if(r.flag){
			    var boarddiv = '<div id="window-docu" class="easyui-window" title="系统公告" style="width:80%;height:80%;" closed="true"></div> ';
			    var content = '<div class="easyui-layout" data-options="fit:true"> <div  style="height:50px;text-align:center;font-size:16px;font-weight:bold;line-height:45px;color:#3C3C3C">'+r.rows.name+'</div><div style="padding:10px 20px;font-size:16px;overflow-y:auto">'+ r.rows.content1+'</div></div>';
				$(document.body).append(boarddiv);
				$('#window-docu').window({    
				    content:content
				}); 
				$('#window-docu').window('open');  
			}
		}
	});	
}