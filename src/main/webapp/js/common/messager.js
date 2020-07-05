/**
 * 
 */
function showConfirm(titleText, infoText, callback){
	$.messager.confirm(titleText, infoText, callback);
}
//提示信息
function showMessage(msg) {
	$.messager.show({
		title : '操作提示',
		msg : msg,
		style : {
			left : '',
			right : document.body.clientWidth/2,
			top : document.body.scrollTop + document.documentElement.scrollTop,
			bottom : ''
		},
		showType: 'slide',
	   timeout: 5000
	});
}

function showMessageOnBottom(msg){
	$.messager.show({title:'提示',msg:msg}); 
}
function showMessageOnBottoms(title,msg){
	$.messager.show({title:title,
						msg:msg,
						style:{
							background:'red', 
							left : '',
							right :'0' ,
							top :'' ,
							bottom : document.body.scrollTop +  document.documentElement.scrollTop
						}
		}); 
	}

//提示所有信息，需要用户确认的
/*type的取值：alert,error,info,question,warning*/
function showAlert(msg_ajaf_warn,msg,type) {
	$.messager.alert(msg_ajaf_warn, msg, type);
}
