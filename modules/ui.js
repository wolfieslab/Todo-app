import { getProjects } from "./appController";
import todo from "./todo";

export function renderProjects() {
    const sidebar = document.getElementById("projects");
    sidebar.innerHTML = "";

    getProjects().forEach((project, index) => {
        const btn = document.createElement("button");
        btn.textContent = project.name;
        btn.dataset.index = index;

        sidebar.appendChild(btn);
    });

    const addProjectBtn = document.createElement("button");
    addProjectBtn.textContent = "+ Add Project";
    addProjectBtn.classList.add("add-project-btn");

    sidebar.appendChild(addProjectBtn);
}

export function renderTodos(project) {
    const list = document.getElementById("todos");
    list.innerHTML = "";

    const heading = document.createElement("h2");
    heading.classList.add("heading");
    heading.textContent = project.name;

    list.appendChild(heading);

    project.getTodos().forEach((todo, index) => {
        const item = document.createElement("div");
        item.classList.add("todo");

        item.innerHTML =
        `
            <h3>${todo.getData().title}</h3>
            <p>${todo.getData().description}</p>
            <p><span>${todo.getData().dueDate}</span></p>
        `;
        list.appendChild(item);
    });
}