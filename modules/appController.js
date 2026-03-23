import createProject from "./project";
import Todo from "./todo";

let projects = [];
let activeProjectIndex = 0;

const setProjectsState = (nextProjects = [], nextActiveProjectIndex = 0) => {
    projects = nextProjects;
    activeProjectIndex = nextActiveProjectIndex;
};

const setActiveProject = (index) => {
    activeProjectIndex = index;
};

const getActiveProject = () => {
    if(projects.length === 0) return null;

    if(activeProjectIndex >= projects.length) {
        activeProjectIndex = projects.length - 1;
    }
    return projects[activeProjectIndex];
};

const getActiveProjectIndex = () => activeProjectIndex;

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
    
    if(!project) return;

    const newTodo = Todo(
        data.title,
        data.description,
        data.dueDate,
        data.priority,
    );

    project.addTodo(newTodo);
};

const addTodoToProject = (projectIndex, data) => {
    const project = projects[projectIndex];

    if (!project) return;

    const newTodo = Todo(
        data.title,
        data.description,
        data.dueDate,
        data.priority
    );

    project.addTodo(newTodo);
}

export { 
    createProjects, 
    getProjects, 
    deleteProject, 
    setActiveProject, 
    getActiveProject, 
    addTodoToActiveProject, 
    addTodoToProject, 
    getActiveProjectIndex,
    setProjectsState,
};