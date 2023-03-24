import { useState } from "react"

export function TaskToShowState(defaultValue){
  const [tasksToShow, setTasksToShow] = useState(defaultValue)
  return [tasksToShow, setTasksToShow]
}