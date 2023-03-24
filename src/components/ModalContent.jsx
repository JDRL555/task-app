import { useContext }   from "react"
import { TaskContext }  from "../context/TaskContext"

export default function ModalContent({type}) {
  const {
    handleModalNew, handleModalUpdate, tasksController, selectedTask, newValue, setNewValue
  } = useContext(TaskContext)

  const handleChange = e => {
    setNewValue({...newValue, [e.target.name]: e.target.value})
  }

  const handleSubmit = () => {
    tasksController.updateItem(newValue)
  }

  return (
    <div className={type}>
      <h2>{type == "new_task" ? "Add a Task" : "Update a Task"}
      <span onClick={type == "new_task" ? handleModalNew : handleModalUpdate}>X</span></h2>
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
      <button className="modal_button" onClick={type == "new_task" ? tasksController.saveItem : handleSubmit}>
        {type == "new_task" ? "Add" : "Update"}
      </button>
    </div>
  )
}
