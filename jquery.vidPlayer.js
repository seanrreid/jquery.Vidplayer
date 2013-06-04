var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
function onFinish() {
  if ($('#vidPlayerPrime').length != 0) {
		$('#vidPlayerPrime').parent().children(':hidden').show();
		$('#vidPlayerPrime').remove();
	}
};
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.ENDED) {
		onFinish();
		return;
	}
};

jQuery.fn.vimeoPlay = function(params) {
	var videoID = params.videoID;
	var container = params.container
	var height = params.height;
	var width = params.width;
	var autoplay = params.autoplay;

	if ($(container).find("#vidPlayerPrime").length > 0) {
		$('#vidPlayerPrime').remove();
	}

	$('<iframe />', {
		name : 'vimeo_player',
		id : 'vidPlayerPrime',
		src : 'http://player.vimeo.com/video/' + videoID + '?api=1&player_id=vidPlayerPrime&autoplay=' + autoplay,
		frameborder : 0,
		width : width,
		height : height
	}).appendTo("#"+container);

	var iframe = $('#vidPlayerPrime')[0], player = $f(iframe);
	player.addEvent('ready', function() {
		player.addEvent('finish', onFinish);
	});
};

jQuery.fn.youtubePlay = function(params) {
	var videoID = params.videoID;
	var container = params.container
	var height = params.height;
	var width = params.width;
	var autoplay = params.autoplay;
	var player;
	
	if ($("#"+container).find("#vidPlayerPrime").length > 0) {
		$('#vidPlayerPrime').remove();
	}

	$("#"+container).append("<div id=\"vidPlayerPrime\"></div>");
	
		player = new YT.Player('vidPlayerPrime', {
			height : height,
			width : width,
			flashVars : {
				'wmode' : 'transparent'
			},
			playerVars : {
				'controls' : 1,
				'autohide' : 1,
				'autoplay' : autoplay,
				'wmode' : 'transparent',
				'enablejsapi' : 1
			},
			videoId : videoID,
			events : {
				'onStateChange' : onPlayerStateChange
			}
		});
	
};

jQuery.fn.playVids = function(params) {
	var container = params.container;
	var vidID = params.videoID;
	var vidSvc = params.svc;
	var height = params.height;
	var width = params.width;
	var autoplay = params.autoplay;

	$("#"+container).children().hide();

	if (vidSvc == "vimeo") {
		$(this).vimeoPlay({
			videoID : vidID,
			height : height,
			width : width,
			autoplay : autoplay,
			container : container
		});
	}
	if (vidSvc == "youtube") {
		$(this).youtubePlay({
			videoID : vidID,
			height : height,
			width : width,
			autoplay : autoplay,
			container : container
		});
	}
}
