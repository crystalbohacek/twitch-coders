$(document).ready(function() {
  
  var twitchStreamers = ["kojaktsl", "Serpent_AI", "HardlyDifficult", "windybeardgames", "drunkdevs", "numfin", "xcodeblocks", "vFujin", "sethbling", "wekeepsitreal", "kociqq", "twilliams71", "freecodecamp", "techlahoma", "HexwellC", "CultOfRig", "JackOfSporks"];
  var output = "";
  var $outputEl = $("#output");
  var $offlineOutputEl = $("#offline-output");


  for (var i = 0; i < twitchStreamers.length-1; i++) {
    ajax(twitchStreamers[i]);
  }
  
  function ajax(twitchStreamer){ 
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
    },
    error: function(errorMessage){
          alert("error", errorMessage);
    }
  })
 }
});