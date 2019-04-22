package kr.sys4u.spring.instagram.web.controller.post;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.sys4u.spring.instagram.core.dto.member.Member;
import kr.sys4u.spring.instagram.core.dto.post.Post;
import kr.sys4u.spring.instagram.core.service.post.PostService;
import kr.sys4u.spring.instagram.web.controller.AbstractController;

//update, delete, insert 처리
@Controller
public class PostUpdateController extends AbstractController{ //postController로 하나로 합칠것
	
	@Autowired
	PostService postService;

	@PostMapping("/insert.do")
	public @ResponseBody String insert(HttpSession session, 
			@RequestParam("postImage") MultipartFile file,
			@RequestParam("content") String content,
			@RequestParam("hashtag") String hashtags){
		
		Post post = new Post();
		Member member = (Member) session.getAttribute("user");
		post.setMember(member); 
		post.setContent(content);
		post.setHashtagList(divideHashtags(hashtags)); //hashtag객체에게 해당 기능 위임할것

		return postService.insert(post, file);
	}

	private List<String> divideHashtags(String pHashtags) {
		// #, " "으로 split
		List<String> hashtags = new ArrayList<>();
		
		for(String hashtag : pHashtags.replace(" ", "").split("#")) {
			hashtag = "#" + hashtag;
			if(!hashtag.equals("#")) {
				hashtags.add(hashtag);
			}
		}

		return hashtags;
	}
	
	
	
	@PostMapping("/modifyPost.do")
	public @ResponseBody Post modifyPost(HttpSession session, 
			@RequestParam("postNo") String postNo,
			@RequestParam("loginId") String loginId
		){
		
		Map<String, String> map = new HashMap<>();
		map.put("postNo", postNo);
		map.put("loginId", loginId);
		Post post = postService.confirmMyPost(map);
		
		return post;
	}
}
