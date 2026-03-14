import "./styles.css";
import createTodo from "../modules/todo";
import Project from "../modules/project";

const homeProject = Project("Home");
const todo1 = createTodo("Buy Groceries", "vegetables, essential food items", "2026-03-15", "High");
const todo2 = createTodo("Complete odin project", "todo app project", "2026-03-15", "High");
homeProject.addTodo(todo1.getData());
homeProject.addTodo(todo2.getData());

console.log(homeProject.name, homeProject.getTodos());