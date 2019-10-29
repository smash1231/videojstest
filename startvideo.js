     
function init() {        // Master function, encapsulates all functions
    var video = document.getElementById("my-video0");  

      getVideo();
    function getVideo(){
         var fileURL = GetUrlValue('video-m3u8');  //document.getElementById("videoFile").value;  // get input field          
        var thumbURL = GetUrlValue('thumb');
        var testURL = 'https://cs9-13v4.vkuservideo.net/video/hls/p8/979ce8d947f3/index-f5-v1-a1.m3u8?extra=Xh0kwewdp_9XU9Xbss8xRwuwUvurZkRZA1QsGy9vJwXraZuYp_Qwp5d6LYIeZy0KwmzvMQ_zbAoglyrbkSGZf5J4mCyzfrHM4KLSpCDS-g57KXGqVI3dnckrGSo3j6r8zzZQK6FXhSIJBsMdjVxSJIrtrpw'
        if (fileURL != "") {
            type = 'video/mp4'
            if(fileURL.indexOf('m3u8') != -1)
            {
                type =  'application/x-mpegURL'
            }else if(fileURL.indexOf('.mpd') != 1)
            {
                type = 'application/dash+xml'
            }

            console.log("type " + type);
             player = window.player = videojs('my-video0');

            player.poster(decodeURIComponent(thumbURL));
             player.src( 
                    //sources: [{src:  decodeURIComponent(fileURL), type:type, poster:decodeURIComponent(thumbURL)}],
                    {src:  decodeURIComponent(fileURL), type:type});
                  // {src:  testURL, type:type, poster:t});
             player.on('error', function(e) {
                console.log(e);
                e.stopImmediatePropagation();
                var error = player.err
                 console.log('error!', error.code, error.type , error.message);


                    });  

            
            player.load();
          //  player.play();



            
          //  video.src =;

            //video.load();  // if HTML source element is used
        } else {
             var error = "Enter a valid video URL";
          
             errMessage(error);
        }
    }


}

function GetUrlValue(VarSearch){
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for(var i = 0; i < VariableArray.length; i++){
        var KeyValuePair = VariableArray[i].split('=');
        if(KeyValuePair[0] == VarSearch){
            return KeyValuePair[1];
        }
    }
}


document.addEventListener('DOMContentLoaded', function () {
  //document.querySelector('button').addEventListener('click', myFunction);
    init();
     });  

