import { useContext }   from "react"
import { TaskContext }  from "../context/TaskContext"

export default function ModalContent({type}) {

  const {
    handleModalNew, 
    handleModalUpdate, 
    tasksController, 
    selectedTask, 
    newValue, 
    setNewValue, 
    handleAlert, 
    setTasksToShow
    
  } = useContext(TaskContext)

  const handleChange = e => {
    setNewValue({...newValue, [e.target.name]: e.target.value})
  }

  const handleUpdate = () => {
    const updated = tasksController.updateItem(newValue)
    let tasks = localStorage.getItem("tasks")
    tasks = JSON.parse(tasks)
    setTasksToShow(tasks)

    if(updated){
      handleAlert("Updated successfully!", "sucess")
      // setTimeout(()=>location.reload(), 1000)
    }else{
      handleAlert("There's a error!", "warning")
    }
  }

  const handleCreate = () => {
    const created = tasksController.saveItem()
    let tasks = localStorage.getItem("tasks")
    tasks = JSON.parse(tasks)
    setTasksToShow(tasks)

    if(created){
      handleAlert("Created successfully!", "sucess")
      // setTimeout(()=>location.reload(), 1000)
    }else{
      handleAlert("Either the task already exists or empty fields!", "warn")
    }
  }

  return (
    <div className={type}>
      <div className="header_modal">
        <h2>{type == "new_task" ? "Add a Task" : "Update a Task"}
        </h2>
        <span onClick={type == "new_task" ? handleModalNew : handleModalUpdate}>X</span>
      </div>
      {
        selectedTask 
        ? 
        <>
          <h3>Title: </h3>
          <input 
            className="modal_input"   
            name="title" 
            type="text" 
            value={newValue.title}
            onChange={handleChange}
          />
          <h3>Description: </h3>
          <textarea 
            className="modal_input" 
            name="description" 
            rows={5}
            value={newValue.description}
            onChange={handleChange}
          />
        </>
        :
        <>
          <h3>Title: </h3>
          <input 
            className="modal_input"   
            name="title" 
            type="text" 
          />
          <h3>Description: </h3>
          <textarea 
            className="modal_input" 
            name="description" 
            rows={5}
          />
        </>
      }
      <button 
        className="modal_button" 
        onClick={
          type == "new_task" 
          ? handleCreate
          : handleUpdate
        }>
        {type == "new_task" ? "Add" : "Update"}
      </button>
    </div>
  )
}
