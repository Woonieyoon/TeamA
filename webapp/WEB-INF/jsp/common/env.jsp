<%@page import="kr.sys4u.spring.instagram.core.dto.member.MemberImage"%>
<%@page import="kr.sys4u.spring.instagram.core.dto.member.Member"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    import="org.springframework.core.env.Environment
           ,java.util.Enumeration
           ,org.slf4j.Logger
           ,org.slf4j.LoggerFactory"
    %><%
    Logger JSP_LOGGER = LoggerFactory.getLogger("jsp.logger");
    
    Environment environment = (Environment)request.getAttribute("environment");
    String _actionUrl = environment.getProperty("action-url");
   	String _imageUrl = environment.getProperty("image-url");
   	String _cssUrl = environment.getProperty("css-url");
   	String _jsUrl = environment.getProperty("js-url");
   	String _cpath = application.getContextPath();
   	Member user = (Member)session.getAttribute("user");
   	String message= (String)request.getAttribute("message");

%><script>
var _actionUrl = '<%=_actionUrl%>';
var _imageUrl = '<%=_imageUrl%>';
var _cssUrl = '<%=_cssUrl%>';
var _jsUrl = '<%=_jsUrl%>';
var _cpath = '<%=_cpath%>';


var _user = null;
<%if(user!=null){
   %>
   _user="<%=user.getLoginID()%>";
   <%
} %>

var _message= null;
<%if(message!=null){
	   %>
	   alert("<%=message%>");
	   <%
} %>

</script>