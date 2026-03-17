import { createProjects, getProjects } from "../modules/appController";
import { renderProjects, renderTodos } from "../modules/ui";
import todo from "../modules/todo";
import "./styles.css";

createProjects("Home");
createProjects("Personal");
createProjects("Work");


const projects = getProjects();
const todo1 = todo("Buy Groceries", "Food items, vegetables and snacks", "2026-03-15", "High");


projects[0].addTodo(todo1);
projects[0].addTodo(todo1);
projects[1].addTodo(todo1);
projects[1].addTodo(todo1);
projects[2].addTodo(todo1);
projects[2].addTodo(todo1);
renderProjects();
renderTodos(projects[0]);