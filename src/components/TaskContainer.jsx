import "../styles/TaskContainer.css"

export default function TaskContainer({children}) {
  return (
    <div className="tasks_container">
      {children}
    </div>
  )
}