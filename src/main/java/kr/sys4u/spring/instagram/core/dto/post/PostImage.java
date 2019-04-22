package kr.sys4u.spring.instagram.core.dto.post;

import java.sql.Timestamp;
import lombok.Data;

@Data
public class PostImage {
	
	private int postNo;
    private String path;
    private String name;
    private String extension;
    private Timestamp createdDate;
    private Timestamp updatedDate;
}