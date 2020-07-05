/**
 * 
 */
$
		.extend(
				$.fn.validatebox.defaults.rules,
				{

					// 日期比较 ：我个人不推荐这种
					// 比较两个datebox日期的数值关系 ---add by huangqing
					// 用法：related['>=','startdate','msg'] 表示当前日期 >= startdate的日期
					//validType:'dateBoxCompare[&quot;<=&quot;,&quot;#endDate&quot;,&quot;起始日期必须早于终止日期&quot;]'
					// 参数1 : 关系表达式,(包括<,>,<=,>=,=,!=)
					// 参数2: 对比项datebox的选择器
					dateBoxCompare : {
						validator : function(value, param) {
							var d2 = $(param[1]).combo('getValue');
							var rst = true, msg;
							if (value != '' && d2 != '') {
								if (param[0] == ">") {
									rst = value > d2;
									msg = "截止日期必须晚于开始日期";
								}
								if (param[0] == ">=") {
									rst = value >= d2;
									msg = "截止日期不能早于开始日期";
								}
								if (param[0] == "<") {
									rst = value < d2;
									msg = "截止日期必须早于开始日期";
								}
								if (param[0] == "<=") {
									rst = value <= d2;
									msg = "截止日期不能晚于开始日期";
								}
							}
							if (!rst) {
								if (param[2] == undefined)
									param[2] = msg;
								return false;
							}
							var d = $(param[1]).next().find('input.combo-text');
							if (d.hasClass('validatebox-invalid'))
								d.removeClass('validatebox-invalid');
							return true;
						},
						message : '{2}'
					},
					// 判断两个输入框的数值关系 ---add by huangqing
					// 用法：related['s1','<=','s2'] 表示当前输入框（s1） <= 参照的输入框（s2）的数值
					// 参数1 : 当前输入框的选择器,
					// 参数2 : 关系表达式,(包括<,>,<=,>=,=,!=)
					// 参数3: 对比项输入框的选择器
					related : {
						validator : function(value, param) {
							var sval = $(param[2]).val();
							if (sval == "")
								return true;
							if (sval != "") {
								sval = Number(sval);
								if (!isNaN(sval))
									$(param[2]).val(sval);
								sval = Number($(param[2]).val());
							}
							value = Number(value);
							if (!isNaN(value))
								value = $(param[0]).val(value);
							value = Number($(param[0]).val());
							var rst = false;
							if (typeof sval == 'number'
									&& typeof value == 'number' && !isNaN(sval)
									&& !isNaN(value)) { // isNumber
								if (param[1] == ">") {
									rst = value > sval;
									param.push("当前输入值必须大于标红的值");
								}
								if (param[1] == ">=") {
									rst = value >= sval;
									param.push("当前输入值必须大于等于标红的值");
								}
								if (param[1] == "<") {
									rst = value < sval;
									param.push("当前输入值必须小于标红的值");
								}
								if (param[1] == "<=") {
									rst = value <= sval;
									param.push("当前输入值必须小于等于标红的值");
								}
								if (param[1] == "=" || param[1] == "=="
										|| param[1] == "===") {
									rst = value == sval;
									param.push("当前输入值必须等于标红的值");
								}
								if (param[1] == "!=" || param[1] == "<>") {
									rst = value != sval;
									param.push("当前输入值不能等于标红的值");
								}
							}
//							if (!rst) {
//								if (!$(param[0])
//										.hasClass('validatebox-invalid'))
//									$(param[0]).addClass('validatebox-invalid');
//								if (!$(param[2])
//										.hasClass('validatebox-invalid'))
//									$(param[2]).addClass('validatebox-invalid');
//							if (param[3] == undefined)
//									param.push("请检查输入的格式");
//								return false;
//							}
//							if ($(param[0]).hasClass('validatebox-invalid'))
//								$(param[0]).removeClass('validatebox-invalid');
//							if ($(param[2]).hasClass('validatebox-invalid'))
//								$(param[2]).removeClass('validatebox-invalid');
							return true;
						},
						message : '{2}'
					},
					
					  /*必须和某个字段相等*/
			        equalTo: { 
			        	validator: function (value, param) { 
			        		return $(param[0]).val() == value; 
			        		}, message: '字段不匹配' 
			        },


					// 远程验证当前值是否存在 ---add by huangqing
					// 用法：isExisted['**.do','requestParamName',message]
					// 参数列表: url, request参数名,message可选参数(用于自定义消息)
					isExisted : {
						validator : function(value, param) {
							var data = {};
							data[param[1]] = value;
							var response = $.ajax({
								url : param[0],
								dataType : 'json',
								data : data,
								async : false,
								cache : false,
								type : 'post'
							}).responseText;
							response = eval('(' + response + ')');
							if (param[2] == undefined)
								param[2] = "当前输入的值已经存在";
							return response == false;
						},
						message : '{3}'
					},

					isNotExisted : {
						validator : function(value, param) {
							var data = {};
							data[param[1]] = value;
							var response = $.ajax({
								url : param[0],
								dataType : 'json',
								data : data,
								async : false,
								cache : false,
								type : 'post'
							}).responseText;
							response = eval('(' + response + ')');
							if (param[2] == undefined)
								param[2] = "当前输入的值不存在";
							return response == true;
						},
						message : '{2}'
					},

					// 远程验证是否存在（多值联合验证） ---add by huangqing
					// 用法：isExistedPro['**.do',['requestParamName0','requestParamName1','requestParamName2'],['selector1','selector2'],message]
					// 参数列表: url, request参数名,
					// 取值选择器（当前控件值不需要，requestParamName0就是当前控件的值请求的远程对象的Field）,message可选参数
					isExistedPro : {
						validator : function(value, param) {
							var data = {};
							data[param[1][0]] = value;
							for ( var i = 0; i < param[2].length; i++) {
								var val = "";
								if ($(param[2][i]).hasClass('combo-f')) {
									val = $(param[2][i]).combo('getValue');
								} else {
									val = $(param[2][i]).val();
								}
								if (val == "")
									return false;
								data[param[1][i + 1]] = val;
							}
							var response = $.ajax({
								url : param[0],
								dataType : 'json',
								data : data,
								async : false,
								cache : false,
								type : 'post'
							}).responseText;
							try {
								response = eval('(' + response + ')');
							} catch (err) {
								// alert("异常");
								return false;
							}
							if (response == false) {
								if (param[3] == undefined)
									param[3] = "当前输入的值已经存在";
								for ( var i = 0; i < param[2].length; i++) {
									if ($(param[2][i]).hasClass('combo-f')) {
										if (!$(param[2][i]).next().find(
												'input.combo-text').hasClass(
												'validatebox-invalid'))
											$(param[2][i])
													.next()
													.find('input.combo-text')
													.addClass(
															'validatebox-invalid');
									} else if (!$(param[2][i]).hasClass(
											'validatebox-invalid'))
										$(param[2][i]).addClass(
												'validatebox-invalid');
								}
								return false;
							}
							if (response == true) {
								for ( var i = 0; i < param[2].length; i++) {
									if ($(param[2][i]).hasClass('combo-f')) {
										if ($(param[2][i]).next().find(
												'input.combo-text').hasClass(
												'validatebox-invalid'))
											$(param[2][i])
													.next()
													.find('input.combo-text')
													.removeClass(
															'validatebox-invalid');
									} else if ($(param[2][i]).hasClass(
											'validatebox-invalid'))
										$(param[2][i]).removeClass(
												'validatebox-invalid');
								}
								return true;
							}
						},
						message : '{3}'
					},

					// 自动完成，用户输入带出场景 ---add by huangqing
					// 用法：autoCommit['**.do','requestParamName',['resultField1','resultField2'],['selector1','selector2'],message]
					// 参数列表: url,request参数名,返回值的字段名,赋值选择器,message可选参数
					autoCommit : {
						validator : function(value, param) {
							var data = {};
							data[param[1]] = value;
							var response = $.ajax({
								url : param[0],
								dataType : 'json',
								data : data,
								async : false,
								cache : false,
								type : 'post'
							}).responseText;
							response = eval('(' + response + ')');
							function _analysis(obj) {
								for ( var attr in obj) {
									for ( var i = 0; i < param[2].length; i++) {
										if (param[2][i] == attr) {
											if (typeof obj[attr] == "object")
												ttt(obj[attr]);
											// 给combobox赋值
											if ($(param[3][i]).hasClass(
													'combo-f'))
												$(param[3][i]).combobox(
														'setValue', obj[attr]);
											else
												$(param[3][i]).val(obj[attr]);
											break;
										}
									}
								}
							}
							if (response != "null\r\n" && response != "null"
									&& response != undefined) {
								_analysis(response);
								return true;
							} else {
								if (param[4] == undefined)
									param[4] = "您输入的值不正确";
								for ( var i = 0; i < param[3].length; i++)
									$(param[3][i]).val('');
								return false;
							}
						},
						message : '{4}'
					},
					// 判断两个输入框的数值关系 ---add by Dc
					// 用法：compare['s1','!=','s2'] 表示当前输入框（s1） 不应等于 参照的输入框（s2）的值
					// 参数1 : 当前输入框的选择器,
					// 参数2 : 关系表达式,(包括==,!=)
					// 参数3: 对比项输入框的选择器
					compare : {
						validator : function(value, param) {
							var rst = false;
							var sval = $(param[2]).attr("value");
							if (sval == "")
								return true;
							var val = $(param[0]).attr("value");
							if (val == "")
								return true;
							if (param[1] == "!=") {
								rst = sval != val;
								param.push("当前输入值必须不等于标红的值");
							} else {
								rst = sval == val;
								param.push("当前输入值必须等于标红的值");
							}
							if (!rst) {
								if (param[3] == undefined)
									param.push("请检查输入的格式");
								return false;
							}
							return true;
						},
						message : '{3}'
					},
					minLength : {
						validator : function(value, param) {
							return value.length >= param[0];
						},
						message : '最少输入{0}个字符.'
					},
					maxLength : {
						validator : function(value, param) {
							return value.length <= param[0];
						},
						message : '最多输入{0}个字符.'
					},
					fixLength : {
						validator : function(value, param) {
							return value.length == param[0];
						},
						message : '只能录入{0}位字符.'
					},
					fixnum : {
						validator : function(value, param) {
							var reg = /^[0-9]+$/;
							return reg.test(value) && value.length == param[0];
						},
						message : '只能录入{0}位数字'
					},
					capital : {
						validator : function(value) {
							var reg = /^[A-Z]+$/;
							return reg.test(value);
						},
						message : '只能录入大写字母'
					},
					charactorOnly : {
						validator : function(value) {
							var reg = /^([a-zA-Z0-9]+)$/;
							return reg.test(value);
						},

						message : '只能录入字母或者数字.'
					},
					validateText : {
						validator : function(value) {
							var reg = /[<>]+/;
							return !reg.test(value);
						},
						message : '不能含有特殊字符<>'
					},

					number : {
						validator : function(value) {
							var reg = /^[0-9]+$/;
							return reg.test(value);
						},
						message : '只能录入数字'
					},

					date : {
						validator : function(value) {
							var reg = /^[0-9]{4}[-][0-9]{1,2}[-][0-9]{1,2}$/;
							return reg.test(value);
						},
						message : 'yyyy-mm-dd格式的日期'
					},

					dateYM : {
						validator : function(value) {
							var reg = /^[0-9]{4}[0-9]{1,2}$/;
							return reg.test(value);
						},
						message : 'yyyymm格式的日期'
					},

					UpLength : {
						validator : function(value, param) {
							var reg = /^[A-Z]+$/;
							return reg.test(value) && value.length == param[0];
						},
						message : 'Please enter {0} Uppercase letters.'
					},

					EnOnly : {
						validator : function(value) {
							var reg = /^[A-Za-z ]+$/;
							return reg.test(value);
						},
						message : 'Please enter in English.'
					},

					ChsOnly : {
						validator : function(value) {
							var reg = /^[\u4e00-\u9fa5 ]+$/;
							return reg.test(value);
						},
						message : 'Please enter in Chinese.'
					},
					
					airportTax : {
						validator : function(value) {
							var reg = /^[0-9]+$/;
							return reg.test(value)
									&& (value == "0" || value == "10" || value == "50");
						},
						message : 'Airport Tax must be 0、10or50.'
					},
					
					numbers : {
						validator : function(value) {
							var reg = /^[-\0-9]+$/;
							return reg.test(value);
						},
						message : '只能录入数字可以带-号'
					},
					
					Nonnegative : {
						validator : function(value) {
							var reg = /-/;
							return !reg.test(value);
						},
						message : '不能录入负数'
					},
					
					fixnums : {
						validator : function(value, param) {
							var reg = /^[A-Z]{2}[0-9]{2}$/;
							return reg.test(value);
						},
						message : '只能录入2位字母和位数字'
					},
					
					// 判断城市的经度
					patternLatiude : {
						validator : function(value) {
							var reg = /^(((\d|[1-9]\d|1[0-7]\d)[°](\d|[0-5]\d)[′](\d|[0-5]\d)(\.\d{1,6})?[\″])|(180[°]0[′]0[\″]))[E]$/;

							return reg.test(value);
						},
						message : '格式不正确，请输入：dd°mm′ss″E'
					},
					
					// 判断城市的纬度
					patternLongitude : {
						validator : function(value) {
							var reg = /^(((\d|[1-9]\d|1[0-7]\d)[°](\d|[0-5]\d)[′](\d|[0-5]\d)(\.\d{1,6})?[\″])|(90[°]0[′]0[\″]))[N]$/;

							return reg.test(value);
						},
						message : '格式不正确，请输入：dd°mm′ss″N'
					},

					// 不能大于某值
					overNumer : {
						validator : function(value, param) {
							if (parseFloat(value) > param[0]) {
								param[1] = '到付手续费率应低于100%';
								return false;
							} else {
								return true;
							}
						},
						message : '{1}'
					},

					// 数据类型N：带小数的数字
					fixDecimal : {
						validator : function(value, param) {
							var reg = /^([0-9]+)$/;
							var x = value.indexOf(".", 0);
							if (x > 0) {
								if (x > param[0] || (!reg.test(value.substring(0, x)))) {
									param[2] = '整数位长度不能超过' + param[0] + '位';
									return false;
								} else {
									if (value.substring(x + 1).length > param[1] || (!reg.test(value.substring(x + 1)))) {
										param[2] = '小数位长度应大于0且不能超过' + param[1]+ '位';
										return false;
									} else {
										return true;
									}
								}
							} else {
								if (value.length > param[0] || (!reg.test(value))) {
									param[2] = '整数位长度不能超过' + param[0] + '位';
									return false;
								} else {
									return true;
								}
							}
						},
						message : '{2}'
					},

					// 数据类型C：字母，数字，中文及常用符号（）,-
					// 用于中文名称，中文描述之类的字段 (长度不能超过指定参数)
					chineseDescription_Less : {
						validator : function(value, param) {
							var reg = /^([a-zA-Z\d\u4e00-\u9fa5,()-]+)$/;
							if (!reg.test(value)) {
								param[1] = '只能录入字母数字中文及常用符号(),-';
								return false;
							} else if (value.length > param[0]) {
								param[1] = '当前录入了' + value.length + '位，长度不能超过'
										+ param[0] + '位';
								return false;
							} else {
								return true;
							}
						},
						message : '{1}'
					},

					// 数据类型AN：只能录入字母数字及常用符号
					// 用于英文名称，英文描述之类的字段 (长度不能超过指定参数)
					englishDescription_Less : {
						validator : function(value, param) {
							var reg = /[\u4e00-\u9fa5 ]+/;
							if (reg.test(value)) {
								param[1] = '只能录入字母数字及常用符号';
								return false;
							} else if (value.length > param[0]) {
								param[1] = '当前录入了' + value.length + '位，长度不能超过'
										+ param[0] + '位';
								return false;
							} else {
								return true;
							}
						},
						message : '{1}'
					},

					// 数据类型AN：字母或者数字
					// 多用于[xxx代码]的字段 (长度不能超过指定参数)
					characterOrNumeral_Less : {
						validator : function(value, param) {
							var reg = /^([a-zA-Z0-9]+)$/;
							if (!reg.test(value)) {
								param[1] = '只能录入字母数字';
								return false;
							} else if (value.length > param[0]) {
								param[1] = '当前录入了' + value.length + '位，长度不能超过'
										+ param[0] + '位';
								return false;
							} else {
								return true;
							}
						},
						message : '{1}'
					},

					// 数据类型AN：字母或者数字
					// 多用于[xxx代码]的字段 （长度为固定的）
					characterOrNumeral_Fix : {
						validator : function(value, param) {
							var reg = /^([a-zA-Z0-9]+)$/;
							if (!reg.test(value)) {
								param[1] = '只能录入字母数字';
								return false;
							} else if (value.length != param[0]) {
								param[1] = '当前录入了' + value.length + '位，长度必须是'+ param[0] + '位';
								return false;
							} else {
								return true;
							}
						},
						message : '{1}'
					},
					
					// 数据类型N：数字（长度为固定的）
					numeral_Fix : {
						validator : function(value, param) {
							var reg = /^[0-9]+$/;
							if (!reg.test(value)) {
								param[1] = '只能录入数字';
								return false;
							} else if (value.length != param[0]) {
								param[1] = '当前录入了' + value.length + '位，长度必须是'+ param[0] + '位';
								return false;
							} else {
								return true;
							}
						},
						message : '{1}'
					},

					// 数据类型AN：字母或者数字
					// 多用于[xxx代码]的字段 （长度在某一个范围之内）
					characterOrNumeral_Scope : {
						validator : function(value, param) {
							var reg = /^([a-zA-Z0-9]+)$/;
							if (!reg.test(value)) {
								param[2] = '只能录入字母数字';
								return false;
							} else if (!(value.length >= param[0]) || !(value.length <= param[1])) {
								param[2] = '当前录入了' + value.length + '位，长度必须是'+ param[0] + '~' + param[1] + '位';
								return false;
							} else {
								return true;
							}
						},
						message : '{2}'
					},
					
					// 数据类型N：数字（长度在某一个范围之内）
					numeral_Scope : {
						validator : function(value, param) {
							var reg = /^[0-9]+$/;
							if (!reg.test(value)) {
								param[2] = '只能录入数字';
								return false;
							} else if (!(value.length >= param[0]) || !(value.length <= param[1])) {
								param[2] = '当前录入了' + value.length + '位，长度必须是' + param[0] + '~' + param[1] + '位';
								return false;
							} else {
								return true;
							}
						},
						message : '{2}'
					},

					// 数据类型A：字母（A-Z，a-z）
					character_Fix : {
						validator : function(value, param) {
							var reg = /^([a-zA-Z]+)$/;
							if (!reg.test(value)) {
								param[1] = '只能录入字母';
								return false;
							} else if (value.length != param[0]) {
								param[1] = '当前录入了' + value.length + '位，长度必须是'+ param[0] + '位';
								return false;
							} else {
								return true;
							}
						},
						message : '{1}'
					}

				});

function trim(str) { // 删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}