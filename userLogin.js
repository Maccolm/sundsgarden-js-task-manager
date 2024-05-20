
export class User{
	constructor(containerId){
		this.container = document.getElementById(containerId)
		this.init()
		this.userIdArr = []
	}
	init(){
		const idArr = this.getUserIdArr()
		if (idArr) {
			const userData = this.getUserDataFromStorage(idArr[0].userName)
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
				this.userId = userName.trim()
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
	switchUser = () => {
		const switcher = Swal.mixin({
			customClass: {
				confirmButton: "btn btn-success",
				denyButton: "btn btn-danger"
			},
			buttonsStyling: true
		})
		switcher.fire({
			icon: 'question',
			title: "Do you want to save changes?",
			showCancelButton: true,
			showDenyButton: true,
			denyButtonText: 'Don\'t safe',
			confirmButtonText: 'Save'
		}).then((result) =>{
			if (result.isConfirmed){
				switcher.fire({
					icon: 'warning',
					title: "Do you want to save all users?",
					text: `Choose if you want to save only "${this.userId} profile" or to safe all users`,
					showCancelButton: true,
					showDenyButton: true,
					confirmButtonText: 'Save all users',
					denyButtonText: 'Save only this profile'
				})
			} else if (result.isDenied){
				Swal.fire({
					icon: "error",
					title: "Do you want to delete all users?",
					text: 'You can delete only this user and save other profiles',
					showCancelButton: true,
					showDenyButton: true,
					confirmButtonText: 'Delete all users',
					denyButtonText: 'Delete only this profile'
				}).then((result) =>{
					if(result.isConfirmed){
						this.clearAllDataUsers()
					}
				})
			}
		})
	}
	clearAllDataUsers(){
		localStorage.clear()
		Swal.fire({
			icon: 'success',
			title: 'Deleted',
		}).then((result) =>{
			location.reload()
		})
	}
	saveUserDataToStorage(userData){
		const userName = `user${this.userId}`
		const userKeyArray = `tasks${this.userId}`
		localStorage.setItem(userName, JSON.stringify(userData))
		this.userIdArr.push({userName, userKeyArray})
		localStorage.setItem('idArr', JSON.stringify(this.userIdArr))
	}
	getUserIdArr(){
		return JSON.parse(localStorage.getItem('idArr'))
	}
	updateUserArrayToStorage(tasks){
		const userKey = `tasks${this.userId}`
		localStorage.setItem(userKey, JSON.stringify(tasks))
	}
	getUserArrayFromLocalStorage(){
		const idArr = this.getUserIdArr()
		let userKey
		if (idArr) {
			 userKey = idArr[0].userKeyArray
		}
		return JSON.parse(localStorage.getItem(userKey)) || []
	}
	getUserDataFromStorage(userKey){
		const userData = localStorage.getItem(userKey)
		return userData ? JSON.parse(userData) : null
	}
	renderUserData(userData){
		const {userName} = userData
		const title = this.titleUser(userName)
		this.container.prepend(title)
	}
}
