/* 1.导入功能（creat()方法） ;
 * 	  使用说明：
 * 		1.在jsp页面建一个空的div盒子，并且取id名;		
 * 		2.在js中拼接出一个完整的div元素（根据选择条件），使用tr td拼接，例如 var div="<tr><td>中文说明</td><td><input name=''></td></tr>"(input的name值和后台接收的参数对应);
 * 		3.调用creat()方法;
 *   	creat(divid,div,title,formid,url)里面的参数分别代表 jsp中建立空盒子的id,
 * 												   js中拼接的元素,
 *                                                  弹出框的标题,
 *                                                  form表单的id(在代码里封装的form表单方便往后台传值,为了方便后面使用者取表单里的值，所有表单的id由使用者自己选取),
 *                                                 给后台提交的路径;
 * 2.导出功能
 * 	 1:在jsp页面中最外层div里面添加遮罩层<div id="lodings" style="width:100%;height:100%;opacity:0.5;z-index:999;position: absolute;top:0;left:0;background:#ecf0f1;text-align:center;color:red;display: none;">
             <img src="./img/pages/refresh1.jpg"  style=" width:600px; z-index:9;height:300px;position: absolute;top:50%;left:50%;margin-left:-300px;margin-top:-150px" alt="正在导出">
         </div>
 * 	 2:如需要先查询数据后导出，调用creats(uploadurl,exporturl,data,options);
 * 	         	参数分别代表查询路径，下载文件的路径(下载文件的参数在url上进行拼接)，查询的条件，option对象(弹出框的title,jsp页面中div的id);
 * 	   			options如下格式    var options={
 *               	titie:"导出",
 * 	             	id:"w"
 *          	 }
 *   如查询和导出合并成一个方法，调用download(exporturl,options)方法；
 *   			参数分别代表： 下载文件的路径，option对象(弹出框的title,jsp页面中div的id);
 * 3.messager警告、提示框突出显示
 * 	  调用showMessageOnBottoms(title,msg)方法；参数分别代表传入的提示框的title文字、提示内容
 * 
 * 4.easyui-datebox日期框修改为选择月份插件，调用month(id)方法，传入的id为input的id名
 */
