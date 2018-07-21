function setChannel() {
    document.getElementById("channelConfirm").disabled = true;
    console.log("setChannel is working fine");
    channel.open();

}

var channel = new DataChannel();

channel.onopen = function (userid) {
    console.log("channel opened successfully.")
};

channel.onmessage = function (message) {

    console.log("Sender: " + message);
    console.log(" A message received from sender.")
};

channel.onleave = function (userid) {

    console.log(" Sender have leave the channel!")
};

// search for existing data channels
channel.connect();