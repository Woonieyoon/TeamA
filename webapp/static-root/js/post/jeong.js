(function(global, doc){
   
   $.namespace("instagram.body.list");
   instagram.body.list = function(){
	  console.log("------constructing list");
	  var that = this;
	  var data;
	  var hashtag;

      $("#eventSource").on("list", function(){ // next
      	console.log("------list")
    	that.clearData();
    	that.divide();
  		that.requestList();
      });
	  
      $("#eventSource").on("next", function(data){ // next
  		that.requestList(data.row, data.hashtag);
      });

      $("#eventSource").on("find", function(data){ // find
    	console.log("------Find")
    	that.clearData();
    	that.divide();
  		that.requestList(1, data.hashtag);
      });

      $("#eventSource").on("like", function(postNo){ // find
    	that.clearData();
  		that.handleLikeClick(postNo);
      });
      
      this.initialize();
   };
   
   instagram.body.list.prototype.initialize = function(){
	  console.log("------lnitialize list");
  	  this.clearData();
	  this.divide();
      this.requestList();
   };
   
   instagram.body.list.prototype.clearData = function(){
	   console.log("------clearData");
	   $("#content").empty();
   };

   instagram.body.list.prototype.divide = function(){
	   console.log("------divide");
	   var divide = `<div id="postListDiv" class="divide"></div><div id="moreBtnDiv" class="divide"></div>`;
	   $("#content").append(divide);
   };
   
   instagram.body.list.prototype.destroy = function(){
      console.log("------destroy list");
      this.clearData();
      
   };
    
   instagram.body.list.prototype.requestList = function(pRow, pHashtag){
   	  console.log("    request - hashtag : " + this.hashtag);
   	  hashtag = encodeURIComponent(pHashtag);
      row = !pRow ? 1 : pRow;
      var that = this;

      $.get(`/sys4u/list.do?hashtag=${hashtag}&row=${row}`) 
  	  .done(function(data) {
  	  	that.data = data;
	  	that.render(data);
	  	console.log("    row : " + row + ", totalCount : " + data[0].totalCount);
	  	if(row == 1){ that.morerender() };
	  	if(row+2 >= data[0].totalCount){ $("#btnMore").remove() };
	  })
	  .fail(function(
			  
	  ) {
		  // 3가지 message가 data로 들어옴, 적절한 처리필요
	  });
   };

   instagram.body.list.prototype.handleLikeClick = function(postNo){
       var imgId = "#like" + postNo;
       var imgSrc = $(imgId).attr('src');
       var like = `${_imageUrl}/common/liked1.png`;
       var dislike = `${_imageUrl}/common/liked0.png`;
       $.post(`/sys4u/mergePostLike.do?postNo=${postNo}`) // 1.데이터 변경은 post, 2.postNo, memberNo (likeNo는 필요없음)
  	   .done(function(data) {
  	 	  if (imgSrc == like ){
               $(imgId).attr({src:`${_imageUrl}/common/liked0.png`});
  	 	  }else{
               $(imgId).attr({src:`${_imageUrl}/common/liked1.png`});
  	 	  }
	   })
	   .fail(function(
	 		  
	   ) {
	 	  // 3가지 message가 data로 들어옴, 적절한 처리필요
	   });
   }
   
   instagram.body.list.prototype.requestPost = function(divId, postNo){
   	  console.log("    request - hashtag : " + this.hashtag);
   	  hashtag = encodeURIComponent(pHashtag);
      row = !pRow ? 1 : pRow;
      var that = this;

      $.get(`/sys4u/list.do?hashtag=${hashtag}&row=${row}`) 
  	  .done(function(data) {
  	  	that.data = data;
	  	that.render(data);
	  	console.log("    row : " + row + ", totalCount : " + data[0].totalCount);
	  	if(row === data[0].totalCount){ $("#btnMore").attr("style", "display : none") };
	  	if(row == 1){ that.morerender() };
	  })
	  .fail(function(
			  
	  ) {
		  // 3가지 message가 data로 들어옴, 적절한 처리필요
	  });
   }
   
   instagram.body.list.prototype.nothing = function(){
	   var innerHTML = `
		   <div calss="postDiv" style="text-align:center">
		   		결과가 존재하지 않습니다.
		   </div>
	   `;
	   $("#postListDiv").append(innerHTML);
   }

   instagram.body.list.prototype.render = function(){
      console.log("render");
      var posts = this.data;

      var i = typeof $('.postDiv').last().data("row") !== "undefined" ? $(".postDiv").last().data("row")+1 : 1 ;
      $.each(posts,(key, post)=>{
         var postsDiv = document.createElement("div");
         $(postsDiv).append(this.postrender(post));
         $(postsDiv).attr({class:"postDiv"});
         $(postsDiv).attr({"data-row":i});
         $("#postListDiv").append(postsDiv);
         i++;
      })
      
      // 페이지 정보로 처리 변경
      this.find();
      this.like();
      this.detail();
      
   };
   
   instagram.body.list.prototype.hashtagrender = function(hashtagList){
       var innerHTML = "";
       $.each(hashtagList,(key, hashtag)=>{
           innerHTML += `<span class="find" id="${hashtag}"> ${hashtag} </span> `;
         });
       
       return innerHTML;
   };

   instagram.body.list.prototype.replyrender = function(postReplyList){
       var innerHTML = "";
       $.each(postReplyList,(key, reply)=>{
           innerHTML += `
        	   <div>
        	   		<img src="${_cpath}/static-root/images/upload/member/default/p0.png" width="20px" height="20px" style="border-radius: 100%"/>
        	   		<span class="bold">${reply.userId}</span> ${reply.content}
        	   </div>
        	   `;
         });

       return innerHTML;
   };
   
   instagram.body.list.prototype.postrender = function(post){
	   var liked = "";
	   liked = (post.postLike.liked*1) > 0 ? `<div class="heart" id="post${post.no}" data-liked="${post.postLike.liked}" data-postNo="${post.no}"><img id="like${post.no}" src="${_imageUrl}/common/liked1.png" width="25px" height="25px"/></div>` : 
		   `<div  class="heart" id="post${post.no}" data-liked="${post.postLike.liked}" data-postNo="${post.no}"><img id="like${post.no}" src="${_imageUrl}/common/liked0.png" width="25px" height="25px"/></div>`;
	   var likeUser = "";
	   likeUser = post.postLike.totalCount > 1 ?
			   post.postLike.recentLikedUser + "님 외 " + (post.postLike.totalCount*1-1) + "명이 좋아합니다.<br/>"
			   : post.postLike.totalCount > 0 ?
					   post.postLike.recentLikedUser + "님이 좋아합니다.<br/>"
					   : "";

	   var likeCount = post.postLike.totalCount > 0 ? "좋아요 " + post.postLike.totalCount + "개 " : "";
	   var hashtagList = post.hashtagList.length > 0 ? this.hashtagrender(post.hashtagList) + "<br/>"  : "";
	   var memberProfileUrl = `${_cpath}/${post.member.memberImage.path}/${post.member.memberImage.name}.${post.member.memberImage.extension}`;
	   var replyList = post.postReplyList.length > 0 ? post.postReplyList.length + `개 댓글이 있습니다.`
			   		 + `<span class="detail" data-postNo="${post.no}" data-memberId="${post.member.loginID}" data-profile="${memberProfileUrl}">
		   					댓글 모두보기
		   			 	</span><br/>` + this.replyrender(post.postReplyList) : "";

	   var myPage = `class="detail" data-postNo="${post.no}" data-memberId="${post.member.loginID}"`;
	   return `
		   <div class="post">
		   		<div class="writer">
				   <span class="mypage" value="${post.member.no}">
				   		<img class="memberImage" src="${_cpath}${post.member.memberImage.path}/${post.member.memberImage.name}.${post.member.memberImage.extension}">
				   </span>
				   <span class="bold">
				   		${post.member.loginID}
				   </span>
			    </div>
		   		<div class="image" data-postNo="${post.no}">
		   		   <img src="${_cpath}${post.postImage.path}/${post.postImage.name}.${post.postImage.extension}" width="100%" height="100%"/>
		   		</div>
		   		<div class="social">
		   			<div class="icon">
				   		<span class="liked">${liked}</span>
	   					<span class="detail" data-postNo="${post.no}" data-memberId="${post.member.loginID}" data-profile="${memberProfileUrl}">상세보기</span>
		   			</div>
			   		<div class="content">
			   			<span class="bold">${post.member.loginID}</span> ${post.content}
			   		</div>
				   ${hashtagList}
				   ${likeUser}
				   ${replyList}
			    </div>
		   </div>
	   `;
   };
   
   instagram.body.list.prototype.morerender = function(){
      var that = this;
      innerHTML = `<div id="btnMore">더보기 ▼</div>`;
      $('#moreBtnDiv').append(innerHTML);
      
      $('#btnMore').on('click', function() {
   	   // 마지막 row값으로 instagram.body.list render
    	  var row = $('.postDiv').last().data("row")+1;
    	  $("#eventSource").trigger({
    		  type : "next",
    		  row : row,
    		  hashtag : that.hashtag
    	  });
      });
   };
   
   instagram.body.list.prototype.find = function(){
	  var that = this;
      var hashArray = document.querySelectorAll('.find');
      for(var i=0; i<hashArray.length; i++){
		  hashArray[i].addEventListener('click',function(){
	           that.hashtag = this.getAttribute("id");
	           that.clearData();
	           that.divide();
               that.requestList(1, that.hashtag);
       });
      };
   };
   
   instagram.body.list.prototype.like = function(){
	  var that = this;
      var heartArray = document.querySelectorAll('.heart');
      for(var i=0; i<heartArray.length; i++){
		  heartArray[i].addEventListener('click',function(){
	           var postNo = this.getAttribute("data-postNo");
	           var likeNo = this.getAttribute("data-liked");
               that.handleLikeClick(postNo);
       });
      };
   };
   
   instagram.body.list.prototype.detail = function(){
	  var that = this;
      var detailArray = document.querySelectorAll('.detail');
      for(var i=0; i<detailArray.length; i++){
    	  detailArray[i].addEventListener('click',function(){
    		   var jsonData = {
    			   postNo : this.getAttribute("data-postNo"),
    		   	   memberId : this.getAttribute("data-memberId"),
    		   	   memberProfile : this.getAttribute("data-profile")
    		   }
	           var detailPage = new instagram.body.DetailPage();
               detailPage.initialize(jsonData);
       });
      };
   };
   
}(window, document));