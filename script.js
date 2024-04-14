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
import {User} from "./userLogin.js"

class TaskManager{
	constructor(cssObj){
		this.cssObj = {
			item: 'item',
			itemOriginal: 'item-original',
			greenColor: 'green-color',
			redColor: 'red-color',
			addTaskBtn: 'add-task-btn',
			styleText: 'style-text', 
			statusWidth: '120px',
			flexAuto: '1 0 auto',
			itemContainer: 'item-container',
			mainBtn: 'main-button',
			statusSpan: 'status-span',
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
		statusSpan.classList.add(this.cssObj.statusSpan)

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

			//make one more container for item(need for buttons under it)
			const itemContainer = document.createElement('div')
			itemContainer.className = this.cssObj.itemContainer
		
			const div = this.getRow(task.text, task.id, status)
			div.className = this.cssObj.item
			div.classList.add(this.cssObj.itemOriginal)
			
			itemContainer.append(div)
			//sorting them done tasks down, not done, up
			if (status) {
				this.allTasksContainer.append(itemContainer)
				//making copy for completed task, made unic id for them
				const cloneItem = div.cloneNode(true)
				cloneItem.className = this.cssObj.item
				cloneItem.setAttribute('id', task.id + 'Clone')				
				this.completeTasksContainer.append(cloneItem)
			} else {
				this.allTasksContainer.prepend(itemContainer)
			}
		})
		const taskInteraction = new TaskInteractions( this.allTasksContainer, this.completeTasksContainer, tasks)
		this.showAllTasks()
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
				this.user.updateUserArrayToStorage(tasks)
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
	clearAllList(){
		const confirmChoice = Swal.mixin({
			customClass: {
				confirmButton: "btn btn-success",
				cancelButton: "btn btn-danger"
			},
			buttonsStyling: true
		})
		confirmChoice.fire({
			title: "Do you want to delete all list",
			text: "You won't be able to revert this",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Yes, delete all",
			cancelButtonText: "No, cancel!",
			reverseButtons: true
		}).then((result) =>{
			if(result.isConfirmed){
				if(tasks.length >= 1){
					tasks.splice(0, tasks.length)
					this.renderAllList()
					confirmChoice.fire({
						title: "Deleted!",
						text: "Your list has been deleted.",
						icon: "success"
					})
				} else {
					confirmChoice.fire({
						title: "Nothing to delete",
						text: "Any tasks were not found",
						icon: "error"
					})
				}
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				confirmChoice.fire({
					title: "Cancelled",
					text: "Your list is safe :)",
					icon: "error"
				})
			}
		})
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
		this.listAllTaskButton.className = this.cssObj.mainBtn
		this.listAllTaskButton.onclick = this.showAllTasks.bind(this)
		
		this.completeListButton = this.renderButton('Show Complete tasks')
		this.completeListButton.className = this.cssObj.mainBtn
		this.completeListButton.onclick = this.showCompleteTasks.bind(this)

		this.clearListButton = this.renderButton('Clear All List')
		this.clearListButton.className = this.cssObj.mainBtn
		this.clearListButton.onclick = this.clearAllList.bind(this)

		header.append(this.addTaskButton)
		header.append(this.listAllTaskButton)
		header.append(this.completeListButton)
		header.append(this.clearListButton)

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

	  	this.user = new User(containerId)
		this.getUserData()
	}
	getUserData(){
	const userItems = this.user.getUserArrayFromLocalStorage()
		tasks = [...userItems]
		this.renderAllList()
	}
}

let tasks = [
	{
		text: 'Make a coffee',
		id: '2',
		complete: true, 
	},
	{
		text: 'Make a sandwich',
		id: '4',
		complete: true, 
	},
]

window.onload = function(){
	const taskManager = new TaskManager()
	taskManager.render('container')
}

