//移除treeGrid图标
function removeTreegridIcon(){
    $(".tree-icon,.tree-file").removeClass("tree-icon tree-file");
    $(".tree-icon,.tree-folder").removeClass("tree-icon tree-folder "); 
}

//清空子节点
function removeTreegridNode(id){
	var item = $(id).treegrid('getRoots');
    if (item) {
      for (var i = item.length - 1; i >= 0; i--) {
    	  $(id).treegrid('remove', item[i].id);
      }
    }
}

//多个选项卡下动态生成遮罩层
function makeMask(flag,dId){
	if('mask'==flag){
		load(dId);
	}else{
		disLoad(dId);
	}
}
//弹出加载层
function load(dId) {
	var scrollTop = $(document.body).scrollTop();
    $("<div class=\"datagrid-mask\"></div>").css({
        display: "block",
        width: "100%",
        height: $(window).height()
    }).appendTo("body "+dId);
    $("<div class=\"datagrid-mask-msg\"></div>").html("正在处理，请稍待。。。").appendTo("body "+dId).css({
        display: "block",
        left: ($(document.body).outerWidth(true) - 190) / 2,
        top: ($(window).height() - 45) / 2  -120
    });
}
//取消加载层  
function disLoad(dId) {
    $(dId+" div.datagrid-mask").remove();
    $(dId+" div.datagrid-mask-msg").remove();
}

//---------------------------------------该部分用于treegrid指定最明细数据排序-----start----------------------------------
/**
 * 打开节点的时候触发，存储满足排序条件的数据
 * @param row           打开节点对应的那一行数据
 * @param expandNote    存储所有满足条件的节点数据的数组
 * @param nSize         对应最明细节点的父节点的noteSize（例如：最明细数据为三级数据，此时其父节点noteSize为2）
 */
function onExpandAdd(row,expandNote,nSize){
	//只有当打开第三级数据(即该节点的noteSize为2)后，该级别数据才可能为排序的
	var noteSize = row.noteSize;
	if(noteSize == nSize){
		var flag = true;
		for (var i = 0; i <= expandNote.length-1; i++) {
			if(expandNote[i] == row){
				flag = false;
				break;
			}
		}
		
		//打开和关闭节点时会执行两次该方法，需要先进行判断是否已经存在，避免重复添加
		if(flag){
			expandNote.push(row);
		}
	}
}


/**
 * 关闭节点时触发，移除数组中该条数据，避免数据量过大前台显示效果卡顿
 * @param row           打开节点对应的那一行数据
 * @param expandNote    存储所有满足条件的节点数据的数组
 * @param nSize         对应最明细节点的父节点的noteSize（例如：最明细数据为三级数据，此时其父节点noteSize为2）
 */
function onCollapseRemove(row,expandNote,nSize){
	var noteSize = row.noteSize;
	if(noteSize==nSize){
		var index = -1;
		for (var i = 0; i <= expandNote.length-1; i++) {
			if(expandNote[i] == row){
				index = i;
				break;
			}
		}
		
		if(index!=-1){
			//关闭不进行排序，并将该行数据移除
			//删除expandNote[index-1]的后一位
			expandNote.splice(index-1,1); 
		}
	}
}
//---------------------------------------该部分用于treegrid指定最明细数据排序---------end----------------------------------

//---------------------------------------该部分用于treegrid每级别数据均可进行排序-----start----------------------------------

function onExpandAddWithArray(row,expandNote){
	//只有当打开第三级数据(即该节点的noteSize为2)后，该级别数据才可能为排序的
	var noteSize = row.noteSize;
	var flag = true;
	for (var i = 0; i <= expandNote.length-1; i++) {
		var temp = expandNote[i];
		for (var j = 0; j <= temp.length-1; j++) {
			if(temp[j] == row){
				flag = false;
				break;
			}
			
		}
	}
	
	//打开和关闭节点时会执行两次该方法，需要先进行判断是否已经存在，避免重复添加
	if(flag){
		if(expandNote[noteSize-1]!=null){
			expandNote[noteSize-1].push(row);
		}else{
			var tempAray = [];
			tempAray.push(row);
			expandNote.push(tempAray);
		}
	}
}

function onCollapseRemoveWithArray(row,expandNote){
	var noteSize = row.noteSize;
	var index = -1;
	for (var i = 0; i <= expandNote.length-1; i++) {
		var temp = expandNote[i];
		for (var j = 0; j <= temp.length-1; j++) {
			if(temp[j] == row){
				index = i;
				break;
			}
		}
	}
	
	if(index!=-1){
		//关闭不进行排序，并将该行数据移除
		//一级数据noteSize = 1，存储位于expandNote 下标为0处，当该级别数据仅打开一个时，关闭同时应删除expandNote下标为0数组
		var temp = expandNote[noteSize-1];
		if(temp.length==1){
			temp.splice(index-1,1); 
			expandNote.splice(noteSize-1,1); 
		}else{
			expandNote[noteSize-1].splice(index-1,1); 
		}
	}
}



//---------------------------------------该部分用于treegrid每级别数据均可进行排序------end----------------------------------



//---------------------------------------以上为公共部分，适用于treegrid应用-------------------------------------------
/**
 * 发送请求前进行拦截，返回true正常发送请求，返回false取消发送请求，这里是为了treeGrid能够进行排序而拦截
 * 不带系统插件分页情况
 * @param queryUrl      查询明细数据url
 * @param param         form表单条件
 * @param dId           treeGrid所在div的id
 * @param parentId      明细数据父节点id
 * @param maskId      	遮罩层id
 * @param removeFlag    是否要删除遮罩层，true：删除；false：不删除
 */
function onBeforeLoadSort(queryUrl,param,dId,parentId,maskId,removeFlag){
	$.ajax({
		url:queryUrl,
  	    data:param,
  	    type:'post',
  	    //async:false, 
		success : function(data) {
			if(data.flag){
				//获取子节点列表，子节点的子节点也会被获取到
				var nodes = $(dId).treegrid('getChildren', parentId);
				var length = nodes.length-1;
				var rmoveId = null;
				
				var array = [];
				for(i=0;i<=length;i++){
					//要删除的节点是否有子节点，当存在子节点时，先删除子节点，然后将此节点存起来后删除
					if(parentId==nodes[i]._parentId){
						array.push(nodes[i]);
					}else{
						$(dId).treegrid('remove', nodes[i].id);
					}
				}
				
				//删除子节点，上面已经将子节点的子节点删除
				var array_length = array.length-1;
				for(var i=0;i<=array_length;i++){
					if(i!=array_length){
						$(dId).treegrid('remove', array[i].id);
					}else{
						rmoveId = array[i].id;
					}
				}
				
			   //将新查出来的数据查到某条数据后（因为前面插入的数据在最后面，所以倒叙插入）
			   for (var i = data.rows.length-1; i >= 0; i--) {
					$(dId).treegrid('insert',{
					   after: rmoveId,  
					   data: data.rows[i]
				   });
			 	}
			   
			   $(dId).treegrid('remove', rmoveId);
			} 
			removeTreegridIcon();
			if(removeFlag){
				makeMask('unmask',maskId);
			}
		}
	});
}

/**
 *easyUI treegrid 请求发送前拦截
 *针对于带分页的情况 
 * @param queryUrl     请求的url
 * @param param        form表单查询数据
 * @param dId          treegrid的id
 * @param parentId     父节点id
 * @param maskId       产生遮罩层id
 * @param removeFlag   是否移除遮罩层，true：移除；false：不移除
 * @param pageTotal    总页数
 * @param pageNumber   第几页
 * @param pageSize     一页展示多少条数据
 */
function onBeforeLoadSortWithPaging(queryUrl,param,dId,parentId,maskId,
		removeFlag,pageTotal,pageNumber,pageSize){
	$.ajax({
		url:queryUrl,
		data:param,
		type:'post',
		//async:false, 
		success : function(data) {
			if(data.flag){
				var nodes = $(dId).treegrid('getChildren', parentId);
				var length = nodes.length-1;
				var rmoveId = null;
				//删除所有子节点，除了最后一个行，避免父节点的展开关闭按钮消失
				
				var array = [];
				for(i=0;i<=length;i++){
					//要删除的节点是否有子节点，当存在子节点时，先删除子节点，然后将此节点存起来后删除
					if(parentId==nodes[i]._parentId){
						array.push(nodes[i]);
					}else{
						$(dId).treegrid('remove', nodes[i].id);
					}
				}
				
				var array_length = array.length-1;
				for(var i=0;i<=array_length;i++){
					if(i!=array_length){
						$(dId).treegrid('remove', array[i].id);
					}else{
						rmoveId = array[i].id;
					}
				}
				
				for (var i = data.rows.length-1; i >= 0; i--) {
					$(dId).treegrid('insert',{
					   after: rmoveId,  
					   data: data.rows[i]
				   });
			 	}
				
				$(dId).treegrid('remove', rmoveId);
			} 
			removeTreegridIcon();
			
	   		$(dId).datagrid('getPager').pagination('refresh', {
			    total: pageTotal,
			    pageNumber: pageNumber,
			    pageSize: pageSize
			});
			if(removeFlag){
				makeMask('unmask',maskId);
			}
		}
	});
}

/**
 * 记录每次请求对排序的变化
 * @param sort    排序字段名称
 * @param order   升序/降序
 * @param change  记录排序的数组
 * @returns {Boolean}
 */
function markChange(sort,order,change){
	var temp = {};
	temp['sortName'] = sort;
	temp['sortOrder'] = order;
	
	//当本次操作的排序字段与上次一致时，此时该请求为分页操作，否则认为是根据某个字段进行排序
	if(change.length!=0){
		var tempChangData = change[0];
		if(tempChangData['sortName']==sort && tempChangData['sortOrder']==order){
			return true;
		}else{
			change[0] = temp;
		}
	}else{
		change[0] = temp;
	}
	return false;
}

/**
 * 返回排序字符串
 * @param divId   treegrid初始化id
 * @param change  上次记录的sort变化
 * @returns
 */
function updateSort(divId,change){
	var options = $('#'+divId).treegrid('options');
	var order = options.sortOrder;
	var sort = options.sortName;
	
	//有排序，但无法成功获取，直接取上次的排序条件
	if(change['sortName']!=null && sort == null){
		options.sortName = change['sortName'];
		options.sortOrder = change['sortOrder'];
	}
}

//-----------------------------快排序（页面数据量小并且能确定，与后台交互查询浪费资源）---------------------------------------------------------
/**
 * 发送请求前进行拦截，返回true正常发送请求，返回false取消发送请求，这里是为了treeGrid能够进行排序而拦截
 * 数据量小，能确定
 * @param row
 * @param data
 * @param dId           div id
 * @param maskId        遮罩层id
 * @param expandNote    满足排序条件的数据
 * @returns {Boolean}     
 */
function onBeforeLoadSort_fast(row,data,maskId,dId,expandNote){
	var options = $(dId).treegrid('options');
	var order = options.sortOrder;
	var name = options.sortName;
	
	if(name!=null &&name!="" && row==null){
		//当通过点击页面上的排序按钮时会触发这里方法
		//当expandNote有值说明打开了最明细数据，可以进行最明细数据的排序
		if(expandNote.length!=0){
			//开启遮罩层
			makeMask('mask',maskId);
			for(var i=0;i<expandNote.length;i++){
				var parentId = expandNote[i].id;
				sortData(dId,parentId,name,order);
			}
			//关闭遮罩层
			makeMask('unmask',maskId);
		}
		return false;
	}
	return true;
}

/**
 * 点击easyui排序按钮后，进行数据排序
 * 思路：先根据parentId获取到同一父节点的所有子节点，针对所有获取到子节点数据进行排序，
 * 		根据id删除所有该父节点下所有子节点（先留下父节点最后一条数据，等排序过后数据追加到父节点后然后删除该条数据，
 *      防止出现因删除掉父节点所有数据而导致父节点前展开关闭按钮消失），然后将排序后的数据重新追加到该父节点，删除默认图标
 * @param id         对应的div的id
 * @param parentId   父节点Id
 * @param sort       排序字段
 * @param order      升序/降序
 */
function sortData(id,parentId,sort,order){
	var tempNodes = [];
	var tempNode = null;
	var nodes = $(id).treegrid('getChildren', parentId);
	
	for(var i=0;i<=nodes.length-1;i++){
		if(nodes[i].page==null || nodes[i].page == '' || nodes[i].page == undefined){
			tempNodes[i] = nodes[i];
		}else{
			tempNode = nodes[i];
		}
	}
	var	tempNodes_new=tempNodes.sort(compare(sort,order));
	if(tempNode!=null){
		tempNodes_new[nodes.length-1] = tempNode;
	}
		
	var rmoveId = null;
	var length = nodes.length-1;
	for(var i=0;i<=length;i++){
		if(i!=length){
			$(id).treegrid('remove', nodes[i].id);
		}else{
			rmoveId = nodes[i].id;
		}
	}
	
	/*for(var i=0;i<=tempNodes_new.length-1;i++){
		$(id).treegrid('append',{
			parent: parentId,  
			data: [tempNodes_new[i]]
		});

 	}*/
	
	for (var i = tempNodes_new.length-1; i >= 0; i--) {
		$(id).treegrid('insert',{
			after: rmoveId,  
			data: tempNodes_new[i]
	   });
 	}
	
	$(id).treegrid('remove', rmoveId);
   	removeTreegridIcon();
}

/**
 * 金额排序，若最后一位为百分位则截取百分位前数字进行排序
 * @param property 排序字段
 * @param order    升序/降序
 * @returns {Function}
 */
function compare(property,order) {
	var flag = order=='asc'?true:false;
    return function(a, b) {
    	//当数据最后一位为'%'时截取'%'前面的数据进行比较
        var value1 = null;
        var value2 = null;
        
        var v1 = a[property].toString();
        if(v1.substring(v1.length-1,v1.length)=='%'){
        	value1 =  v1.substring(0, v1.length-1);
        }else{
        	value1 =  v1;
        }
        
        var v2 = b[property].toString();
        if(v2.substring(v2.length-1,v2.length)=='%'){
        	value2 = v2.substring(0,v2.length-1);
        }else{
        	value2 = v2;
        }
        return flag?(value1 - value2):(value2-value1);
    }
}

