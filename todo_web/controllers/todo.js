//model
const TodoTask = require('../models/todoTask');

// time setting
var moment = require('moment-timezone');
moment.tz.setDefault("Asia/seoul");

//main 
exports.get = function(req, res){
  console.log("todo");
  TodoTask.find({}, null, {sort: {date: -1}}, (err, tasks) => {
    res.render("todo", { todoTasks: tasks });
  });
};

//write
exports.write = async function(req, res){
  try{
    const todoTask = new TodoTask({
      content: req.body.content,
      date: moment().format("YYYY-MM-DD HH:mm:ss")
    });
    await todoTask.save();
    console.log("성공");
    console.table([{ id: todoTask._id, content: todoTask.content, date: todoTask.date }]);
    res.redirect("/todo");
  }catch(err){
    console.error("실패");
    res.redirect("/todo");
  }
};

//edit
exports.edit = function(req, res){
  const id = req.params.id;
  TodoTask.find({}, null, {sort: {date: -1}}, (err, tasks) => {
    res.render("todo-edit", { todoTasks: tasks, idTask: id });
  });
};

//update
exports.update = function(req, res){
  const id = req.params.id;
  TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
    if (err) {
      console.log("실패");
      console.error(err);
    }
    console.log("성공");
    console.log("id: " + id + "\nchange content: " + req.body.content);
    res.redirect("/todo");
  });
};

//remove
exports.remove = function(req, res){
  const id = req.params.id;
  TodoTask.findByIdAndRemove(id, err => {
    if (err) {
      console.log("실패");
      console.error(err);
    }
    console.log("성공");
    console.log("id: " + id);
    res.redirect("/todo");
  });
};

exports.timer = function(req, res){
  // Select Every Count Container
const countContainer = document.querySelectorAll(".count-digit");

// Select option buttons
const startAction = document.getElementById("start-timer");
const stopAction = document.getElementById("stop-timer");
const resetAction = document.getElementById("reset-timer");

// Select HTML5 Audio element
const timeoutAudio = document.getElementById("alarm_audio");

// Default inital value of timer
const defaultValue = 30 * 60;

// variable to the time
var countDownTime = defaultValue;

// variable to store time interval
var timerID;

// Variable to track whether timer is running or not
var isStopped = true;

// Function calculate time string
const findTimeString = () => {
  var minutes = String(Math.trunc(countDownTime / 60));
  var seconds = String(countDownTime % 60);
  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }
  if (seconds.length === 1) {
    seconds = "0" + seconds;
  }
  return minutes + seconds;
};

// Function to start Countdown
const startTimer = () => {
  if (isStopped) {
    isStopped = false;
    timerID = setInterval(runCountDown, 500);
  }
};

// Function to stop Countdown
const stopTimer = () => {
  isStopped = true;
  if (timerID) {
    clearInterval(timerID);
  }
};

// Function to reset Countdown
const resetTimer = () => {
  stopTimer();
  countDownTime = defaultValue;
  renderTime();
};

// Initialize alarm sound
timeoutAudio.src = "http://soundbible.com/grab.php?id=1252&type=mp3";
timeoutAudio.load();

// Attach onclick event to buttons
startAction.onclick = startTimer;
resetAction.onclick = resetTimer;
stopAction.onclick = stopTimer;

// Function to display coundown on screen
const renderTime = () => {
  const time = findTimeString();
  countContainer.forEach((count, index) => {
    count.innerHTML = time.charAt(index);
  });
};

// function to execute timer
const runCountDown = () => {
  // decement time
  countDownTime -= 1;
  //Display updated time
  renderTime();

  // timeout on zero
  if (countDownTime === 0) {
    stopTimer();
    // Play alarm on timeout
    timeoutAudio.play();
    countDownTime = defaultValue;
  }
};
}