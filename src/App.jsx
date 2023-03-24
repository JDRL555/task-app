import TaskList       from "./components/TaskList"
import TaskContainer  from "./components/TaskContainer"
import {TaskContext}  from "./context/TaskContext"
import {useContext}   from "react"
import Modal          from "./Modal"

import "./styles/global.css"
import "./styles/modal.css"

export default function App() {
  const {tasks, completedTasks, handleChange, handleModalNew} = useContext(TaskContext)
  return (
    <div className="main">
      <div className="home">
        <h1>Task App</h1>
        <p>Welcome!, here you can add your tasks and register all your progress! Add a new task right now and start to work</p>
        <button onClick={handleModalNew}>Add a new Task</button>
      </div>
      <TaskContainer>
        <h1 id="completed_tasks">You completed {completedTasks} to {tasks.length} task</h1>
        <input type="text" placeholder="Search your task!" onChange={handleChange} />
        <TaskList />
      </TaskContainer>
      <Modal type="new_task" />
      <Modal type="update_task" />
    </div>
  )
}


