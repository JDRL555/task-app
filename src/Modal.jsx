import {createPortal} from "react-dom"

export default function Modal({children}) {
  return createPortal(
    <div className="modal_bg">
      {children}
    </div>,
    document.getElementById("modal")
  )
}
