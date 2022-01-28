var displayEl = document.querySelector(".container");
var timeBlockEl = document.getElementsByClassName("time-block");
var today = moment().format("dddd, MMMM Do");
$("#currentDay").text(today);
var rightNow = moment().format("H");

var timeBlocks = [];
var savedTimeBlocks = JSON.parse(localStorage.getItem("time-blocks"));
var newTimeBlocks = [];

var createTimeBlock = function() {

    for (var i = 0; i < 9; i++) {
        var timeBlockEl = document.createElement("div");
        timeBlockEl.setAttribute("id", i);
        timeBlockEl.className = "col-12 d-flex justify-content-end align-items-stretch row";

        var hourEl = document.createElement("h3");
        hourEl.className = "col-2 time-block-hour";
        hourEl.textContent = moment().hour(9 + i).format("hA");
        timeBlockEl.appendChild(hourEl);

        var inputEl = document.createElement("textarea");
        inputEl.setAttribute("id", "input-" + (9 + i));
        inputEl.className = "col-9 description";
        timeBlockEl.appendChild(inputEl);

        var saveEl = document.createElement("div");
        saveEl.className = "col-1 d-flex justify-content-center align-items-center saveBtn";
        var saveBtn = document.createElement("span");
        saveBtn.setAttribute("data-div-id", i);
        saveBtn.setAttribute("id", (9 + i));
        saveBtn.className = "oi oi-folder save-click";
        saveEl.appendChild(saveBtn);
        timeBlockEl.appendChild(saveEl);

        newTimeBlocks.push(timeBlockEl);
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

var loadTimeBlocks = function() {

    if (!timeBlocks) {
        console.log("nothing saved in local storage");
        return;
    }
    else {
        for (var i = 0; i < timeBlocks.length; i++) {
            var thisBlock = document.getElementById(i);
            var thisText = thisBlock.querySelector("textarea");

            if (!timeBlocks[i].text) {
                console.log("no text here");
                thisText.value = " ";
            } else {
                thisText.value = timeBlocks[i].text;
            }
        }
    }
};

var saveBtnHandler = function(event) {
    var target = event.target;

    if (target.matches(".save-click")) {

        var saveId = target.getAttribute("id");
        var textValue = displayEl.querySelector("#input-" + saveId).value;
        var i = target.getAttribute("data-div-id");
        parseInt(i);

        var timeBlockObj = {
            id: i,
            text: textValue
        };

        saveTimeBlock(timeBlockObj);        
    }
};

var saveTimeBlock = function(obj) {
    var thisTimeBlock = {
        id: obj.id,
        text: obj.text
    };

    if (!obj.text) {
        console.log("no text to save OR deleted text");
        thisTimeBlock.text = " ";
    } else {
        console.log(obj.text);
    }

    for (var i = 0; i < newTimeBlocks.length; i++) {
        var blockEl = document.getElementById(i);
        var currentText = blockEl.querySelector("textarea").value;

        if (i == obj.id) {
            timeBlocks.push(thisTimeBlock);
        }
        else if (i != obj.id && !currentText) {
            var tempBlock = {
                id: i.toString(),
                text: " "
            };
            timeBlocks.push(tempBlock);
        }
        else if (i != obj.id && currentText) {
            var currentBlock = {
                id: i.toString(),
                text: currentText
            };
            timeBlocks.push(currentBlock);
        }
        else {
            console.log("something went wrong. current text: " + currentText);
        }
    }

    localStorage.setItem("time-blocks", JSON.stringify(timeBlocks));
    timeBlocks = [];
}

createTimeBlock();
timeBlockStatus(rightNow);
loadTimeBlocks();
displayEl.addEventListener("click", saveBtnHandler);