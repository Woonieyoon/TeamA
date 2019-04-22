(function(global, doc){
	
	$.namespace("instagram.body.myPage");
	instagram.body.myPage = function(){
		this.memberNo;
		console.log('mypage');
		
	};
	
	instagram.body.myPage.prototype.initialize = function(memberNo){
		this.memberNo = memberNo;
		 
		$.getJSON(_cpath+'/myPage.do?memberNo='+memberNo, map=>{	
				this.render(map.member, map.posts);
		});
	};
	instagram.body.myPage.prototype.render = function(member, posts){
		
		var profileImagePath = _cpath + member.memberImage.path + '/'+member.memberImage.name+'.'+member.memberImage.extension;
		console.log('profileImagePath :: '+profileImagePath);
		
		$('#content').empty();
		$('<div/>').attr({id:'content_mypage'}).append(
			$('<div/>').attr({id:'mypage_header'}),
			$('<div>').attr({style:'border-bottom: 1px solid #dddddd;margin-bottom: 60px'}),
			$('<div/>').attr({id:'mypage_content'})
		).appendTo($('#content'));
		
		
		
		$('#mypage_header').append(
			$('<div/>').attr({id:'mypage_header_profileImage'}).append(
					$('<div/>').attr({id:'mypage_header_profileImage_image', style: 'background-image:url('+profileImagePath+')'})
			),
			$('<div/>').attr({id:'mypage_header_profileInfo'}).append(
					$('<div/>').attr({id:'mypage_header_profileInfo_top'}).append(
			                  $('<h1/>').attr({id:'mypage_h1'}).html(member.loginID),
			                  $('<input/>').attr({type:'button', id:'goToModifyPageBtn',value:'프로필 편집'}).addClass('mypage_button').click(e=>{
			                     // 프로필 편집
			                     $("#eventSource").trigger("instagram.body.ModifyPage.initialized");
			                  }),
			                 $('<span/>').attr({'aria-hidden':'true',style:'margin-left:10px',id:'logOutBtn'}).addClass('glyphicon glyphicon-cog').click(e=>{   
			                     // 로그아웃
			                    $("#eventSource").trigger("instagram.body.LogOut.initialized");
			                     
			              })
			                  
			         ),

					$('<div/>').attr({id:'mypage_header_profileInfo_middle'}).append(
							$('<span/>').addClass('mypage_span').html('게시물 '+posts.length),
							$('<span/>').addClass('mypage_span').html('팔로우 300'),
							$('<span/>').addClass('mypage_span').html('팔로워 1K')
					
					),	
					$('<div/>').attr({id:'mypage_header_profileInfo_bottom'}).append(
						$('<span/>').attr({style:'font-weight: 600'}).html('상태 메세지 : '),
						$('<span/>').addClass('mypage_span').html(member.message)
							
					)
			)
		);
		
		$('<ul/>').attr({id:'mypage_content_list'}).appendTo($('#mypage_content'));
		
		$.each(posts,(index,post)=>{
			
			var postImagePath = _cpath+post.postImagePath+'/'+post.postImageName+'.'+post.postImageExtension;
			
			$('<li/>').addClass('col-md-4 mypage_content_post').append(
					$('<div/>').addClass('mypage_content_postImages').append(
							$('<img/>').addClass('mypage_content_postImage').attr({src:postImagePath}),
							$('<div/>').addClass('overlay').append(
									$('<div/>').addClass('mypage_content_postImageText').html('LIKE '+post.likeCount+' REPLY '+post.replyCount)
							).click(e=>{	
								// 이미지 클릭시 디테일 페이지로 이동
								
								var jsonData = {
					    			   postNo : post.postNo,
					    		   	   memberId : member.loginID,
					    		   	   memberProfile : postImagePath
					    		   }
								
								var detailPage = new instagram.body.DetailPage();
								detailPage.initialize(jsonData);
							
							})
							
					).attr({style:''})
			).appendTo($('#mypage_content_list'))
		});
		
	};
	instagram.body.myPage.prototype.destroy = function(){
		
	};
	
}(window, document));