import { ToDo, Project } from "./models.js";
import { saveProjects, loadProjects, reviveProjects } from "./storage.js";

const loadedData = loadProjects();
const projects = reviveProjects(loadedData);

if (projects.length === 0) {

    const exampleId = crypto.randomUUID();

    const exampleProject = new Project('Inbox', exampleId);

    projects.push(exampleProject)
    saveProjects(projects);

}

export function getProjects() {
    return projects;
}

export function addProject(name) {
    const id = crypto.randomUUID();
    const projectModel = new Project(name, id);
    projects.push(projectModel);
    saveProjects(projects);
    return projectModel;
}

export function addTodo(projectId, title, description, dueDate, priority) {
    const todoId = crypto.randomUUID();

    const todo = new ToDo(title, description, dueDate, priority, false, todoId);
    const project = findProject(projectId);

    if (project) {
        project.addToDo(todo);
        saveProjects(projects);
    }
    return todo;
}

export function removeTodo(projectId, todoId) {
    const project = findProject(projectId);
    project.removeToDo({ id: todoId });
    saveProjects(projects);
}

export function removeProject(idRow) {
    const bookIndex = projects.findIndex(projectItem => projectItem.id === idRow);
    projects.splice(bookIndex, 1);
    saveProjects(projects);
    return bookIndex;
}

export function findProject(getProjectId) {
    const matchedProject = projects.find(project => project.id === getProjectId);
    return matchedProject;
}

export function save() {
    saveProjects(projects);
}