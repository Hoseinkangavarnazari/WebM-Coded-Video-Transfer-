
// use requestanimation frame, Shim to insulate apps from spec changes and prefix differences
(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var inputCtx = $('.input-canvas canvas')[0].getContext('2d');
var localVideo = $('.local video')[0];
var localStream;
var width = 320;
var height = 225;
var timesUp = false;
var timesUpBackup = false;


navigator.getUserMedia(
    { video: true, audio: false },
    stream => {
        localStream = stream;
        $('.local video').attr('src', URL.createObjectURL(stream));
        drawToCanvas();
        init();
    },
    error => {
        alert('error while accessing usermedia ' + error.toString());
    }
);


var video = new Whammy.Video(60);
var progress = document.getElementById('progress');



function drawToCanvas() {
    if (timesUpBackup) {
        return;
    }
    // draw video to input canvas
    inputCtx.drawImage(localVideo, 0, 0, width, height);
    video.add(inputCtx);
    // get pixel data from input canvas
    var pixelData = inputCtx.getImageData(0, 0, width, height);
    //  console.log(pixelData);

    savedImage = pixelData;

    if (timesUp) {
        timesUpBackup = true;
        requestAnimationFrame(finalizeVideo);
    }

    //calls function for next frame - input is the name of Function
    requestAnimationFrame(drawToCanvas);
}


function StopReadingFrames() {
    console.log("timesUp works");
    timesUp = true;
}


// function nextFrame(){
//     progress.value++;
//     // var context = clock(last_time += 1000);
//     video.add(context);
//     if(progress.value / progress.max < 1){
//         requestAnimationFrame(nextFrame);
//         document.getElementById('status').innerHTML = "Drawing Frames";
//     }else{
//         document.getElementById('status').innerHTML = "Compiling Video";
//         requestAnimationFrame(finalizeVideo); // well, should probably use settimeout instead
//     }

// }


function finalizeVideo() {
    var start_time = +new Date;
    video.compile(false, function (output) {
        console.log(output);
        var end_time = +new Date;
        var url = webkitURL.createObjectURL(output);

        var reader = new FileReader();
        reader.readAsArrayBuffer(output);

        console.log(reader);


        console.log(url);
        document.getElementById('awesome').src = url; //toString converts it to a URL via Object URLs, falling back to DataURL
        document.getElementById('download').style.display = '';
        document.getElementById('download').href = url;
        document.getElementById('status').innerHTML = "Compiled Video in " + (end_time - start_time) + "ms, file size: " + Math.ceil(output.size / 1024) + "KB";
    });
}






    // //stolen wholesale off mozilla's wiki
    // function clock(time){
    //     var now = new Date();
    //     now.setTime(time);
    //     var ctx = document.getElementById('canvas').getContext('2d');
    //     ctx.save();

    //     return ctx;
    // }
    // // the actual demo code, yaaay
