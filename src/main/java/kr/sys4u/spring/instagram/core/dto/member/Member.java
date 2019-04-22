package kr.sys4u.spring.instagram.core.dto.member;

import java.sql.Timestamp;
import lombok.Data;

@Data
public class Member {
	
    private int no;
    private String loginID;
    private String password;
    private String message;
    private String deleted;
    private Timestamp createdDate;
    private Timestamp updatedDate;
    private MemberImage memberImage;
}