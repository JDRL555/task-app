import Task                         from "./Task"
import { TaskContext }              from "../context/TaskContext"
import { useContext, useState, useEffect }    from "react"
import "../styles/TaskContainer.css"

export default function TaskList() {
  const {tasksToShow} = useContext(TaskContext)
  // useEffect(()=> {setTasksToShow(tasksToShow)}, [tasksToShow])
  return (
    <div className="tasks_list">
      {tasksToShow.map((task, i) => {
          task.id = i + 1
          return <Task key={task.id} task={task} /> 
      })}
    </div>
  )
}
