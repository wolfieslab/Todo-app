import { createProjects, getProjects, addTodoToActiveProject, getActiveProject, getActiveProjectIndex, toggleTodoComplete } from "../appController";
import { format, isToday, isTomorrow, isPast, formatDistanceToNow } from "date-fns";
import { handleDeleteProject, handleDeleteTodo, handleProjectSwitching, handleTaskToggle } from "./handlers";
import { editTaskModal, openProjectModal, openTaskModal } from "./modal";
import { saveAppState } from "../storage";

export function renderProjects() {
    const sidebar = document.getElementById("projects");
    sidebar.innerHTML = "";

    createSidebarElements(sidebar);

    const projectList = document.createElement("div");
    projectList.classList.add("projects-list");

    getProjects().forEach((project, index) => {
        const div = document.createElement("div");
        div.classList.add("project")
        div.dataset.projectIndex = index;

        const activeIndex = getActiveProjectIndex();
        if (index === activeIndex) {
            div.classList.add("active");
        }

        const span = document.createElement("span");
        span.innerHTML = `
            <svg class="project-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pound</title><path d="M5.41,21L6.12,17H2.12L2.47,15H6.47L7.53,9H3.53L3.88,7H7.88L8.59,3H10.59L9.88,7H15.88L16.59,3H18.59L17.88,7H21.88L21.53,9H17.53L16.47,15H20.47L20.12,17H16.12L15.41,21H13.41L14.12,17H8.12L7.41,21H5.41M9.53,9L8.47,15H14.47L15.53,9H9.53Z" /></svg>
            <span>${project.name}<span>
        `;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-project-btn")
        deleteBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
        `;

        div.append(span, deleteBtn);
        div.addEventListener("click", () => { handleProjectSwitching(index); });
        deleteBtn.addEventListener("click", () => { handleDeleteProject(index); });

        projectList.appendChild(div);
    });

    sidebar.appendChild(projectList);

}

export function renderTodos() {
    const list = document.getElementById("todos");
    list.innerHTML = "";

    const project = getActiveProject();
    const todos = project.getTodos();

    const header = document.createElement("div");
    header.classList.add("main-header");

    const title = document.createElement("h2");
    title.classList.add("title");
    title.textContent = project.name;

    const addBtn = document.createElement("button");
    addBtn.classList.add("header-add-btn");
    addBtn.textContent = "+ Add Task";

    addBtn.addEventListener("click", () => openTaskModal(addTodoToActiveProject, renderTodos));

    header.append(title, addBtn);
    list.appendChild(header);

    todos.forEach((todo, index) => {
        const item = createTodoElement(todo, index);
        list.appendChild(item);
    });
}

function createSidebarElements(sidebarElement) {
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
    addProjectBtn.addEventListener("click", () => { openProjectModal(createProjects, renderProjects) });
    addTaskBtn.addEventListener("click", () => { openTaskModal(addTodoToActiveProject, renderTodos) });

    return sidebarElement.append(logo, addTaskBtn, heading);
}

function createTodoElement(todo, index) {
    const data = todo.getData();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.dataset.todoIndex = index;

    const todoCheckbox = document.createElement("label");
    todoCheckbox.classList.add("todo-checkbox");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.getData().completed;

    checkbox.addEventListener("change", () => { handleTaskToggle(index) });

    const checkmarkIcon = document.createElement("span");
    checkmarkIcon.classList.add("checkmark");
    checkmarkIcon.innerHTML = `
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
    `;

    todoCheckbox.append(checkbox, checkmarkIcon);

    const content = document.createElement("div");
    content.classList.add("todo-content");

    const todoRow = document.createElement("div");
    todoRow.classList.add("todo-header");

    const title = document.createElement("div");
    title.classList.add("todo-title");
    title.textContent = data.title;

    const desc = document.createElement("p");
    desc.classList.add("todo-desc");
    desc.textContent = data.description;

    let formattedDate;
    let relativeTime = "";
    let dateStatus = "";

    if (data.dueDate) {
        const date = new Date(data.dueDate);
        if (isPast(date) && !isToday(date)) {
            formattedDate = "Overdue";
            dateStatus = "overdue";
        }
        else if (isToday(date)) {
            formattedDate = "Today";
            dateStatus = "today";
        }
        else if (isTomorrow(date)) {
            formattedDate = "Tomorrow";
            dateStatus = "tomorrow";
        }
        else {
            formattedDate = format(date, "dd MMM");
            dateStatus = "normal";
        }
        relativeTime = formatDistanceToNow(date, {addSuffix: true});
    }
    else {
        formattedDate = "No due date";
    }

    const meta = document.createElement("p");
    meta.classList.add("todo-meta");
    meta.innerHTML = `
        <span class="date ${dateStatus}">Date: ${formattedDate} (${relativeTime})</span>
        <span class="priority ${data.priority}">Priority: ${data.priority}</span>
    `;

    const actions = document.createElement("div");
    actions.classList.add("todo-actions-buttons");

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo-btn");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => { editTaskModal(todo, renderTodos) });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-todo-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => { handleDeleteTodo(index) });

    actions.append(editBtn, deleteBtn)
    todoRow.append(title, actions);
    content.append(todoRow, desc, meta)
    todoDiv.append(todoCheckbox, content);
    return todoDiv;
}

