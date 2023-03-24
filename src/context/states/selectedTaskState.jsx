import { useState } from "react"

export function selectedTaskState(defaultValue){
  const [selectedTask, setselectedTask] = useState(defaultValue)
  return [selectedTask, setselectedTask]
}