function createModal({ title, fields, onSubmit }) {
    const dialog = document.createElement("dialog");
    dialog.classList.add("modal");

    const form = document.createElement("form");
    form.method = "dialog";

    const heading = document.createElement("h2");
    heading.classList.add("dialog-heading");
    heading.textContent = title;

    form.appendChild(heading);

    fields.forEach(field => {
        const input = document.createElement(field.type === "textarea" ? "textarea" : "input");
        input.name = field.name;
        input.placeholder = field.placeholder;

        if (field.type !== "textarea") input.type = field.type;
        if (field.value) input.value = field.value;

        form.appendChild(input);
    })

    const actions = document.createElement("div");
    actions.classList.add("actions-button")

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel"
    cancelBtn.type = "button";
    cancelBtn.addEventListener("click", () => dialog.close());

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add"
    addBtn.type = "submit"

    actions.append(cancelBtn, addBtn);
    form.appendChild(actions);

    addBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        onSubmit(data);

        dialog.close();
        dialog.remove();
    });

    dialog.appendChild(form);
    document.body.appendChild(dialog);

    return dialog;
}

export function openProjectModal(createProjects, renderProjects) {
    const modal = createModal({
        title: "Add Project",
        fields: [
            {
                name: "title",
                type: "text",
                placeholder: "Project Name"
            }
        ],
        onSubmit: (data) => {
            createProjects(data.title);
            renderProjects();
        }
    });

    modal.showModal();
}

export function openTaskModal(addTodoToActiveProject, renderTodos) {
    const modal = createModal({
        title: "Add Task",
        fields: [
            { name: "title", type: "text", placeholder: "Title" },
            { name: "description", type: "textarea", placeholder: "Description" },
            { name: "dueDate", type: "date" },
            { name: "priority", type: "text", placeholder: "Priority (low/medium/high)" }
        ],
        onSubmit: (data) => {
            addTodoToActiveProject(data);
            renderTodos();
        }
    });

    modal.showModal();
}

export function editTaskModal(todoItem, renderTodos) {
    const data = todoItem.getData();

    const modal = createModal({
        title: "Edit task",
        fields: [
            { name: "title", placeholder: "Title", value: data.title },
            { name: "description", placeholder: "Description", value: data.description },
            { name: "dueDate", type: "date", value: data.dueDate },
            { name: "priority", placeholder: "Priority", value: data.priority }
        ],
        onSubmit: (updatedData) => {
            todoItem.updateData(updatedData)
            renderTodos();
        }
    });

    modal.showModal();
}

