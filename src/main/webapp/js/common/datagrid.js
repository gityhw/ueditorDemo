/**
 * 
 */

//是否只选择了1条
function isSingleSelected(dg){
	if(dg.datagrid('getSelections').length!=1) 
		return false;
	return true;
}

function getChecked(dg){
	return dg.datagrid('getChecked'); 
}

function getSelected(dg){
	return dg.datagrid('getSelected'); 
}