import { 
  createContext, useState 
}  from 'react'
import { useLocalStorage }          from './useLocalStorage'

const TaskContext = createContext()

function TaskProvider({children}) {
  const [tasks, tasksController] = useLocalStorage("tasks", [
    {id: 1, title: "Learn React", description: "I need to learn aaa", completed: "❌"}
  ])
  let [completedTasks, setCompletedTasks] = useState(0)

  const handleClick = (task) => {
    const elementTask = document.getElementById(`${task.id}`)
    if(task.completed == "❌"){
      task.completed = "✔️"
      elementTask.style.backgroundColor = "grey"
      console.log(completedTasks)
    } else {
      task.completed = "❌"
      elementTask.style.backgroundColor = "white"
      console.log(completedTasks)
    }
    setCompletedTasks(task.completed == "❌" ? completedTasks-=1 : completedTasks+=1)
    tasksController.updateItem(tasks)
    console.log(tasks)
  }
  
  return (
    <TaskContext.Provider value={{
      tasks, tasksController,
      completedTasks, setCompletedTasks, 
      handleClick
    }}>
      {children}
    </TaskContext.Provider>
  )
}

export {TaskContext, TaskProvider}
