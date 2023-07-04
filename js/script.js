// Elements selection

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

// Function

const saveTodo = (text) => { // Função que cria a tarefa

    const todo = document.createElement("div") // cria a div
    todo.classList.add("todo") // adiciona a classe 'todo' na div

    const todoTitle = document.createElement("h3") // cria um h3
    todoTitle.innerText = text; // adiciona o texto do input no h3
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button") // cria o botão "pronto"
    doneBtn.classList.add("finish-todo") // adiciona a classe "finish-todo" ao botão
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>' // adiciona o icone do botão no HTML
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const removeBtn = document.createElement("button")
    removeBtn.classList.add("edit-todo")
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(removeBtn)

    todoList.appendChild(todo);

    todoInput.value = '';
    todoInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

const updateTodo = (text) => {

    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }

    })

}

// Events

todoForm.addEventListener ("submit", (e) => { //Evento que recebe o input de tarefa

    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {

        saveTodo(inputValue)
    }

});

cancelEditBtn.addEventListener("click", (e) =>{
    
    e.preventDefault();
    toggleForms();

})

editForm.addEventListener("submit", (e) =>{

    e.preventDefault();

    const editInputValie = editInput.value;

    if(editInputValie){
        updateTodo(editInputValie);
    }

    toggleForms();

})

document.addEventListener ("click", (e) =>{

    const targetElement = e.target; // Encontra o botão clicado
    const parentElement = targetElement.closest("div"); // Encontra o elemento "pai" do botão, ou seja, a div mais próxima
    let todoTitle;

    if(parentElement && parentElement.querySelector("h3")) {
        todoTitle = parentElement.querySelector("h3").innerText;
    }

    //console.log(parentElement);

    if(targetElement.classList.contains("finish-todo")) { // Se a classe do botão conter "finish-todo" executa a ação
        parentElement.classList.toggle("done"); // Adiciona a classe done caso não esteja completa, e remove se já estiver
        
    }

    if(targetElement.classList.contains("remove-todo")) {
        parentElement.remove();
    }

    if(targetElement.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
})