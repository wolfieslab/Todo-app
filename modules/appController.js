import Project from "../modules/project";

const projects = [];

const createProjects = (name) => {
    const project = Project(name);
    projects.push(project);
};

const deleteProject = (index) => {
    projects.splice(index, 1);
};

const getProjects = () => projects;

export { createProjects, getProjects, deleteProject };