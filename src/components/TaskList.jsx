import "../styles/TaskList.css"


export default function TaskList({children}) {
  return (
    <div className="tasks_container">
      {children}
    </div>
  )
}
