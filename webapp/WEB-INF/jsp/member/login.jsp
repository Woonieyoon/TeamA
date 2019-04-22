<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<!-- 외부 라이브러리 -->
<%@include file="/WEB-INF/jsp/common/env.jsp"%>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="<%=_jsUrl%>/common/common.js"></script>
<script src="<%=_jsUrl%>/member/shin.js"></script>
<link rel="stylesheet" href="<%=_cssUrl%>/common.css" />
<link rel="stylesheet" href="<%=_cssUrl%>/shin.css" />
<link rel="SHORTCUT ICON" href="<%=_cpath %>/static-root/images/common/favicon.ico" />

<head>
<script type="text/javascript"></script>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div class="bgimg">
		<div class="page">
			<form name="loginForm" method="post">
				<table>
					<tr>
						<td colspan="2" style="text-align: center;"><img alt="logo"
							src="<%=_cpath%>/static-root/images/common/instagram-logo4.png">&nbsp;&nbsp;&nbsp;&nbsp;
						</td>
					</tr>
					<tr>
						<td style="height:50px "></td>
					</tr>
					<tr>
						<td style="text-align: center;"><span class="loginVAl">LOGIN ID</span>
						
						</td>
						<td style="text-align: center;"><input type="text"
							name="loginID" /></td>
					</tr>
					<tr>
						<td style="text-align: center;"><span class="loginVAl">PASSWORD</span></td>
						<td style="text-align: center;"><input type="password"
							name="password" /></td>
					</tr>
					<tr>
						<td style="height:30px "></td>
					</tr>
					<tr>
						<td colspan="2" style="text-align: center;">
							<a href="#" class="square_btn" id="memLogin"><span class="loginVAl">로그인</span></a> &nbsp;
							<a href="#" class="square_btn" id="memJoinPage"><span class="loginVAl">가입하기</span></a>
						</td>
					</tr>

				</table>
			</form>
		</div>

		<div id="eventSource" style="display: hidden"></div>
	</div>
</body>
</html>