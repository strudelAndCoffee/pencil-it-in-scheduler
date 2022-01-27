var displayEl = document.querySelector(".container");
var today = moment().format("dddd, MMMM Do");
$("#currentDay").text(today);

var createTimeBlock = function() {
    for (var i = 9; i <= 17; i++) {
        var timeBlock = document.createElement("div");
        timeBlock.className = "col-12 d-flex justify-content-end align-items-stretch";

        var hourEl = document.createElement("h3");
        hourEl.className = "col-2 hour";
        hourEl.textContent = moment().hour(i).format("hA");
        timeBlock.appendChild(hourEl);

        var inputEl = document.createElement("textarea");
        var inputId = "input-" + i;
        inputEl.setAttribute("id", inputId);
        inputEl.className = "col-9 row";
        timeBlock.appendChild(inputEl);

        var saveEl = document.createElement("div");
        var saveId = "save-" + i;
        saveEl.className = "col-1 saveBtn";
        saveEl.setAttribute("id", saveId);
        timeBlock.appendChild(saveEl);

        displayEl.appendChild(timeBlock);
    }
};

createTimeBlock();