// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const title = $('#task-title');
const date = $('#datepicker');
const description = $('#task-description');
let stored = [];

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const card = $('<div>').addClass('card zindex task-card draggable my-4').attri('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescript = $('<p>').addClass('card-text').text(task.description);
    const cardDue = $('<p>').addClass('card-text').text(task.date);
    const cardDelete = $('<button>').addClass('btn btn-danger delet').text('Delete').attr('data-task-id', task.id)
    cardDelete.on('click', handleDeletTask);

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    if (stored !== null) {
        stored = taskList;
    }
    const newTask ={
        id: crypto.randomUUID(),
        name: title,
        date: date,
        description: description,
    };

    stored.push(newTask);

    renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $('#submit').on("click", function () {
        handleAddTask();
        createTaskCard();
    });

});

$('#datepicker').datepicker({
    changeMonth: true,
    changeYear: true,
})