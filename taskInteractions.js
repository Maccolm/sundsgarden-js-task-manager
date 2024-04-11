// -add class which moves item and makes buttons under +
	//-create buttons, add listener to them
	//- 
// -made 

export class TaskInteractions{
	constructor(allListContainer, completeListContainer, tasks, cssObj){
		this.allTasksContainer = allListContainer
		this.completeTasksContainer = completeListContainer
		this.tasksArray = tasks
		this.cssObj = {
			itemCss: 'item',
			item: '.item',
			active: 'active',
			bgColorActive: 'bg-color-active',
			btnUndone: 'btn-undone',
			btnDelete: 'btn-delete',
			btnComplete: 'btn-complete',
			btnStyle: 'btn-style',
			btnContainer: 'btn-container',
			greenColor: 'green-color',
			redColor: 'red-color',
			animate: 'animate',
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
	createButton(btnType, id){
		const btn = document.createElement('button')
		btn.classList.add(this.cssObj.btnStyle)
		switch (btnType) {
			case 'btn-delete':
				btn.classList.add(this.cssObj.btnDelete)
				btn.innerText = 'Delete'
			break;
			case 'status':
				//checking status of item to decide what button to add
				const statusItem = this.tasksArray.find((task) => task.id == id).complete
				
				if(statusItem){
					btn.classList.add(this.cssObj.btnUndone)
					btn.innerText = 'Mark Undone'
				} else {
					btn.classList.add(this.cssObj.btnComplete)
					btn.innerText = 'Mark done'
				}
			break
		}
		return btn
	}
	addAllListListener(){
		const allTaskList = this.allTasksContainer.querySelectorAll(this.cssObj.item)
		console.log(allTaskList);
		allTaskList.forEach(task => {
			const id = task.getAttribute('id')
			task.style.transition = '0.3s ease-out 0s'
		
			const buttonsContainer = document.createElement('div')
			buttonsContainer.className = this.cssObj.btnContainer
		
			const btnStatus = this.createButton('status', id)
			const btnDelete = this.createButton('btn-delete')
			btnStatus.onclick = this.handleButtonClick.bind(this, id, task, btnStatus)
		
			buttonsContainer.append(btnStatus)
			buttonsContainer.append(btnDelete)
		
			task.parentElement.append(buttonsContainer)
			task.onclick = this.allListClick.bind(this, id, allTaskList, buttonsContainer)

			//btn listener
		})
	}
	handleButtonClick(id, task, btn){
		let status = this.tasksArray.find((task) => task.id == id).complete
		const spanElement = task.querySelector('.status-span')
		//add some effects for good looking
		task.classList.add(this.cssObj.animate)
		setTimeout(()=>{
			task.classList.remove(this.cssObj.animate)
		},550)
		if (status === true) {
			this.tasksArray.find((task) => task.id == id).complete = false
			spanElement.innerText = 'not completed'
			spanElement.classList.remove(this.cssObj.greenColor)
			spanElement.classList.add(this.cssObj.redColor)
			btn.classList.remove(this.cssObj.btnUndone)
			btn.classList.add(this.cssObj.btnComplete)
			btn.innerText = 'Mark done'

			//delete from complete List
			const cloneItem = document.getElementById(id + 'Clone')
			cloneItem.remove()

		} else {
			spanElement.innerText = 'completed'
			spanElement.classList.remove(this.cssObj.redColor)
			spanElement.classList.add(this.cssObj.greenColor)
			this.tasksArray.find((task) => task.id == id).complete = true
			btn.classList.remove(this.cssObj.btnComplete)
			btn.classList.add(this.cssObj.btnUndone)
			btn.innerText = 'Mark undone'

			//add to complete List
			const cloneDoneTask = task.cloneNode(true)
			cloneDoneTask.className = this.cssObj.itemCss
			cloneDoneTask.setAttribute('id', id + 'Clone')
			this.completeTasksContainer.prepend(cloneDoneTask)
		}
	}
	start(){
		this.addAllListListener()
	}
}


