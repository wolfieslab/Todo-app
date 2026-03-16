import { getProjects } from "./appController";
import todo from "./todo";

export function renderProjects() {
    const sidebar = document.getElementById("projects");
    sidebar.innerHTML = "";

    const logo = document.createElement("div");
    logo.classList.add("logo");
    logo.textContent = "Todo";

    const addTaskBtn = document.createElement("button")
    addTaskBtn.classList.add("add-task-btn");
    addTaskBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus-circle</title><path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
        <span>Add Task</span>`;

    const heading = document.createElement("div");
    heading.classList.add("heading")

    const headingText = document.createElement("div");
    headingText.classList.add("heading-text");
    headingText.textContent = "My Projects";

    const addProjectBtn = document.createElement("button");
    addProjectBtn.classList.add("add-project-btn");
    addProjectBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>`;
    heading.append(headingText, addProjectBtn);

    sidebar.append(logo, addTaskBtn, heading);

    getProjects().forEach((project, index) => {
        const btn = document.createElement("button");
        btn.textContent = project.name;
        btn.dataset.index = index;

        sidebar.appendChild(btn);
    });
}

export function renderTodos(project) {
    const list = document.getElementById("todos");
    list.innerHTML = "";

    const heading = document.createElement("h2");
    heading.classList.add("title");
    heading.textContent = project.name;

    list.appendChild(heading);

    project.getTodos().forEach(todo => {
        const item = createTodoElement(todo);
        list.appendChild(item);
    });
}

function createTodoElement(todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const todoCheckbox = document.createElement("label");
    todoCheckbox.classList.add("todo-checkbox");

    todoCheckbox.innerHTML = `
            <input type="checkbox">
            <span class="checkmark">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
            </span>
        `;

    const todoDetails = document.createElement("div");
    todoDetails.classList.add("todo-details");

    todoDetails.innerHTML = `
        <h4>${todo.getData().title}</h4>
        <p>${todo.getData().description}</p>
        <p>
            <span>${todo.getData().dueDate}</span>
            <span>Priority: ${todo.getData().priority}</span>
        </p>
        <button class="delete-todo-btn">Delete</button>
    `;

    todoDiv.append(todoCheckbox, todoDetails);
    return todoDiv;
}

