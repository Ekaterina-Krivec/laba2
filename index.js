let tasksList = document.querySelector('#tasks');
let tasksInput = document.querySelector('#tasksInput');
const buttonAdd = document.querySelector('#tasksAdd');
const buttonEllipsis = document.querySelector('#buttonEllipsis');
const tasksCount = document.querySelector('#tasksCount');
const tasksTitle = document.querySelector('#tasksTitle');
const tasksDate = document.querySelector('#tasksDate');
const tasksFilters = document.querySelector('#tasksFilters');
const filterButtons = document.querySelectorAll('.filter__button');
const footer = document.querySelector('#tasksNew');
let templateTask = document.querySelector('#tasksTemplate').content;

// querySelector - назначаем переменным штуки с html по его ид 
// .content - возвращает <template>содержимое шаблона элемента 

// - - - - - DATA - - - - -

let lastId = 0;
let filter = 'all';
const tasks = [
    {
        text: 'Build a modern To do app',
        isComplited: false,
        isRemoved: false,
        id: lastId++,
    },
    {
        text: 'Workout for 30 minutes at the gym',
        isComplited: false,
        isRemoved: false,
        id: lastId++,
    },
    {
        text: 'Buy groceries (milk, vegetables, fruits, fish)',
        isComplited: false,
        isRemoved: false,
        id: lastId++,
    },
    {
        text: 'Clean the house and backyard',
        isComplited: false,
        isRemoved: false,
        id: lastId++,
    },
    {
        text: 'Take the car to the autoshop for an oil change',
        isComplited: false,
        isRemoved: false,
        id: lastId++,
    },
]
const title = { // каким образом тут идет присвоение ?????????777
    'all': 'To do list',
    'inProgress': 'In progress list',
    'completed': 'Completed list',
    'removed': 'Removed list',
}






// - - - - - CODE - - - - -

updatePageTasks();
setDate();

// - - - - - LISTENERS - - - - -

buttonEllipsis.addEventListener('click', function () { // обрабатываем клики на те самые три точки

    tasksFilters.classList.toggle('hidden'); //.toggle - позволяет отобразить или скрыть выбранные элементы.

    if (tasksFilters.classList.contains('hidden')) { // если стиль хайден присвоен, то филтр олл 
        setFilter('all');
    }
})

buttonAdd.addEventListener('click', function () { // обрабатывем клики на + (добавление тасков)

    tasks.push({ text: tasksInput.value, isComplited: false, isRemoved: false, id: lastId++ }); //добавляет элементы в массив
    tasksInput.value = ''; //очищаем строку ввода
    updatePageTasks(); //метод обновления странички 
})

tasksList.addEventListener('click', function (event) { // ???????????????????????????????

    if (event.target.closest('li')) { //Метод Element.closest() возвращает ближайший родительский элемент (или сам элемент), 
                                     //который соответствует заданному CSS-селектору или null, если таковых элементов вообще нет.
        if (event.target.classList.contains('task__remove')) {

            deleteTask(event.target.closest('li'));
            updatePageTasks();
        }
        else if (event.target.closest('label')) {

            completeTask(event.target.closest('li'));
        }
    }
});

for (let filterButton of filterButtons) {

    filterButton.addEventListener('click', function () {

        filter = filterButton.dataset.filter; //?????????????????????

        updatePageTasks();
    })
}

// - - - - - FUNCTIONS - - - - -

function updatePageTasks() {

    tasksList.innerHTML = '';
    let count = 0;

    if (filter === 'all') {
        for (let task of tasks) {
            if (!task.isRemoved) {
                addTaskToPage(task.text, task.isComplited, task.isRemoved, task.id);
                count++;
            }
        }
    }
    else if (filter === 'inProgress') {

        for (let task of tasks) {
            if (!task.isComplited && !task.isRemoved) {
                addTaskToPage(task.text, task.isComplited, task.isRemoved, task.id);
                count++;
            }
        }
    }
    else if (filter === 'removed') {

        for (let task of tasks) {
            if (task.isRemoved) {
                addTaskToPage(task.text, task.isComplited, task.isRemoved, task.id);
                count++;
            }
        }
    }
    else if (filter === 'completed') {

        for (let task of tasks) {
            if (task.isComplited && !task.isRemoved) {
                addTaskToPage(task.text, task.isComplited, task.isRemoved, task.id);
                count++;
            }
        }
    }

    setCount(count);
    setTitle();
    toggleNew();
}

function addTaskToPage(text, isComplited, isRemoved, id) {

    let newElement = templateTask.cloneNode(true);  //клонирует шаблон (?)
    newElement.querySelector('.task__text').append(text);

    if (isComplited) {
        newElement.querySelector('#taskCheckbox').checked = true;
    }

    newElement.querySelector('li').setAttribute('id', id)

    tasksList.prepend(newElement); //вставляет в начало списка
}

function toggleNew() {

    if (filter === 'all') {
        footer.classList.remove('hidden'); //удаляет указанный элемент
    }
    else {
        footer.classList.add('hidden'); //добавляет
    }
}

function findTask(searchId){ // ищем таск по ид

    for (let task of tasks) {
        if (task.id === Number(searchId)) {
            return task;
        }
    }
}

function completeTask(element) { 

    const completeTaskId = element.id;
    
    const task = findTask(completeTaskId);
    task.isComplited = !task.isComplited;

    updatePageTasks();
}

function deleteTask(element) {

    const removedTaskId = element.id;

    const task = findTask(removedTaskId);
    task.isRemoved = !task.isRemoved;

    updatePageTasks();
}

function setFilter(newFilter){ 

    filter = newFilter;
    updatePageTasks();
}

function setTitle() { 

    const newTitle = title[filter];
    tasksTitle.textContent = newTitle;
}

function setCount(count) {

    tasksCount.textContent = count + ' tasks';
}

function setDate() {

    const date = new Date();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[date.getDay()];

    const mounths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const mounth = mounths[date.getMonth()];

    const day = date.getDay();

    const year = date.getFullYear();

    tasksDate.textContent = dayOfWeek + ', ' + mounth + ' ' + day + ', ' + year;
}
