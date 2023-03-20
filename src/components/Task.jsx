import { TaskContext }  from "../context/TaskContext"
import { useContext }   from "react"
import "../styles/Task.css"

export default function Task({task}) {
  const {handleClick} = useContext(TaskContext)
  return (
    <div id={task.id} className={`task`}>
      <h2 onClick={() => handleClick(task)}>{task.completed}Task {task.id}:{task.title}</h2>
      <h3>{task.description}</h3>
      <div className="button_container">
        <button className="update">Update</button>
        <button className="delete">Delete</button>
      </div>
    </div>
  )
}
