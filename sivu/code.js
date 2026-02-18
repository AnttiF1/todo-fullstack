function init() {
  let infoText = document.getElementById('infoText')
  infoText.innerHTML = 'Ladataan tehtävälista palvelimelta, odota...'
  loadTodos()
}

async function loadTodos() {
  let response = await fetch('/todos')
  let todos = await response.json()
  console.log(todos)
  showTodos(todos)
}

function createTodoListItem(todo) {
  let li = document.createElement('li')

  let li_attr = document.createAttribute('id')
  li_attr.value = todo._id
  li.setAttributeNode(li_attr)

  let text = document.createTextNode(todo.text)
  li.appendChild(text)

  // Muokkaa-painike
  let edit = document.createElement('span')
  let edit_attr = document.createAttribute('class')
  edit_attr.value = 'edit'
  edit.setAttributeNode(edit_attr)
  let edit_btn = document.createTextNode(' Muokkaa ')
  edit.appendChild(edit_btn)

  edit.onclick = function() { editTodo(todo._id, todo.text) }

  li.appendChild(edit)

  // Delete-painike
  let span = document.createElement('span')
  let span_attr = document.createAttribute('class')
  span_attr.value = 'delete'
  span.setAttributeNode(span_attr)

  let x = document.createTextNode(' x ')
  span.appendChild(x)

  span.onclick = function() { removeTodo(todo._id) }

  li.appendChild(span)

  return li
}

function showTodos(todos) {
  let todosList = document.getElementById('todosList')
  let infoText = document.getElementById('infoText')

  // Tyhjennetään lista ennen uudelleenpiirtoa
  todosList.innerHTML = ''

  if (todos.length === 0) {
    infoText.innerHTML = 'Ei tehtäviä'
  } else {
    todos.forEach(todo => {
      let li = createTodoListItem(todo)
      todosList.appendChild(li)
    })
    infoText.innerHTML = ''
  }
}

async function addTodo() {
  let newTodo = document.getElementById('newTodo')

  // Virheenkäsittely: ei tyhjää tehtävää
  if (newTodo.value.trim() === '') {
    alert("Tehtävä ei voi olla tyhjä!")
    return
  }

  const data = { 'text': newTodo.value }

  const response = await fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  let todo = await response.json()
  let todosList = document.getElementById('todosList')
  let li = createTodoListItem(todo)
  todosList.appendChild(li)

  let infoText = document.getElementById('infoText')
  infoText.innerHTML = ''
  newTodo.value = ''
}

async function removeTodo(id) {
  const response = await fetch('/todos/' + id, {
    method: 'DELETE'
  })

  let responseJson = await response.json()

  let li = document.getElementById(id)
  li.parentNode.removeChild(li)

  let todosList = document.getElementById('todosList')
  if (!todosList.hasChildNodes()) {
    let infoText = document.getElementById('infoText')
    infoText.innerHTML = 'Ei tehtäviä'
  }
}

// Muokkaa-painikkeen funktio
function editTodo(id, text) {
  let newTodo = document.getElementById('newTodo')
  newTodo.value = text
  changeButton(id)
}

// Painikkeen tilan vaihto
function changeButton(id) {
  let button = document.getElementById('submitButton')

  if (button.innerHTML == "Lisää") {
    button.innerHTML = "Tallenna"
    button.classList.remove("addButton")
    button.classList.add("editButton")
    button.setAttribute("onclick", `updateTodo("${id}")`)
  } else {
    button.innerHTML = "Lisää"
    button.classList.remove("editButton")
    button.classList.add("addButton")
    button.setAttribute("onclick", "addTodo()")
  }
}

// Tehtävän päivittäminen
async function updateTodo(id) {
  let newTodo = document.getElementById('newTodo')

  // Virheenkäsittely: ei tyhjää tehtävää
  if (newTodo.value.trim() === '') {
    alert("Tehtävä ei voi olla tyhjä!")
    return
  }

  // Vahvistusdialogi ennen päivitystä
  if (!confirm("Haluatko varmasti päivittää tehtävän?")) {
    return
  }

  const data = { 'text': newTodo.value }

  const response = await fetch('/todos/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  loadTodos()

  let infoText = document.getElementById('infoText')
  infoText.innerHTML = ''
  newTodo.value = ''
  changeButton()
}
