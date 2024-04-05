// -add class which moves item and makes buttons under 
// -made 

export class TaskInteractions{
	constructor(allListContainer, completeListContainer, cssObj){
		this.allTasksContainer = allListContainer
		this.completeTasksContainer = completeListContainer
		this.cssObj = {
			item: '.item',
			active: 'active',
			...(cssObj && {})
		}
		this.start()
	}
	allListClick(id, list){
		const task = document.getElementById(id)
		const	activeTask = task.classList.contains(this.cssObj.active)

		list.forEach(item => {
			item.classList.remove(this.cssObj.active)
		})
		if (!activeTask) {
			task.classList.add(this.cssObj.active)
		}
	}
	addAllListListener(){

		const allTaskList = this.allTasksContainer.querySelectorAll(this.cssObj.item)
		
		allTaskList.forEach(task => {
			const id = task.getAttribute('id')
			task.style.transition = '0.3s ease-out 0s'
			task.onclick = this.allListClick.bind(this, id, allTaskList)
		})
	}
	start(){
		this.addAllListListener()
		// this.addCompleteListListener()
	}
}


