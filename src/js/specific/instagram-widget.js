// JavaScript Document
$(document).ready(function() {
	jQuery.fn.spectragram.accessData = {
		accessToken: '604302397.f048bb0.299b913ca3ad4b8787019a75d334b659', //put your access Token Here
		clientID: 'f048bb0224a6446d934314a785ded4a9' // put your Client ID here
	};	
	$('.vc_instagram .vc_carousel').spectragram('getUserFeed',{
		query: 'venmond', // Your instagram username
		size: 'big', // 'small' 'medium' 'big'
		max: 6, // Maximum photo, default: 10
		wrapEachWith: '<div class="vc_carousel-column"></div>'
	});	
});