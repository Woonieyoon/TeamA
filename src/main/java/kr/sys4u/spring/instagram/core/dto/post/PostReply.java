package kr.sys4u.spring.instagram.core.dto.post;

import java.sql.Timestamp;
import lombok.Data;

@Data
public class PostReply {

	private int no;
	private int post_no;
    private int member_no;
    private String userId;
    private String content;
    private String deleted;
    private Timestamp createdDate;
    private Timestamp updatedDate;
}