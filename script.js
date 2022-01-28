var displayEl = document.querySelector(".container");
var timeBlockEl = document.getElementsByClassName("time-block");

var newTimeBlocks = [];
var savedTimeBlocks = [];

var today = moment().format("dddd, MMMM Do");
$("#currentDay").text(today);
var rightNow = moment().format("H");

var createTimeBlock = function() {

    for (var i = 0; i < 9; i++) {
        var timeBlock = document.createElement("div");
        timeBlock.setAttribute("id", i);
        timeBlock.className = "col-12 d-flex justify-content-end align-items-stretch row";

        var hourEl = document.createElement("h3");
        hourEl.className = "col-2 time-block-hour";
        hourEl.textContent = moment().hour(9 + i).format("hA");
        timeBlock.appendChild(hourEl);

        var inputEl = document.createElement("textarea");
        inputEl.setAttribute("id", "input-" + (9 + i));
        inputEl.className = "col-9 description";
        timeBlock.appendChild(inputEl);

        var saveEl = document.createElement("div");
        saveEl.className = "col-1 d-flex justify-content-center align-items-center saveBtn";
        var saveBtn = document.createElement("span");
        saveBtn.setAttribute("id", (9 + i));
        saveBtn.className = "oi oi-folder save-click";
        saveEl.appendChild(saveBtn);
        timeBlock.appendChild(saveEl);

        newTimeBlocks.push(timeBlock);
    }
};

var timeBlockStatus = function(rightNow) {

    for (var i = 0; i < newTimeBlocks.length; i++) {

        var thisBlock = newTimeBlocks[i];
        var thisBlockInput = thisBlock.querySelector("textarea");
        var thisBlockId = thisBlock.getAttribute("id");
        thisBlockId = 9 + parseInt(thisBlockId);

        if (thisBlockId < rightNow) {
            thisBlockInput.className = "col-9 description past";
        }
        else if (thisBlockId == rightNow) {
            thisBlockInput.className = "col-9 description present";
        }
        else if (thisBlockId > rightNow) {
            thisBlockInput.className = "col-9 description future"
        }
        displayEl.appendChild(thisBlock);
    }
};

var saveTimeBlock = function(event) {
    var target = event.target;
    if (target.matches(".save-click")) {
        
        var saveId = target.getAttribute("id");
        var timeBlockValue = displayEl.querySelector("#input-" + saveId).value;

        for (var i = 0; i < newTimeBlocks.length; i++) {
            var timeBlockEl = document.getElementById(i);
            var thisSaveId = timeBlockEl.querySelector(".save-click").getAttribute("id");
            var thisText = timeBlockEl.querySelector("textarea").value;
            if (thisSaveId === saveId) {
                savedTimeBlocks[i] = timeBlockValue;
            } else {
                savedTimeBlocks[i] = thisText;
            }      
        }

        localStorage.setItem("time-blocks", JSON.stringify(savedTimeBlocks));
    }
};

var loadTimeBlocks = function() {
    var currentTimeBlocks = JSON.parse(localStorage.getItem("time-blocks"));
    
    for (var i = 0; i < currentTimeBlocks.length; i++) {
        var thisTimeBlock = document.getElementById(i);
        var thisText = thisTimeBlock.querySelector("textarea");
        thisText.value = currentTimeBlocks[i];
    }
};

createTimeBlock();
timeBlockStatus(rightNow);
loadTimeBlocks();

displayEl.addEventListener("click", saveTimeBlock);