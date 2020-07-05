<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="com.baidu.ueditor.ActionEnter"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%

    request.setCharacterEncoding( "utf-8" );
	response.setHeader("Content-Type" , "text/html");
	/* request.getSession().setAttribute("customUrl", request.getParameter("customUrl")); */
	String rootPath = application.getRealPath( "/" );
	String savePath = "D:/upload";
	out.write( new ActionEnter( request, savePath, rootPath ).exec() );
	
%>