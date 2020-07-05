/*在iframe里面一个链接打开一个网页充满母窗口窗口*/
function openPageInParentWin(url){
	window.parent.location.href = url;
}

/*在iframe里面一个链接打开一个网页充满iframe窗口*/
function openPageWin(url){
	window.location.href = url;
}

/*在iframe里面一个链接打开一个网页充满iframe窗口*/
function createURL(url){
	 $('#mainContent').attr('src', url); 
}