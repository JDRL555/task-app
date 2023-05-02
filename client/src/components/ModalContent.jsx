import { useContext }   from "react"
import { TaskContext }  from "../context/TaskContext"

export default function ModalContent({type}) {

  const {
    handleModalNew, 
    handleModalUpdate,  
    selectedTask, 
    newValue, 
    setNewValue, 
    handleUpdate, handleCreate
    
  } = useContext(TaskContext)

  const handleChange = e => {
    setNewValue({...newValue, [e.target.name]: e.target.value})
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
        <form className="update_task_form">
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
        </form>
        :
        <form className="new_task_form">
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
        </form>
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
