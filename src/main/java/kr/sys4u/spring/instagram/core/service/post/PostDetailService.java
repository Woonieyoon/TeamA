package kr.sys4u.spring.instagram.core.service.post;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.sys4u.spring.instagram.core.dto.post.Post;
import kr.sys4u.spring.instagram.core.repository.post.PostDetailRepository;

@Service
public class PostDetailService {
		private static Logger LOGGER = LoggerFactory.getLogger(PostDetailService.class);
		
		@Autowired
		private PostDetailRepository postDetailRepository;
		
		public Map<String, Object> getPostDetailPage(Map<String, String> detailPageInfo){ //map사용 자제
			
			Map<String, Object> detailPage = new HashMap<>(); //map자체가 비대하기때문
			int postNo = Integer.parseInt(detailPageInfo.get("postNo"));
			String loginId = detailPageInfo.get("loginId");
			
			detailPage.put("post", getPostByNo(postNo));
			detailPage.put("likeCtn", getPostTotalLikeCnt(postNo));
			detailPage.put("likeYN",getPostLikeOrNot(postNo,loginId)); //한방 query로 처리할것
			
			return detailPage;
				
		}
		public Post getPostByNo(int postNo){
			
			return postDetailRepository.findPost(postNo);
		
		}
		public int getPostTotalLikeCnt(int postNo) {
			
			//int count = postDetailRepository.postLikeTotalCount(postNo);
			return 100;
		}
		
		public boolean getPostLikeOrNot(int postNo, String loginID) {
			
			//int liked = postDetailRepository.postLikeYN(postNo, loginID);
			return true;
		}
}
