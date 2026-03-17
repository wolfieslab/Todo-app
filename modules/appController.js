import createProject from "./project";
import Todo from "./todo";

let projects = [];
let activeProjectIndex = 0;

const setActiveProject = (index) => {
    activeProjectIndex = index;
};

const getActiveProject = () => {
    return projects[activeProjectIndex];
};

const createProjects = (name) => {
    const project = createProject(name);
    projects.push(project);
};

const deleteProject = (index) => {
    projects.splice(index, 1);
};

const getProjects = () => projects;

const addTodoToActiveProject = (data) => {
    const project = getActiveProject();
    
    const newTodo = Todo(
        data.title,
        data.description,
        data.dueDate,
        data.priority
    );

    project.addTodo(newTodo);
};

export { createProjects, getProjects, deleteProject, setActiveProject, getActiveProject, addTodoToActiveProject };