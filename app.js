// Task Class: represent a task
class TASK {
  constructor(title, goal, attentionTo) {
    this.id = Math.floor(Math.random() * 100000);
    this.title = title;
    this.goal = goal;
    this.attentionTo = attentionTo;
  }
}

// UI Class: Handles UI
class UI {
  // display in dom static method
  static displayTasks() {
    function randomID() {
      return Math.floor(Math.random() * 100000);
    }
    const dummyList = [
      {
        id: randomID(),
        title: 'Task 1',
        goal: 'Water the plant',
        attentionTo: 'My son',
      },
      {
        id: randomID(),
        title: 'Task 2',
        goal: 'Take out the Garbage',
        attentionTo: 'Myself',
      },
      {
        id: randomID(),
        title: 'Task 3',
        goal: 'Pick up flowers',
        attentionTo: 'John',
      },
    ];
    const TaskList = dummyList.concat(Store.getTasks());
    console.log(TaskList);
    const tasks = TaskList;
    // add tasks to list
    tasks.forEach((task) => UI.addTask(task));
    console.log('Display Task fired!');
  }
  // add new task
  static addTask(newTask) {
    const list = document.querySelector('#task-list');
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${newTask.id}</td>
    <td>${newTask.title}</td>
    <td>${newTask.goal}</td>
    <td>${newTask.attentionTo}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    // append task list to table role of the table
    list.appendChild(row);
    console.log('Add Task fired!');
  }
  //clear the textfeilds after events
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#goal').value = '';
    document.querySelector('#attentionTo').value = '';
  }
  // delete existing task
  static deleteTask(task) {
    if (task.classList.contains('delete')) {
      //remove the parent element from DOM
      task.parentElement.parentElement.remove();
    }
  }
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#task-form');
    container.insertBefore(div, form);
    // vanish mode
    setTimeout(() => document.querySelector('.alert').remove(), 2000);
  }
}

// Event: Display Task
document.addEventListener('DOMContentLoaded', () => {
  console.log('Content loaded!');
  UI.displayTasks();
});

// Event: Add a Task
document.querySelector('#task-form').addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('Submit event fired!');
  const title = document.querySelector('#title').value;
  const goal = document.querySelector('#goal').value;
  const attentionTo = document.querySelector('#attentionTo').value;
  // Edge case: Validation
  if (!title || !goal || !attentionTo) {
    UI.showAlert('Please fill in all the fields', 'danger');
  }
  // Instantiate task
  else {
    const task = new TASK(title, goal, attentionTo);
    console.log('New Task Created!');
    // Add new task to list
    UI.addTask(task);

    // Add task to Store
    Store.addTask(task);

    // Show Alert
    UI.showAlert('New Task Created!', 'success');
  }

  // Clear fields
  UI.clearFields();
});
// Event: Remove a Task
document.querySelector('#task-list').addEventListener('click', (event) => {
  UI.deleteTask(event.target);
  const parentElement = event.target;
  const pathToAttentionTo = parentElement.previousElementSibling;
  const pathToGoal = pathToAttentionTo.previousElementSibling;
  const pathToTitle = pathToGoal.previousElementSibling;
  const pathToID = pathToTitle.previousElementSibling;
  Store.removeTask(pathToID);
  UI.showAlert(`${task.title} is successfully removed`, 'success');
});
// Store Class: Handles storage
// or use database
class Store {
  // Get tasks
  static getTasks() {
    let tasks;
    if (!localStorage.getItem('tasks')) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
  }
  // Add tasks
  static addTask(task) {
    const tasks = Store.getTasks();
    tasks.push(task);
    //reset local storage
    localStorage.getItem('tasks', JSON.stringify(tasks));
  }
  // Remove tasks
  static removeTask(task_id) {
    const tasks = Store.getTasks();
    tasks.forEach((task, index) => {
      if (task.id === task_id) {
        tasks.splice(index, 1);
      }
    });
    //reset local storage
    localStorage.getItem('tasks', JSON.stringify(tasks));
  }
}
// <td>${newTask.goal}</td>
// <td>${newTask.attentionTo}</td>
// <td><a href = "#" class ="btn btn=danger btn-sm delete">X</a></td>
