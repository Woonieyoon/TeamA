$.namespace = function() {
	var a = arguments, o = null, i, j, d;
	for (i = 0; i < a.length; i = i + 1) {
		d = a[i].split(".");
		o = window;
		for (j = 0; j < d.length; j = j + 1) {
			o[d[j]] = o[d[j]] || {};
			o = o[d[j]];
		}
	}

	return o;
};

(function(w, doc, $) {
	$(doc).ready(function() {
		///---------------------------------------------------

				$.namespace("instagram.MemLogin");
				instagram.MemLogin = function() {
					this.initialized();
					var that = this;
					$("#eventSource").on("instagram.MemLogin.initialized", function(e) {
								that.fetch();
					});
				};

				instagram.MemLogin.prototype.initialized = function() {
				};

				instagram.MemLogin.prototype.destroy = function() {
				};

				instagram.MemLogin.prototype.fetch = function() {
					var form = document.loginForm;
					form.action = _cpath + "/memLogin.do";
					form.submit();
				};
				var memLogin = new instagram.MemLogin();

				// ---------------------------------------------
				$.namespace("instagram.MemJoinPage");
				instagram.MemJoinPage = function() {
					this.initialized();
					var that = this;
					$("#eventSource").on("instagram.MemJoinPage.initialized",
							function(e) {
								that.fetch();
							});
				};

				instagram.MemJoinPage.prototype.initialized = function() {
				};

				instagram.MemJoinPage.prototype.destroy = function() {
				};

				instagram.MemJoinPage.prototype.fetch = function() {
					location.href=_cpath + "/memJoinPage.do";
				};

				var memJoinPage = new instagram.MemJoinPage();

				// ---------------------------------------------

				$.namespace("instagram.MemInsert");
				instagram.MemInsert = function() {
					this.initialized();
					var that = this;
					$("#eventSource").on("instagram.MemInsert.initialized",
							function(e) {
								that.fetch();
							});
				};

				instagram.MemInsert.prototype.initialized = function() {
				};

				instagram.MemInsert.prototype.destroy = function() {
				};

				instagram.MemInsert.prototype.fetch = function() {
					var loginID = $("#loginID").val();
					var password = $("#password").val();
					var message = $("#message").val();
					var memberImage = $("#memberImage").val();
					
					var empJ = /\s/g; // 모든 공백 체크 정규식
					var idJ = /^[a-z0-9]{4,12}$/; // 아이디 정규식 a-z,0-9로 시작하는
													// 4~12자리 아이디를 만들수있다
					var pwJ = /^[A-Za-z0-9]{4,12}$/; // 비밀번호 정규식 A-Z,a-z,0-9로
														// 시작하는 비밀번호 를 설정할수있다
					var messageJ = /^[.*]{0,400}$/;
					
					
					if (!(idJ.test(loginID))) {
						alert("아이디 a-z,0-9로 시작하는 4~12자리 아이디를 만들수있습니다.");
						return;
					}
					
					if (!(pwJ.test(password))) {
						alert("비밀번호 정규식 A-Z,a-z,0-9로 시작하는  4~12자리 비밀번호 를 설정할수있습니다.");
						return;
					}
					
//					if (!memberImage.length>0) {
//						alert("프로필 사진파일은 필수 업로드 입니다.");
//						return;
//					}
					
//					if (!messageJ.test(message)) {
//						alert("상태 메시지는 0-400자 내외로 설정할 수 있습니다.")
//						return;
//					}

					// -------------------------------------------
					var dupCheck = localStorage.getItem("dupCheck");
					if (dupCheck == "Y" || dupCheck == "" || dupCheck == null) {
						alert("아이디 중복체크를 해주세요.");
						return;
					}

					var form = document.JoinForm;
					form.action = _cpath + "/memJoin.do";
					form.submit();
					localStorage.removeItem("dupCheck");
				};

				var memInsert = new instagram.MemInsert();

				// -------------------------------------------------------

				$.namespace("instagram.DupCheck");
				instagram.DupCheck = function() {
					this.initialized();
					var that = this;
					$("#eventSource").on("instagram.DupCheck.initialized",
							function(e) {
								that.fetch();
							});
				};

				instagram.DupCheck.prototype.initialized = function() {
				};

				instagram.DupCheck.prototype.destroy = function() {
				};

				instagram.DupCheck.prototype.fetch = function() {
					var dupId = $('#loginID').val();
					if (dupId == null || dupId == "") {
						alert("ID을 입력해주세요.");
						return;
					}
					$.ajax({
						type : "POST",
						url : _cpath + "/idDupcheck.do",
						data : {
							dupId : dupId
						},
						// dataType : "json",
						success : function(data) {
							var check = data.trim();
							if (check == 'Y') { // 이름이 겹친경우
								alert("같은 ID가 이미 존재합니다.  '" + dupId
										+ "' 으로 회원가입할 수 없습니다.");
								localStorage.setItem("dupCheck", 'Y');
								// localStorage.clear();
							} else {
								alert("중복되지 않는 이름입니다.");
								localStorage.setItem("dupCheck", 'N');
							}
						},
						error : function(e) {
							console.log(e);
							alert("에러발생");
						}
					});
				};
				var dupCheck = new instagram.DupCheck();
				//---------------------------------------------------------------
		        function readURL(input) {
		            if (input.files && input.files[0]) {
		            var reader = new FileReader();

		            reader.onload = function (e) {
		                    $('#blah').attr('src', e.target.result);
		                }

		              reader.readAsDataURL(input.files[0]);
		            }
		        }
				//----------------------------------------------------------------------
		        $.namespace("instagram.backButton");
		        instagram.backButton = function() {
					this.initialized();
					var that = this;
					$("#eventSource").on("instagram.backButton.initialized",
							function(e) {
								that.fetch();
							});
				};

				instagram.backButton.prototype.initialized = function() {
				};

				instagram.backButton.prototype.destroy = function() {
				};

				instagram.backButton.prototype.fetch = function() {
					history.pushState(null, null, location.href);
					w.onpopstate = function(event) {
						history.go(-1);
					};
				};
				var backButton = new instagram.backButton();
		        //--------------------------------------------------------------------
				$(function() {
					// login.jsp
					$("#memLogin").on("click", function(e) {
						$("#eventSource").trigger("instagram.MemLogin");
					});

					$("#memJoinPage").on("click", function(e) {
						$("#eventSource").trigger("instagram.MemJoinPage");
					});

					// join.jsp
					$("#memInsert").on("click", function(e) {
						$("#eventSource").trigger("instagram.MemInsert");
					});

					$("#dupCheck").on("click", function(e) {
						$("#eventSource").trigger("instagram.DupCheck");
					});
					
					$("#memberImage").on('change', function(){
		                readURL(this);
		            });
					
					//뒤로가기
					$("#backButton").on("click", function(e) {
						$("#eventSource").trigger("instagram.backButton");
					});
					
					
					
				});
			})

}(window, document, jQuery));
