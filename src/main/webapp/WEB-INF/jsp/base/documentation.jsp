<%@ include file="/include.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8"
    content="ie=edge" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8"
    content="ie=edge" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="X-UA-Compatible" content="IE=edge; charset=utf-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE"> 
<meta http-equiv="expires" content="0">
<title>说明文档</title>
<script type="text/javascript" src="./js/common/datagrid-detailview.js"></script>
<script type="text/javascript" src="./js/pages/base/documentation.js"></script>
<script type="text/javascript" src="./js/common/showDocument.js"></script>
<!-- ueditor所需js -->
<script type="text/javascript" charset="utf-8" src="./ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="./ueditor/ueditor.all.min.js"> </script>
<script type="text/javascript" charset="utf-8" src="./ueditor/lang/zh-cn/zh-cn.js"></script> 

<script type="text/javascript">

    //实例化编辑器
    //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
    var ue = UE.getEditor('editor');
    var ue = UE.getEditor('editor_edit');
</script>
</head>
<body>
    <div class="easyui-layout" data-options="fit:true" style="position:absolute">
        <div id="north_Content" data-options="region:'north',split:false,border:false" style="margin-top:3px;height:750px">
            <table style="margin:3px">
                <tr>
                    <td><a id="savebtn" href="javascript:void(0)" class="easyui-linkbutton" 
                        data-options="iconCls:'icon-smartrix-add'" onclick="opensave()">新建文档</a></td>
                    <td width="5%"></td>
                    <td><a id="editbtn" href="javascript:void(0)" class="easyui-linkbutton" 
                        data-options="iconCls:'icon-mxy-modify'" onclick="openedit()">编辑文档</a></td>
                    <td width="5%"></td>
                    <td><a id="deletebtn" href="javascript:void(0)" class="easyui-linkbutton" 
                        data-options="iconCls:'icon-mxy-delete'" onclick="deletebtn()">删除文档</a></td>
                </tr>
            </table>
            
            <div id="north_panel1" style="margin:3px;height:80%">
                <table id="documentable" style="height: 100%; width: 100%;"></table>
            </div>            
        </div>  
        
       <!--  <div id="center_Content" data-options="region:'center',split:true" style="margin-left:3px">
            <div id="reportDetail" title="详情" style="padding:20px 10px;">   
                
            </div> 
        </div>    --> 
        
    </div>
   
    <div id="window-save" class="easyui-window" title="新建文档"
        style="width: 950px; height: 500px;" data-options="iconCls:'icon-add',maximizable:false"
        closed="true" modal="true">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',border:false" style="height: 50px; position: relative">
                <table style="margin: 5px 15px 5px">
                    <tr height="40px">
                        <td align="right">标题名称:</td>
                        <td width="2%"></td>
                        <td><input id="name" name="name" class="easyui-textbox"
                            data-options="prompt:''"
                            style="width: 180px; height: 25px; margin-top: 15px" /></td>
                        <td align="right" ><span id="nameStar" style="color:red;visibility:hidden">&nbsp;&nbsp;*</span></td>
                        <td width="5%"></td>
                        
                        <td align="right">所属产品:</td>
                        <td width="2%"></td>
                        <td><input id="product" name="name" class="easyui-textbox"
                            data-options="prompt:''"
                            style="width: 180px; height: 25px; margin-top: 15px" /></td>
                        <td align="right" ><span id="productStar" style="color:red;visibility:hidden">&nbsp;&nbsp;*</span></td>
                        <td width="5%"></td>
                        
                        <td align="right">所属页面:</td>
                        <td width="2%"></td>
                        <td><input id="page" name="name" class="easyui-textbox"
                            data-options="prompt:''"
                            style="width: 180px; height: 25px; margin-top: 15px" /></td>
                        <td align="right" ><span id="pageStar" style="color:red;visibility:hidden">&nbsp;&nbsp;*</span></td>
                    </tr>
                    
                </table>
            </div>
            <div data-options="region:'center',border:false" >
                <script id="editor" type="text/plain" style="width:900px;height:300px;margin-left:15px"></script>
            </div>
            <div data-options="region:'south',border:false" style="height: 50px; position: relative">
                <div id="" style="padding: 5px; height: auto">
                    <a href="javascript:void(0)"
                        onclick="save('window-save')"
                        class="easyui-linkbutton" data-options="iconCls:'icon-ok'"
                        id="savebtn" style="position: absolute; left: 34%; top: 12%">确认</a>
                    <a href="javascript:void(0)"
                        onclick="cancel('window-save')"
                        class="easyui-linkbutton"
                        data-options="iconCls:'icon-smartrix-delete'" id="cancelbtn"
                        style="position: absolute; left: 53%; top: 12%">取消</a>
                </div>
            </div>
        </div>
    </div>
    
    
    <div id="window-edit" class="easyui-window" title="编辑文档"
        style="width: 950px; height: 500px;" data-options="iconCls:'icon-add',maximizable:false"
        closed="true" modal="true">
        <div class="easyui-layout" data-options="fit:true">
            <div data-options="region:'north',border:false" style="height: 50px; position: relative">
                <table style="margin: 5px 15px 5px">
                    <tr height="40px">
                        <td align="right">标题名称:</td>
                        <td width="2%"></td>
                        <td><input id="name_edit" name="name" class="easyui-textbox"
                            data-options="prompt:''"
                            style="width: 180px; height: 25px; margin-top: 15px" /></td>
                        <td align="right" ><span id="nameStar_edit" style="color:red;visibility:hidden">&nbsp;&nbsp;*</span></td>
                        <td width="5%"></td>
                        
                        <td align="right">所属产品:</td>
                        <td width="2%"></td>
                        <td><input id="product_edit" name="name" class="easyui-textbox"
                            data-options="prompt:''"
                            style="width: 180px; height: 25px; margin-top: 15px" /></td>
                        <td align="right" ><span id="productStar_edit" style="color:red;visibility:hidden">&nbsp;&nbsp;*</span></td>
                        <td width="5%"></td>
                        
                        <td align="right">所属页面:</td>
                        <td width="2%"></td>
                        <td><input id="page_edit" name="name" class="easyui-textbox"
                            data-options="prompt:''"
                            style="width: 180px; height: 25px; margin-top: 15px" /></td>
                        <td align="right" ><span id="pageStar_edit" style="color:red;visibility:hidden">&nbsp;&nbsp;*</span></td>
                    </tr>
                </table>
            </div>
            <input id="id_edit" class="easyui-textbox" style="visibility:hidden"></input>
            <div data-options="region:'center',border:false" >
                <script id="editor_edit" type="text/plain" style="width:900px;height:300px;margin-left:15px"></script>
            </div>
            <div data-options="region:'south',border:false" style="height: 50px; position: relative">
                <div id="" style="padding: 5px; height: auto">
                    <a href="javascript:void(0)"
                        onclick="edit('window-edit')"
                        class="easyui-linkbutton" data-options="iconCls:'icon-ok'"
                        id="savebtn" style="position: absolute; left: 34%; top: 12%">确认</a>
                    <a href="javascript:void(0)"
                        onclick="cancel('window-edit')"
                        class="easyui-linkbutton"
                        data-options="iconCls:'icon-smartrix-delete'" id="cancelbtn"
                        style="position: absolute; left: 53%; top: 12%">取消</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
