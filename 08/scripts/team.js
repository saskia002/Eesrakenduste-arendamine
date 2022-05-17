$('body').removeClass("wrapper");
$('body').css({'overflow':'hidden'});

$('#0').addClass('active');
$('#1').hide();

$('#prevButton button').click(deskChange);
$('#nextButton button').click(deskChange);

function deskChange(){
	stopVideo();
	if($('#0').attr('class') == "teamList active"){
		stopVideo();
		$('#0').removeClass('active').hide();		
		$('#1').addClass('active').fadeIn(128, "swing");
	}else if($('#1').attr('class') == "teamList active"){
		stopVideo()
		$('#1').removeClass('active').hide();
		$('#0').addClass('active').fadeIn(128, "swing");
	}
}



	//https://developers.google.com/youtube/iframe_api_reference

      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'LDU_Txk06tM?t=36',
          playerVars: {
            'playsinline': 1
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo().seekTo(70);
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
		  partyModeON();
        }else{
			//setTimeout(partyModeOFF(), 3500);
			partyModeOFF();
		}
      }
      function stopVideo() {
        player.stopVideo();
		partyModeOFF();
      }

function partyModeON(){
	$('body').addClass("wrapper");
}
function partyModeOFF(){
	$('body').removeClass("wrapper");
}

