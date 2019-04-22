package kr.sys4u.spring.instagram.core.repository.post;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import kr.sys4u.spring.instagram.core.dto.post.PostImage;

@Repository
public interface PostImageRepository {
    public int insert(@Param("postImage") PostImage postImage);
    public int update(PostImage image);
    public PostImage select(int postNo);
    
}