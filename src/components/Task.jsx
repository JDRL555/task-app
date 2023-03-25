import { TaskContext }              from "../context/TaskContext"
import { useContext, useEffect }    from "react"

import "../styles/Task.css"

export default function Task({task}) {
  const {
    handleClick, 
    handleCompletedTasks, 
    tasksToShow, 
    handleModalUpdate, 
    tasksController, 
    handleAlert,
    setTasksToShow
  } = useContext(TaskContext)
  
  useEffect(()=> {handleCompletedTasks(task)}, [tasksToShow])

  const handleDelete = () => {
    const deleted = tasksController.deleteItem(task)
    let tasks = localStorage.getItem("tasks")
    tasks = JSON.parse(tasks)
    setTasksToShow(tasks)

    if(deleted){
      handleAlert("Deleted successfully!", "sucess")
      // setTimeout(()=>location.reload(), 1000)
    }else{
      handleAlert("There's a error!", "warning")
    }
  }
  return (
    <div id={task.id} className={`task`}>
      <h2 onClick={() => handleClick(task)}>{task.completed}Task {task.id}:{task.title}</h2>
      <h3>{task.description}</h3>
      <div className="button_container">
        <button 
          id={`update${task.id}`} 
          className="update"
          onClick={() => handleModalUpdate(task)}
        >
          Update
        </button>
        <button 
          id={`delete${task.id}`} 
          className="delete"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
