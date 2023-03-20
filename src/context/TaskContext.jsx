import { 
  createContext, useState 
}  from 'react'
import { useLocalStorage }  from './useLocalStorage'
import { States }           from './tasksToShow'

const TaskContext = createContext()

function TaskProvider({children}) {
  let [tasks, tasksController] = useLocalStorage("tasks", [
    {id: 1, title: "Create new Tasks", description: "just try this amazing task app!", completed: "❌"}
  ])
  let [completedTasks, setCompletedTasks] = useState(0)
  let searchedTasks = tasks
  let search        = ""
  const [tasksToShow, setTasksToShow] = States(tasks)
  console.log(tasksToShow)

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
    if(task.completed == "❌"){
      task.completed = "✔️"
      elementTask.style.backgroundColor = "grey"
    } else {
      task.completed = "❌"
      elementTask.style.backgroundColor = "white"
    }
    setCompletedTasks(task.completed == "❌" ? completedTasks-=1 : completedTasks+=1)
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
  
  return (
    <TaskContext.Provider value={{
      tasks, tasksController,
      search, searchedTasks,
      tasksToShow, setTasksToShow,
      completedTasks, setCompletedTasks, 
      handleClick, handleChange,
      handleModal
    }}>
      {children}
    </TaskContext.Provider>
  )
}

export {TaskContext, TaskProvider}
