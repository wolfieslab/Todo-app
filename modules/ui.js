import { createProjects, getProjects } from "./appController";
import project from "./project"
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
        const div = document.createElement("div");
        const span = document.createElement("span");
        span.textContent = project.name;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-project-btn")
        
        div.dataset.index = index;
        div.append(span, deleteBtn);

        sidebar.appendChild(div);
    });


    addProjectBtn.addEventListener("click",() => {
        openProjectModal(createProjects);
    });

    addTaskBtn.addEventListener("click", () => {
        openTaskModal(project.addTodo);
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

function createModal({ title, fields, onSubmit }) {
    const dialog = document.createElement("dialog");
    dialog.classList.add("modal");

    const form = document.createElement("form");
    form.method = "dialog";

    const heading = document.createElement("h2");
    heading.classList.add("dialog-heading");
    heading.textContent = title;

    form.appendChild(heading);

    fields.forEach(field => {
        const input = document.createElement(field.type === "textarea" ? "textarea" : "input");
        input.name = field.name;
        input.placeholder = field.placeholder;

        if(field.type !== "textarea") input.type = field.type;

        form.appendChild(input);
    })

    const actions = document.createElement("div");
    actions.classList.add("actions-button")

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel"
    cancelBtn.type = "button";
    cancelBtn.addEventListener("click", () => dialog.close());

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add"
    addBtn.type = "submit"

    actions.append(cancelBtn, addBtn);
    form.appendChild(actions);

    addBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data =  Object.fromEntries(formData.entries());
        onSubmit(data);

        dialog.close();
        dialog.remove();
    });

    dialog.appendChild(form);
    document.body.appendChild(dialog);

    return dialog;
}

function openProjectModal(createProjects) {
    const modal = createModal({
        title: "Add Project",
        fields: [
            {
                name: "title",
                type: "text",
                placeholder: "Project Name"
            }
        ],
        onSubmit: (data) => {
            createProjects(data.title);
            renderProjects();
        }
    });

    modal.showModal();
}

function openTaskModal(project) {
    const modal = createModal({
        title: "Add Task",
        fields: [
            { name: "title", type: "text", placeholder: "Title" },
            { name: "description", type: "textarea", placeholder: "Description" },
            { name: "dueDate", type: "date"},
            { name: "priority", type: "text", placeholder: "Priority (low/medium/high)"}
        ],
        onSubmit: (data) => {
            console.log("Task: ", data);
            project.getTodos();
        }
    });

    modal.showModal();
}

