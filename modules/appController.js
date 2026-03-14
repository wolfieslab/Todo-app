import Project from "../modules/project";

const projects = [];

const createProjects = (name) => {
    const project = Project(name);
    projects.push(project);
};

const getProjects = () => projects;

export { createProjects, getProjects };