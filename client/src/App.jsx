import TaskList         from "./components/TaskList"
import TaskContainer    from "./components/TaskContainer"
import {TaskContext}    from "./context/TaskContext"
import {useContext}     from "react"
import Modal            from "./Modal"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css';

import "./styles/global.css"
import "./styles/modal.css"
import "./styles/responsive.css"

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
        <TaskList />
      </TaskContainer>
      <Modal type="new_task" />
      <Modal type="update_task" />
      <ToastContainer />
    </div>
  )
}


