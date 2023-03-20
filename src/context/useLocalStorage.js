export function useLocalStorage(itemKey, defaultValue){
  let item = localStorage.getItem(itemKey) 
  
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

  const tasksController = {}

  tasksController.updateItem = (item) => {
    if(item.length){
      const itemStringified = JSON.stringify(item)
      localStorage.setItem(itemKey, itemStringified)  
    } else {
      localStorage.setItem(itemKey, item)  
    }
  }

  tasksController.saveItem = () => {
    const inputs = document.querySelectorAll(".modal_input")
    let title = inputs[0].value.toLowerCase()

    if(!inputs[0].value || !inputs[1].value){
      alert("faltaron campos :/")
      return
    }
    
    const foundTask = item.some(task => {
      task.title.toLowerCase() == title
    })

    if(!foundTask){
      const newItem = {}
      const id      = item[item.length-1].id + 1
      inputs.forEach(input => {
        newItem[input.name] = input.value
      })
      newItem["completed"] = "❌"
      newItem["id"] = id
      item.push(newItem)
      const itemStringyfied = JSON.stringify(item)
      localStorage.setItem(itemKey, itemStringyfied)
      alert("agregado exitosamente!!")
      location.reload()
    }else {
      alert("ya existe la tarea:/")
    } 
  }

  return [item, tasksController]
}


