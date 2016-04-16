( function( window ) {

'use strict';

var JQy = jQuery.noConflict();
JQy(document).ready(function() {
	JQy('#map-small').gMap({
		 address: '7010 Sana Monica Blvd, Los Angeles, CA',
		 mapTypeId: 'ROADMAP',
		 zoom: 14,
		 markers: [
			{
				address: "7010 Sana Monica Blvd, Los Angeles, CA",
				icon: {
					image: "images/blue.png",
					iconsize: [42, 51],
					iconanchor: [21,51]
				}							
			}
		 ],
		 doubleclickzoom: true,
		 controls: {
			 panControl: true,
			 zoomControl: true,
			 mapTypeControl: false,
			 scaleControl: true,
			 streetViewControl: true,
			 overviewMapControl: false
		 },            
	});
});

});