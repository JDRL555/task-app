import Task             from "../components/Task"
import { TaskContext }  from "../context/TaskContext"
import { useContext }   from "react"
import "../styles/TaskContainer.css"

export default function TaskList() {
  const {tasksToShow, searchedTasks, handleChange} = useContext(TaskContext)

  return (
    <div className="tasks_list">
      <input type="text" placeholder="Search your task!" onChange={handleChange} />
      {
        tasksToShow.length
        ? tasksToShow.map((task, i) => {
          task.id = i + 1
          return <Task key={task.id} task={task} /> 
        })
        : 
        !searchedTasks
        &&
        <h1>There's no tasks yet... Add a new task now!</h1>
      }
    </div>

  )
}
