function activate(status) {
    if (status === 'sender') {
        document.getElementById("VideoSender").style.display = "block";
        document.getElementById("activeSender").style.display = "none";
        document.getElementById("activeReceiver").style.display = "none";
    } else {
        document.getElementById("videoReceiver").style.display = "block";
        document.getElementById("activeSender").style.display = "none";
        document.getElementById("activeReceiver").style.display = "none";
    }
}



function setChannel() {
    console.log("setChannel is working fine");
    channel.open();
}

var channel = new DataChannel();

channel.onopen = function (userid) {
    console.log("channel opened successfully.")
    // channel.send("Every thing is ready for sending data, are you get this message?");
};

var latest_message ;
channel.onmessage = function (message, userid) {
    //console.log("Sender: " + message);
    console.log(" A message received from sender.")
    console.log(message);
    latest_message = message;
};

channel.onleave = function (userid) {
    console.log(" Sender have leave the channel!")
};

// search for existing data channels
channel.connect();