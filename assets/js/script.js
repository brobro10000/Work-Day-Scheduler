console.log("testCode")

function currentDate() {
    $("#currentDay").text(moment().format("dddd MMMM  DD, YYYY"))
    setInterval(function(){
    return $("#currentTime").text(moment().format("HH:MM:ss.SS"))
    },10);
}
currentDate()