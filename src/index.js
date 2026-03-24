import { createProjects, getActiveProject, getActiveProjectIndex, getProjects, setProjectsState } from "./modules/appController";
import { renderProjects, renderTodos } from "./modules/ui/render";
import Todo from "./modules/todo";
import "./styles.css";
import { loadAppState, saveAppState } from "./modules/storage";


function seedDefaultProjects() {
    createProjects("Home");
    createProjects("Personal");
    createProjects("Work");

    const projects = getProjects();

    projects[0].addTodo(Todo("bike riding", "go on a ride on highway", "2026-03-15", "high"));
    projects[0].addTodo(Todo("Buy Groceries", "Food items, vegetables and snacks", "2026-03-15", "high"));
    projects[1].addTodo(Todo("Buy Groceries", "Food items, vegetables and snacks", "2026-03-15", "high"));
    projects[1].addTodo(Todo("bike riding", "go on a ride on highway", "2026-03-15", "high"));
    projects[2].addTodo(Todo("Buy Groceries", "Food items, vegetables and snacks", "2026-03-15", "high"));
    projects[2].addTodo(Todo("bike riding", "go on a ride on highway", "2026-03-15", "high"));
}

const savedState = loadAppState();

if(savedState) {
    setProjectsState(savedState.projects, savedState.activeProjectIndex);
}
else {
    seedDefaultProjects();
    saveAppState(getProjects(), getActiveProjectIndex());
}

renderProjects();
if (getActiveProject()) {
    renderTodos();
}