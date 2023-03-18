import { TaskContext } from "../context/TaskContext"
import { useEffect, useState } from "react"
import "../styles/Task.css"

export default function Task({task}) {
  useEffect(()=> {console.log("si")}, [task])
  return (
    <TaskContext.Consumer>
      {
        ({handleClick}) => (
          <div id={task.id} className={`task`}>
            <h2 onClick={() => handleClick(task)}>{task.completed}Task {task.id}:{task.title}</h2>
            <h3>{task.description}</h3>
          </div>
        )
      }
    </TaskContext.Consumer>
  )
}
