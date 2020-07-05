//如需要先查询数据后导出，调用此方法
//参数分别代表查询路径，下载文件的路径(下载文件的参数在url上进行拼接)，查询的条件，option对象(弹出框的title,jsp页面中div的id)
// options如下格式    var options={
	//              titie:"导出",
	//              id:"w"
	//           }
 /*<div id="lodings" style="width:100%;height:100%;opacity:0.5;z-index:999;position: absolute;top:0;left:0;background:#ecf0f1;text-align:center;color:red;display: none;">
             <img src="./img/pages/refresh1.jpg"  style=" width:600px; z-index:9;height:300px;position: absolute;top:50%;left:50%;margin-left:-300px;margin-top:-150px" alt="正在导出">
 </div>*/
function creats(uploadurl,exporturl,data,options){
   if(options != ""){
      var html = "<form><table><tr><td>请选择导出类型：</td><td><select class='easyui-combobox' data-options='editable:false,,panelHeight:\"auto\"' style='width:160px;height:23px' id='type'> <option>excel</option> <option>csv</option></select></td></tr></table><form>";
       
        var fn = function(){
             $.messager.confirm('确认','您确认想要导出该格式的文件吗？',function(r){    
                    if (r){                       
                       var type= $('#type').combobox('getText');
                       document.getElementById('lodings').style.display = 'block';
                         exports(uploadurl,exporturl,data,type);
                         closeWindow(divid);
                    }    
                });
            }
            $('#formid').hWindow({html:html,title:options.title,submit:fn},options.id);
             $.parser.parse();
            $('#btn1').click(function(){
                alert($(this).prev().val());
            });
   }else{
	   $.messager.confirm('确认','您确认想要导出该格式的文件吗？',function(r){    
	           if (r){ 
	        	   document.getElementById('lodings').style.display = 'block';
	        	   exportss(uploadurl,exporturl,data);
                   closeWindow(divid);
	           }    
	       });
   		}
   }

function exports(uploadurl,exporturl,data,type){
    $.ajax({
        url : uploadurl,
        data : data,
        type:'post',
        dataType : 'json',
        success : function(data) {
            if (data.flag){
                var path = getContextPath();
                window.location.href = path + ""+exporturl+""+ type ;
                document.getElementById('lodings').style.display = 'none';
            }else{
                showAlert("系统提示",data.message,"error");
            }
        }
     })
}
function exportss(uploadurl,exporturl,data){
    $.ajax({
        url : uploadurl,
        data : data,
        type:'post',
        dataType : 'json',
        success : function(data) {
            if (data.flag){
                var path = getContextPath();
                window.location.href = path + ""+exporturl+"";
                document.getElementById('lodings').style.display = 'none';
            }else{
                showAlert("系统提示",data.message,"error");
            }
        }
     })
}


//如查询和导出合并成一个方法，调用以下方法
//参数分别代表： 下载文件的路径，option对象(弹出框的title,jsp页面中div的id);

function download(exporturl,options){
	   if(options != ""){
	      var html = "<form><table><tr><td>请选择导出类型：</td><td><select class='easyui-combobox' data-options='editable:false,,panelHeight:\"auto\"' style='width:160px;height:23px' id='type'> <option>excel</option> <option>csv</option></select></td></tr></table><form>";
	       
	        var fn = function(){
	             $.messager.confirm('确认','您确认想要导出该格式的文件吗？',function(r){    
	                    if (r){                      
	                       var type= $('#type').combobox('getText'); 
	                       document.getElementById('lodings').style.display = 'block';
	                         down(exporturl,type);
	                         closeWindow(divid);
	                    }    
	                });
	            }
	            $('#formid').hWindow({html:html,title:options.title,submit:fn},options.id);
	             $.parser.parse();
	            $('#btn1').click(function(){
	                alert($(this).prev().val());
	            });
	   }else{
		   var fn = function(){
	             $.messager.confirm('确认','您确认想要导出该文件吗？',function(r){    
	                    if (r){ 
	                    	 document.getElementById('lodings').style.display = 'block';
	                         downs(exporturl);
	                         closeWindow(divid);
	                    }    
	                });
	            }
	   }
	    
	}

function down(exporturl,type){
	var path = getContextPath();
	window.location.href = path + ""+url+"" + type ;
	 document.getElementById('lodings').style.display = 'none';

}
function downs(exporturl){
	var path = getContextPath();
	window.location.href = path + ""+url+"";
	 document.getElementById('lodings').style.display = 'none';

}
function getContextPath() {
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0,index+1);
    return result;
  }