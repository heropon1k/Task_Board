// Retrieve tasks and nextId from localStorage
//let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const title = $('#task-title');
const date = $('#datepicker');
const description = $('#task-description');


// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(tasks) {

    console.log(tasks);

    const card = $('<div>').addClass('card zindex task-card draggable my-4').attr('data-task-id', tasks.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(tasks.name);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescript = $('<p>').addClass('card-text').text(tasks.description);
    const cardDue = $('<p>').addClass('card-text').text(tasks.date);
    const cardDelete = $('<button>').addClass('btn btn-danger delet').text('Delete').attr('data-task-id', tasks.id)
    cardDelete.on('click', handleDeleteTask);

    cardBody.append(cardDescript, cardDue, cardDelete);
    card.append(cardHeader, cardBody);
    return card;

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(tasks);

    const todo = $('#todo-cards');
    todo.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();

    //sort cards into their spots
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].status == 'to-do') {
            todo.append(createTaskCard(tasks[i]));
            console.log("appended todo");
        }
        else if (tasks[i].status == 'in-progress') {
            inProgressList.append(createTaskCard(tasks[i]));
            console.log("appended in progress");
        }
        else {
            doneList.append(createTaskCard(tasks[i]));
            console.log("appended done");
        };
    }

    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
        helper: function (e) {
            // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable');
            // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    let tasks = [];
    const taskList = JSON.parse(localStorage.getItem("tasks"));
    console.log(taskList);
    if (taskList !== null) {
        tasks = taskList;
    }

    let newtask = {
        id: crypto.randomUUID(),
        name: title.val().trim(),
        date: date.val().trim(),
        description: description.val().trim(),
        status: 'to-do',
    };

    tasks.push(newtask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    title.val('');
    date.val('');
    description.val('');
    console.log(tasks);
    renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = $(this).attr('data-task-id');
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(tasks);

    for (i = 0; i < tasks.length; i++) {
        //console.log(tasks[i].id)
        //console.log(taskId)
        if (tasks[i].id === taskId) {
            tasks.splice(i, 1);
        }
    }
    console.log(tasks);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const taskId = ui.draggable[0].dataset.taskId;
    const newStatus = event.target.id;

    //console.log(taskId);
    //console.log(tasks[0].id);
    //console.log(tasks[0].status);
    //console.log(newStatus);

    for (i = 0; i < tasks.length; i++) {
        //console.log("runs")
        if (tasks[i].id == taskId) {
            //console.log("if passes")
            tasks[i].status = newStatus;
            console.log(tasks[i].id)
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTaskList();

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $('#submit').on("click", function () {
        handleAddTask();
        //createTaskCard();
    });
    renderTaskList();
    $('#data-task-id').on("click", function () {
        handleDeleteTask();
        //createTaskCard();
    });

});

$('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
});

$('#datepicker').datepicker({
    changeMonth: true,
    changeYear: true,
})