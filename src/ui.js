import { addTask, complete, noteApp, upcoming, lowPrio, medPrio, highPrio } from "./assets/index.js";
import { projectIcon, deleteIcon } from "./assets/index.js";
import { saveProjects } from "./storage.js";
import { format, parseISO } from 'date-fns';

export function render() {
    const appDiv = document.getElementById("wrapper");
    const { navDiv } = renderNav();
    const { mainArea } = renderContent();

    appDiv.appendChild(navDiv);
    appDiv.appendChild(mainArea);
}

function renderNav() {
    const navDiv = document.createElement("div");

    navDiv.setAttribute('id', 'navContainer');

    const headerTextContainer = document.createElement("div");
    headerTextContainer.className = 'headerTextContainer';

    const headerRow = document.createElement("div");
    headerRow.classList.add("headerRow");

    const headerText = document.createElement("h2");
    headerText.textContent = "To Do App";

    const imageContainer = document.createElement("div");
    const noteAppImage = document.createElement('img');
    noteAppImage.src = noteApp;
    noteAppImage.alt = "Note App Image";

    const headerSubtitle = document.createElement("p");
    headerSubtitle.classList.add("headerSubtitle");
    headerSubtitle.textContent = "Stay organized";

    imageContainer.appendChild(noteAppImage);
    headerRow.appendChild(imageContainer);
    headerRow.appendChild(headerText);
    headerTextContainer.appendChild(headerRow);
    headerTextContainer.appendChild(headerSubtitle);


    const projectsContainer = document.createElement("div");
    projectsContainer.className = 'projectsContainer';

    const projectsDiv = document.createElement("div");
    projectsDiv.classList.add("projectsDiv");

    const projectsTitle = document.createElement("div");
    projectsTitle.classList.add("projectTitle");
    projectsTitle.textContent = "PROJECTS";

    projectsDiv.appendChild(projectsTitle);

    const projects = [
        {
            label: "Upcoming",
            icon: upcoming,
        },
        {
            label: "Low",
            icon: lowPrio,
        },
        {
            label: "Medium",
            icon: medPrio,
        },

        {
            label: "High",
            icon: highPrio,
        },
        {
            label: "Complete",
            icon: complete
        }

    ];

    projects.forEach(project => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("projectDivContainer")
        const projectImage = document.createElement('img');
        const projectButton = document.createElement("button");
        projectButton.setAttribute('data-label', project.label);
        projectButton.classList.add("projectLinks");
        projectImage.src = project.icon;
        projectButton.textContent = project.label;
        projectDiv.appendChild(projectImage);
        projectDiv.appendChild(projectButton);
        projectsDiv.appendChild(projectDiv);
    });

    projectsContainer.appendChild(projectsDiv);


    const addedProjectsContainer = document.createElement("div");
    addedProjectsContainer.classList.add("addedProjectsContainer");
    addedProjectsContainer.setAttribute('id', 'addedProjectsContainer');

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");

    const addButton = document.createElement("button");
    addButton.classList.add("addButton");
    addButton.setAttribute('id', 'addButton');
    addButton.textContent = " + Add Project";

    buttonContainer.appendChild(addButton);

    navDiv.appendChild(headerTextContainer);
    navDiv.appendChild(projectsContainer);
    navDiv.appendChild(addedProjectsContainer);
    navDiv.appendChild(buttonContainer);


    return { navDiv, headerTextContainer, projectsContainer, addedProjectsContainer, buttonContainer };

}

function renderContent() {

    const mainArea = document.createElement("div");
    mainArea.className = 'mainArea';
    
    const header = document.createElement("div");
    header.setAttribute('id', 'header');

    const headerTitleContainer = document.createElement("div");

    const headerTitle = document.createElement("h1");
    headerTitle.setAttribute('id', 'headerProject');
    headerTitle.textContent = "Template Projects";

    headerTitleContainer.appendChild(headerTitle);
    header.appendChild(headerTitleContainer);


    const burgerMenuContainer = document.createElement("div");

    const burgerMenu = document.createElement("div");
    burgerMenu.className = 'menu btn1';
    burgerMenu.setAttribute('data-menu', '10');

    const iconLeftDir = document.createElement("div");
    iconLeftDir.className = 'arrow-bar';
    
    burgerMenu.appendChild(iconLeftDir);
    burgerMenuContainer.appendChild(burgerMenu);

    header.appendChild(burgerMenuContainer);

    const mainContent = document.createElement("div");
    mainContent.className = 'mainContent';


    const footer = document.createElement("div");
    footer.setAttribute('id', 'footer');

    const githubAcc = 'https://github.com/tanwa1';

    const githubLink = document.createElement('a');
    githubLink.href = `${githubAcc}`;
    githubLink.textContent = 'Tanwa';

    const createdbyDiv = document.createElement('div');
    createdbyDiv.className = "createdAuthor";
    createdbyDiv.textContent =
        "Created by: ";


    const addToDoButton = document.createElement("button");
    addToDoButton.setAttribute('id', 'addToDoButton');
    addToDoButton.textContent = "Add To Do";
    
    mainArea.appendChild(header);
    mainArea.appendChild(mainContent);
    mainArea.appendChild(footer);

    createdbyDiv.appendChild(githubLink);
    footer.appendChild(addToDoButton);
    footer.appendChild(createdbyDiv);

    return {mainArea, header, mainContent, footer};
}

export function createTodoElement(todo, projects) {

    const toDoContainer = document.createElement("div");
    toDoContainer.className = 'toDoContainer';
    toDoContainer.setAttribute('data-id', todo.id)

    const buttonCollapsible = document.createElement("button");
    buttonCollapsible.className = 'buttonCollapsible';
    buttonCollapsible.textContent = todo.title;

    const middleRow = document.createElement("div");
    middleRow.className = 'middleRow';

    const descriptionPara = document.createElement("p");
    descriptionPara.textContent = 'Description: ' + todo.description;

    let formattedDate = todo.dueDate ? format(parseISO(todo.dueDate), 'MMM d, yyyy') : '';
    const dueDatePara = document.createElement("p");
    dueDatePara.textContent = 'Due Date: ' + formattedDate;

    const priorityPara = document.createElement("p");
    priorityPara.textContent = 'Priority: ' + todo.priority;

    const editButton = document.createElement('button');
    editButton.className = 'editButton';
    editButton.textContent = 'Edit Details';

    middleRow.appendChild(descriptionPara);
    middleRow.appendChild(dueDatePara)
    middleRow.appendChild(priorityPara)
    middleRow.appendChild(editButton);

    const deleteTodo = document.createElement('button');
    deleteTodo.className = 'deleteTodo';
    const deleteTodoImg = document.createElement('img');
    deleteTodoImg.className = "deleteTodoImg";
    deleteTodoImg.src = deleteIcon;
    deleteTodo.appendChild(deleteTodoImg);

    const checkbox = document.createElement("div");
    checkbox.className = 'radioDiv';
    const checkBoxDone = document.createElement("input");
    checkBoxDone.setAttribute('id', 'radioDone');
    checkBoxDone.setAttribute('type', 'checkbox');
    checkBoxDone.onchange = function (e) {
        if (e.target.checked) {

        }
    }

    const label = document.createElement('label');
    label.setAttribute('for', 'radioDone')

    checkbox.appendChild(checkBoxDone);
    checkbox.appendChild(label);

    toDoContainer.appendChild(checkbox);
    toDoContainer.appendChild(buttonCollapsible);
    toDoContainer.appendChild(deleteTodo);

    const getContentsClass = document.querySelector('.mainContent');

    getContentsClass.appendChild(toDoContainer);
    getContentsClass.appendChild(middleRow);


    //CHECKBOXES
    checkBoxDone.onchange = function (e) {
        todo.completed = checkBoxDone.checked;
        if (e.target.checked) {
            middleRow.classList.add("complete");
            toDoContainer.classList.add("completed")
            setTimeout(() => {
                toDoContainer.remove();
                middleRow.remove()
            }, 1000)
        } else {
            middleRow.classList.remove("complete");
            toDoContainer.classList.remove("completed")
        }
        saveProjects(projects);
        console.log(todo);
    }

    buttonCollapsible.addEventListener("click", function () {
        this.classList.toggle("active");
        if (middleRow.style.maxHeight) {
            middleRow.style.maxHeight = null;
        } else {
            middleRow.style.maxHeight = middleRow.scrollHeight + "px";
        }
    });

    middleRow.style.maxHeight = null;


    return { toDoContainer, middleRow };
}

export function renderTodoForProject(projectID, projects) {
    const getContentsClass = document.querySelector('.mainContent');
    getContentsClass.innerHTML = '';

    const selectedProject = projects.find(project => project.id === projectID);

    if (!selectedProject) {
        alert("Please enter a project first!");
        return;
    }

    for (const todo of selectedProject.todos) {
        const { toDoContainer, middleRow } = createTodoElement(todo, projects);
        toDoContainer.classList.add(`priority-${todo.priority.toLowerCase()}`);
        getContentsClass.appendChild(toDoContainer);
        getContentsClass.appendChild(middleRow);
    }
}

export function renderProjectsList(projects, projectLists) {
    projectLists.innerHTML = '';
    for (const project of projects) {
        const projectContainer = document.createElement("div");
        projectContainer.setAttribute('data-id', project.id);
        projectContainer.classList.add("addedProjectContainer", "projectLinks");

        const projectImage = document.createElement('img');
        projectImage.src = project.icon1 || projectIcon;

        const projectButton = document.createElement("button");
        projectButton.setAttribute('data-id', project.id);
        projectButton.className = 'projectButton';
        projectButton.textContent = project.name || project.label;

        const clickDeleteImg = document.createElement('button');
        clickDeleteImg.classList.add('clickDeleteImg');
        const deleteImage = document.createElement('img');
        deleteImage.classList.add("deleteImage");
        deleteImage.src = project.deleteIcon || deleteIcon;
        clickDeleteImg.appendChild(deleteImage);

        projectContainer.appendChild(projectImage);
        projectContainer.appendChild(projectButton);
        projectContainer.appendChild(clickDeleteImg);
        projectLists.appendChild(projectContainer);
    }
}
