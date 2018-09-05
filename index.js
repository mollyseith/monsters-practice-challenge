//Renders 50 monsters from JSON server on load of page -> GET fetch
//Renders form on load of page
//When Submit clicked, renders new monster -> POST fetch
let pageNumber=1

document.addEventListener("DOMContentLoaded", function(){
  fetchMonster(),
  document.querySelector('#forward').addEventListener('click', handleForward),
  document.querySelector('#back').addEventListener('click', handleBack),
  document.querySelector('#monster-form').addEventListener('submit', handleSubmit)
})

function fetchMonster(){
  fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNumber}`)
  .then(response => response.json())
  .then(jsonData => {jsonData.forEach(monster => render(monster))
  })
}

function render(monster){
  let monsterDiv = document.createElement('div')
  let monsterN = document.createElement('h2')
  let monsterA = document.createElement('h4')
  let monsterD = document.createElement('p')
  monsterDiv.appendChild(monsterN)
  monsterDiv.appendChild(monsterA)
  monsterDiv.appendChild(monsterD)
  monsterN.innerHTML = monster.name
  monsterA.innerHTML = 'Age: ' + monster.age
  monsterD.innerHTML = 'Bio: ' + monster.description
  document.getElementById('monster-container').appendChild(monsterDiv)
}

function handleForward() {
  pageNumber++
  document.querySelector('#monster-container').innerHTML = ""
  fetchMonster()}

function handleBack() {
  pageNumber--
  document.querySelector('#monster-container').innerHTML = ""
  fetchMonster()}

function handleSubmit(){
  event.preventDefault()
  postFetch()
  event.currentTarget.reset()}

function postFetch(){
  let monsterName = document.querySelector('#name').value
  let monsterAge = document.querySelector('#age').value
  let monsterDescription = document.querySelector('#description').value
  let data = {name: monsterName, age: monsterAge, description: monsterDescription}
  fetch('http://localhost:3000/monsters', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"}})
  .then(response => response.json())
  .then(jsonData => {render(jsonData)
  })
}
