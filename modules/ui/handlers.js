import { getActiveProject, deleteProject, setActiveProject, getProjects, getActiveProjectIndex } from "../appController";
import { saveAppState } from "../storage";
import { renderProjects, renderTodos } from "./render";

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

    document.getElementById("todos").innerHTML = "";
}

export function handleProjectSwitching(index) {
    setActiveProject(index);
    saveAppState(getProjects(), getActiveProjectIndex());
    renderProjects();
    renderTodos();
}