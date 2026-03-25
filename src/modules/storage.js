import createTodo from './todo';
import createProject from './project';

const STORAGE_KEY = 'todo-projects';

function serializeProjects(projects) {
  return projects.map((project) => ({
    name: project.name,
    todos: project.getTodos().map((todo) => todo.getData()),
  }));
}

export function saveAppState(projects, activeProjectIndex) {
  const state = {
    activeProjectIndex,
    projects: serializeProjects(projects),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadAppState() {
  const savedState = localStorage.getItem(STORAGE_KEY);

  if (!savedState) return null;

  try {
    const parsedState = JSON.parse(savedState);
    const savedProjects = (parsedState.projects || []).map((p) => {
      const project = createProject(p.name);

      p.todos.forEach((todoData) => {
        const todo = createTodo(
          todoData.title,
          todoData.description,
          todoData.dueDate,
          todoData.priority,
          todoData.completed,
        );

        project.addTodo(todo);
      });

      return project;
    });

    return {
      projects: savedProjects,
      activeProjectIndex: parsedState.activeProjectIndex || 0,
    };
  } catch (error) {
    console.error('Unable to load saved todo data', error);
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}
