import { getActiveProject, deleteProject, setActiveProject } from "../appController";
import { renderProjects, renderTodos } from "./render";

export function handleDeleteTodo(index) {
    const project = getActiveProject();
    project.removeTodo(index);
    renderTodos();
}

export function handleDeleteProject(index) {
    deleteProject(index);
    renderProjects();
    renderTodos();
}

export function handleProjectSwitching(index) {
    setActiveProject(index);
    renderProjects();
    renderTodos();
}