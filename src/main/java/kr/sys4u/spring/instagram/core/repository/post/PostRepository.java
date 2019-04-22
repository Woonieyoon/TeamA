package kr.sys4u.spring.instagram.core.repository.post;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import kr.sys4u.spring.instagram.core.dto.post.Post;

@Repository
public interface PostRepository {

	public int insert(@Param("post") Post post);

	public List<Post> findAll();

	public List<Post> findSome(@Param("hashtag") String hashtag, @Param("row") int row,  @Param("memberNo") int memberNo);

	public Post findOne(Map<String, Object> postRequest);

	public int update(Post post);

	public int delete(Post post);

	public boolean exists(String word);

	public int count();

	public int getSequence();
	
	public Post confirmMyPost(Map<String, String> post);
}