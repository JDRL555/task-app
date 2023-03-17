import Task     from "./components/Task"
import TaskList from "./components/TaskList"
import {tasks}  from "./tasks/tasks.js"
import {useState} from "react"
import "./styles/global.css"

export default function App() {
  return (
    <div className="main">
      <div className="home">
        <h1>Task App</h1>
        <p>Welcome!, here you can add your tasks and register all your progress! Add a new task right now and start to work</p>
        <button>Add a new Task</button>
      </div>
      <TaskList>
        {tasks.map((task, i) => {
          task.id = i
          return <Task key={i} task={task} />
        })}
      </TaskList>
    </div>
  )
}


