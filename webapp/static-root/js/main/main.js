(function(global, doc) {
	
	global.onload = function(){
		
		//header
		$.namespace("instagram.Header");
		instagram.Header = function(){
			console.log("instagram.Header");
		};
		instagram.Header.prototype.initialize = function(){
			console.log("Header : initialize()");
			//nothing to do for now
		};
		instagram.Header.prototype.render =  function(){
			console.log("Header : render()");
			
			$('<div/>').attr({id:'header_div'}).append(
					
					$('<div/>').attr({id:'header_logo_box'}).append(
							$('<span/>').attr({id:'header_icon_logo'}),
							$('<span/>').attr({id:'header_icon_seperator'}),
							$('<span/>').attr({id:'header_icon_brandName'})
					),
					$('<div/>').attr({id:'header_search_box'}).append(
							$('<span/>').addClass('glyphicon glyphicon-search').attr({id:'header_search_icon',
								'aria-hidden':"true"}),
							$('<input/>').attr({id:'header_search_input', placeholder : '검색'})
					),
					$('<div/>').attr({id:'header_writting_box'}).append(		
							$('<span/>').attr({style:'font-size: 20px; color:#dbdbdb;'}).addClass('glyphicon glyphicon-plus-sign').click(e=>{
								//$("#enventSource").trigger();
								var form = new instagram.body.form();
								form.initialize();
							})
					),
					$('<div/>').attr({id:'header_user_box'}).append(
							$('<span/>').attr({id:'header_user_profile', style:'background-image:url('+_cpath+_userProfilePath+')'}),
							$('<span/>').attr({id:'header_user_id'}).text(_userId)
					)
					
			).appendTo($('#header'));
			
			$('#header_logo_box').click(x=>{
				$("#eventSource").trigger("list");
			});
			
			$('#header_user_box').click(x=>{
			
				var mypage = new instagram.body.myPage();
				mypage.initialize(_no);
			});
			
			$("#header_search_input").keydown(function(key) {
		   	   if (key.keyCode == 13) {
		   		   console.log("searchValue : " + $("#header_search_input").val());
		   		   $("#eventSource").trigger({
		     		  type : "find",
		    		  row : 1,
		    		  hashtag : "#"+$("#header_search_input").val()
		    	  });
		   	    };
		      });
		};
		
		//footer
		$.namespace("instagram.Footer");
		instagram.Footer =  function(){
			console.log("instagram.Footer");
			
		};
		instagram.Footer.prototype.initialize = function(){
			console.log("Footer : initialize()");
			//nothing to do for now
		};
		instagram.Footer.prototype.render =  function(){
			console.log("Footer : render()");
			
			$('<div/>').attr({id:'footer_div'}).append(
					$('<div/>').addClass('row text-center text-xs-center text-sm-left text-md-left').attr({id:'footer_menu'}).append(
							$('<div/>').addClass('footer_menu_content').append(
									$('<h5/>').html('About Us'),
									$('<ul/>').addClass('list-unstyled quick-links').append(
											$('<li/>').append(
												$('<a/>').html('Shin Jaehwan').append(
														$('<i/>').addClass('fa fa-angle-double-right')	
											)),
											$('<li/>').append(
													$('<a/>').html('Jeong Damji').append(
														$('<i/>').addClass('fa fa-angle-double-right')	
											)),
											$('<li/>').append(
													$('<a/>').html('Hong Hyeri').append(
														$('<i/>').addClass('fa fa-angle-double-right')	
											)) 
									)
									
							),
							$('<div/>').addClass('footer_menu_content').append(
									$('<h5/>').html('About Project'),
									$('<ul/>').addClass('list-unstyled quick-links').append(
											$('<li/>').append(
													$('<a/>').html('Simple').append(
														$('<i/>').addClass('fa fa-angle-double-right')	
											)),
											$('<li/>').append(
													$('<a/>').html('Instagram').append(
														$('<i/>').addClass('fa fa-angle-double-right')	
											)),
											$('<li/>').append(
													$('<a/>').html('Systagram').append(
														$('<i/>').addClass('fa fa-angle-double-right')	
											))
									)
									
							),
							$('<div/>').addClass('footer_menu_content').append(
									$('<h5/>').html('About Company'),
									$('<ul/>').addClass('list-unstyled quick-links').append(
											$('<li/>').append(
													$('<a/>').html('SYS4U I&C').append(
														$('<i/>').addClass('fa fa-angle-double-right')	
											)),
											$('<li/>').append(
													$('<a/>').html('Korea, Seoul').append(
														$('<i/>').addClass('fa fa-angle-double-right')	
											)),
											$('<li/>').append(
													$('<a/>').html('H BusinessPrak').append(
														$('<i/>').addClass('fa fa-angle-double-right')	
											))
									)
							)
					),
					$('<div/>').addClass('row').append(
							$('<div/>').append(
								$('<ul/>').addClass('list-unstyled list-inline social text-center').attr({id:'footer_icon'}).append(
										$('<li/>').addClass('list-inline-item').append(
												$('<a/>').append(
													$('<i/>').addClass('fa fa-facebook').attr({style:'margin: 0px 20px 0px 20px;'})
												)
										),
										$('<li/>').addClass('list-inline-item').append(
												$('<a/>').append(
													$('<i/>').addClass('fa fa-twitter').attr({style:'margin: 0px 20px 0px 20px;'})
												)
										),
										$('<li/>').addClass('list-inline-item').append(
												$('<a/>').append(
													$('<i/>').addClass('fa fa-instagram').attr({style:'margin: 0px 20px 0px 20px;'})
												)
										),
										$('<li/>').addClass('list-inline-item').append(
												$('<a/>').append(
													$('<i/>').addClass('fa fa-google-plus').attr({style:'margin: 0px 20px 0px 20px;'})
												)
										),
										$('<li/>').addClass('list-inline-item').append(
												$('<a/>').attr({target:"_blank"}).append(
													$('<i/>').addClass('fa fa-envelope').attr({style:'margin: 0px 20px 0px 20px;'})
												)
										),
										$('</br>')
								)
							)
					), 
					
					$('<div/>').addClass('row').append(
							$('<div/>').addClass('col-xs-f2 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white').append(
									$('<p/>').html('This project was built by new employees for acquiring the skills needed to create <br>the product and servicesthat sys4u clients demand'),
									$('<p/>').addClass('h6').html('Copyright ⓒ 2018 SYS4U I&C. All rights reserved.').append(
											$('<a/>').addClass('text-green ml-2').attr({href:'http://sys4u.kr/', target:'_blank'}).html('SYS4U')
									)			
							)
					)
					
			
			).appendTo($('#footer'));
			
			
			
		};
		
		//main
		$.namespace("instagram.Main");
		instagram.Main = function(){
			
			console.log("instagram.Main");
			this.components = [];
		};
		
		instagram.Main.prototype.initialize = function(){
			console.log("Main : initialize()");
			
			var header = new instagram.Header();
			header.initialize();
			this.components.push(header);
			
			var body = new instagram.body.list();
			this.components.push(body);
			
			var footer = new instagram.Footer();
			footer.initialize();
			this.components.push(footer);
			
		};
		
		instagram.Main.prototype.render = function(){
			
			console.log("Main : render()");
			for(var i = 0 ; i < this.components.length ; i ++){
				var component = this.components[i];
				component.render();
			}
			
			
		};
		instagram.Main.prototype.destroy = function(){
			console.log("Main : destroy()");
			//nothing to do for now
		};

		var main = new instagram.Main();
		main.initialize();
		main.render();
		
	}
}(window, document));