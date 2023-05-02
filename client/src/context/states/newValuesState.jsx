import { useState } from "react"

export function newValuesState(defaultValue){
  const [newValues, setNewValues] = useState(defaultValue)
  return [newValues, setNewValues]
}