//使用说明
//1.在jsp页面建一个空的div盒子，并且取id名;
//2.在js中拼接出一个完整的div元素（根据选择条件），使用tr td拼接，例如 var div="<tr><td>中文说明</td><td><input name=''></td></tr>"(input的name值和后台接收的参数对应);
//3.调用creat()方法;
//  creat(divid,div,title,formid,url)里面的参数分别代表 jsp中建立空盒子的id,
//												   js中拼接的元素,
//                                                 弹出框的标题,
//                                                 form表单的id(在代码里封装的form表单方便往后台传值,为了方便后面使用者取表单里的值，所有表单的id由使用者自己选取),
//                                                 给后台提交的路径;

function creat(divid,div,title,formid,url){
    var divs="";
    var html = '<form style="padding:3px 0 0 5px" id="'+formid+'" method="post" enctype="multipart/form-data" onsubmit="return false"><table id="table">divs</table></form>';
        divs+=div;
        divs+='<tr><td>选择文件：</td><td><input id="files" name="file" class="easyui-filebox" style="width:200px;height:23px" data-options="prompt:\'选择一个文件...\', buttonText:\'选择文件\' "/></td></tr>';
        html=html.replace("divs",divs);
        var fn = function(){
        	 var input=$("#"+formid).find("input:visible");
        	 for(var i=0;i<input.length;i++){
        		 if(input[i].value==""){
        			 showMessage("请选择上传条件");
        				return false;
        		 }
        	 }
        	 $.messager.confirm('确认','您确认想要上传该文件吗？',function(r){    
	        	    if (r){    
	        	    	 $('#'+formid).ajaxSubmit({
	                         url:url,
	                         success:function(r){
	                             if (r.flag==true){	                         
	                                 showMessage("数据导入成功！");
	                             } else {
	                                 showAlert("系统提示",r.message,"error");
	                             }
	                          }
	                     }) 
	                     closeWindow(divid);
	        	    }    
	        	});
            }
            $('#'+formid).hWindow({html:html,title:title,submit:fn},divid);
             $.parser.parse();
            $('#btn1').click(function(){
                alert($(this).prev().val());
            });
}