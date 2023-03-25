import { createContext, useState }  from 'react'
import { useLocalStorage }          from './useLocalStorage'
import { TaskToShowState }          from './states/tasksToShowState'
import { selectedTaskState }        from './states/selectedTaskState'
import { newValuesState }           from './states/newValuesState'
import {toast}                      from "react-toastify"

const TaskContext = createContext()

function TaskProvider({children}) {
  let [tasks, tasksController] = useLocalStorage("tasks", [])
  let completed = []
  
  if(tasks?.length){
    tasks.forEach(task => {
      if(task.completed == "✔️"){
        completed.push(task)
      }
    })
  }
  completed = completed.length
  
  let [completedTasks, setCompletedTasks] = useState(completed)
  let searchedTasks = tasks
  let search        = ""
  const [tasksToShow, setTasksToShow] = TaskToShowState(tasks)
  const [selectedTask, setselectedTask] = selectedTaskState(null)
  const [newValue, setNewValue] = newValuesState(null)

  const showTasks = () => {
    if(!search.length >= 1){
      searchedTasks = tasks
    } else {
      searchedTasks = tasks.filter(task => {
        const lowerTask   = task.title.toLowerCase()
        const lowerSearch = search.toLowerCase()
        return lowerTask.includes(lowerSearch)
      })
    }

    if(searchedTasks.length){
      searchedTasks.forEach((task, i) => task.id = i + 1)
    }
    setTasksToShow(searchedTasks)
  }

  const handleClick = (task) => {
    const elementTask = document.getElementById(`${task.id}`)
    const update_btn  = document.getElementById(`update${task.id}`) 
    const delete_btn  = document.getElementById(`delete${task.id}`) 

    if(task.completed == "❌"){
      task.completed = "✔️"
      elementTask.style.backgroundColor = "grey"
      update_btn.style.backgroundColor  = "grey"
      delete_btn.style.backgroundColor  = "grey"
    } else {
      task.completed = "❌"
      elementTask.style.backgroundColor = "white"
      update_btn.style.backgroundColor  = "#91a5ff"
      delete_btn.style.backgroundColor  = "#ff9393"
    }
    setCompletedTasks(task.completed == "❌" ? completedTasks-=1 : completedTasks+=1)
    tasks.forEach(taskLocalStorage => {
      if(taskLocalStorage.id == task.id){
        tasks.splice(task.id - 1, 1, task)
      }
    })
    tasksController.refreshItem(tasks)
  }

  const handleChange = e => {
    const value = e.target.value
    search = value
    showTasks()
  }

  const handleModalNew = () => {
    const modal_bg      = document.querySelector(".modal_bg_new")
    const new_task      = document.querySelector(".new_task")
    const new_task_form = document.querySelector(".new_task_form")
    if(!modal_bg.style.display || modal_bg.style.display == "none"){
      modal_bg.style.display = "flex"
      new_task.style.display = "flex"
    } else {
      new_task_form.reset()
      modal_bg.style.display = "none"
      new_task.style.display = "none"
    }
  }

  const handleModalUpdate = (task) => {
    const modal_bg          = document.querySelector(".modal_bg_update")
    const update_task       = document.querySelector(".update_task")
    const update_task_form  = document.querySelector(".update_task_form")

    setselectedTask(task)
    setNewValue(task)
    if(!modal_bg.style.display || modal_bg.style.display == "none"){
      modal_bg.style.display = "flex"
      update_task.style.display = "flex"
    } else {
      update_task_form.reset()
      modal_bg.style.display = "none"
      update_task.style.display = "none"
    }
  }

  const handleCompletedTasks = () => {
    tasks.forEach(task => {
      if(task.completed == "✔️"){
        const elementTask = document.getElementById(`${task.id}`)
        const update_btn  = document.getElementById(`update${task.id}`) 
        const delete_btn  = document.getElementById(`delete${task.id}`) 
        elementTask.style.backgroundColor = "grey"
        update_btn.style.backgroundColor  = "grey"
        delete_btn.style.backgroundColor  = "grey"
      }
    })
  }

  const handleAlert = (message, type) => {
  type == "sucess"
  ?
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "dark",
  })
  :
  toast.warn(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "dark",
  })

}

const handleUpdate = () => {
  const updated = tasksController.updateItem(newValue)
  let tasks = localStorage.getItem("tasks")
  tasks = JSON.parse(tasks)
  setTasksToShow(tasks)

  if(updated){
    handleAlert("Updated successfully!", "sucess")
  }else{
    handleAlert("There's a error!", "warning")
  }
}

const handleCreate = () => {
  const created = tasksController.saveItem()
  let tasks = localStorage.getItem("tasks")
  tasks = JSON.parse(tasks)
  setTasksToShow(tasks)

  if(created){
    handleAlert("Created successfully!", "sucess")
  }else{
    handleAlert("Either the task already exists or empty fields!", "warn")
  }
}
  
  return (
    <TaskContext.Provider value={{
      tasks, tasksController,
      showTasks,
      search, searchedTasks,
      tasksToShow, setTasksToShow,
      selectedTask, setselectedTask,
      newValue, setNewValue,
      completedTasks, setCompletedTasks, 
      handleClick, handleChange, handleCompletedTasks, 
      handleModalNew, handleModalUpdate, handleAlert,
      handleUpdate, handleCreate
    }}>
      {children}
    </TaskContext.Provider>
  )
}

export {TaskContext, TaskProvider}
