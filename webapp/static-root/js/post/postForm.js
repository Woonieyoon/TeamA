(function(global, doc){
	
	$.namespace("instagram.body.form");
	instagram.body.form = function(){
		console.log("------constructing list");
	};
	
	instagram.body.form.prototype.initialize = function(){
		console.log("------initialize form");
		var that = this;
		this.clearData();
		this.render();
		
		$("#insert").on("click", function(){
			that.insert();
		});

		$("#cancel").on("click", function(){
			that.destroy();
		});
		
	    function readURL(input) {
	        if (input.files && input.files[0]) {
	        var reader = new FileReader();

	        reader.onload = function (e) {
	                $("#defaultImage").attr("src", e.target.result);
	            }
	          reader.readAsDataURL(input.files[0]);
	        }
	    }

		$("#postImage").on("change", function(){
            readURL(this);
        });
	};
	
   
    instagram.body.form.prototype.clearData = function(){
	    console.log("------clearData");
	    $("#content").empty();
    };

	instagram.body.form.prototype.destroy = function(){
		console.log("------destroy from");
		$("#content").empty();
		new instagram.body.list();
	};

	instagram.body.form.prototype.render = function(){
		console.log("------render form");
		var form = `
			<div class="formDiv style="text-align : center; width : 100%;">
				<form id="postInsertForm" method="post" ecntype="multipart/form-data">
					<div id="postContentDiv" style="display: inline-block;">
						<input type="file" name="postImage" id="postImage" accept="image/jpeg, image/png, image/gif" style="width: 500px;">
						<br />
						<img id="defaultImage" src="/sys4u/static-root/images/common/instagram-logo2.png" style="height: 400px; width: 400px; display: block; margin: 0px auto;" />
						<br />
						<textarea name="content" rows="5", cols="70" placeholder="내용을 입력해주세요"></textarea>
					</div>
                    <div class="postHashtagDiv">
                        <textarea id="hashtag" name="hashtag" id="hashtag" rows="1" cols="70" placeholder="해시태그를 입력해주세요"></textarea>
                    </div>
                    <div class="postBtnDiv">
                        <button type="button" id="insert">등록</button>
                        <button type="button" id="cancel">취소</button>
                    </div>
				</form>
			</div>
		`;
		$("#content").append(form);
	};
	
	instagram.body.form.prototype.insert = function(){
		console.log("------insert form");
		var that = this;
		var form = $("#postInsertForm")[0];
		var formData = new FormData(form);
		
		$.ajax({
			url: `${_cpath}/insert.do`
			,processData: false
			,contentType: false
			,data: formData
			,dataType: "text"
			,type: "POST"
			,success: function(result){
				if(result === "true"){
					alert("게시글이 등록되었습니다.");
					that.destroy();
				}
			}
			,error : function(e){
				alert("등록이 되지않았습니다.")
			}
        });
         
	};
	
}(window, document));