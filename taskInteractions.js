export class TaskInteractions{
	constructor(allListContainer, completeListContainer){
		this.allTasksContainer = allListContainer
		this.completeTasksContainer = completeListContainer
		this.start()
	}
	allListClick(id){
		console.log(`this is done id ${id}`)
		const task = document.getElementById(id)
		task.style.transform = 'translate(100px, 0)'
this.start	}
	addAllListListener(){
		this.allTasksContainer.querySelectorAll('.item').forEach(task => {
			const id = task.getAttribute('id')
			task.style.transition = '0.3s ease-out 0s'

			task.onclick = this.allListClick.bind(this, id)
		})
	}
	start(){
		this.addAllListListener()
		// this.addCompleteListListener()
	}
}


