<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    String sessionID = session.getId();
    String userName = request.getRemoteUser();
%>
<!DOCTYPE html>
<html lang="cn">
<base href="<%=basePath%>">

<!-- Meta -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="keywords" content="Smartrix" />
<meta name="description" content="Smartrix" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<!-- 如果安装了GCF，则使用GCF来渲染页面，如果为安装GCF，则使用最高版本的IE内核进行渲染  -->
<!-- End of Meta -->


<title>Smartrix</title>

<link rel="icon" href="./img/logo/travelsky.ico" type="image/x-icon" />
<link rel="shortcut icon" href="./img/logo/travelsky.ico"
    type="image/x-icon" />

<!-- Libraries -->

<!-- Themes -->
<link rel="stylesheet" type="text/css" href="./css/common/generic.css">
<!-- <link rel="stylesheet" type="text/css" href="./css/common/global.css"> -->
<link rel="stylesheet" type="text/css" href="./css/themes/smartrix/easyui.css">
<!-- <link rel="stylesheet" type="text/css" href="./css/themes/metro-blue/easyui.css"> -->
<link rel="stylesheet" type="text/css" href="./css/themes/icon.css">
<link rel="stylesheet" type="text/css" href="./css/pages/alertwindow.css">

<script type="text/javascript" src="./js/lib/jquery.min.js"></script>
<script type="text/javascript" src="./js/lib/jquery.easyui.min.js"></script>
<script type="text/javascript" src="./js/lib/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="./js/lib/echarts.min.js"></script>

<script type="text/javascript" src="./js/common/settings.js"></script>
<script type="text/javascript" src="./js/common/window.js"></script>
<script type="text/javascript" src="./js/common/page.js"></script>
<script type="text/javascript" src="./js/common/datagrid.js"></script>
<script type="text/javascript" src="./js/common/messager.js"></script>
<script type="text/javascript" src="./js/common/validatebox.js"></script>
<script type="text/javascript" src="./js/common/object.js"></script>
<script type="text/javascript" src="./js/common/format.js"></script>
<script type="text/javascript" src="./js/common/datebox.js"></script>
<script type="text/javascript" src="./js/common/alertwindow.js"></script>
<script type="text/javascript" src="./js/common/upload.js"></script>
<script type="text/javascript" src="./js/common/export.js"></script>
<script type="text/javascript" src="./js/common/month.js"></script>
<script type="text/javascript" src="./js/common/year.js"></script>
<script type="text/javascript" src="./js/common/showEcharts.js"></script>
<script type="text/javascript" src="./js/common/easyui.datebox.yearmonth.js"></script>
<script type="text/javascript">
    var basePath = '<%=basePath%>';
    var sessionID = '<%=sessionID%> ';

    //处理键盘事件  
    function doKey(e) {
        var ev = e || window.event;//获取event对象  
        var obj = ev.target || ev.srcElement;//获取事件源  
        var t = obj.type || obj.getAttribute('type');//获取事件源类型  
        if (ev.keyCode == 8 && t != "password" && t != "text"
                && t != "textarea") {
            return false;
        }
    }
    //禁止后退键 作用于Firefox、Opera  
    document.onkeypress = doKey;
    //禁止后退键  作用于IE、Chrome  
    document.onkeydown = doKey;

    window.onload = function() {
        $('#loading-mask').fadeOut();
    };
    
</script>