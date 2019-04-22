package kr.sys4u.spring.instagram.core.dto.member;

import java.sql.Timestamp;
import lombok.Data;

@Data
public class MemberImage {
	private int memberNo;
    private String path;
    private String name;
    private String extension;
    private Timestamp createdDate;
    private Timestamp updatedDate;
}