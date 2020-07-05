document.write("<script language='javascript' src='./common/messager.js'></script>");

$(document).ready(function(){ 
	$('#documentable').datagrid({   
			url: './base/documentation/initDocument',  //查询全部列表
			idField: "id",
			sortName : 'id',
			sortOrder : 'ASC',
			rownumbers: true,
			method:'post',
			singleSelect: true,
			pagination:true,
			fit:true,
			striped:true,
			dataType : 'json',
		    columns:[[
					{title:'ID',field:'id',width:100,align:'center',halign:'center',hidden:true},
					{title:'标题名称',field:'name',width:100,align:'center',halign:'center'},
			        {title:'所属产品',field:'product',width:100,align:'center',halign:'center'},
			      	{title:'所属页面',field:'page',width:100,align:'center',halign:'center'},
					{title:'概要',field:'content',width:$(this).width() * 0.6,align:'left',halign:'center',
			      		formatter : function(value,row,index){
			      			if(row.content != null && row.content != '' && row.content.length>50) {
			      				return row.content.substring(0,50);
			      			}
        			} },
					{title:'预览',field:'g',width:$(this).width() * 0.06,align:'center',halign:'center',styler: function(value, row, index){	        			   
		        			        return 'position:relative;';	        			   
		        			},
		        			formatter : function(value,row,index){ 
		        			    return '<a name="opera" class="easyui-linkbutton" id ="'+ row.id+'"  onclick="review(this)"></a>'
		        			}  
		             }
		            /* {title:'删除',field:'remove',width:$(this).width() * 0.06,align:'center',halign:'center',	styler: function(value, row, index){	        			   
	        			        return 'position:relative;';	        			   
	        			},        			
	              		formatter : function(value,row,index){
	              			return '<a name="opera1" class="easyui-linkbutton" ids="' + row.id + '"  onclick="deletebtn(this)"></a>'
	              		}  
	              	 }*/
		            ]],
		     onLoadSuccess:function(data){
		    	 $("a[name='opera']").linkbutton({text:'',plain:true,iconCls:'icon-mxy-modify'});  
		    	 $("a[name='opera1']").linkbutton({text:'',plain:true,iconCls:'icon-mxy-delete'}); 
		    	 $('#documentable').datagrid('fixRowHeight');
		     },
		     onClickRow:function(index, row){
		    	 //$("#reportDetail").html(row.content1);
		     }
		 });
	
});


function review(obj){
	var id = $(obj).attr('id');
	$.ajax({
		async : false,
		url:'./base/documentation/findDocument',
		data :{'id':id}, 
		type:'post',
		dataType : 'json',
		success : function(r) {
			if(r.flag){
				var title = r.rows.name;
				title = '<h1 style="height:30px;text-align:center;font-size:25px;font-weight:bold;line-height:45px;color:#3C3C3C">'+title+'</h1>';
				var content = r.rows.content1;
				var boarddiv = '<div id="window-docu" class="easyui-window" title="预览窗口" style="width:80%;height:80%;position:relative" closed="true"></div> ';
                title = '<h1 style="height:30px;text-align:center;font-size:25px;font-weight:bold;line-height:45px;color:#3C3C3C">'+title+'</h1>';
                content = '<div id ="word" style="height:98%;" class="easyui-layout" data-options="fit:true"><div style="height:80%;padding:10px 10px;font-size:16px;overflow-y:auto">'
                        + title+'<br/>'+content+'</div></div>';
                $(document.body).append(boarddiv);
                $('#window-docu').window({    
                    content:content,
                    onBeforeClose:function(){ 
                        $("#window-docu").remove();
                    }
                }); 
				$('#window-docu').window('open');
			}
		}
	});
	
	
	
		
}


function openedit(){
	var dg = $('#documentable'); //得到list
    //判断是否选中了一样进行编辑
    if(!isSingleSelected(dg)){
    	showMessageOnBottom("系统提示:"+"请选择一条数据");
        return false;
    }else{
    	$('#window-edit').window('open');
    	var rowData = getSelected(dg);
    	var id = rowData.id;
    	var name = rowData.name;
    	var product = rowData.product;
    	var page = rowData.page;
    	var content1 = rowData.content1;
    	$('#id_edit').textbox('setValue',id);
    	$('#name_edit').textbox('setValue',name);
    	$('#product_edit').textbox('setValue',product);
    	$('#page_edit').textbox('setValue',page);
    	$('#product_edit').textbox('disable');
    	$('#page_edit').textbox('disable');
    	UE.getEditor('editor_edit').setContent(content1, '');
    }
}

function deletebtn(){
	var dg = $('#documentable'); //得到list
    //判断是否选中了一样进行编辑
    if(!isSingleSelected(dg)){
    	showMessageOnBottom("系统提示:"+"请选择一条数据");
        return false;
    }else{
    	var rowData = getSelected(dg);
    	$.ajax({
    		async : false,
    		url:'./base/documentation/deleteDocument',
    		data :{'id':rowData.id}, 
    		type:'post',
    		dataType : 'json',
    		success : function(r) {
    			if(r.flag){
    				$('#documentable').datagrid('reload');
    				showMessageOnBottom("删除成功");
    				//$("#reportDetail").html("");
    			}
    		}
    	});
    }
}

function opensave(){
	$('#name').textbox('clear');
	$('#product').textbox('clear');
	$('#page').textbox('clear');
	UE.getEditor('editor').setContent('', '');
	
	//新增
	UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
	UE.Editor.prototype.getActionUrl = function(action){
		if(action == '/resource/upload/images'){
			return basePath+'resource/upload/images';
		}else{
			return this._bkGetActionUrl.call(this, action);
		}
	}
	$('#window-save').window('open');
}

function cancel(window,form){
	closeWindow(window);
}

function save(window){
	var name = $('#name').textbox('getText');
	var product = $('#product').textbox('getText');
	var page = $('#page').textbox('getText');
	
	var content = UE.getEditor('editor').getPlainTxt()
	
    var content1 = UE.getEditor('editor').getContent();
    
	if(content1 == ""){
		showMessageOnBottom("请输入内容");
	}
    if(name == ""){
		$("#nameStar").css("visibility","visible");
	}
    if(product == ""){
		$("#productStar").css("visibility","visible");
	}
    if(page == ""){
		$("#pageStar").css("visibility","visible");
	}
    
	if(name == "" || product == "" || page == "" || content1 == ""){
		return false;
	}else{
		$.ajax({
			async : false,
			url:'./base/documentation/saveDocument',
			data :{'name':name,'product':product,'page':page,'content':content,'content1':content1}, 
			type:'post',
			dataType : 'json',
			success : function(r) {
				if(r.flag){
					closeWindow(window);
					$('#documentable').datagrid('reload');
					showMessageOnBottom(r.message);
					//$("#reportDetail").html(content1);
				}else{
					showMessageOnBottom(r.message);
				}
			}
		});	
	}
}



function edit(window){
	var name = $('#name_edit').textbox('getText');
	var product = $('#product_edit').textbox('getText');
	var page = $('#page_edit').textbox('getText');
	var id = $('#id_edit').textbox('getText');
	
	if(name == ""){
		$("#nameStar_edit").css("visibility","visible");
	}
    if(product == ""){
		$("#productStar_edit").css("visibility","visible");
	}
    if(page == ""){
		$("#pageStar_edit").css("visibility","visible");
	}
	
	var content = [];
	content.push(UE.getEditor('editor_edit').getPlainTxt());
	content.join("\n");
	
    var content1 = [];
    content1.push(UE.getEditor('editor_edit').getContent());
    content1.join("\n");
	
    if(name == "" || product == "" || page == "" ){
		showMessageOnBottom("*为必填项");
		return false;
	}else{
		$.ajax({
			async : false,
			url:'./base/documentation/editDocument',
			data :{'id':id,'name':name,'product':product,'page':page,'content':content.toString(),'content1':content1.toString()}, 
			type:'post',
			dataType : 'json',
			success : function(r) {
				if(r.flag){
					closeWindow(window);
					$('#documentable').datagrid('reload');
					showMessageOnBottom(r.message);
					//$("#reportDetail").html(content1);
				}else{
					showMessageOnBottom(r.message);
				}
			}
		});	
	}
}