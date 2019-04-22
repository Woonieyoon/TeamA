(function(global,doc){
	
	$(function(){
		$.namespace("instagram.body.DetailPage");
		instagram.body.DetailPage = function(){
			this.postNo;
			this.memberId;
			this.memberProfile;
			this.loginId;
			
		};
		
		instagram.body.DetailPage.prototype.initialize = function(jsonData){
			
			this.postNo = jsonData.postNo;
			this.writerId = jsonData.memberId;	
			this.writerProfileUrl = jsonData.memberProfile;
			this.loginId = _userId;
		
			this.fetch();
			
		};
		instagram.body.DetailPage.prototype.fetch = function(){
			
			var that = this;
			 $.get(`/sys4u/detail.do?postNo=${this.postNo}&writerId=${this.memberId}&loginId=${this.loginId}`) 
		  	  .done(function(data) {
		  		  console.log(data.post)
		  		that.render(data);
		  		
			  })
			  .fail(function() {
				  //not yet
			  });
			
		};
		instagram.body.DetailPage.prototype.render = function(data){
	
			var post = data.post;
  	  		var postImageUrl = data.post.postImage.path + '/' + data.post.postImage.name +'.'+ data.post.postImage.extension;
			
			$('#content').empty();
			$('<div/>').attr({id:'cotent_detail_div'}).appendTo($('#content'));
			
			$('#cotent_detail_div').append(
					
					$('<div/>').attr({id:'detail_image_div'}).append(
						$('<img/>').attr({id:'detail_image',src:_cpath+postImageUrl})
					),
					$('<div/>').attr({id:'detail_content'}).append(
						$('<div/>').attr({id:'detail_memberInfo_section'}),	
						$('<div/>').attr({id:'detail_content_section'}),	
						$('<div/>').attr({id:'detail_replyList_section'}),	
						$('<div/>').attr({id:'detail_likeit_section'}),	
						$('<div/>').attr({id:'detail_writtingReply_section'})	
					)
			
			);
			//detail_memberInfo_section
			$('#detail_memberInfo_section').append(
					$('<div/>').attr({id:'detail_memberInfo_profileImage'}).append(
						$('<img/>').attr({id:'memberInfo_image',src:this.writerProfileUrl})
					),
					$('<div/>').attr({id: 'detail_memberInfo_profileInfo'}).append(
							$('<div/>').attr({id:'memberInfo_id'}).html(this.writerId)
					),
					$('<span/>').attr({'aria-hidden':'true',id:'detail_postModifyBtn',style:'margin-left: 150px'}).addClass('glyphicon glyphicon-option-horizontal').click(e=>{
						//게시글 수정 
		                  $('#eventSource').trigger({
		                     type:'instagram.body.ModifyPost',
		                     postNo : this.postNo,
		                     loginId : this.loginId
		                  });
						
					})
			);
			
			$('#detail_content_section').append(
					//게시글 컨텐츠 
					$('<div/>').attr({id:'detail_content_content'}).append(
							$('<h2/>').html(this.writerId).addClass('detail_h2'),
							$('<h3/>').html(post.content).addClass('detail_h3')
					),
					$('<div/>').attr({id:'detail_content_hashtag'})
			);
			
			//해시태그
			$.each(post.hashtagList,(index,hashtag)=>{
				$('<span/>').addClass('detail_h3').html(hashtag).attr({style:'color:#035eb8 !important;font-weight: 800 !important;'}).appendTo($('#detail_content_hashtag'));
			})
			
			
			//detail_replyList_section
			$('#detail_replyList_section').append(
					$('<ul/>').attr({id:'detail_replyList'})
			);
			
			//댓글
			$.each(post.postReplyList,(index,reply)=>{
				$('<li/>').addClass('detail_reply').append(
						$('<div/>').attr({id:'detail_reply_userImage'}).append(
								//댓글 작성자 이미지 가져올것!
								$('<img/>').attr({id:'reply_image',src:_imageUrl+'/upload/member/default/p0.png'})
						),
						$('<div/>').attr({id:'detail_reply_comment'}).append(
								//댓글 작성자 아이디
								$('<div/>').attr({id:'detail_reply_userId'}).append(
										$('<h2/>').html(reply.userId).addClass('detail_h2')	
								),
								//댓글 내용
								$('<div/>').attr({id:'detail_reply_content'}).html(reply.content).addClass('detail_h3'),
								//댓글 작성일 데이터 수정 필요!
								//$('<div/>').attr({id:'detail_reply_date'}).html(reply.updatedDate).addClass('detail_h4')
								$('<div/>').attr({id:'detail_reply_date'}).html('2019.04.16').addClass('detail_h4')
						)
				).appendTo($('#detail_replyList'));
			});
			
			var likeOffClass = 'glyphicon glyphicon-heart-empty';
			var likeOnClass = 'glyphicon glyphicon-heart';
			
			var likeOnOffState = String(data.likeYN); 
			var currentLikeOnOffState = (likeOnOffState==='true')? likeOnClass : likeOffClass;
		
			var likeCount = data.likeCtn;
			
			//detail_likeit_section
			$('#detail_likeit_section').append(
					$('<span/>').attr({id:'detail_likeOnOffBtn'}).append(
							$('<span/>').attr({'aria-hidden':'true',id:'detail_likeOnOrOffBtn','data-likeOnOffState':likeOnOffState}).addClass(currentLikeOnOffState).click(e=>{	
								
								$.post(`/sys4u/mergePostLike.do?postNo=${post.no}`)
						        .done(function(data) {
						        	if(likeOnOffState==='true'){
										$('#detail_likeOnOrOffBtn').removeClass(likeOnClass);
										$('#detail_likeOnOrOffBtn').addClass(likeOffClass);
										likeOnOffState ='false';
										likeCount -=1;
										
									}else if(likeOnOffState==='false'){
										$('#detail_likeOnOrOffBtn').removeClass(likeOffClass);
										$('#detail_likeOnOrOffBtn').addClass(likeOnClass);
										likeOnOffState ='true';
										likeCount +=1;
									
									}
									$('#detail_likeOnOrOffBtn').data('likeOnOffState') == likeOnOffState;
									$('#detail_likeCountValue').html(likeCount);  
						           
						        }).fail(function() {
						        	
						        });
								
							})		
					),
					$('<span/>').attr({id:'detail_likeCount'}).append(
							$('<h2/>').html("좋아요").addClass('detail_h2'),
							$('<h2/>').html(likeCount).addClass('detail_h2').attr({style:'margin-left:0 !important',id:'detail_likeCountValue'}),
							$('<h2/>').html("개").addClass('detail_h2').attr({style:'margin-left:0 !important'})
							
					),
					$('<span/>').attr({id:'detail_postUploadDate'})
			
			);
		
			
			//detail_writtingReply_section
			$('#detail_writtingReply_section').append(
					$('<input/>').attr({id:'detail_writtingReply_input', type:'text',placeholder : '댓글 달기...'}).on("keyup", function(event) {
						  if (event.keyCode === 13) {
							   event.preventDefault();
						  }
					}),
					$('<div/>').attr({id:'detail_writtingReply_btn'}).html('게시').click(e=>{
						
//						$.ajax({
//							url : _cpath+'/reply.do',
//							method : 'GET',
//							contentType : 'application/json',
//							data : JSON.stringify({
//								postNo : post.no,
//								memberNo : _no,
//								content : $('#detail_writtingReply_input').val()
//							}),
//							success : d=>{
//								
//							},
//							error : (m1,m2,m3)=>{
//								alert("error발생");
//							}
//						});		
						 
					})
			
			);
			
		}
		instagram.body.DetailPage.prototype.destroy = function(){
			//nothing to do for now
			
		};
		
	});
	
	
	
}(window, document))