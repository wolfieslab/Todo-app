export default function project(name) {
    let todos = [];

    const addTodo = (todo) => todos.push(todo);
    const removeTodo = (index) => todos.splice(index, 1);
    const getTodos = () => { return todos };

    return { name, getTodos, addTodo, removeTodo };
}