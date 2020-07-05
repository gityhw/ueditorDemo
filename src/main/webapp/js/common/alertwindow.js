$.fn.hWindow = function(options,divid){
    var defaults = {
    	width: 320,                //宽度
        height: 200,            //高度
        iconCls: '',            //图标class
        collapsible: false,        //折叠
        minimizable: false,        //最小化
        maximizable: false,        //最大化
        resizable: false,        //改变窗口大小
        title: '窗口标题',        //窗口标题
        modal: false,            //模态    
        submit: function () {
            alert('写入执行的代码。');
        },
        html: ''
        
    }
    var options = $.extend(defaults,options);
    var html = options.html;
    $("#"+divid).window({title:options.title,width:options.width,height:options.height,content:buildWindowContent(html,options.submit),
        collapsible:options.collapsible,minimizable:options.minimizable,maximizable:options.maximizable,
        modal:options.modal,iconCls:options.iconCls
    }).window('open');
    
    function buildWindowContent(contentHTML,fn)
    {
        var centerDIV =    $('<div region="center" border="false" style="padding:5px;"></div>').html(contentHTML);
        $('<div class="easyui-layout" fit="true"></div>')
        .append(centerDIV)
        .append('<div region="south" border="false" style="padding-top:5px;height:40px; overflow:hidden; text-align:center;background:#fafafa;border-top:#eee 1px solid;">  <a iconCls="icon-ok" style="position:absolute;left:25%;bottom:15%">确定</a><a iconCls="icon-cancel" style="position:absolute;right:25%;bottom:15%">取消</a></div>')
        .appendTo($("#"+divid).empty())
        .layout();

        $('.easyui-layout a[iconCls]').linkbutton();

        $('a[iconCls="icon-cancel"]').click(function(){
            $("#"+divid).window('close');
        });

        $('a[iconCls="icon-ok"]').unbind('click').click(fn);
    }

}