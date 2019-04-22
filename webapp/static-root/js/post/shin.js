(function(w, doc) {
	
	$(doc).ready(function() {
		
		   $.namespace("instagram.body.ModifyPost");
		   instagram.body.ModifyPost = function(){
			  this.initialize();
			  var that = this;
			  var data;
			  var hashtag;
		      $("#eventSource").on("instagram.body.ModifyPost.initialize", function(data){ // next
		  		that.fetch(data.postNo, data.loginId);
		      });
		   };
		   
		   instagram.body.ModifyPost.prototype.initialize = function() {
			};
			instagram.body.ModifyPost.prototype.destroy = function() {
			};

			instagram.body.ModifyPost.prototype.fetch = function(postNo,loginId) {
				$.ajax({
					type : "POST",
					url : _cpath + "/modifyPost.do",
					data : {
						postNo : postNo,
						loginId:loginId
					},
					// dataType : "json",
					success : function(member) {
						$('#content').empty();
						var form = `
							<div id="formDiv">
								<form id="postInsertForm" method="post" ecntype="multipart/form-data">
									<div id="postContentDiv">
										<input type="file" name="postImage" id="postImage" accept="image/jpeg, image/png, image/gif" style="width: 500px;">
										<br />
										<img id="defaultImage" src="/sys4u/static-root/images/common/instagram-logo2.png" style="height: 200px; width: 200px;" />
										<br />
										<textarea name="content" row="1", cols="70"></textarea>
									</div>
				                    <div class="postHashtagDiv">
				                        <textarea class="insert-post-hashtag-textarea" name="hashtag" id="hashtag" rows="1" cols="70"></textarea>
				                    </div>
				                    <div class="postBtnDiv">
				                        <button type="button" id="updatePost">수정</button>
				                    </div>
								</form>
							</div>
						`;
						$("#content").append(form);
					},
					error : function(e) {
						console.log(e);
						alert("에러발생");
					}
				});
			};
			
			var ModifyPost = new instagram.body.ModifyPost();
		
		//-------------------------------------------------------------------
		$.namespace("instagram.body.LogOut"); 
		instagram.body.LogOut = function() {
				this.initialized();
				var that = this;
				$("#eventSource").on("instagram.body.LogOut.initialized", function(e) {
					that.fetch();
				});
			};
			
			instagram.body.LogOut.prototype.initialized = function() {
			};
			instagram.body.LogOut.prototype.destroy = function() {
			};

			instagram.body.LogOut.prototype.fetch = function() {
				alert("로그아웃");
				location.href= _cpath + "/logOut.do";
			}; //end instagram.body.memUpdate.prototype.fetch
		
		var LogOut = new instagram.body.LogOut();
		
		
		// ----------------------------------------
		 function readURL(input) {
	            if (input.files && input.files[0]) {
	            var reader = new FileReader();

	            reader.onload = function (e) {
	                    $('#blah').attr('src', e.target.result);
	                }

	              reader.readAsDataURL(input.files[0]);
	            }
	        }
		
		 // -------------------------------------------------instagram.body.memUpdate
		$.namespace("instagram.body.ModifyPage");
		instagram.body.ModifyPage = function() {
			this.initialized();
			var that = this;
			$("#eventSource").on("instagram.body.ModifyPage.initialized", function(e) {
				that.fetch();
			});
		};

		instagram.body.ModifyPage.prototype.initialized = function() {
		};

		instagram.body.ModifyPage.prototype.destroy = function() {
		};

		instagram.body.ModifyPage.prototype.fetch = function() {
			$('#content').empty();
			var userId = _userId;
			$.ajax({
				type : "POST",
				url : _cpath + "/goModifyPage.do",
				data : {
					userId : userId
				},
				// dataType : "json",
				success : function(member) {
					var html= `	
							<div class="page">
							<form name="modifiedForm" method="post" enctype="multipart/form-data">
								<table style="height: 300px;">
									<tr>
										<td colspan="2" style="text-align: center;">
										</td>
									</tr>
									<tr>
										<td style="height: 50px"></td>
									</tr>
									<tr>
										<td style="text-align: center;width: 150px" >
											<span class="userVal">사용자 아이디</span>
											</td>
										<td style="text-align: center;width: 200px">
											<span>${member.loginID}</span>
										</td>
										<td rowspan="5" style="text-align: center;width: 200px">
											 <form id="form1" runat="server">
				       							 <img id="blah" src="/sys4u${member.memberImage.path}/${member.memberImage.name}.${member.memberImage.extension}" style="height: 200px; width: 150px;" />
				   							 </form>
										</td>
									</tr>
									<tr>
										<td style="text-align: center;width: 150px" >
											<span class="userVal">현재의 비밀번호</span>
											</td>
										<td style="text-align: center;width: 200px">
											<input type="password"	name="prepassword" id="prepassword" style="width: 200px;">
											<input type="hidden" id="password_H" value="${member.password}">
										</td>
									</tr>
									<tr>
										<td style="text-align: center;width: 150px" >
											<span class="userVal">변경할 비밀번호</span>
											</td>
										<td style="text-align: center;width: 200px">
											<input type="password"	name="password" id="password" style="width: 200px;">
										</td>
									</tr>
									
									<tr>
										<td style="text-align: center;">
											<span class="userVal">상태 메세지</span>
											</td>
										<td style="text-align: center;">
											<input type="text" value="${member.message}" name="message" id="message" style="width: 200px;">
										</td>
									</tr>
									<tr>
										<td style="text-align: center;">
											<span class="userVal">프로필 사진</span>
										</td>
										<td style="text-align: center;">
											<input type="file" class="custom-file-input" name="memberImage" id="memberImage" accept="image/jpeg, image/png, image/gif" style="width: 200px;">
										</td>
									</tr>
									<tr>
										<td style="height: 30px"></td>
									</tr>
									<tr>
										<td colspan="2" style="text-align: center;">
										<div id="eventSource" style="display: hidden"></div> 
											<a href="#" class="square_btn" id="memUpdate"><span class="userVal">수정하기</span></a>
										</td>
									</tr>
								</table>
							</form>
						</div>
						`;
					$('#content').append(html);
					
					// 그려진거 다음으로 트리거 설정
					$("#memUpdate").on("click", function(e) {
						$("#eventSource").trigger("update");
						
						 $.namespace("instagram.body.memUpdate"); 
						 instagram.body.memUpdate = function() {
							 console.log("11111");
								this.initialize();
								var that = this;
								$("#eventSource").on("update", function(e) {
									 console.log("33333");
									that.fetch();
								});
							};
							
							instagram.body.memUpdate.prototype.initialize = function() {
							};
							instagram.body.memUpdate.prototype.destroy = function() {
							};

							instagram.body.memUpdate.prototype.fetch = function() {
							var password = $("#password").val();
							var prepassword = $("#prepassword").val();
							var password_H = $("#password_H").val();
							if (prepassword!=password_H) {
								alert("현재 사용하고 있는 비밀번호가 일치하지 않습니다. ");
								return;
							}
							
							var pwJ = /^[A-Za-z0-9]{4,12}$/; // 비밀번호 정규식 A-Z,a-z,0-9로
							if (!(pwJ.test(password))) {
								alert("비밀번호 정규식 A-Z,a-z,0-9로 시작하는  4~12자리 비밀번호 를 설정할수있습니다.");
								return;
							}
							
							
							var form = document.modifiedForm;
							form.action = _cpath + "/modifiedMem.do";
							form.submit();
						}; //end instagram.body.memUpdate.prototype.fetch
						
						var memUpdate = new instagram.body.memUpdate();
					});
					
					// ----------------
					$("#memberImage").on('change', function(){
		                readURL(this);
		            });
				
				
				},
				error : function(e) {
					console.log(e);
					alert("에러발생");
				}
			}); //end ajax
		}; //end instagram.body.ModifyPage.prototype.fetch
		var ModifyPage = new instagram.body.ModifyPage();
		
	});
	
}(window, document));