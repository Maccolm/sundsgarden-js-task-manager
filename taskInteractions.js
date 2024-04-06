// -add class which moves item and makes buttons under 
	//-create buttons, add listener to them
	//- 
// -made 

export class TaskInteractions{
	constructor(allListContainer, completeListContainer, cssObj){
		this.allTasksContainer = allListContainer
		this.completeTasksContainer = completeListContainer
		this.cssObj = {
			item: '.item',
			active: 'active',
			bgColorActive: 'bg-color-active',
			btnUndone: 'btn-undone',
			btnDelete: 'btn-delete',
			btnComplete: 'btn-complete',
			btnStyle: 'btn-style',
			btnContainer: 'btn-container',
			...(cssObj && {})
		}
		this.start()
	}
	allListClick(id, list, buttonsContainer){
		const task = document.getElementById(id)
		const	activeTask = task.classList.contains(this.cssObj.active)

		list.forEach(item => {
			item.classList.remove(this.cssObj.active)
			if (item.classList.contains(this.cssObj.bgColorActive)) {
				setTimeout(()=>{
					item.classList.remove(this.cssObj.bgColorActive)
					item.nextElementSibling.style.opacity = 0
				},250)
			}
		})
		if (!activeTask) {
			task.classList.add(this.cssObj.active)
			task.classList.add(this.cssObj.bgColorActive)
			buttonsContainer.style.opacity = 1
		}
	}
	createButton(btnType){
		const btn = document.createElement('button')
		btn.classList.add(this.cssObj.btnStyle)
		switch (btnType) {
			case 'btn-complete':
				btn.classList.add(this.cssObj.btnComplete)
				btn.innerText = 'Mark done'
				break;
			case 'btn-delete':
				btn.classList.add(this.cssObj.btnDelete)
				btn.innerText = 'Delete'
			break;
			case 'btn-undone':
				btn.classList.add(this.cssObj.btnUndone)
				btn.innerText = 'Mark undone'
			break;
		}
		return btn
	}
	addAllListListener(){
		const allTaskList = this.allTasksContainer.querySelectorAll(this.cssObj.item)
		
		allTaskList.forEach(task => {
			const id = task.getAttribute('id')
			task.style.transition = '0.3s ease-out 0s'
		
			const buttonsContainer = document.createElement('div')
			buttonsContainer.className = this.cssObj.btnContainer
		
			const btnComplete = this.createButton('btn-complete')
			const btnDelete = this.createButton('btn-delete')
		
			buttonsContainer.append(btnComplete)
			buttonsContainer.append(btnDelete)
		
			task.parentElement.append(buttonsContainer)
			task.onclick = this.allListClick.bind(this, id, allTaskList, buttonsContainer)
		})
	}
	start(){
		this.addAllListListener()
		// this.addCompleteListListener()
	}
}


