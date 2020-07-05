//yyyyMMdd -> yyyy-MM-dd or yyyyMM -> yyyy-MM 
function formate2DateOnPage(date){
	if(isNaN(date)) return '';
	date = date+"";
	// yyyyMMdd -> yyyy-MM-dd
	if(date && date.length==8){
		var y = date.substring(0,4);
		var m = date.substring(4,6);
		var d = date.substring(6,8);
		return y+'-'+m+'-'+d;
	}
	// yyyyMM -> yyyy-MM 
	if(date && date.length==6){
		var y = date.substring(0,4);
		var m = date.substring(4,6);
		return y+'-'+m;
	}
	return '';
} 

/**
 * 
 */

//金额格式化
function formatCurAmount(num){
	if(num==null){
		return '0';
	}
	else{
		num = num.toString().replace(/\$|\,/g, '');
		if (isNaN(num))
			num = "0";
		sign = (num == (num = Math.abs(num)));
		num = Math.floor(num * 100 + 0.50000000001);
		cents = num % 100;
		num = Math.floor(num / 100).toString();
		if (cents < 10)
			cents = "0" + cents;
		for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
			num = num.substring(0, num.length - (4 * i + 3)) + ','
					+ num.substring(num.length - (4 * i + 3));
		return (((sign) ? '' : '-') + num + '.' + cents);
	}
} 

/**
 * @param num 金额原值
 * @param bitNum  小数位数
 * @returns
 */
function formatCurAmountPara(num,bitNum){
	if(num==null){
		return '0';
	}
	else{
		newbitNum=bitNum; 
		num = num.toString().replace(/\$|\,/g, '');
		bitNumSum=Math.pow(10,newbitNum);
		if (isNaN(num))
			num = "0";
		sign = (num == (num = Math.abs(num)));
		num = Math.floor(num * bitNumSum + 0.50000000001);
		cents = num % bitNumSum;
		num = Math.floor(num / bitNumSum).toString();
		var str='';
		for(var i=0;i<bitNum;i++)
			str=str+'0';
		cents = str.substring(0, str.length- cents.toString().length) + cents; 
		
		for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
			num = num.substring(0, num.length - (4 * i + 3)) + ','
					+ num.substring(num.length - (4 * i + 3));
		return (((sign) ? '' : '-') + num + '.' + cents);
	}
} 

/**
 * null格式化
 * @param val
 * @returns
 */
function formatNullValue(val){
	if (val == null)
		return '';
	else
		return val;
} 

/**
 * 日期格式化
 * @param val  yyyyMMdd
 * @returns  yyyy-MM-dd
 */
function formatDate(val){
	if(val != null && val != ""){
		var date = new String(val);
	    return date.substr(0,4) + '-' + date.substr(4,2) + '-' + date.substr(6,2);
	}
	else 
		return val;
}
/**
 * 日期格式化
 * @param val  yyyyMMdd
 * @returns  yyyy/M/d
 */
function formatDate2(val){
	if(val != null && val != ""){
		var date = new String(val);
	    return date.substr(0,4) + '/' + parseInt(date.substr(4,2)) + '/' + parseInt(date.substr(6,2));
	}
	else 
		return val;
}

/**
 * 时间格式化
 * @param val
 * @returns
 */
function formatTime(val){
	if(val != null && val != ""){
		var time = new String(val);
		return time.substr(0,2) + ':' + time.substr(2,2) + ':' + time.substr(4,2);
	}
	else 
		return val;
}

/**
 * 日期时间格式化到秒
 * @param val  yyyyMMdd HHmmss
 * @returns yyyy-MM-dd HH:mm:ss
 */
function formatDateTime(val){
	if(val != null && val != ""){
		var date = new String(val);
	    return date.substr(0,4) + '-' + date.substr(4,2) + '-' + date.substr(6,2)+' '+date.substr(8,2)+ ':' + date.substr(10,2)+ ':' + date.substr(12,2);
	}
	else 
		return val;
}
/**
 * 日期时间格式化到分钟
 * @param val yyyyMMdd HHmmss
 * @returns yyyy-MM-dd HH:mm
 */
function formatDateMinute(val){
	if(val != null && val != ""){
		var date = new String(val);
	    return date.substr(0,4) + '-' + date.substr(4,2) + '-' + date.substr(6,2)+' '+date.substr(8,2)+ ':' + date.substr(10,2);
	}
	else 
		return val;
}

/**
 * 日期时间格式化到秒
 * @param val  yyyyMMdd HHmmss
 * @returns yyyy/MM/dd HH:mm:ss
 */
function formatDateSeconds2(val){
	if(val != null && val != ""){
		var date = new String(val);
	    return date.substr(0,4) + '/' + date.substr(4,2) + '/' + date.substr(6,2)+' '+date.substr(8,2) + ':' + date.substr(10,2) + ':' + date.substr(12,2);
	}
	else 
		return val;
}
/**
 * 年月格式化 
 * @param val  201401
 * @returns  2014-01
 */
function formatMonth(val){
	if(val != null && val != ""){
		var date = new String(val);
	    return date.substr(0,4) + '-' + date.substr(4,2);
	}
	else 
		return val;
}

// Y-N格式化，Y（Yes）显示为"是"，N（No）显示为"否" @gaoyc
function formatYesNo(val){
	if(val == 'Y')
		return "是";
	else if(val == "N")
		return "否";
	else
		return val;
}

//票证信息清算状态Y-N格式化，Y（Yes）显示为"已清算"，N（No）显示为"未清算"
function formatYN(val){
	if(val == 'Y')
		return "已清算";
	else if(val == "N")
		return "未清算";
	else
		return val;
}

//开账类型--用户类型
function formatUserType(val){
	if(val == 'A')
		return "ACCA内部用户";
	else if(val == "B")
		return "ALN公司用户";
	else
		return val;
}

//货币信息--软硬货币
function formatCurType(val){
	if(val == 'S')
		return "软货币";
	else if(val == "H")
		return "硬货币";
	else if(val == "U")
		return "以USD标价";
	else if(val == "E")
		return "以ERO标价";
	else
		return val;
}

/**
 * prefix第一位0不显示
 * @param val
 * @returns
 */
function formatAirline(val){
		return val.substr(1,3);
}

/**
 * 数字格式化
 * @param val
 * @returns 显示整数
 */
function formatInt(val) { 
	if (val != null && val != '') { 
		val = formatNumber(val,0,0);
		val = val.substring(0,val.lastIndexOf('.'))
	} 
	return val; 
}
/**
 * 数字格式化
 * @param val
 * @returns 显示百分比 
 */
function formatPercentage(val) { 
	if (val != null && val != '') { 
		val = formatNumber(val,3,0);
		val = (val*100).toFixed(1) + '%';
	} 
	return val; 
}
/**
 * 数字格式化
 * @param val
 * @returns  显示1位小数
 */
function formatDecima1(val) { 
	if (val != null && val != '') { 
		val = formatNumber(val,2,0);
	} 
	return val; 
}
/**
 * 数字格式化
 * @param val
 * @param row
 * @returns 显示2位小数
 */
function formatDecima2(val) { 
	if (val != null && val != '') { 
		val = formatNumber(val,2,0);
	}
	return val; 
}


/**
将数值四舍五入后格式化. 
@param num 数值(Number或者String) 
@param cent 要保留的小数位(Number) 
@param isThousand 是否需要千分位 0:不需要,1:需要(数值类型); 
@return 格式的字符串,如'1,234,567.45' 
@type String 
**/ 
function formatNumber(num,cent,isThousand){
    num = num.toString().replace(/\$|\,/g,''); 
    if(isNaN(num))//检查传入数值为数值类型. 
    num = "0"; 
    if(isNaN(cent))//确保传入小数位为数值型数值. 
    cent = 0; 
    cent = parseInt(cent); 
    cent = Math.abs(cent);//求出小数位数,确保为正整数. 
    if(isNaN(isThousand))//确保传入是否需要千分位为数值类型. 
    isThousand = 0; 
    isThousand = parseInt(isThousand); 
    if(isThousand < 0) 
    isThousand = 0; 
    if(isThousand >=1) //确保传入的数值只为0或1 
    isThousand = 1; 
    sign = (num == (num = Math.abs(num)));//获取符号(正/负数) 
    //Math.floor:返回小于等于其数值参数的最大整数 
    num = Math.floor(num*Math.pow(10,cent)+0.50000000001);//把指定的小数位先转换成整数.多余的小数位四舍五入. 
    cents = num%Math.pow(10,cent); //求出小数位数值. 
    num = Math.floor(num/Math.pow(10,cent)).toString();//求出整数位数值. 
    cents = cents.toString();//把小数位转换成字符串,以便求小数位长度. 
    while(cents.length<cent){//补足小数位到指定的位数. 
        cents = "0" + cents;
    } 
    if(isThousand == 0) //不需要千分位符. 
    return (((sign)?'':'-') + num + '.' + cents); 
    //对整数部分进行千分位格式化. 
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++) 
    num = num.substring(0,num.length-(4*i+3))+','+ 
    num.substring(num.length-(4*i+3));
    if(cents != 0){
        return (((sign)?'':'-') + num + '.' + cents); 
    } else {
        return (((sign)?'':'-') + num + '.00');
    }
}