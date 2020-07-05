/**
 * 
 */

//打开窗体
function openWindow(winId){ 
	$('#'+winId).panel('open')
	.ready(function(){
		$('#'+winId+' input:enabled:visible:first').focus().select();
	});
	/*.focusout(function(e){
		var inputs = $('#'+winId+' input:enabled:visible');
		if(inputs.index(e.relatedTarget)==inputs.length-1){
			inputs.get(0).focus();	
		}
	});*/
}
//关闭窗体
function closeWindow(winId){
    $('#'+winId).panel('close');
}
//清空input元素的value值
function clearInputs(form){
	
	$(':input','#'+form)  
    .not(':button,:submit,:reset,:checkbox,:radio')   //将表单中input元素type为button、submit、reset、hidden排除
    .val('')  //将input元素的value设为空值
    .removeAttr('checked')
    .removeAttr('selected'); // 如果任何radio/checkbox/select inputs有checked or selected 属性，将其移除
	
	//setDefaultVal();
} 