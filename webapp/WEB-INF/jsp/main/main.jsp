<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
	<title>SYSTAGRAM</title>
	
	<!-- 환경 설정 -->
	<%@include file="/WEB-INF/jsp/common/env.jsp" %>
	<%@include file="/WEB-INF/jsp/common/session.jsp"%>
	
	<!-- css -->
	<link rel="stylesheet" href="<%=_cssUrl %>/bootstrap.min.css" />
	<link rel="stylesheet" href="<%=_cssUrl %>/jquery-ui.min.css" />
	<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"> -->
	<link rel="stylesheet" href="<%=_cssUrl %>/reset.css" /> 
	<link rel="stylesheet" href="<%=_cssUrl %>/common.css" />
	<link rel="SHORTCUT ICON" href="<%=_cpath %>/static-root/images/common/favicon.ico" />
 	<link rel="stylesheet" href="<%=_cssUrl %>/main.css" />
 	<link rel="stylesheet" href="<%=_cssUrl %>/hong.css" />
 	<link rel="stylesheet" href="<%=_cssUrl %>/jeong.css" />
 	<link rel="stylesheet" href="<%=_cssUrl %>/shin.css" />
	
	<!-- 외부 라이브러리 -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="<%=_jsUrl %>/common/jquery-ui.min.js"></script>
	
	<!-- 공통 -->
 	<script src="<%=_jsUrl %>/common/common.js"></script> 
 	<script src="<%=_jsUrl %>/main/main.js"></script>
 	
 	<!-- 개인  -->
 	<script src="<%=_jsUrl %>/post/postForm.js"></script>
 	<script src="<%=_jsUrl %>/post/jeong.js"></script>
 	<script src="<%=_jsUrl %>/member/shin.js"></script>
 	<script src="<%=_jsUrl %>/post/shin.js"></script>
 	<script src="<%=_jsUrl %>/post/hong.js"></script>
 	<script src="<%=_jsUrl %>/member/hong.js"></script>
	

</head>
<body>
	<div id="wrapper">
		<div id = header></div>
		<div id = content></div>
		<div id = footer></div>	
		<div id = "eventSource"></div>
	</div>
</body>
</html>