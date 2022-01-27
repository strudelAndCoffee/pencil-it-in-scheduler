var today = moment().format("dddd, MMMM Do");
$("#currentDay").text(today);

var displayEl = document.querySelector(".container");

var createTimeBlock = function() {
    for (var i = 9; i <= 17; i++) {
        var timeBlock = document.createElement("div");
        timeBlock.className = "time-block";

        var hourEl = document.createElement("h3");
        hourEl.className = "time-block-hour";
        hourEl.textContent = moment().hour(i).format("hA");
        timeBlock.appendChild(hourEl);

        var inputEl = document.createElement("textarea");
        var inputId = "input-" + i;
        inputEl.setAttribute("id", inputId);
        inputEl.className = "time-block-input";
        timeBlock.appendChild(inputEl);

        var saveEl = document.createElement("p");
        var saveId = "save-" + i;
        saveEl.className = "time-block-save";
        saveEl.setAttribute("id", saveId);
        timeBlock.appendChild(saveEl);

        displayEl.appendChild(timeBlock);
    }
};

createTimeBlock();