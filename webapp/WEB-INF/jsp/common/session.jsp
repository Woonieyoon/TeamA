<%@page import="kr.sys4u.spring.instagram.core.dto.member.MemberImage"%>
<%@page import="kr.sys4u.spring.instagram.core.dto.member.Member"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    import="org.springframework.core.env.Environment
           ,java.util.Enumeration
           ,org.slf4j.Logger
           ,org.slf4j.LoggerFactory"
    %><%

    int _no = 0;
    String _loginId = "";
    String _message = "";
    String _memberImagePath = request.getContextPath()+"/static-root/images/upload/member/default/p0.png";
    
    
    if(request.getSession().getAttribute("user")!=null&&request.getSession()!=null){
    	
    	Member member = (Member)request.getSession().getAttribute("user");
   	 	 _no = member.getNo();
    	 _loginId = member.getLoginID();
    	 _message = member.getMessage();
    	 
    	 MemberImage memberImage = member.getMemberImage();
    	 _memberImagePath = memberImage.getPath()+"/"+memberImage.getName()+"."+memberImage.getExtension();
    }
  
%><script>
var _no = '<%=_no%>';
var _userId = '<%=_loginId%>';
var _message = '<%=_message%>';
var _userProfilePath = '<%=_memberImagePath%>'
</script>