package kr.sys4u.spring.instagram.web.controller.member;

import java.io.File;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.sys4u.spring.instagram.core.dto.member.Member;
import kr.sys4u.spring.instagram.core.exception.MissingRequiredValueException;
import kr.sys4u.spring.instagram.core.service.member.MemberService;
import kr.sys4u.spring.instagram.web.controller.AbstractController;

@Controller
public class MemberController extends AbstractController {

	@Autowired
	private MemberService memberService;

	// 로그인
	@PostMapping("/memLogin.do")
	public String login(HttpSession session,Model model, @RequestParam("loginID") String loginID,
			@RequestParam("password") String password) {
		String result = "";
		Member inputVal = new Member();
		inputVal.setLoginID(loginID);
		inputVal.setPassword(password);

		Member RMember = memberService.checkMember(inputVal);

		if (RMember != null) {
			result = "redirect:mainPage.do";
			session.setAttribute("user", RMember);
		} else {//로그인실패시
			model.addAttribute("message", "로그인 실패");
			result = "member/login";
		}
		return result;
	}

	@GetMapping("/mainPage.do")
	public String goMainPage() {
		return "main/main";
	}
	
	@GetMapping("/logOut.do")
	public String logOut(HttpSession session) {
		session.removeAttribute("user");
		return "redirect:home.do";
	}

//	/memJoinPage.do
	@RequestMapping("/memJoinPage.do")
	public String memJoinPage() {
		return "member/join";
	}

	@PostMapping("/memJoin.do")
	public String insertMember(@RequestParam("loginID") String loginID, @RequestParam("password") String password,
			@RequestParam("message") String messageState, @RequestPart("memberImage") MultipartFile file) { //member, memberImage로 받기(여러개 VO 사용 가능)
		String uploadDir = environment.getProperty("fileupload-upload-textdir");
		
		if (loginID == null || loginID.equals("")) {
			throw new MissingRequiredValueException("ID 누락");
		}
		if (password == null || password.equals("")) {
			throw new MissingRequiredValueException("PASSWORD 누락");
		} //validation처리

		Member member = new Member();
		member.setLoginID(loginID);
		member.setPassword(password);
		member.setMessage(messageState);

		try {
			memberService.memberInsert(member, file, uploadDir);
		} catch (Exception e) {
			return "redirect:home.do";
		}

		return "member/login";
	}
	


	@RequestMapping(value = "/modifiedMem.do", method = RequestMethod.POST)
//	@ResponseBody
	public String updateMember(
			@RequestParam("password") String password,
			@RequestParam("message") String message,
			@RequestPart("memberImage") MultipartFile memberImage,
			HttpSession session
			) {
		
		Member user = (Member)session.getAttribute("user");
		String uploadDir = environment.getProperty("fileupload-upload-textdir");
		if (password == null || password.equals("")) {
			throw new MissingRequiredValueException("PASSWORD 누락");
		}
		String preFilePath = uploadDir +user.getMemberImage().getPath()+"/"+user.getMemberImage().getName()+"."+user.getMemberImage().getExtension();
		  File f = new File(preFilePath);
		  f.delete();
		
		Member member = new Member();
		member.setLoginID(user.getLoginID());
		member.setNo(user.getNo());
		member.setPassword(password);
		member.setMessage(message);

		memberService.memberUpdate(member, memberImage, uploadDir);

		return "main/main";
	}

	@RequestMapping(value = "/idDupcheck.do", method = RequestMethod.POST)
	@ResponseBody
	public String idDupcheck(@RequestParam("dupId") String dupId) {
		String dupStat = memberService.dupCheck(dupId);
		return dupStat;
	}

	@RequestMapping(value = "/goModifyPage.do", method = RequestMethod.POST)
	@ResponseBody
	public Member goModifyPage(@RequestParam("userId") String userId) {
		Member member = new Member();
		member.setLoginID(userId);
		member = memberService.getMember(member);
		return member;
	}

}
