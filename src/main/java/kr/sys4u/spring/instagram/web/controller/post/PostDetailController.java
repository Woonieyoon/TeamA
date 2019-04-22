package kr.sys4u.spring.instagram.web.controller.post;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.sys4u.spring.instagram.core.service.post.PostDetailService;
import kr.sys4u.spring.instagram.web.controller.AbstractController;

@Controller
public class PostDetailController extends AbstractController{

	@Autowired
	protected PostDetailService postDetailService;
	
	@GetMapping("/detail.do")
	public @ResponseBody Map<String, Object> postDetail(
			@RequestParam("postNo") String postNo,
			@RequestParam("writerId") String writerId,
			@RequestParam("loginId") String loginId) { //session에서 바로 가져올것, pathvariable사용
		
		LOGGER.debug("postNo : " + postNo);
		LOGGER.debug("writerId : " + writerId);
		LOGGER.debug("loginID : " + loginId);
		
		Map<String, String> detailPageInfo = new HashMap<>();
		detailPageInfo.put("postNo",postNo);
		detailPageInfo.put("writerId",writerId);
		detailPageInfo.put("loginId",loginId);
		
		return postDetailService.getPostDetailPage(detailPageInfo); //service method이름 변경
	}
}
