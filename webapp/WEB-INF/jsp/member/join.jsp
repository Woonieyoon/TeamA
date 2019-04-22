<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<%@include file="/WEB-INF/jsp/common/env.jsp"%>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="<%=_jsUrl%>/common/common.js"></script>
<script src="<%=_jsUrl%>/member/shin.js"></script>
<link rel="stylesheet" href="<%=_cssUrl%>/common.css" />
<link rel="stylesheet" href="<%=_cssUrl%>/shin.css" />
<link rel="SHORTCUT ICON"
	href="<%=_cpath%>/static-root/images/common/favicon.ico" />
	


<meta charset="UTF-8">
<title>Join Page</title>
</head>
<body>
	<div class="bgimg">
		<div class="page">
			<form name="JoinForm" method="post" enctype="multipart/form-data">
				<table style="height: 400px;">
					<tr>
						<td colspan="2" style="text-align: center;">
						<img alt="logo" src="<%=_cpath%>/static-root/images/common/instagram-logo4.png">&nbsp;&nbsp;&nbsp;&nbsp;
						</td>
					</tr>
					<tr>
						<td style="height: 50px"></td>
					</tr>
					<tr>
						<td style="text-align: center;">
							<span class="loginVAl">USER ID</span>
							
						</td>
						<td style="text-align: center; width: 300px;">
							<input type="text" name="loginID" id="loginID" style="width:130px;">
							<input type="button" value="ID Check" id="dupCheck" class="buttonRadius">
						</td>
						<td rowspan="4">
							 <form id="form1" runat="server">
       							 <img id="blah" src="<%=_cpath%>/static-root/images/upload/member/default/default.png" style="height: 200px; width: 150px;" />
   							 </form>
						</td>
					</tr>
					<tr>
						<td style="text-align: center;">
							<span class="loginVAl">PASSWORD</span>
							</td>
						<td style="text-align: center;">
							<input type="password"	name="password" id="password" style="width: 200px;">
						</td>
					</tr>
					<tr>
						<td style="text-align: center;">
							<span class="loginVAl">MESSAGE</span>
							</td>
						<td style="text-align: center;">
							<input type="text"	name="message" id="message" style="width: 200px;">
						</td>
					</tr>
					<tr>
						<td style="text-align: center;">
							<span class="loginVAl">PROFILE</span>
						</td>
						<td style="text-align: center;">
							<input type="file" class="custom-file-input" name="memberImage" id="memberImage" accept="image/jpeg, image/png, image/gif" style="width: 200px;">
<!-- 							<input type="file" style="width:180px;"	name="memberImage" id="memberImage" accept="image/jpeg, image/png, image/gif" /> -->
						</td>
					</tr>
					<tr>
						<td style="height: 30px"></td>
					</tr>
					<tr>
						<td colspan="2" style="text-align: center;">
						<div id="eventSource" style="display: hidden"></div> 
						<a href="#" class="square_btn" id="memInsert"><span class="loginVAl">가입하기</span></a>
						<a href="#" class="square_btn" id="backButton"><span class="loginVAl">뒤로가기</span></a>
					</tr>

				</table>
			</form>
		</div>
	</div>
</body>
</html>