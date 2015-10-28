
$(function(){
	
	$(".video-third .video-details").mouseenter(function(){
		var thisHead = $(this).find("h1"),
			thisP = $(this).find("p");
		$(thisHead).animate({
			top: "20%",
			opacity: 1
		});
		$(thisP).animate({
			top: "70%"
		});
	});
	
	$(".video-third .video-details").mouseleave(function(){
		var thisHead = $(this).find("h1"),
			thisP = $(this).find("p");
		$(thisHead).animate({
			top: "5%",
			opacity: 1
		});
		$(thisP).animate({
			top: "90%"
		});
	});
	
});

						$(function(){
							$(".vc_menu-search").on("click", function(){
								if ($(this).width(35)) {
									$(this).animate({"width":"280px"});
									$(this).animate({"height":"74px"});
									document.getElementById('googleSearch').style.display = "block";
								}
								else {
									$(this).animate({"width":"35px"});
									$(this).animate({"height":"25px"});
									document.getElementById('googleSearch').style.display = "none";
								}
							});
						});