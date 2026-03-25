import { getProjects, getActiveProjectIndex } from '../appController';
import { saveAppState } from '../storage';

function createModal({ title, fields, submitBtn, onSubmit }) {
  const dialog = document.createElement('dialog');
  dialog.classList.add('modal');

  const form = document.createElement('form');
  form.method = 'dialog';

  let row = null;

  if (title !== '') {
    const heading = document.createElement('h2');
    heading.classList.add('modal-title');
    heading.textContent = title;
    form.appendChild(heading);
  }

  fields.forEach((field) => {
    let input;

    const label = document.createElement('label');
    label.classList.add('form-group');
    label.textContent = field.label;

    if (field.type === 'textarea') {
      input = document.createElement('textarea');
    } else if (field.type === 'select') {
      input = document.createElement('select');
      const options = field.options;
      options.forEach((level) => {
        const option = document.createElement('option');
        option.value = level.value;
        option.textContent = level.label;
        input.appendChild(option);
      });
    } else {
      input = document.createElement('input');
      input.type = field.type || 'text';
    }

    input.name = field.name;
    input.placeholder = field.placeholder || '';

    if (field.value) input.value = field.value;

    label.appendChild(input);
    if (field.row) {
      if (!row) {
        row = document.createElement('div');
        row.classList.add('form-row');
        form.appendChild(row);
      }
      row.appendChild(label);
    } else {
      row = null;
      form.appendChild(label);
    }
  });

  const actions = document.createElement('div');
  actions.classList.add('actions-button');

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.type = 'button';
  cancelBtn.addEventListener('click', () => dialog.close());

  const addBtn = document.createElement('button');
  addBtn.textContent = submitBtn.name;
  addBtn.type = submitBtn.type;

  actions.append(cancelBtn, addBtn);
  form.appendChild(actions);

  addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
    saveAppState(getProjects(), getActiveProjectIndex());

    dialog.close();
    dialog.remove();
  });

  dialog.appendChild(form);
  document.body.appendChild(dialog);

  return dialog;
}

export function openProjectModal(createProjects, renderProjects) {
  const modal = createModal({
    title: '',
    fields: [
      {
        name: 'title',
        type: 'text',
        placeholder: 'ex: Work, Personal',
        label: 'Project Name',
      },
    ],
    submitBtn: {
      name: 'Add Project',
      type: 'submit',
    },
    onSubmit: (data) => {
      createProjects(data.title);
      renderProjects();
    },
  });

  modal.showModal();
}

export function openTaskModal(addTodoToProject, renderTodos) {
  const projects = getProjects();

  const projectsOptions = projects.map((project, index) => ({
    value: index,
    label: project.name,
  }));

  const modal = createModal({
    title: 'Add Task',
    fields: [
      { name: 'title', placeholder: 'Morning Exercise', label: 'Task' },
      {
        name: 'description',
        type: 'textarea',
        placeholder: 'Wake up at 6am and do 10 pushups',
        label: 'Description',
      },
      { name: 'dueDate', type: 'date', label: 'Due Date', row: true },
      {
        name: 'priority',
        type: 'select',
        row: true,
        label: 'Priority',
        options: [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
        ],
      },
      {
        name: 'projectIndex',
        type: 'select',
        label: 'Project',
        options: projectsOptions,
        value: getActiveProjectIndex(),
      },
    ],
    submitBtn: {
      name: 'Add Task',
      type: 'submit',
    },
    onSubmit: (data) => {
      const projectIndex = Number(data.projectIndex);
      delete data.projectIndex;
      addTodoToProject(projectIndex, data);
      renderTodos();
    },
  });

  modal.showModal();
}

export function editTaskModal(todoItem, projectIndex, todoIndex, renderTodos) {
  const data = todoItem.getData();

  const projects = getProjects();

  const projectsOptions = projects.map((project, index) => ({
    value: index,
    label: project.name,
  }));

  const modal = createModal({
    title: 'Edit task',
    fields: [
      {
        name: 'title',
        label: 'Task',
        value: data.title,
        placeholder: 'Morning Exercise',
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Description',
        value: data.description,
        placeholder: 'Wake up at 6am and do 10 pushups',
      },
      {
        name: 'dueDate',
        type: 'date',
        value: data.dueDate,
        label: 'Due Date',
        row: true,
      },
      {
        name: 'priority',
        type: 'select',
        row: true,
        value: data.priority,
        label: 'Priority',
        options: [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
        ],
      },
      {
        name: 'projectIndex',
        type: 'select',
        label: 'Project',
        options: projectsOptions,
        value: projectIndex,
      },
    ],
    submitBtn: {
      name: 'Save',
      type: 'submit',
    },
    onSubmit: (updatedData) => {
      const newProjectIndex = Number(updatedData.projectIndex);

      delete updatedData.projectIndex;

      todoItem.updateData(updatedData);

      if (newProjectIndex !== projectIndex) {
        const projects = getProjects();

        projects[projectIndex].removeTodo(todoIndex);
        projects[newProjectIndex].addTodo(todoItem);
      }

      renderTodos();
    },
  });

  modal.showModal();
}
