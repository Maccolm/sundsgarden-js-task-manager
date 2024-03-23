// TASK MANAGER

// taskManager object

// tasks: an array that holds all tasks.Each task is an object containing at least a description(string) and a completed(boolean) status.

// The array can be empty at the start.addTask: a function that adds a new task to the tasks array.Each task should have a unique identifier(e.g., a numeric ID) for easy management.

const tasks = [
	{
		task:{
			id: 1,
			text: 'Make a coffee',
			complete: true,
		}
	},
]

class TaskManager{
	constructor(){

	}
	addTask(){

	}
	showAllTasks(){
		this.completeListContainer.style.opacity = 0
		this.
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
		this.completeListContainer = document.createElement('div')
	
		//adding header and there i want to have buttons (add Task, show All list and show complete list)
		const header = document.createElement('div')
		header.style.display = 'flex'
		header.style.gap = '15px'
	
		//creating buttons and add to header
		this.addTaskButton = this.renderButton('Add New Task')
		this.addTaskButton.className = 'add-task-btn'
		this.addTaskButton.onclick = this.addTask()
		
		this.listAllTaskButton = this.renderButton('Show All Tasks')
		this.listAllTask.onclick.showAllTasks()
		
		this.allTasksContainer.className = 'all-tasks'

		this.containerId.append(header)
		this.containerId.append(this.allTasksContainer)
		this.containerId.append(this.completeListContainer)

		this.completeListContainer.style.opacity = '0'
	}
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
