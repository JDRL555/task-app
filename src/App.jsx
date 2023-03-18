import Task                     from "./components/Task"
import TaskList                 from "./components/TaskList"
import {TaskContext}             from "./context/TaskContext"
import "./styles/global.css"

export default function App() {
  return (
    <TaskContext.Consumer>
      {
        ({tasks, completedTasks}) => (
          <div className="main">
            <div className="home">
              <h1>Task App</h1>
              <p>Welcome!, here you can add your tasks and register all your progress! Add a new task right now and start to work</p>
              <button>Add a new Task</button>
            </div>
            <TaskList>
              <h1 id="completed_tasks">You completed {completedTasks} to {tasks.length} task</h1>
              {tasks.map((task, i) => {
                task.id = i + 1
                return <Task key={i} task={task} /> 
              })}
            </TaskList>
          </div>
        )
      }
    </TaskContext.Consumer>
  )
}


