/**
 * 序列化form表单将表单中所有数据封装成object对象
 * 使用场景：此方法不会封装属性为disabled控件值，如果后台对disabled控件值不需要则可以使用此方法。
 */

getObjectFromForm = function(form) {
	var o = {};
	$.each(form.serializeArray(), function(index) {
		if (o[this['name']]) {
			o[this['name']] = o[this['name']] + "," + this['value'];
		} else {
			o[this['name']] = this['value'];
		}
	});
	return o;
};
/**
 * 获取datagrid选中行数据并封装成object对像
 * @param dataRow 选中行的数据
 * @returns obj
 */
getObjectFromDataRow = function(dataRow) {
	var o = {};
	$.each(dataRow.serializeArray(), function(index) {
		if (o[this['field']]) {
			o[this['field']] = o[this['field']] + "," + this['value'];
		} else {
			o[this['field']] = this['value'];
		}
	});
	return o;
};
/**
 * 获取form中所有控件的值并封装成obj，当值为""时设置为null。
 * @param formId，form表单的ID
 * @returns obj对象
 */
getAllInputValuesFromForm_1 = function(formId){
	var form = $(':input','#'+formId)  
    .not(':button,:submit,:reset');
	var o = {};
	$.each(form, function(index,item) {
		if(item.type == 'checkbox' || item.type == 'radio'){
			if(!item.checked){
				return true ;
			}
		}
		if(typeof(this['name']) === "undefined" || this['name'] == "" || this['name'] == '' || this['name'] == null){
			return true ;
		}
		if (o[this['name']]) {
			o[this['name']] = o[this['name']] + "," + this['value'];
		} else {
			if(this['value'] == "" || this['value'] == ''){
				return true ;
			}
			else{
				
				o[this['name']] = this['value'];
			}
			
		}
	});
	return o;
};

/**
 * 获取form中所有控件的值并封装成obj，当值为""时设置为""。
 * @param formId，form表单的ID
 * @returns obj对象
 */
getAllInputValuesFromForm_2 = function(formId){
	var form = $(':input','#'+formId)  
    .not(':button,:submit,:reset');
	var o = {};
	$.each(form, function(index,item) {
		if(item.type == 'checkbox' || item.type == 'radio'){
			if(!item.checked){
				return true ;
			}
		}
		if(typeof(this['name']) === "undefined" || this['name'] == "" || this['name'] == '' || this['name'] == null){
			return true ;
		}
		if (o[this['name']]) {
			o[this['name']] = o[this['name']] + "," + this['value'];
		} else {
			o[this['name']] = this['value'];
			
		}
	});
	return o;
};

