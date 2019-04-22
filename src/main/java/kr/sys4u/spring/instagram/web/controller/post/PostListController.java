package kr.sys4u.spring.instagram.web.controller.post;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.sys4u.spring.instagram.core.dto.member.Member;
import kr.sys4u.spring.instagram.core.dto.post.Post;
import kr.sys4u.spring.instagram.core.service.post.PostService;
import kr.sys4u.spring.instagram.web.controller.AbstractController;

//search, list 처리
@Controller
public class PostListController extends AbstractController{
	@Autowired
	private PostService postService;
	
	@GetMapping("list.do")
	public @ResponseBody List<Post> list(
			HttpSession session,
			@RequestParam(value="hashtag",required = false, defaultValue="") String hashtag,
			@RequestParam(value="row",required = false, defaultValue="1") String strRow) { 
		
		Member member = (Member) session.getAttribute("user");
		int memberNo = member.getNo();
		int row = 1;
		String parseHashtag = hashtag.equals("null") || hashtag.equals("undefined") ? null : hashtag;

		LOGGER.debug("memberNo : " + memberNo);
		try {
			row = Integer.parseInt(strRow);
		} catch (Exception e) {
			
		}
		LOGGER.debug("hashtag : " + hashtag);
		LOGGER.debug("row : " + row);
		LOGGER.debug("memberNo : " + memberNo);
		
		return postService.findList(parseHashtag, row, memberNo);
	}
	
	
	@PostMapping("mergePostLike.do") //이름 변경
	public @ResponseBody void likeInsert(HttpSession session, int postNo){ //int로 값 받기, 적합하지 않는 argument입력 시 오류 발생시킬것
		
		Member member = (Member) session.getAttribute("user");
		int memberNo = member.getNo();
		
		postService.likeControl(postNo, memberNo);
	}
	
	
}
