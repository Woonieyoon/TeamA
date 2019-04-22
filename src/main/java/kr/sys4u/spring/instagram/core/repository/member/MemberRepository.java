package kr.sys4u.spring.instagram.core.repository.member;

import java.util.List;
import org.springframework.stereotype.Repository;
import kr.sys4u.spring.instagram.core.dto.member.Member;
import kr.sys4u.spring.instagram.core.dto.member.MemberImage;

@Repository
public interface MemberRepository {
	
	public int insert(Member member);
	public int insertImage(MemberImage memberImage);
	public List<Member> findAll();
	public List<Member> findSome(String word);
	public Member findOne(String word);
	public int update(Member member);
	public int updateImage(MemberImage memberImage);
	public int delete(Member member);
	public boolean exists(String word);
	public int count();
	public int duplcheck(String word);
	public Member getLoginMemberVal(Member inputVal);
	public Member checkMember(Member inputVal);
	
}