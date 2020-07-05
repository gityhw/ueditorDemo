/**
 * 
 */
//所有弹出窗体公用属性
if ($.fn.window){
	$.fn.window.defaults.minimizable=false;
	$.fn.window.defaults.collapsible=false;
	$.fn.window.defaults.modal=true;
}

function clearDate(){
	$('.ymcalendar').val('');
}

function setHeight(id){
    var c = $(id);
    var p = c.layout('panel','center');    // get the center panel
    var oldHeight = p.panel('panel').outerHeight();
    p.panel('resize', {height:'auto'});
    var newHeight = p.panel('panel').outerHeight();
    c.layout('resize',{
        height: (c.height() + newHeight - oldHeight)
    });
}