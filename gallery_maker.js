highResUrlArray = []

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


function GetUrlArray(inputUrl, start = 0, end = 0)
{
    var urls = []
    var patt = /\[(.*?)\]/g
    var result = inputUrl.match(patt);
    var numberRange = result[0].replace(/[\[\]']+/g,'');
    var rangeStart = start;
    var rangeEnd = end;


    var splitRange = numberRange.split("-");

    if(rangeStart == 0 && rangeStart == rangeEnd){
        rangeStart = parseInt(splitRange[0]);
        rangeEnd = parseInt(splitRange[1]);
    }

    var stringLen = splitRange[0].length;

    for (i = rangeStart; i < rangeEnd + 1; i++) {
        
        var filePath = inputUrl.replace(result[0], pad(i, stringLen, '0'));
        urls.push(filePath);
       // var link=document.createElement('a');
       // link.href = filePath;
       // link.innerHTML = filePath;
       // htmlString += link.outerHTML;
    }

    return urls;


}

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function getFileName(url)
{
    return  url.replace(/^.*[\\\/]/, '');
}


function getZipFile()
{
    var zip = new JSZip();
    var button = document.getElementById("downloadButton");
    button.removeEventListener("click", getZipFile , false);
    button.innerHTML = "please wait. Downloading files and creating zip file..."

    var zipFileName = getFileName(highResUrlArray[0]);
   var lastIndex=zipFileName.lastIndexOf(".");
    zipFileName = zipFileName.slice(0,lastIndex+1);

    var urls = highResUrlArray;
    function request(url) {
        return new Promise(function(resolve) {

            JSZipUtils.getBinaryContent(url,function (err, data) 
            {
                if(!err)
                {
                    var dic={base64:true,binary:true}; //WAV File Encoding
                    var filename = getFileName(url);
                    zip.file(filename, data, dic);
                    button.innerHTML = "Please Wait. Fetching files: " + filename;
                    resolve();
                 }else{
                     console.log("error " + err.message);
                 }
            });

        })
      }

    Promise.all(urls.map(function(url) {
          return request(url)
    })).then(function() {
          console.log(zip);
          button.innerHTML = "please wait. zipping files " 
          zip.generateAsync({
              compression: "DEFLATE", // <-- here
              type: "blob", 
          },function updateCallback(metadata) {
            button.innerHTML = "Please Wait. Zipping files " + metadata.percent.toFixed(1) + '%';}).then(function(content) {
                  saveAs(content, zipFileName + "zip");
                    button.addEventListener("click", getZipFile, false);
                    button.innerHTML = "Download images in zip"

            });
        });
}


function createGallery()
{
    var startRange = decodeURIComponent( GetUrlValue('startRange') );
    var endRange = decodeURIComponent( GetUrlValue('endRange') );

    var start = 0;
    var end = 0;
    if(!startRange.includes("undefined") &&  
            !endRange.includes("undefined") && startRange.length > 0 
    && endRange.length > 0)
    {
        console.log(startRange);
        start = parseInt(startRange);
        end = parseInt(endRange);

    }



    var thumbsUrl = decodeURIComponent( GetUrlValue('thumbs') );
    var imagesUrl = decodeURIComponent( GetUrlValue('images') );
    var imagesLowResUrl = decodeURIComponent( GetUrlValue('imagesLow') );
    var show_download_button =decodeURIComponent( GetUrlValue('nodownload') );
   
  //  console.log(imagesUrl);
  //  console.log(typeof imagesLowResUrl);
  //  console.log(imagesLowResUrl.length);
    

    var imageUrls = GetUrlArray(imagesUrl,start, end);
    highResUrlArray = imageUrls;
    var thumbUrls = GetUrlArray(thumbsUrl,start,end);
    var imageLowUrls = imageUrls;
    if(imagesLowResUrl != undefined && imagesLowResUrl != null && imagesLowResUrl.length > 10) 
    {
        imageLowUrls = GetUrlArray(imagesLowResUrl,start,end);
    }
    
    htmlString = ""
    for (i = 0; i < imageUrls.length; i++) {
         htmlString  += `<a href=" ${imageLowUrls[i]}"><img src="${thumbUrls[i]}" data-link="${imageUrls[i]}"></a>\n`// data-big="${imageUrls[i]}"></a>\n`

    }

    var b =document.getElementsByClassName('galleria')[0];
    b.innerHTML = htmlString;

    //Galleria.loadTheme('azur/galleria.azur.min.js');
    Galleria.configure({
        imageCrop: false,
        popupLinks: true
    });
    Galleria.run('.galleria');
    
    Galleria.ready(function() {

        var gallery = Galleria.get(0);
        document.onkeyup = KeyCheck;       
        function KeyCheck(e) {
            var KeyID = (window.event) ? event.keyCode : e.keyCode;
            switch(KeyID) {
                case 37: //press left arrow 
                    gallery.prev();
                    break;
                case 39: //press right arrow
                    gallery.next();
                    break;
            }
        }           
    });

    console.log(show_download_button);
    if( show_download_button == undefined || show_download_button.length > 2)
    {
        document.getElementById("downloadButton").addEventListener("click", getZipFile, false);
    }else{
                
            var element = document.getElementById("downloadButton");
            element.parentNode.removeChild(element);


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
    createGallery();
});  



