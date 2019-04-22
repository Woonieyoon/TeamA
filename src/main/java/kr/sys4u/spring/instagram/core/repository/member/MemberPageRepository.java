package kr.sys4u.spring.instagram.core.repository.member;

import java.util.List;
import org.springframework.stereotype.Repository;
import kr.sys4u.spring.instagram.core.dto.member.Member;

@Repository
public interface MemberPageRepository {

	public Member findMemberByNo(int memberNo);
	public List<?> findAllPostsWrittenByMember(int memberNo);
}
