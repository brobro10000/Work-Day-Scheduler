console.log("testCode")
const timeStart = 8
const timeEnd = 22
var currentHour = moment().format("HH")
console.log(currentHour)
var meridiem
function currentDate() {
    $("#currentDay").text(moment().format("dddd MMMM  DD, YYYY"))
    setInterval(function () {
        return $("#currentTime").text(moment().format("hh:MM:ss.SS A"))
    }, 10);
}
currentDate()

function divCreator(i) {
    return $("<div>").attr({ "class": "time-block", "id":"div" + i }).appendTo($(".container"))
}
function hourCreator(i, time, meridiem) {
    return $("<h2>").text(time + meridiem).attr("class", "hour").appendTo($("#div" + i))
}
function populateTime(i, time) {
    if (i < 12) {
        meridiem = "AM"
        return time
    }
    if (i > 12) {
        time %= 12
        if (time == 0) {
            time += 1
        }
        return time
    }
    return time
}
function formCreator(i) {
    $("<form>").attr({ "class": "time-block", "id": "form"+i}).appendTo($("#div" + i))
    $("<input>").attr("id","input"+i).appendTo($("#form"+i))
    $("<button>").text("Submit").attr("id","submit"+i).appendTo($("#form"+i))
    if(i < currentHour)
    {
        $("#input"+i).attr("class","past")
    } else if(i == currentHour)
    {
        $("#input"+i).attr("class","present")
    } else if(i > currentHour)
    {
        $("#input"+i).attr("class","future")
    }
}
function scheduleCreator() {
    var time = timeStart
    for (var i = timeStart; i <= timeEnd; i++) {
        console.log(time)
        time = populateTime(i, time, meridiem)
        divCreator(i)
        if (i < 13) {
            meridiem = "AM"
        }
        else if (i > 12) {
            meridiem = "PM"
        }
        hourCreator(i, time, meridiem)
        formCreator(i)
        time++
    }
}

scheduleCreator()