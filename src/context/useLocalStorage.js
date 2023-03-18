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

  tasksController.saveItem = (newValue) => {    
    if(item.length){
      item.push(newValue)
      const itemStringyfied = JSON.stringify(item)
      localStorage.setItem(itemKey, itemStringyfied)
    } else {
      localStorage.setItem(itemKey, newValue)
    }
  }

  return [item, tasksController]
}


