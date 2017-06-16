$(document).ready(function() {
  
  var twitchStreamers = ["kojaktsl", "Serpent_AI", "HardlyDifficult", "windybeardgames", "drunkdevs", "numfin", "xcodeblocks", "vFujin", "sethbling", "wekeepsitreal", "kociqq", "twilliams71", "freecodecamp", "techlahoma", "HexwellC"];
        
for (var i = 0; i < twitchStreamers.length-1; i++) {
        ajax();
}
  
 function ajax(){ 
   $.ajax({
    url: "https://wind-bow.glitch.me/twitch-api/streams/" + twitchStreamers[i] + "?callback=?",
    success:function(result){
      var data = JSON.parse(result.substring(32,result.length-2)); 

      if (data.stream){
        var output = "";
        for (i = 0; i <= 4; i++){
          output += '<br><li><h3>' + data.stream.channel.display_name + '</h3></li>'
        }
        $("#output").html(output)
        
      } else {
        $("p").text("User Offline");
      }

    },
    error: function(errorMessage){
          alert("error", errorMessage);
    }
  })
 }
});