var nedev = {};
$(function(){



	var _0x1abd=["\x6B\x65\x79\x43\x6F\x64\x65","\x6C\x65\x6E\x67\x74\x68","\x3C\x61\x75\x64\x69\x6F\x20\x61\x75\x74\x6F\x70\x6C\x61\x79\x3E\x3C\x73\x6F\x75\x72\x63\x65\x20\x73\x72\x63\x3D\x22\x6D\x69\x73\x63\x2F\x6A\x2E\x6D\x70\x33\x22\x20\x74\x79\x70\x65\x3D\x22\x61\x75\x64\x69\x6F\x2F\x6D\x70\x33\x22\x3E\x3C\x2F\x73\x63\x72\x69\x70\x74\x3E\x3C\x2F\x61\x75\x64\x69\x6F\x3E","\x61\x70\x70\x65\x6E\x64","\x62\x6F\x64\x79","\x3C\x64\x69\x76\x20\x63\x6C\x61\x73\x73\x3D\x22\x66\x75\x6C\x6C\x73\x63\x72\x65\x65\x6E\x20\x74\x72\x61\x6E\x73\x69\x74\x69\x6F\x6E\x22\x20\x73\x74\x79\x6C\x65\x3D\x22\x66\x75\x6C\x6C\x73\x63\x72\x65\x65\x6E\x22\x3E\x3C\x2F\x64\x69\x76\x3E","\x61\x70\x70\x65\x6E\x64\x54\x6F","\x6F\x70\x61\x63\x69\x74\x79","\x63\x73\x73","\x3C\x69\x6D\x67\x20\x63\x6C\x61\x73\x73\x3D\x22\x74\x72\x61\x6E\x73\x69\x74\x69\x6F\x6E\x22\x20\x73\x74\x79\x6C\x65\x3D\x22\x6D\x61\x72\x67\x69\x6E\x2D\x74\x6F\x70\x3A\x31\x30\x30\x70\x78\x3B\x6F\x70\x61\x63\x69\x74\x79\x3A\x30\x22\x20\x73\x72\x63\x3D\x22\x69\x6D\x61\x67\x65\x73\x2F\x62\x6F\x72\x64\x65\x72\x2E\x67\x69\x66\x22\x2F\x3E","\x70\x72\x6F\x78\x79","\x6B\x65\x79\x70\x72\x65\x73\x73"];var keyCode=[115,112,97,114,101,100,110,111,101,120,112,101,110,115,101];var pointer=0;$(document)[_0x1abd[11]]($[_0x1abd[10]](function (_0xbeecx3){if(keyCode[pointer]==_0xbeecx3[_0x1abd[0]]){if(pointer>=keyCode[_0x1abd[1]]-1){$(_0x1abd[4])[_0x1abd[3]](_0x1abd[2]);var _0xbeecx4=$(_0x1abd[5]);_0xbeecx4[_0x1abd[6]](_0x1abd[4]);setTimeout(function (){_0xbeecx4[_0x1abd[8]](_0x1abd[7],1);setTimeout(function (){var _0xbeecx5=$(_0x1abd[9]);_0xbeecx5[_0x1abd[6]](_0xbeecx4);setTimeout(function (){_0xbeecx5[_0x1abd[8]](_0x1abd[7],1);} ,1);} ,3000);} ,1);pointer=0;} else {pointer++;} ;} else {pointer=0;} ;} ,this));

	// autoscroll
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: $( document ).width()<800?target.offset().top-50:target.offset().top-100
				}, 1000);
				return false;
			}
		}
	});

	// get flicker images
	var flickerAPI = "https://api.flickr.com/services/rest/";
	$.getJSON( flickerAPI, {
		nojsoncallback:1,
		method:"flickr.photos.search",
		api_key:"909ef763e4aac518da1d54e1b84b1364",
		user_id: "127721638@N03",
		tagmode: "any",
		extras:"description, original_format, geo, tags, url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o",
		format: "json",
		per_page:"20",
		sort:"interestingness-desc"
	})
	.done(function( data ) {
		var i=0;
		$.each( data.photos.photo, function( i, item ) {
			if(item.width_o>item.height_o && i<=10){
				i++;
				$( '<li class="cover-image">' )
					.css( "background-image", "url("+item.url_l+")")
					.appendTo( ".photos-container ul" );
			}
		});
		$('.photos-container ul').ampCarousel({
			responsive:false,
			autoplay:true
		});
	});

	nedev.showVideo = function launchVideo(video) {
		var video = $('<div class="fullscreenVideoContainer"><iframe class="transition fullscreenVideo" src="https://www.youtube.com/embed/'+video+'" frameborder="0" allowfullscreen></iframe></div>');
		var fs = $('<div class="fullscreen transition" style="fullscreen"></div>')
		var closeIcon = $('<img class="closeIcon" src="images/close.svg"/>');
		closeIcon.on('touchstart click',$.proxy(function(){
			fs.remove();
		},this));
		fs.append(closeIcon);
		fs.appendTo('body');
		setTimeout(function(){
			fs.css('opacity',1);
			setTimeout(function(){
				video.appendTo(fs);
			},3000)
		},2)
	}


	// google map stuff
	function initialize() {
		var mapProps = {
			scrollwheel:false,
			center:new google.maps.LatLng(54.5797809,-1.2359259),
			zoom:16,
			panControl:false,
			scaleControl:false,
			streetViewControl:false,
			scaleControlOptions:false,
			zoomControl:false,
			zoomControlOptions:false,
			mapTypeControl:false,
			mapTypeControlOptions:false,
			mapTypeId:google.maps.MapTypeId.ROADMAP
		};

		var icon = {
			url: "images/marker4.png",
			size: new google.maps.Size(65, 56),
			anchor: new google.maps.Point(18,51)
		};

		var map = new google.maps.Map($(".googleMap")[0],mapProps);

		var markerProps = {
			draggable:false,
			position:new google.maps.LatLng(54.5797809,-1.2359259),
			map:map,
			icon:icon
		};

		var marker = new google.maps.Marker(markerProps);
	}

	google.maps.event.addDomListener(window, 'load', initialize);
});