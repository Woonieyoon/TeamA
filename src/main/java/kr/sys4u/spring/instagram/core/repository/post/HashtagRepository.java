package kr.sys4u.spring.instagram.core.repository.post;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import kr.sys4u.spring.instagram.core.dto.post.Hashtag;

@Repository
public interface HashtagRepository {

    public int insert(@Param("hashtag") Hashtag hashtag);
    public int update(Hashtag hashtag);
    public List<Hashtag> selectHashtagByPostNo(int postNo);
    
}