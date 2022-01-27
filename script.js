var displayEl = document.querySelector(".container");
var timeBlockEl = document.getElementsByClassName("time-block");

var timeBlocksArr = [];

var today = moment().format("dddd, MMMM Do");
$("#currentDay").text(today);
var rightNow = moment().format("H");

var createTimeBlock = function() {
    for (var i = 9; i <= 17; i++) {
        var timeBlock = document.createElement("div");
        timeBlock.className = "col-12 d-flex justify-content-end align-items-stretch row";

        var hourEl = document.createElement("h3");
        hourEl.className = "col-2 hour";
        hourEl.textContent = moment().hour(i).format("hA");
        timeBlock.appendChild(hourEl);

        var inputEl = document.createElement("textarea");
        var inputId = "input-" + i;
        inputEl.setAttribute("id", inputId);
        inputEl.className = "col-9 description";
        timeBlock.appendChild(inputEl);

        var saveEl = document.createElement("div");
        saveEl.className = "col-1 d-flex justify-content-center align-items-center saveBtn";
        var saveBtn = document.createElement("span");
        saveBtn.setAttribute("id", i);
        saveBtn.className = "oi oi-folder save-click";
        saveEl.appendChild(saveBtn);
        timeBlock.appendChild(saveEl);

        timeBlocksArr.push(timeBlock);
        displayEl.appendChild(timeBlock);
    }
};

var timeBlockStatus = function(hour) {

    for (var i = 0; i < timeBlocksArr.length; i++) {
        var thisBlock = timeBlocksArr[i].querySelector(".description");
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
};

var saveInput = function(event) {
    var target = event.target;

    if (target.matches(".save-click")) {

        var blockId = target.getAttribute("id");
        var timeBlock = document.querySelector("#input-" + blockId);

        if (!timeBlock.value) {
            console.log("nothing written");
            return;
        } else {
            var timeBlockObj = [blockId, timeBlock.value]
        }

        JSON.stringify(timeBlockObj);
        localStorage.setItem("time-blocks", timeBlockObj);
    }
};

var loadTimeBlocks = function() {
    var savedBlock = localStorage.getItem("time-blocks");
    console.log(savedBlock);
};

document.addEventListener("click", saveInput);

createTimeBlock();
timeBlockStatus(rightNow);
loadTimeBlocks();