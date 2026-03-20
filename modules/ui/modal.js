function createModal({ fields, submitBtn, onSubmit }) {
    const dialog = document.createElement("dialog");
    dialog.classList.add("modal");

    const form = document.createElement("form");
    form.method = "dialog";

    let row = null;

    fields.forEach((field, index) => {
        let input;

        const label = document.createElement("label");
        label.classList.add("form-group");
        label.textContent = field.label;

        if (field.type === "textarea") {
            input = document.createElement("textarea");
        }
        else if (field.type === "select") {
            input = document.createElement("select");
            const options = field.options;
            options.forEach(level => {
                const option = document.createElement("option");
                option.value = level.value;
                option.textContent = level.label;
                input.appendChild(option);
            });
        }
        else {
            input = document.createElement("input");
            input.type = field.type || "text";
        }

        input.name = field.name;
        input.placeholder = field.placeholder || "";

        if (field.value) input.value = field.value;


        label.appendChild(input);
        if (index >= fields.length - 2) {
            if(!row) {
                row = document.createElement("div");
                row.classList.add("form-row");
                form.appendChild(row);
            }
            row.appendChild(label);
        }
        else {
            form.appendChild(label);
        }
    })
    
    const actions = document.createElement("div");
    actions.classList.add("actions-button")

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel"
    cancelBtn.type = "button";
    cancelBtn.addEventListener("click", () => dialog.close());

    const addBtn = document.createElement("button");
    addBtn.textContent = submitBtn.name;
    addBtn.type = submitBtn.type;

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
        fields: [
            {
                name: "title",
                type: "text",
                placeholder: "ex: Work, Personal",
                label: "Project Name"
            }
        ],
        submitBtn: {
            name: "Add Project",
            type: "submit"
        },
        onSubmit: (data) => {
            createProjects(data.title);
            renderProjects();
        }
    });

    modal.showModal();
}

export function openTaskModal(addTodoToActiveProject, renderTodos) {
    const modal = createModal({
        fields: [
            { name: "title", placeholder: "Morning Exercise", label: "Task" },
            { name: "description", type: "textarea", placeholder: "Wake up at 6am and do 10 pushups", label: "Description" },
            { name: "dueDate", type: "date", label: "Due Date" },
            {
                name: "priority",
                type: "select",
                placeholder: "Priority",
                label: "Priority",
                options: [
                    { value: "low", label: "Low" },
                    { value: "medium", label: "Medium" },
                    { value: "high", label: "High" }
                ]
            }
        ],
        submitBtn: {
            name: "Add Task",
            type: "submit"
        },
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
            { name: "title", label: "Task", value: data.title, placeholder: "Morning Exercise" },
            { name: "description", type: "textarea", label: "Description", value: data.description, placeholder: "Wake up at 6am and do 10 pushups" },
            { name: "dueDate", type: "date", value: data.dueDate, label: "Due Date" },
            {
                name: "priority",
                type: "select",
                placeholder: "Priority",
                value: data.priority,
                label: "Priority",
                options: [
                    { value: "low", label: "Low" },
                    { value: "medium", label: "Medium" },
                    { value: "high", label: "High" }
                ]
            }
        ],
        submitBtn: {
            name: "Save",
            type: "submit"
        },
        onSubmit: (updatedData) => {
            todoItem.updateData(updatedData)
            renderTodos();
        }
    });

    modal.showModal();
}

