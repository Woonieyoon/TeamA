package kr.sys4u.spring.instagram.core.dto.post;

import java.sql.Timestamp;
import java.util.List;

import kr.sys4u.spring.instagram.core.dto.member.Member;
import lombok.Data;

@Data
public class Post {

	private int totalCount;
    private int no;
    private Member member;
    private String content;
    private Timestamp createdDate;
    private Timestamp updatedDate;
    private PostImage postImage;
    private List<PostReply> postReplyList;
    private PostLike postLike;
    private List<String> hashtagList;
    
    
}