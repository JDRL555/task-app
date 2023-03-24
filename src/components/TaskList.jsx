import Task               from "./Task"
import { TaskContext }    from "../context/TaskContext"
import { useContext }     from "react"
import "../styles/TaskContainer.css"

export default function TaskList() {
  const {tasksToShow} = useContext(TaskContext)
  return (
    <div className="tasks_list">
      {
      tasksToShow.length
      ? tasksToShow.map((task, i) => {
          task.id = i + 1
          return <Task key={task.id} task={task} /> 
      })
      : <h1>There's no tasks yet... Add a new task now!</h1>
      }
    </div>

  )
}
