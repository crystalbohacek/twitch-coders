$(document).ready(function() {
  
  var twitchStreamers = ["sethbling","wekeepsitreal", "kociqq", "twilliams71", "freecodecamp", "techlahoma", "HexwellC"];
  
      var url = "https://wind-bow.glitch.me/twitch-api/streams/" + twitchStreamers[0] + "?callback=?"
      console.log(url)
  $.ajax({
    url: url,
    success:function(result){
      
      var data = JSON.parse(result.substring(32,result.length-2)); 
      $("p").text("Name: " + data.stream.channel.display_name)

      if (result){}

    },
    error: function(errorMessage){
          alert("error", errorMessage);
    }
  })
});