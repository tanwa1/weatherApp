import { render, createTodoElement, renderTodoForProject, renderProjectsList} from "./ui.js";
import { validateForm } from "./validation.js";
import { getProjects, addProject, removeProject, findProject, addTodo, removeTodo, save} from "./store.js";

render();

const projectDialog = document.getElementById("projectUpForm");
const create = document.getElementById("createProject");
const cancel = document.getElementById("cancelProject");

const todoDialog = document.getElementById("todoUpForm");

const todocreate = document.getElementById("createTodo");
const todocancel = document.getElementById("cancelTodo");


const addButton = document.getElementById("addButton");
const addToDoButton = document.getElementById("addToDoButton");

const projectLists = document.getElementById("addedProjectsContainer");


renderProjectsList(getProjects(), projectLists)

let getProjectId = null;

if (getProjects().length > 0) {
    getProjectId = getProjects()[0].id;
    renderTodoForProject(getProjectId, getProjects());
}

export function getId() {
    create.addEventListener('click', () => {
        let getProjectInput = document.getElementById("projectInput").value;

        if (!getProjectInput) {
            alert("Please name your project");
            return;
        }

        const projectModel = addProject(getProjectInput);
        getProjectId = projectModel.id;
        renderProjectsList(getProjects(), projectLists);
        projectDialog.close();
    });
}


addButton.addEventListener('click', () => {
    projectDialog.showModal();
});

cancel.addEventListener('click', () => {
    projectDialog.close();
});


projectLists.addEventListener('click', (event) => {

    if (event.target.classList.contains('projectButton')) {
        getProjectId = event.target.getAttribute('data-id');
        renderTodoForProject(getProjectId, getProjects());
        
        const getheaderProject = document.getElementById('headerProject');
        getheaderProject.textContent = event.target.textContent;

    }


    if (event.target.classList.contains('deleteImage')) {
        const deleteRow = event.target.closest(".addedProjectContainer");
        const idRow = deleteRow.dataset.id;
        deleteRow.remove();
        removeProject(idRow);
        const getContentsClass = document.querySelector('.mainContent');
        getContentsClass.innerHTML = '';
        renderProjectsList(getProjects(), projectLists);
    }

});


todocreate.addEventListener('click', (event) => {
    event.preventDefault();
    const toDoInput = document.getElementById("todoInput").value;
    const dueDateInput = document.getElementById("dueDate").value;
    const priorityInput = document.getElementById("priority").value;
    const description = document.getElementById("description").innerText;
    const myForm = document.getElementById("myForm");

    if(!validateForm()){
        return;
    }

    if (todocreate.classList.contains("create-mode")) {
        addTodo(getProjectId, toDoInput, description, dueDateInput, priorityInput);
        todocreate.classList.remove("create-mode");
    } 
    else if (todocreate.classList.contains("edit-mode")) {
        const editId = todocreate.dataset.editId;
        const matchedProject = findProject(getProjectId);
        const todo = matchedProject.getTodoById(editId);

        if (todo) {
            todo.update({
                title: toDoInput,
                description: description,
                dueDate: dueDateInput,
                priority: priorityInput
            })
        }
        todocreate.classList.remove("edit-mode");
        delete todocreate.dataset.editId;
    }
    myForm.reset();
    document.getElementById("description").innerText = '';
    save();
    renderTodoForProject(getProjectId, getProjects());
    todoDialog.close();
});


document.querySelector('.mainContent').addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteTodoImg')) {
        const todoDeleteDiv = event.target.closest('.toDoContainer');
        const middleRow = todoDeleteDiv.nextElementSibling;
        console.log(middleRow);
        const buttonId = todoDeleteDiv.dataset.id;

        const matchedProject = findProject(getProjectId);
        console.log(matchedProject)
        if (matchedProject) {
            removeTodo(getProjectId, buttonId)
            if (middleRow && middleRow.classList.contains('middleRow')) {
                middleRow.remove();
            }
            todoDeleteDiv.remove();
        }
    }
});

document.querySelector('.projectsDiv').addEventListener('click', (event) => {
    const projectContainer = event.target.closest('.projectLinks')
    if (!projectContainer) {
        return;
    }

    console.log(projectContainer)
    const getContentsClass = document.querySelector('.mainContent');
    getContentsClass.innerHTML = '';
    const getButtonDataId = projectContainer.getAttribute('data-label');
    const getheaderProject = document.getElementById('headerProject');
    const dateToday = new Date();
    const upcomingLimit = new Date()
    upcomingLimit.setDate(dateToday.getDate() + 20);
    
    getheaderProject.textContent = getButtonDataId;
    
    if (projectContainer) {
        if (getButtonDataId === 'Upcoming') {
            for (const project of getProjects()) {
                for (const todo of project.todos) {
                    if (!todo.dueDate) continue;
                    const todoDueDate = new Date(todo.dueDate);
                    if (todoDueDate >= dateToday && todoDueDate <= upcomingLimit && todo.completed === false) {
                        const { toDoContainer, middleRow } = createTodoElement(todo, getProjects());
                        getContentsClass.appendChild(toDoContainer);
                        getContentsClass.appendChild(middleRow);
                    }
                }
            }
        }

        else if (getButtonDataId === 'Complete') {
            for (const project of getProjects()) {
                for (const todo of project.todos) {
                    if (todo.completed === true) {
                        console.log(todo.completed)
                        const { toDoContainer, middleRow } = createTodoElement(todo, getProjects());
                        getContentsClass.appendChild(toDoContainer);
                        getContentsClass.appendChild(middleRow);
                    }
                }
            }
        }

        else if (getButtonDataId) {
            for (const project of getProjects()) {
                for (const todo of project.todos) {
                    console.log(todo.priority)
                    if (todo.priority === getButtonDataId && todo.completed === false) {
                        console.log(getButtonDataId)
                        const { toDoContainer, middleRow } = createTodoElement(todo, getProjects());
                        getContentsClass.appendChild(toDoContainer);
                        getContentsClass.appendChild(middleRow);
                    }
                }
            }
        }

        return;
    }
    else {

    }

});

document.querySelector('.mainContent').addEventListener('click', (event) => {
    const doNewInput = document.getElementById("todoInput");
    const doNewDueDate = document.getElementById("dueDate");
    const doNewPriority = document.getElementById("priority");
    const doNewDescription = document.getElementById("description");

    if (event.target.classList.contains('editButton')) {
        const middleRow = event.target.closest('.middleRow');

        const getTodoContainer = middleRow.previousElementSibling;

        const getDataID = getTodoContainer.getAttribute('data-id');
        todocreate.dataset.editId = getDataID;

        const matchedProject = findProject(getProjectId);
        const todo = matchedProject.todos.find(todo => todo.id === getDataID);

        doNewInput.value = todo.title;
        doNewDueDate.value = todo.dueDate;
        doNewPriority.value = todo.priority;
        doNewDescription.innerText = todo.description;
        todocreate.classList.remove("create-mode");
        todocreate.classList.add("edit-mode");
        todoDialog.showModal();
    }
});

document.querySelector('.btn1').addEventListener('click', function() {
  this.classList.toggle('open');
  
  const navContainer = document.getElementById('navContainer');
    
    if(this.classList.contains('open')){
        navContainer.classList.add('show');
    }
    else {
        navContainer.classList.remove('show');
    }

});

addToDoButton.addEventListener('click', () => {
    todocreate.classList.remove("edit-mode");
    todocreate.classList.add("create-mode");
    todoDialog.showModal();

});

todocancel.addEventListener('click', () => {
    todoDialog.close();
});
