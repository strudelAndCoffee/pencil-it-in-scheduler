var displayEl = document.querySelector(".container");
var timeBlockEl = document.getElementsByClassName("time-block");
var saveBtnEl = document.getElementsByClassName("save-click");

var timeBlocksArr = [];
 

var today = moment().format("dddd, MMMM Do");
$("#currentDay").text(today);
var rightNow = moment().format("H");

var createTimeBlock = function() {
    for (var i = 9; i <= 17; i++) {
        var timeBlock = document.createElement("div");
        timeBlock.className = "col-12 d-flex justify-content-end align-items-stretch time-block";

        var hourEl = document.createElement("h3");
        hourEl.className = "col-2 hour";
        hourEl.textContent = moment().hour(i).format("hA");
        timeBlock.appendChild(hourEl);

        var inputEl = document.createElement("textarea");
        inputEl.setAttribute("id", i);
        inputEl.className = "col-9 row description";
        timeBlock.appendChild(inputEl);

        var saveEl = document.createElement("div");
        var saveId = "save-" + i;
        saveEl.setAttribute("id", saveId);
        saveEl.className = "col-1 d-flex justify-content-center align-items-center saveBtn";
        saveEl.innerHTML = "<span class='oi oi-folder'></span>";
        timeBlock.appendChild(saveEl);

        timeBlocksArr.push(timeBlock);
        displayEl.appendChild(timeBlock);
    }
};

var timeBlockStatus = function(hour) {

    for (var i = 0; i < timeBlocksArr.length; i++) {
        var thisBlock = timeBlocksArr[i].querySelector(".row");
        var thisBlockId = thisBlock.getAttribute("id");
        var thisClass = thisBlock.getAttribute("class");

        if (thisBlockId > hour) {
            thisBlock.className = thisClass + " future";
        }
        else if (thisBlockId == hour) {
            thisBlock.className = thisClass + " present";
        }
        else if (thisBlockId < hour) {
            thisBlock.className = thisClass + " past";
        }
    }
}

createTimeBlock();
timeBlockStatus(rightNow);