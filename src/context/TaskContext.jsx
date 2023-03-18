import { 
  createContext, useState 
}  from 'react'
import { useLocalStorage }  from './useLocalStorage'
import { States } from './tasksToShow'


const TaskContext = createContext()

function TaskProvider({children}) {
  let [tasks, tasksController] = useLocalStorage("tasks", [
    {id: 1, title: "Learn React", description: "I need to learn aaa", completed: "❌"},
    {id: 1, title: "Do something else", description: "a", completed: "❌"},
    {id: 1, title: "idk", description: "b", completed: "❌"},
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
  
  return (
    <TaskContext.Provider value={{
      tasks, tasksController,
      search, searchedTasks,
      tasksToShow, setTasksToShow,
      completedTasks, setCompletedTasks, 
      handleClick, handleChange
    }}>
      {children}
    </TaskContext.Provider>
  )
}

export {TaskContext, TaskProvider}
