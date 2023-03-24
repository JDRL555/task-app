import {createPortal}         from "react-dom"
import ModalContent           from "./components/ModalContent"

export default function Modal({type}) {
  return createPortal(
    <div className={type == "new_task" ? "modal_bg_new" : "modal_bg_update"}>
      <ModalContent type={type} />
    </div>,
    document.getElementById("modal")
  )
}
