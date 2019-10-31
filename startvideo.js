

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
//            player.controls(true);
 //           player.autoplay(true);
  //          player.preload("auto");
             player.src( 
                    {src:  decodeURIComponent(fileURL), type:type});
            player.on('tap', function() {
              if (player.paused()) {
                player.play();
              } else {
                player.pause();
              }
            });
             player.on('error', function(e) {
                console.log(e);
                e.stopImmediatePropagation();
                var error = player.err
                 console.log('error!', error.code, error.type , error.message);


                    });  

            
            player.load();
           player.play();
          //  player.userActive(true);

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
   
    var wideScreen = 16.0/9;

    var screenW = window.screen.width;
    var screenH = window.screen.height;

    var screenWidthRatio = w/screenW;
    var screenHeightRatio = h/screenH;
    width = 80;
    
    screenWidthThreshold = 0.6;
    screenHeightThreshold = 0.6;

    if(screenWidthRatio < screenWidthThreshold)
    {
        swratio = screenWidthRatio;
        if(swratio < 0.5)
        {
            swratio = 0.5;
        }
        width = 80 + ((screenWidthThreshold-swratio)/0.1) * 20;
        if(width > 99.99)
            width = 99.99;


    }
    var sizeRatio = (w*(width/100))/h;

    //console.log("sizeRation: " + sizeRatio.toString() + " widescr " + wideScreen.toString());
    if(sizeRatio > (16.0/9)){

        var ratio = (h/(w * (width/100))) * 100;
        if(screenHeightRatio > screenHeightThreshold)
        {   

            var influence = (screenHeightRatio -screenHeightThreshold) / 0.1;
                
            if(influence > 1)
            {
                influence = 1;
            }
            if(influence< 0)
            {
                influence = 0;
            }

            deduct = width * (1- ((ratio/100)/(9/16.0)));

            width -= (deduct*influence)

            if(width < 72)
            {
                width = 72;
            }

        }

        

        document.getElementById("my-video0").style.paddingTop = ratio.toString() +"%";  
        document.getElementById("vidDiv").style.width = width.toString() +"%";
        console.log("new ratio " + ratio.toString());

            
    }
    else{
        document.getElementById("my-video0").style.paddingTop =null;  
        if(sizeRatio < (10/9) && screenWidthRatio > screenWidthThreshold)
        {

          var influence = (screenWidthRatio - screenWidthThreshold) / 0.1;
                
            if(influence > 1)
            {
                influence = 1;
            }
            if(influence< 0)
            {
                influence = 0;
            }

            deduct = 80  *(1-((10/9)/sizeRatio) );
           // deduct = width * (1- ((ratio/100)/(9/16.0)));

            width -= (deduct*influence)
        // width = 80  * ((10/9)/sizeRatio);

            if(width > 99.99)
            {
                width = 99.99;
            }

        }

       

        document.getElementById("vidDiv").style.width = width.toString() +"%";
    }

}


document.addEventListener('DOMContentLoaded', function () {
  //document.querySelector('button').addEventListener('click', myFunction);
    init();
    window.addEventListener("resize", OnResize);
   OnResize();
     });  

 document.addEventListener('touchmove', function(event) {
    event = event.originalEvent || event;
    if(event.scale > 1) {
      event.preventDefault();
        player = window.player = videojs('my-video0');
        player.requestFullscreen();
    }
  }, false);

