import "../styles/Task.css"
import {useState} from "react"

export default function Task({task}) {
  const [completed, setCompleted] = useState("❌")

  const handleClick = () => {
    const task = document.querySelector(".task")
    task.completed ? task.completed = false : task.completed = true 
    if(task.completed){
      task.style.backgroundColor = "grey"
      setCompleted("✔️")
    }else{
      task.style.backgroundColor = "white"
      setCompleted("❌")
    }
  }
  return (
    <div className="task">
      <h2 onClick={handleClick}>{completed}Task {task.id + 1}:{task.title}</h2>
      <h3>{task.description}</h3>
    </div>
  )
}
