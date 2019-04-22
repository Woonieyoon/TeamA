package kr.sys4u.spring.instagram.core.repository.post;

import org.apache.ibatis.annotations.Param;

import kr.sys4u.spring.instagram.core.dto.post.Post;

public interface PostDetailRepository {

	public Post findPost(@Param("postNo") int postNo);
	
	public int postLikeTotalCount(@Param("postNo") int postNo);
	
	public int postLikeYN(@Param("postNo") int postNo,@Param("loginID") String loginID);
	
}
