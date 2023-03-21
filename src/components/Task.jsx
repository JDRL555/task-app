import { TaskContext }  from "../context/TaskContext"
import { useContext, useEffect }   from "react"
import "../styles/Task.css"

export default function Task({task}) {
  const {handleClick, handleCompletedTasks, tasksToShow} = useContext(TaskContext)
  useEffect(()=> {handleCompletedTasks(task)}, [tasksToShow])
  return (
    <div id={task.id} className={`task`}>
      <h2 onClick={() => handleClick(task)}>{task.completed}Task {task.id}:{task.title}</h2>
      <h3>{task.description}</h3>
      <div className="button_container">
        <button id={`update${task.id}`} className="update">Update</button>
        <button id={`delete${task.id}`} className="delete">Delete</button>
      </div>
    </div>
  )
}
