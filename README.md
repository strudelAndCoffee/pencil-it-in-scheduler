# Pencil-It-In Scheduler

A simple browser-based day planner where you can add notes for each hour of the work day. Notes can be saved and edited. The date displayed adjusts to the current dat.

This application was created in 1 week as a weekly challenge project for the University of Texas Code Boot Camp. Starter HTML and CSS code was provided by the University of Texas, except where otherwise stated. All JavaScript was developed by Stephen Trudell per the assignment requirements.

## UT Code Boot Camp - Week 5 Challenge Description:

Create a simple calendar application that allows the user to save events for each hour of the day. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.

The starter code uses the [Moment.js](https://momentjs.com/) library to work with date and time, but you're free to use a different JavaScript solution to handle this functionality because Moment.js is considered a "legacy" product. Learn more about these other solutions in the [Moment.js project status page.](https://momentjs.com/docs/#/-project-status/).

## User Story

```
AS AN employee with a busy schedule
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively
```

## Acceptance Criteria

```
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
    THEN the current day is displayed at the top of the calendar
WHEN I scroll down
    THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
    THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
    THEN I can enter an event
WHEN I click the save button for that timeblock
    THEN the text for that event is saved in local storage
WHEN I refresh the page
    THEN the saved events persist
```

The following animation demonstrates the application functionality:

![Work Day Scheduler app with color-coded time slots shows a new event being typed in the 5PM slot.](./Assets/05-third-party-apis-homework-demo.gif)