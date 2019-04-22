package kr.sys4u.spring.instagram.web.controller.home;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.sys4u.spring.instagram.web.controller.AbstractController;

@Controller
public class HomeController extends AbstractController{
	
	@RequestMapping("/home.do")
	public String home(HttpServletRequest request,Model model) {
		return "member/login";
	}
	
}
