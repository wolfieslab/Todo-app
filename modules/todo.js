export default function todo(title, description, dueDate, priority) {
    let completed = false;

    const toggleComplete = () => {
        completed = !completed;
    };

    const updateData = (newData) => {
        title = newData.title;
        description = newData.description;
        dueDate = newData.dueDate;
        priority = newData.priority;
    };

    const getData = () => {
        return {
            title, description, dueDate, priority, completed
        };
    };

    return { toggleComplete, getData, updateData };
}