export class User{
	constructor(containerId){
		this.container = document.getElementById(containerId)
		this.init()
	}
	init(){
		const userData = this.getUserDataFromStorage()
		if (userData) {
			this.renderUserData(userData)
		} else {
			this.greeting()
		}
	}
	greeting(){
		Swal.fire({
			title: 'Hello! This is a Task Manager',
			text: 'Here you can add your daily tasks, mark 	them, delete, etc..  But before starting you need to write your name',
			showCancelButton: false,
			confirmButtonText: 'Ok'
	}).then((result) =>{
		if (result.isConfirmed) {
			this.addUser()
		}
	})
	}
	addUser(){
		let userName
		const inputNumOnly = /^\d+$/

		Swal.fire({
			title: "All right, now type your name here",
			input: "text",
			inputPlaceholder: "Type your name here",
			showCancelButton: false,
			confirmButtonText: "Ok",
			inputValidator: (value) =>{
				if(!value){
					return "Your name cannot be empty, please, write your name"
				} else if (inputNumOnly.test(value)){
					return "It's good to use only numbers, but in this world we also use letters"
				}
			}
		}).then((result) =>{
			if (result.isConfirmed){
				userName = result.value
				const title = this.titleUser(userName)
				this.container.prepend(title)
				this.saveUserDataToStorage({userName})
			}
		})
	}
	titleUser(userName){
		const h1 = document.createElement('h1')
		h1.innerText = `Hello ${userName}`
		h1.style.marginBottom = '20px'
		return h1
	}
	saveUserDataToStorage(userData){
		localStorage.setItem('userData', JSON.stringify(userData))
	}
	getUserDataFromStorage(){
		const userData = localStorage.getItem('userData')
		return userData ? JSON.parse(userData) : null
	}
	renderUserData(userData){
		const {userName} = userData
		const title = this.titleUser(userName)
		this.container.prepend(title)
	}
}