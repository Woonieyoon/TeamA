package kr.sys4u.spring.instagram.core.service.post;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.sys4u.spring.instagram.core.dto.post.Hashtag;
import kr.sys4u.spring.instagram.core.dto.post.Post;
import kr.sys4u.spring.instagram.core.dto.post.PostImage;
import kr.sys4u.spring.instagram.core.exception.FileTransferFailedException;
import kr.sys4u.spring.instagram.core.exception.PostInsertFailedException;
import kr.sys4u.spring.instagram.core.repository.post.HashtagRepository;
import kr.sys4u.spring.instagram.core.repository.post.PostImageRepository;
import kr.sys4u.spring.instagram.core.repository.post.PostLikeRepository;
import kr.sys4u.spring.instagram.core.repository.post.PostRepository;

@Service
public class PostService {
	private static Logger LOGGER = LoggerFactory.getLogger(PostService.class);

	@Autowired
	private PostRepository postRepository;
	@Autowired
	private PostImageRepository postImageRepository;
	@Autowired
	private HashtagRepository hashtagRepository;
	@Autowired
	private PostLikeRepository postLikeRepository;
	@Autowired
	private Environment environment;
	
	public List<Post> findList(String hashtag, int row, int memberNo){
		return postRepository.findSome(hashtag, row, memberNo);
	}
	
	public Post findOne(Map<String, Object> postRequest){
		return postRepository.findOne(postRequest);
	}

	public void likeControl(int postNo, int memberNo){ //MERGE
		postLikeRepository.mergePostLike(postNo, memberNo);
	}
	//service 인터페이스 생성하기
	@Transactional
	public String insert(Post post, MultipartFile file) {
		PostImage postImage;
		try {
			postRepository.insert(post); //return값을 이용해서 exception
			int currVal = postRepository.getSequence();
			
			post.setPostImage(parseFile(currVal, file)); // mybatis insert many이용해보기
			for(String pHashtag: post.getHashtagList()) {
				Hashtag hashtag = new Hashtag();
				hashtag.setName(pHashtag);
				hashtag.setPostNo(currVal);
				hashtagRepository.insert(hashtag);
			}

			postImage = post.getPostImage();
			postImageRepository.insert(postImage); //try catch필요x
		}catch(Exception e) {
			throw new PostInsertFailedException(e);
		}
		
		try { //file을 저장하는 기능을 수행하는 무언가를 생성, service가 해야할 업무x
			String strFile = environment.getProperty("fileupload-upload-textdir") + postImage.getPath()+"/"+postImage.getName()+"."+postImage.getExtension();
			LOGGER.debug("strFile : " + strFile);
			File destFile = new File(strFile);
			file.transferTo(destFile);
		}catch (Exception e) {
			throw new FileTransferFailedException(e);
		}
		
		return "true"; //void로 처리할것
	}

	private PostImage parseFile(int postNo, MultipartFile file) { //postImage를 만드는 기능을 분리
		PostImage postImage = new PostImage();
		String strFile = file.getOriginalFilename();
		String filePath = "/static-root/images/upload/post/" + postNo; //환경변수 이용
		String fileName = strFile.substring(0, strFile.lastIndexOf("."));
		String fileExtension = strFile.substring(strFile.lastIndexOf(".")+1);
		LOGGER.debug("file : " + filePath + "/" + fileName + "."+ fileExtension);
		postImage.setPostNo(postNo);
		postImage.setPath(filePath);
		postImage.setName(fileName);
		postImage.setExtension(fileExtension);
		
		return postImage;
	}

	public Post confirmMyPost(Map<String, String> post) {
		
		return postRepository.confirmMyPost(post);
	}
}
