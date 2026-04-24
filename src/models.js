
class ToDo {
    constructor(title, description, dueDate, priority, completed, id) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
        this.id = id;
    }
    
    update(fields){
       Object.keys(fields).forEach(key => {
           this[key] = fields[key];
       });
    }
    
}

class Project {
    constructor(name, id, todos = []) {
        this.name = name;
        this.id = id;
        this.todos = todos;
    }

    addToDo(todo) {
        this.todos.push(todo);
    }

    removeToDo(todo) {
        this.todos = this.todos.filter((t) => t.id !== todo.id);
    }

    getTodoById(id) {
    const matchedTodo = this.todos.find(todo => todo.id === id);
    return matchedTodo; 
    }
}
export { ToDo, Project };