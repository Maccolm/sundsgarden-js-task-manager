import{TaskInteractions}from"./taskInteractions.js";import{User}from"./userLogin.js";class TaskManager{constructor(t){this.cssObj={item:"item",itemOriginal:"item-original",greenColor:"green-color",redColor:"red-color",addTaskBtn:"add-task-btn",styleText:"style-text",statusWidth:"120px",flexAuto:"1 0 auto",itemContainer:"item-container",mainBtn:"main-button",statusSpan:"status-span",...t&&{}}}getRow(t,e,s){const i=document.createElement("div"),n=document.createElement("div"),a=document.createElement("div"),o=document.createElement("div"),l=document.createElement("span"),r=document.createElement("span"),c=document.createElement("p"),h=document.createElement("p"),d=document.createElement("p");return s?(r.className=this.cssObj.greenColor,r.innerText="completed"):(r.className=this.cssObj.redColor,r.innerText="not completed"),r.classList.add(this.cssObj.statusSpan),c.innerHTML=t,c.className=this.cssObj.styleText,h.innerHTML=e,l.innerText="id: ",l.className=this.cssObj.styleText,o.style.width=this.cssObj.statusWidth,n.style.flex=this.cssObj.flexAuto,n.append(c),h.prepend(l),a.append(h),d.append(r),o.append(d),i.append(n),i.append(a),i.append(o),i.setAttribute("id",e),i}renderAllList(){this.allTasksContainer.innerHTML="",this.completeTasksContainer.innerHTML="",tasks.forEach((t=>{const e=t.complete??!1,s=document.createElement("div");s.className=this.cssObj.itemContainer;const i=this.getRow(t.text,t.id,e);if(i.className=this.cssObj.item,i.classList.add(this.cssObj.itemOriginal),s.append(i),e){this.allTasksContainer.append(s);const e=i.cloneNode(!0);e.className=this.cssObj.item,e.setAttribute("id",t.id+"Clone"),this.completeTasksContainer.append(e)}else this.allTasksContainer.prepend(s)}));new TaskInteractions(this.allTasksContainer,this.completeTasksContainer,tasks,this.user);this.showAllTasks()}checkMissingIds(){const t=tasks.map((t=>parseInt(t.id)));let e;for(let s=1;s<=t.length;s++)if(!t.includes(s)){e=s;break}return void 0===e&&(e=t.length+1),e}addTask(){let t;const e=/^\d+$/;Swal.fire({title:"Describe your new task",input:"text",inputPlaceholder:"Describe here",showCancelButton:"true",confirmButtonText:"Submit",cancelButtonText:"Cancel",inputValidator:t=>t?e.test(t)?"Please, write correct value. Do not use only numbers":void 0:"Please, write some text here"}).then((e=>{e.isConfirmed&&(t=e.value,this.addToArray(t),this.user.updateUserArrayToStorage(tasks),this.renderAllList())}))}addToArray(t){tasks.push({id:this.checkMissingIds(),text:t,complete:!1})}releaseListWithAnimation(t){for(let e=0;e<t.length;e++)t[e].style.position="relative",t[e].style.transition="0.3s ease-out 0s",t[e].style.right="50px";setTimeout((()=>{for(let e=0;e<t.length;e++)setTimeout((()=>{t[e].style.opacity=1,t[e].style.right="0px",t[e].style.pointerEvents="auto"}),50*e)}),200)}showAllTasks(){this.completeTasksContainer.style.opacity="0",this.completeTasksContainer.style.position="absolute",this.completeTasksContainer.style.pointerEvents="none",this.allTasksContainer.style.opacity="1",setTimeout((()=>{this.allTasksContainer.style.position="relative"}),300),this.releaseListWithAnimation(this.allListChildren);for(let t=0;t<this.completeListChildren.length;t++)this.completeListChildren[t].style.opacity=0}showCompleteTasks(){this.allTasksContainer.style.opacity="0",this.allTasksContainer.style.position="absolute",this.allTasksContainer.style.pointerEvents="none",this.completeTasksContainer.style.position="relative",this.completeTasksContainer.style.opacity="1",this.releaseListWithAnimation(this.completeListChildren);for(let t=0;t<this.allListChildren.length;t++)this.allListChildren[t].style.opacity=0}clearAllList(){const t=Swal.mixin({customClass:{confirmButton:"btn btn-success",cancelButton:"btn btn-danger"},buttonsStyling:!0});t.fire({title:"Do you want to delete all list",text:"You won't be able to revert this",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes, delete all",cancelButtonText:"No, cancel!",reverseButtons:!0}).then((e=>{e.isConfirmed?tasks.length>=1?(tasks.splice(0,tasks.length),this.renderAllList(),this.user.updateUserArrayToStorage(tasks),t.fire({title:"Deleted!",text:"Your list has been deleted.",icon:"success"})):t.fire({title:"Nothing to delete",text:"Any tasks were not found",icon:"error"}):e.dismiss===Swal.DismissReason.cancel&&t.fire({title:"Cancelled",text:"Your list is safe :)",icon:"error"})}))}renderButton(t){const e=document.createElement("button");return e.innerHTML=t,e.style.borderRadius="5px",e}getUserData(){const t=this.user.getUserArrayFromLocalStorage();tasks=[...t],this.renderAllList()}render(t){this.containerId=document.getElementById(t),this.allTasksContainer=document.createElement("div"),this.completeTasksContainer=document.createElement("div");const e=document.createElement("div");e.style.display="flex",e.style.gap="15px",e.style.justifyContent="center",this.addTaskButton=this.renderButton("Add New Task"),this.addTaskButton.className=this.cssObj.addTaskBtn,this.addTaskButton.onclick=this.addTask.bind(this),this.listAllTaskButton=this.renderButton("Show All Tasks"),this.listAllTaskButton.className=this.cssObj.mainBtn,this.listAllTaskButton.onclick=this.showAllTasks.bind(this),this.completeListButton=this.renderButton("Show Complete tasks"),this.completeListButton.className=this.cssObj.mainBtn,this.completeListButton.onclick=this.showCompleteTasks.bind(this),this.clearListButton=this.renderButton("Clear All List"),this.clearListButton.className=this.cssObj.mainBtn,this.clearListButton.onclick=this.clearAllList.bind(this),e.append(this.addTaskButton),e.append(this.listAllTaskButton),e.append(this.completeListButton),e.append(this.clearListButton),this.logOutButton=this.renderButton("Log Out"),this.logOutButton.className=this.cssObj.mainBtn,this.logOutButton.style.position="absolute",this.logOutButton.style.top="0",this.logOutButton.style.right="0",this.containerId.append(e),this.containerId.append(this.allTasksContainer),this.containerId.append(this.completeTasksContainer),this.containerId.append(this.logOutButton),this.completeTasksContainer.style.opacity="0",this.completeTasksContainer.style.position="fixed",this.completeTasksContainer.style.pointerEvents="none",this.completeTasksContainer.style.transition="all 0.3s ease-out 0s",this.completeTasksContainer.style.width="100%",this.allTasksContainer.style.width="100%",this.allTasksContainer.style.transition="all 0.3s ease-out 0s",this.containerId.style.width="100%",this.containerId.style.minHeight="90vh",this.allListChildren=this.allTasksContainer.children,this.completeListChildren=this.completeTasksContainer.children,this.user=new User(t),this.getUserData(),this.logOutButton.onclick=this.user.switchUser.bind(this)}}let tasks=[];window.onload=function(){(new TaskManager).render("container")};