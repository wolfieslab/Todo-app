import { getActiveProject, deleteProject, setActiveProject, getProjects, getActiveProjectIndex, toggleTodoComplete } from "../appController";
import { saveAppState } from "../storage";
import { renderProjects, renderTodos } from "./render";

const todosEl = document.getElementById("todos");

export function handleDeleteTodo(index) {
    const project = getActiveProject();
    project.removeTodo(index);
    saveAppState(getProjects(), getActiveProjectIndex());
    renderTodos();
}

export function handleDeleteProject(index) {
    deleteProject(index);
    saveAppState(getProjects(), getActiveProjectIndex());
    renderProjects();
    
    if(getActiveProject()) {
        renderTodos();
        return;
    }

    todosEl.innerHTML = "";
}

export function handleProjectSwitching(index) {
    setActiveProject(index);
    saveAppState(getProjects(), getActiveProjectIndex());
    renderProjects();
    renderTodos();
}

export function handleTaskToggle(index) {
    toggleTodoComplete(getActiveProjectIndex(), index);
    saveAppState(getProjects(), getActiveProjectIndex());
    renderTodos();
}