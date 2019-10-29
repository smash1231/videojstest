     
function init() {        // Master function, encapsulates all functions
    var video = document.getElementById("my-video0");  

      getVideo();
    function getVideo(){
         var fileURL = GetUrlValue('videourl');  //document.getElementById("videoFile").value;  // get input field                    
        if (fileURL != "") {
            type = 'video/mp4'
            if(fileURL.indexOf('m3u8') != -1)
            {
                type =  'application/x-mpegURL'
            }else if(fileURL.indexOf('.mpd') != 1)
            {
                type = 'application/dash+xml'
            }

             player = videojs('my-video0', { plugins: {airplayButton:{}},
                    controls: true,
                    sources: [{src:  decodeURIComponent(fileURL), type:type}],
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

document.addEventListener('DOMContentLoaded', function () {
  //document.querySelector('button').addEventListener('click', myFunction);
    init();
     });  

