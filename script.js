var displayEl = document.querySelector(".container");
var timeBlockEl = document.getElementsByClassName("time-block");

var newTimeBlocks = [];
// var savedTimeBlocks = ["", "", "", "", "", "", "", "", ""];
var currentTimeBlocks = [];
var savedTimeBlocks = JSON.parse(localStorage.getItem("time-blocks"));

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
        saveBtn.setAttribute("data-div-id", i);
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
        var i = target.getAttribute("data-div-id");
        parseInt(i);
        var textValue = displayEl.querySelector("#input-" + saveId).value;
        var timeBlockObj = {
            id: i,
            text: textValue
        };
        currentTimeBlocks[i] = timeBlockObj;
        localStorage.setItem("time-blocks", JSON.stringify(currentTimeBlocks));

        // if (!currentTimeBlocks) {
        //     console.log("nothing saved in local storage");
        //     return;
        // } else {
        //     currentTimeBlocks[i] = textValue;
        // };

        

        // for (var i = 0; i < newTimeBlocks.length; i++) {
        //     var timeBlockEl = document.getElementById(i);
        //     var thisSaveId = timeBlockEl.querySelector(".save-click").getAttribute("id");
        //     var thisText = timeBlockEl.querySelector("textarea").value;
        //     if (thisSaveId === saveId) {
        //         savedTimeBlocks[i] = timeBlockValue;
        //     } else {
        //         savedTimeBlocks[i] = thisText;
        //     }      
        // } 
    }
};

var loadTimeBlocks = function() {
    
    if (!savedTimeBlocks) {
        console.log("nothing saved in local storage");
        for (var i = 0; i < newTimeBlocks.length; i++) {
            var tempObj = {
                id: i,
                text: ""
            };
            currentTimeBlocks.push(tempObj);
        }
        return;
    }
    else {
        for (var i = 0; i < savedTimeBlocks.length; i++) {
            var thisTimeBlock = document.getElementById(i);
            var thisText = thisTimeBlock.querySelector("textarea");
            thisText.value = savedTimeBlocks[i].text;
        }
    }
};

createTimeBlock();
timeBlockStatus(rightNow);
loadTimeBlocks();

displayEl.addEventListener("click", saveTimeBlock);