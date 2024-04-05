// TASK MANAGER

// taskManager object

// tasks: an array that holds all tasks.Each task is an object containing at least a description(string) and a completed(boolean) status.

// The array can be empty at the start.addTask: a function that adds a new task to the tasks array.Each task should have a unique identifier(e.g., a numeric ID) for easy management.


//steps
// 1) render containers, buttons, give styles to them so they looks little nicer +
//2) make function addTask, include incorrect values +
	// -check missing Id(if the user just delete the task) +
	//- make sorting list of complete and not complete lists 
// 3) functionality with list
		// add interaction with buttons in new class
		// -add buttons under the list 
		// - button mark as done (green color)
		//- button delete task (red color)
		//- in complete list instead 'mark as done' make 'mark as undone' (yellow color)
// 4)  to make other class with user, safe his information when reload page

// import interactionClass
import { TaskInteractions } from './taskInteractions.js'

class TaskManager{
	constructor(cssObj){
		this.cssObj = {
			greenColor: 'green-color',
			redColor: 'red-color',
			addTaskBtn: 'add-task-btn',
			styleText: 'style-text', 
			statusWidth: '120px',
			flexAuto: '1 0 auto',
			...(cssObj && {})
		}
	}
	getRow(text, id, status){
		const container = document.createElement('div')
		const textBlock = document.createElement('div')
		const idBlock = document.createElement('div')
		const statusBlock = document.createElement('div')
		const spanId = document.createElement('span')
		const statusSpan = document.createElement('span')

		const paragraphText = document.createElement('p')
		const paragraphId = document.createElement('p')
		const paragraphStatus = document.createElement('p')

		// will check if it's complete or not
		if (status) {
			statusSpan.className = this.cssObj.greenColor
			statusSpan.innerText = 'completed'
		} else {
			statusSpan.className = this.cssObj.redColor
			statusSpan.innerText = 'not completed'
		}

		paragraphText.innerHTML = text
		paragraphText.className = this.cssObj.styleText
		
		paragraphId.innerHTML = id
		spanId.innerText = 'id: '
		spanId.className = this.cssObj.styleText
		statusBlock.style.width = this.cssObj.statusWidth
		textBlock.style.flex = this.cssObj.flexAuto
		
		textBlock.append(paragraphText)
		paragraphId.prepend(spanId)
		idBlock.append(paragraphId)
		paragraphStatus.append(statusSpan)
		statusBlock.append(paragraphStatus)

		container.append(textBlock)
		container.append(idBlock)
		container.append(statusBlock)
		container.setAttribute('id', id)
		return container
	}
	renderAllList(){
		this.allTasksContainer.innerHTML = ''
		this.completeTasksContainer.innerHTML = ''
		
		tasks.forEach(task => {
			const status = task.complete ?? false
			
			const div = this.getRow(task.text, task.id, status)
			div.className = 'item'
			
			//sorting them done tasks down, not done, up
			if (status) {
				this.allTasksContainer.append(div)
				this.completeTasksContainer.append(div.cloneNode(true))
			} else {
				this.allTasksContainer.prepend(div)
			}
		})
		const taskInteraction = new TaskInteractions( this.allTasksContainer, this.completeTasksContainer)
	}
	checkMissingIds(){
		const idArray = tasks.map(task => parseInt(task.id))
		let missingId
		for (let i = 1; i <= idArray.length; i++){
			if(!idArray.includes(i)){
				missingId = i
				break
			}
		}
		if (missingId === undefined) 
			missingId = idArray.length + 1

		return missingId
	}
	addTask(){
		let userInput
		const inputNumOnly = /^\d+$/
		
		Swal.fire({
			title: 'Describe your new task',
			input: 'text',
			inputPlaceholder: 'Describe here',
			showCancelButton: 'true',
			confirmButtonText: 'Submit',
			cancelButtonText: 'Cancel',
			inputValidator: (value) =>{
				if(!value){
					return 'Please, write some text here'
				} else if (inputNumOnly.test(value)){
					return 'Please, write correct value. Do not use only numbers'
				} 
			}

		}).then((result) =>{

			if(result.isConfirmed){
				userInput = result.value
				this.addToArray(userInput)
				this.renderAllList()
			}
		})
	}
	addToArray(userInput){
		tasks.push({
			id: this.checkMissingIds(),
			text: userInput,
			complete: false,
		})
	}
	releaseListWithAnimation(list){
		for (let i = 0; i < list.length; i++) {
			list[i].style.position = 'relative'
			list[i].style.transition = '0.3s ease-out 0s'
			list[i].style.right = '50px'
		}
		setTimeout(() => {
			for (let i = 0; i < list.length; i++) {
				setTimeout(() => {
					list[i].style.opacity = 1
					list[i].style.right = '0px'
					list[i].style.pointerEvents = 'auto'
				}, i * 50)
			}
		}, 200)
	}
	showAllTasks(){
		this.completeTasksContainer.style.opacity = '0'
		this.completeTasksContainer.style.position = 'absolute'
		this.completeTasksContainer.style.pointerEvents = 'none'
		this.allTasksContainer.style.opacity = '1'
		setTimeout(() =>{
			this.allTasksContainer.style.position = 'relative'
		},300)
		this.releaseListWithAnimation(this.allListChildren)
		
		for (let i = 0; i < this.completeListChildren.length; i++) {
			this.completeListChildren[i].style.opacity = 0
		}
	}
	showCompleteTasks(){
		this.allTasksContainer.style.opacity = '0'
		this.allTasksContainer.style.position = 'absolute'
		this.allTasksContainer.style.pointerEvents = 'none'
		this.completeTasksContainer.style.position = 'relative'
		this.completeTasksContainer.style.opacity = '1'
		this.releaseListWithAnimation(this.completeListChildren)

		for (let i = 0; i < this.allListChildren.length; i++) {
			this.allListChildren[i].style.opacity = 0
		}
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
		this.completeTasksContainer.style.position = 'fixed'
		this.completeTasksContainer.style.pointerEvents = 'none'
		this.completeTasksContainer.style.transition = 'all 0.3s ease-out 0s'
		this.completeTasksContainer.style.width = '100%'
		this.allTasksContainer.style.width = '100%'
		this.allTasksContainer.style.transition = 'all 0.3s ease-out 0s'
		this.containerId.style.width = "100%"	
		this.containerId.style.minHeight = "90vh"	
		this.allListChildren = this.allTasksContainer.children
		this.completeListChildren = this.completeTasksContainer.children
	}
}

const tasks = [
	{
		text: 'Make a coffee',
		id: '2',
		complete: true, 
	},
	{
		text: 'Make a coffee',
		id: '4',
		complete: true, 
	},
]

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
