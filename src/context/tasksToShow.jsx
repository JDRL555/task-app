import { useState } from "react"

export function States(defaultValue){
  const [tasksToShow, setTasksToShow] = useState(defaultValue)
  return [tasksToShow, setTasksToShow]
}