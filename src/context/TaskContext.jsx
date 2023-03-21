import { createContext, useState }  from 'react'
import { useLocalStorage }          from './useLocalStorage'
import { States }                   from './tasksToShow'

const TaskContext = createContext()

function TaskProvider({children}) {
  let [tasks, tasksController] = useLocalStorage("tasks", [
    {id: 1, title: "Create new Tasks", description: "just try this amazing task app!", completed: "❌"}
  ])
  let completed = []
  
  tasks.forEach(task => {
    if(task.completed == "✔️"){
      completed.push(task)
    }
  })
  completed = completed.length
  
  let [completedTasks, setCompletedTasks] = useState(completed)
  let searchedTasks = tasks
  let search        = ""
  const [tasksToShow, setTasksToShow] = States(tasks)

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
    setTasksToShow(searchedTasks)
  }

  const handleClick = (task) => {
    const elementTask = document.getElementById(`${task.id}`)
    const update_btn  = document.getElementById(`update${task.id}`) 
    const delete_btn  = document.getElementById(`delete${task.id}`) 
    console.log(update_btn)
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
    tasksController.updateItem(tasks)
  }

  const handleChange = e => {
    const value = e.target.value
    search = value
    showTasks()
  }

  const handleModal = () => {
    const modal_bg    = document.querySelector(".modal_bg")
    const new_task  = document.querySelector(".new_task")
    if(!modal_bg.style.display || modal_bg.style.display == "none"){
      modal_bg.style.display = "flex"
      new_task.style.display = "flex"
    } else {
      modal_bg.style.display = "none"
      new_task.style.display = "none"
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
  
  return (
    <TaskContext.Provider value={{
      tasks, tasksController,
      search, searchedTasks,
      tasksToShow, setTasksToShow,
      completedTasks, setCompletedTasks, 
      handleClick, handleChange, handleCompletedTasks, handleModal
    }}>
      {children}
    </TaskContext.Provider>
  )
}

export {TaskContext, TaskProvider}
