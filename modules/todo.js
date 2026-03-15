export default function todo(title, description, dueDate, priority) {
    let completed = false;

    const toggleComplete = () => {
        completed = !completed;
    };

    const getData = () => {
        return {
            title, description, dueDate, priority, completed
        };
    };

    return { toggleComplete, getData};
}