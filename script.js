// TASK MANAGER

// taskManager object

// tasks: an array that holds all tasks.Each task is an object containing at least a description(string) and a completed(boolean) status.

// The array can be empty at the start.addTask: a function that adds a new task to the tasks array.Each task should have a unique identifier(e.g., a numeric ID) for easy management.


//steps
// 1) render containers, buttons, give styles to them so they looks little nicer
//2) make function addTask, include incorrect values
	// -check missing Id(if the user just delete the task)

const tasks = [
		{
			id: 1,
			text: 'Make a coffee',
			complete: true,
		},
]

class TaskManager{
	constructor(cssObj){
		this.cssObj = {
			greenColor: 'green-color',
			redColor: 'red-color',
			addTaskBtn: 'add-task-btn',
			...(cssObj && {})
		}
	}
	renderAllList(){
		this.allTasksContainer.innerHTML = ''
		const div = document.createElement('div')
		const p = document.createElement('p')
		const span = document.createElement('span')
		div.className = 'item'
		
		tasks.forEach(task => {
			//will check if it's complete or not
			const status = task.complete ?? false
			if(status) {
				span.className = this.cssObj.greenColor
				span.innerText = 'completed'
			} else {
				span.className = this.cssObj.redColor
				span.innerText = ''
			}
			p.innerHTML(`${element.task.text}, 'id: ${element.id}', status:`)

		})

	}
	checkMissingIds(){
		const maxId = Math.max(...tasks.map(task => task.id))
		const minId = Math.min(...tasks.map(task => task.id))
		
		//will make an array from ids
		const allId = Array.from({length: maxId - minId + 1}, (_, index) => index + minId)

		//search for missing id (1,3,4,5 === 2 is missing)
		let missingId = allId.find(id => !tasks.some(task => task.id === id))
		if (missingId === undefined)
			missingId = maxId + 1
		return missingId
	}
	addTask(){
		const userInput = prompt('Describe your new task')
		const inputNumOnly = /^(?=.*\d)$/

		if (userInput === '') {
			alert('Please, write some text here')
			this.addTask()
		} else if(inputNumOnly.test(userInput)){
			alert('Please, write correct value. Do not use only numbers')
			this.addTask()
		} else if (userInput === null){
			//don't want to do anything so I just left it empty. Nothing should be happen
		} else {
			this.addToArray(userInput)
			this.renderAllList()
		}
	}
	addToArray(userInput){
		tasks.push({
			id: this.checkMissingIds(),
			text: userInput,
			complete: false,
		})
		console.log(tasks);
	}
	showAllTasks(){
		this.completeTasksContainer.style.opacity = '0'
		this.completeTasksContainer.style.pointerEvents = 'none'
		this.allTasksContainer.style.opacity = '1'
		this.allTasksContainer.style.pointerEvents = 'auto'
	}
	showCompleteTasks(){
		this.completeTasksContainer.style.opacity = '1'
		this.completeTasksContainer.style.pointerEvents = 'auto'
		this.allTasksContainer.style.opacity = '0'
		this.allTasksContainer.style.pointerEvents = 'none'
	}
	renderButton(name){
		const btn = document.createElement('button')
		btn.innerHTML = name
		btn.style.borderRadius = '5px'
		return btn
	}
	render(containerId){
		this.containerId = document.getElementById(containerId)
		this.allTasksContainer = document.createElement('div')
		this.completeTasksContainer = document.createElement('div')
	
		//adding header and there i want to have buttons (add Task, show All list and show complete list)
		const header = document.createElement('div')
		header.style.display = 'flex'
		header.style.gap = '15px'
		header.style.justifyContent = 'center'
	
		//creating buttons and add to header
		this.addTaskButton = this.renderButton('Add New Task')
		this.addTaskButton.className = this.cssObj.addTaskBtn
		this.addTaskButton.onclick = this.addTask.bind(this)
		
		this.listAllTaskButton = this.renderButton('Show All Tasks')
		this.listAllTaskButton.onclick = this.showAllTasks.bind(this)
		
		this.completeListButton = this.renderButton('Show Complete tasks')
		this.completeListButton.onclick = this.showCompleteTasks.bind(this)
		header.append(this.addTaskButton)
		header.append(this.listAllTaskButton)
		header.append(this.completeListButton)

		this.containerId.append(header)
		this.containerId.append(this.allTasksContainer)
		this.containerId.append(this.completeTasksContainer)
		
		//Little styles for containers
		this.completeTasksContainer.style.opacity = '0'
		this.completeTasksContainer.style.pointerEvents = 'none'
		this.completeTasksContainer.style.transition = 'all 0.8s ease-out 0s'
		this.allTasksContainer.style.transition = 'all 0.8s ease-out 0s'
		this.containerId.style.width = "100%"		
		
	}
}

window.onload = function(){
	const taskManager = new TaskManager()
	taskManager.render('container')
}


// // function for asking the user to fill in their name
// function askUserName() {
//   // add logic here to as the user to enter their name
//   alert(
//     "This is the alert() function which dispays some text for the user.\n" +
//       "Unlike the prompt(), the alert() does not take any input.\nUse it only to display messages for the user."
//   );
//   menu();
// }

// // menu function
// function menu() {
//   const choice = parseInt(
//     prompt(
//       "Hello, this is a the prompt function that displays an input and some text.\n" +
//         "We use parseInt() to make sure that we can take an int as a input from the user.\n" +
//         "By default the prompt() function takes all input as strings."
//     )
//   );
//   // add some more3 logic here
//   // choose between if/else or switch
// }

// // starts with the function asUserName() which triggers the menu() function
// askUserName();
