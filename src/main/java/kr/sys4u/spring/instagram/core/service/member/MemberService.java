package kr.sys4u.spring.instagram.core.service.member;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.sys4u.spring.instagram.core.dto.member.Member;
import kr.sys4u.spring.instagram.core.dto.member.MemberImage;
import kr.sys4u.spring.instagram.core.exception.FileTransferFailedException;
import kr.sys4u.spring.instagram.core.repository.member.MemberRepository;

@Configuration
@Service
public class MemberService {

	@Autowired
	private MemberRepository memberRepository;
	
	public Member getMemberById(String memberId) {
		
		return memberRepository.findOne(memberId);
	}
	
	public int memberInsert(Member member) {
		
		return memberRepository.insert(member);
	}
	
	public int memberInsertImage(MemberImage memberImage) {
		
		return memberRepository.insertImage(memberImage);
	}
	
	public String dupCheck(String dupId) {
		String dupStat="N";
		int count = memberRepository.duplcheck(dupId);
        if(count>0) {
        	dupStat="Y";
        }
		return dupStat;
	}

	public Member getMember(Member inputVal) {
		return memberRepository.getLoginMemberVal(inputVal);
	}


	@Transactional
	public int memberInsert(Member member, MultipartFile file, String uploadDir) {
		String addDirRoot ="/static-root/images/upload";  //환경변수에 추가
		memberRepository.insert(member);
		Member preMember= memberRepository.findOne(member.getLoginID());
		MemberImage memberImage= new MemberImage();
		memberImage.setMemberNo(preMember.getNo()); //mybatis insert select key사용
		File destFile=null;
		//이미지를 찾을 수 없는경우 default이미지 보여주도록 처리
		if (file.getSize()==0||file.getOriginalFilename()==null||file.getOriginalFilename().equals("")) { //변경
			memberImage.setPath("/static-root/images/upload/member/default"); //환경변수에 추가
			memberImage.setName("default");
			memberImage.setExtension("png");
			memberRepository.insertImage(memberImage);
			
		}else {
			memberImage.setPath(addDirRoot+"/member/"+preMember.getNo()); //path정보를 처리할때는 '+'기호를 사용하지 말것, string formatter사용
			String[] seperator = file.getOriginalFilename().split("\\.");
			memberImage.setName(seperator[0]);
			memberImage.setExtension(seperator[1]);
			destFile = new File(uploadDir+addDirRoot+"/member/"+preMember.getNo(), seperator[0]+"."+seperator[1]);
			memberRepository.insertImage(memberImage);
			
			try {
				file.transferTo(destFile);
			}catch (Exception e) {
				throw new FileTransferFailedException(e);
			}
		}
		
		return 0;
	}

	public void memberUpdate(Member member, MultipartFile file, String uploadDir) {
		String addDirRoot ="/static-root/images/upload";
		
		memberRepository.update(member);
		MemberImage memberImage= new MemberImage();
		memberImage.setMemberNo(member.getNo());
		File destFile=null;
		if (file.getSize()==0||file.getOriginalFilename().equals("")||file.getOriginalFilename()==null) {
//			C:\Users\ShinJaeHwan\Documents\workspace-sts-3.9.7.RELEASE\team-a-webapp\webapp\static-root\images\member\p0.png
		}else {
			memberImage.setPath(addDirRoot+"/member/"+member.getNo());
			String[] seperator = file.getOriginalFilename().split("\\.");
			memberImage.setName(seperator[0]);
			memberImage.setExtension(seperator[1]);
			destFile = new File(uploadDir+addDirRoot+"/member/"+member.getNo(), seperator[0]+"."+seperator[1]);
			memberRepository.updateImage(memberImage);
			
			try {
				file.transferTo(destFile);
			}catch (Exception e) {
				throw new FileTransferFailedException(e);
			}
		}
	}

	public Member checkMember(Member inputVal) {
		return memberRepository.checkMember(inputVal);
	}
	
}
