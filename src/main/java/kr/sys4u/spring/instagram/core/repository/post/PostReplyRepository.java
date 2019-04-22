package kr.sys4u.spring.instagram.core.repository.post;

import java.util.List;

import org.springframework.stereotype.Repository;

import kr.sys4u.spring.instagram.core.dto.post.PostReply;

@Repository
public interface PostReplyRepository {

	public int insert(PostReply postReply);
	public int update(PostReply postReply);
	public void delete(int no);
	public List<PostReply> select(); //pagination처리
	 
 
}