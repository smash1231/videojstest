

function init() {        // Master function, encapsulates all functions
    var video = document.getElementById("my-video0");  

      getVideo();
    function getVideo(){
         var fileURL = GetUrlValue('url');  //document.getElementById("videoFile").value;  // get input field          
        var thumbURL = decodeURIComponent( GetUrlValue('thumb') );
        var meta = document.createElement('meta');
        meta.property= "og:image";
        meta.content = thumbURL ;
        document.getElementsByTagName('head')[0].appendChild(meta);
        if(fileURL =="")
        {
            fileURL = GetUrlValue('link');
        }



        if (fileURL != "") {

      

         
            type = 'video/mp4'
            providedType = GetUrlValue('type');

            if((providedType == "" && fileURL.indexOf('.m3u8') != -1) || (providedType != undefined && providedType.indexOf('m3u8') != -1))
            {
                type =  'application/x-mpegURL'
            }else if((providedType == "" && fileURL.indexOf('.mpd') != -1) ||(providedType != undefined && providedType.indexOf('mpd') != -1 ))
            {
                type = 'application/dash+xml'
            }

           

            console.log("type " + type);
             player = window.player = videojs('my-video0');

            player.poster(thumbURL);
             player.src( 
                    {src:  decodeURIComponent(fileURL), type:type});
             player.on('error', function(e) {
                console.log(e);
                e.stopImmediatePropagation();
                var error = player.err
                 console.log('error!', error.code, error.type , error.message);


                    });  

            
            player.load();
           player.play();

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

function OnResize()
{
    var w = window.innerWidth;
    var h = window.innerHeight;
    var sizeRatio = (w*0.8)/h;
    var wideScreen = 16.0/9;

    console.log("sizeRation: " + sizeRatio.toString() + " widescr " + wideScreen.toString());
    if(sizeRatio > (16.0/9)){

        var ratio = (h/(w * 0.8)) * 100;
        var width = 80 * ((ratio/100)/(9/16.0));
        if(width < 55)
        {
            width = 55;
        }

        document.getElementById("my-video0").style.paddingTop = ratio.toString() +"%";  
        document.getElementById("vidDiv").style.width = width.toString() +"%";
        console.log("new ratio " + ratio.toString());

            
    }else{
        document.getElementById("my-video0").style.paddingTop =null;  
        document.getElementById("vidDiv").style.width = "80%";
    }

}


document.addEventListener('DOMContentLoaded', function () {
  //document.querySelector('button').addEventListener('click', myFunction);
    init();
   OnResize();
     });  

