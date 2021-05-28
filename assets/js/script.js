console.log("testCode")
const timeStart = 8
const timeEnd = 17
var meridiem
function currentDate() {
    $("#currentDay").text(moment().format("dddd MMMM  DD, YYYY"))
    setInterval(function(){
    return $("#currentTime").text(moment().format("HH:MM:ss.SS"))
    },10);
}
currentDate()

function divCreator(i) {
    return $("<div>").attr({"class":"time-block", "id":i}).appendTo($(".container"))
}
function hourCreator(i,time,meridiem) {
    return $("<h2>").text(time+meridiem).attr("class","hour").appendTo($("#"+i))
}
function populateTime(i,time){

    if(i< 12)
    {   
        meridiem = "AM"
        return time
    }
    if(i > 12)
    {
        time %= 12
        if(time == 0)
        {
            time += 1
        }
        return time
    }
    return time
}
function scheduleCreator() {
    var time = timeStart
    for(var i = timeStart;i<=timeEnd;i++){
        console.log(time)
    time = populateTime(i,time,meridiem)
    divCreator(i)
    if(i < 13){
    meridiem = "AM"
    hourCreator(i,time,meridiem)
    }
    else if(i>12)
    {
        meridiem = "PM"
        hourCreator(i,time,meridiem)
    }
    time++

}
    
}

scheduleCreator()