import { ToDo, Project } from "./models.js";

export function saveProjects(projects){
    localStorage.setItem('projects', JSON.stringify(projects));
}

export function loadProjects(){
    const data = localStorage.getItem('projects');
    return data ? JSON.parse(data) : [];
}

export function reviveProjects(data) {
    return data.map(projectObj => {
        const todos = projectObj.todos.map(todoObj =>
            new ToDo(
                todoObj.title,
                todoObj.description,
                todoObj.dueDate,
                todoObj.priority,
                todoObj.completed,
                todoObj.id
            )
        );
        return new Project(projectObj.name, projectObj.id, todos);
    });
}
