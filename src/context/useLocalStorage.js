export function useLocalStorage(itemKey, defaultValue){
  let item = localStorage.getItem(itemKey) 
  const tasksController = {}
  
  if(!item){
    if(defaultValue.length){
      const valueStringified = JSON.stringify(defaultValue)
      localStorage.setItem(itemKey, valueStringified)
    }else{
      localStorage.setItem(itemKey, defaultValue)
    }
  } else {
    item = JSON.parse(item)
  }


  tasksController.refreshItem = (item) => {
    if(item.length){
      console.log(item)
      const itemStringified = JSON.stringify(item)
      localStorage.setItem(itemKey, itemStringified)  
    } else {
      localStorage.setItem(itemKey, item)  
    }
  }

  tasksController.saveItem = () => {
    const inputs  = document.querySelectorAll(".modal_input")
    let title     = inputs[0].value.toLowerCase()

    if(!inputs[0].value || !inputs[1].value){
      return false
    }
    let tasks = localStorage.getItem(itemKey)
    
    if(tasks){
      tasks = JSON.parse(tasks)
    } else {
      tasks = []  
    }

    const foundTask = tasks.find(task => task.title.toLowerCase() == title)

    if(!foundTask){
      let newTask = {}
      let id = 1

      if(tasks.length){
        id = tasks[tasks.length-1].id + 1
      }
      
      newTask[inputs[0].name] = inputs[0].value
      newTask[inputs[1].name] = inputs[1].value
      newTask["completed"] = "❌"
      newTask["id"] = id
      tasks.push(newTask)
      tasks = JSON.stringify(tasks)
      localStorage.setItem(itemKey, tasks)
      return true
    }else {
      return false
    } 
  }

  tasksController.updateItem = (newValues) => {
    let tasks = localStorage.getItem(itemKey)
    tasks = JSON.parse(tasks)
   
    const foundTask = tasks.find(task => task.id == newValues.id)
    if(foundTask){
      tasks.splice(foundTask.id - 1, 1, newValues)
    }
    tasks = JSON.stringify(tasks)
    localStorage.setItem(itemKey, tasks)
    return true
  }

  tasksController.deleteItem = (taskToDelete) => {
    let tasks = localStorage.getItem(itemKey)
    tasks = JSON.parse(tasks)

    const foundTask = tasks.find(task => task.id == taskToDelete.id)
    if(foundTask){
      tasks.splice(foundTask.id - 1, 1)
    }
    tasks = JSON.stringify(tasks)
    localStorage.setItem(itemKey, tasks)
    return true
  }

  return [item, tasksController]
}


