function chooseYear(id){
	var data=[];
	var startY;
	var thisY=new Date().getUTCFullYear();
	var endY=thisY+3;
	var data=[];
 	$("#"+id).val(thisY);
	$("#"+id).combobox({
		valueField:'year',
		textField:'year'
	})
	
	for(startY=endY-5;startY<endY;startY++){
                data.push({"year":startY});
       }
     $("#"+id).combobox("loadData",data);
     $("#"+id).combobox("setValue",thisY);
}
