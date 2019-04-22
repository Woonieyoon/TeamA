package kr.sys4u.spring.instagram.core.repository.post;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostLikeRepository {

	public void mergePostLike(@Param("postNo") int postNo, @Param("memberNo") int memberNo);

}