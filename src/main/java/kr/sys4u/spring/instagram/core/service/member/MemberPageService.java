package kr.sys4u.spring.instagram.core.service.member;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.sys4u.spring.instagram.core.repository.member.MemberPageRepository;

@Service
public class MemberPageService{

	@Autowired
	private MemberPageRepository memberPageRepository;
	
	public Map<String, Object> getMemberPage(int memberNo) { //한방 query, map을 처리하지 말것
		
		Map<String, Object> memberPage = new HashMap<>();
		memberPage.put("member",  memberPageRepository.findMemberByNo(memberNo));
		memberPage.put("posts", memberPageRepository.findAllPostsWrittenByMember(memberNo));
		  
		return memberPage;
	}
}
