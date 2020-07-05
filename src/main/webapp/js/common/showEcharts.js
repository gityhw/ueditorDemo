
function initE(allD,includeD,echartsD,xzId){

	var html='<div id="'+allD+'" class="easyui-layout"  style="width:100%;height:100%";display:none>'+
	'<div data-options="region:\'north\',border:false" style="height:38px;padding:5px 0px">'	+			        	
	'请选择图表类型：<select id="'+xzId+'" data-options="prompt:\'请选择图表类型...\',editable:false,panelHeight:\'auto\'"  class="easyui-combobox" name="chartype" style="width:120px;">   '+				        		
	' <option>柱状图</option>   '+									   
	'<option>折线图</option>   '	+								    
	'<option>散点图</option>'	+								    
	'</select>  '+									
	'</div>'	+			        	
	'<div  id="'+echartsD+'" data-options="region:\'center\'" style="width:100%;height:100%;">'+		        	
	'</div>'+		        	
	'</div>'
	$(html).appendTo($("#"+includeD));
	$('#'+allD).layout();    
	$('#'+xzId).combobox({ }); 
	$('#'+allD).hide();
}

function showE(echartsDs,char_datas,legends,datechoice){
	var myChart = echarts.init(document.getElementById(''+echartsDs+''));
	var option = {
			backgroundColor: '#fff',
			tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        },
		        position: function(point, params, dom) { 
                    var posDis = window.innerWidth - dom.offsetWidth; 
                    return posDis<point[0]?[posDis, '10%']:[point[0], '10%'];

                }
		    },
		    legend: {
		    	itemWidth: 20,
		        itemHeight: 10,
		        itemGap: 10,
		        x: 'right', // 'center' | 'left' | {number},
		        y: 'top', // 'center' | 'bottom' | {number}
		        //borderColor: 'rgba(178,34,34,0.8)',
		        data: legends
		    },
		    grid: {
		        left:  '1%',
		        right: '1%',
		        bottom: '0',
		        containLabel: true
		    },
		    xAxis:  {
		       
		        	 data: datechoice
		    },
		    yAxis: {
		    	 type: 'value',
		    	 scale:true
		       
		    },
		    series: char_datas
		};
	 myChart.setOption(option,true);
}




/**
 * 
 * @param allD
 * @param includeD
 * @param echartsD
 * @param xzId
 * @param datas
 * @param legends
 * @param datechoice
 * @param type
 * @returns
 */
var flag = true;
function buttunE(allD,includeD,echartsD,xzId,datas,legends,datechoice,type){	
	var char_dataes = loaddataes(legends,datas,type);
	if(flag){
		initE(allD,includeD,echartsD,xzId);
		flag = false;
	}
	$('#'+allD).show();
	$('#'+includeD).scrollTop( $('#'+includeD).height() );
	
	
//	
	showE(echartsD,char_dataes,legends,datechoice)
	
	var viewtypes = "bar";
	$('#'+xzId).combobox({
		onSelect: function(rec){    
			if(rec.text=="柱状图"){
				viewtypes="bar";
			}else if(rec.text=="折线图"){
				viewtypes="line";
			}else if(rec.text=="散点图"){
				viewtypes="scatter";
			}
			char_dataes = loaddataes(legends,datas,viewtypes);
			showE(echartsD,char_dataes,legends,datechoice)
        }
	});
	
	
}


/**
 * 
 * @param legends[, , , , , ]
 * @param datas   [[], [], [], [], [], []]
 * @param datechoice  [, , , , , ]
 * @param type  
 * @returns
 */
function loaddataes(legends,datas,type){
	var char_datas=[];
	var chart_data;
	for(var i=0;i<legends.length;i++){
		  chart_data = {
	              "name": legends[i],
	              "type":type,
	              "data": datas[i] //[5, 20, 40, 10, 10, 20]
	              //stack: '总量'
	              //areaStyle: {normal: {}}
	       };
		  char_datas.push(chart_data);
	}
	return char_datas;
	
}





