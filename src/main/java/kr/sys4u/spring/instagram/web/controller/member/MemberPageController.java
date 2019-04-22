package kr.sys4u.spring.instagram.web.controller.member;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.sys4u.spring.instagram.core.service.member.MemberPageService;
import kr.sys4u.spring.instagram.web.controller.AbstractController;

@Controller
public class MemberPageController extends AbstractController{
	
	@Autowired
	protected MemberPageService memberPageService;
	
	@GetMapping("/myPage.do")  //이름 일치
	public @ResponseBody Map<String, Object> memberMyPage(@RequestParam ("memberNo") int memberNo){
		return memberPageService.getMemberPage(memberNo);
	}
}
