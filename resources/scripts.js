$(document).ready(function() {
  
  var twitchStreamers = [
        "kojaktsl",
        "Serpent_AI",
        "HardlyDifficult",
        "windybeardgames",
        "drunkdevs",
        "numfin",
        "xcodeblocks",
        "vFujin",
        "sethbling",
        "wekeepsitreal",
        "kociqq",
        "twilliams71",
        "freecodecamp",
        "techlahoma",
        "HexwellC",
        "CultOfRig",
        "JackOfSporks",
        "hustle_man"
  ];

var globalStartIndex = 0;
var globalEndIndex = 4;
  
  
var output = "";
var $outputEl = $("#output");
var $offlineOutputEl = $("#offline-output");
var $loadMoreButton = $("#load-more");

  
function loadStreamers(){
  if (globalEndIndex >= twitchStreamers.length){
    globalEndIndex = twitchStreamers.length;
    $loadMoreButton.hide();
  }

  for (var i = globalStartIndex; i < globalEndIndex; i++) {
    ajax(twitchStreamers[i]);
  }

  globalStartIndex = globalEndIndex + 1;
  globalEndIndex = globalStartIndex + 5;
}

function ajax(twitchStreamer){ 
  $loadMoreButton.text('Loading...');
  $.ajax({
    url: "https://wind-bow.glitch.me/twitch-api/streams/" + twitchStreamer + "?callback=?",
    success:function(result){
      var data = JSON.parse(result.substring(32,result.length-2)); 

      if (data.stream){
        output = '<li><h3>' + data.stream.channel.display_name + '</h3></li>'
        $outputEl.html($outputEl.html() + output);
      } else {
        output = '<li><p>' + twitchStreamer + ' is offline </p></li>'
        $offlineOutputEl.html($offlineOutputEl.html() + output);
      }
      $loadMoreButton.text('Load more');
      
    },
    error: function(errorMessage){
          alert("error", errorMessage);
    }
  })
}    
  
  $('#load-more').on('click', function(){
    loadStreamers()
  });
  
  
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/streams/communities/programming?game=Creative',
    success: function(data) {
      data = JSON.parse(data);

      var streams = data.streams;
      var liveStreams = [];
      var indexOfNewStream;

      for (var i = 0, j = streams.length; i < j; i++){
        newStream = streams[i].channel.name;
        indexOfNewStream = twitchStreamers.indexOf(newStream);
        if (indexOfNewStream > -1){
          twitchStreamers.splice(indexOfNewStream, 1)          
        }
        twitchStreamers.unshift(newStream);
      }
      console.log(twitchStreamers);
      

//      for (var i = 0; i < twitchStreamers.length-1; i++) {
//        ajax(twitchStreamers[i]);
//      }
      
      loadStreamers();
          
    }
  });
});