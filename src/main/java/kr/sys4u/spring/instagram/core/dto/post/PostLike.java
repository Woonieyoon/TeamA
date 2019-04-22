package kr.sys4u.spring.instagram.core.dto.post;

import lombok.Data;

@Data
public class PostLike {

	private int postNo;
	private int memberNo;
	private int totalCount;
	private int liked;
	private String recentLikedUser;

}