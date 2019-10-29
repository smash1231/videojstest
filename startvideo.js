     
function init() {        // Master function, encapsulates all functions
    var video = document.getElementById("my-video0");  

      getVideo();
    function getVideo(){
         var fileURL = GetUrlValue('video-m3u8');  //document.getElementById("videoFile").value;  // get input field          
        var thumbURL = GetUrlValue('thumb');
        if (fileURL != "") {
            type = 'video/mp4'
            if(fileURL.indexOf('m3u8') != -1)
            {
                type =  'application/x-mpegURL'
            }else if(fileURL.indexOf('.mpd') != 1)
            {
                type = 'application/dash+xml'
            }

             player = videojs('my-video0', {
                    controls: true,
                    sources: [{src:  decodeURIComponent(fileURL), type:type, poster(decodeURIComponent(thumbURL))}],
                    techOrder: [ 'html5']
                });
             player.on('error', function(e) {
                console.log(e);
                e.stopImmediatePropagation();
                var error = player.err
                 console.log('error!', error.code, error.type , error.message);


                    });  

            
            player.load();
            player.play();



            
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

