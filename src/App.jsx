import TaskList       from "./components/TaskList"
import TaskContainer  from "./components/TaskContainer"
import {TaskContext}  from "./context/TaskContext"
import {useContext, useEffect}   from "react"
import "./styles/global.css"

export default function App() {
  const {tasks, completedTasks, handleChange} = useContext(TaskContext)
  return (
    <div className="main">
      <div className="home">
        <h1>Task App</h1>
        <p>Welcome!, here you can add your tasks and register all your progress! Add a new task right now and start to work</p>
        <button>Add a new Task</button>
      </div>
      <TaskContainer>
        <h1 id="completed_tasks">You completed {completedTasks} to {tasks.length} task</h1>
        <input type="text" placeholder="Search your task!" onChange={handleChange} />
        <TaskList />
      </TaskContainer>
    </div>
  )
}


