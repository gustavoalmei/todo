import React from 'react'
import Style from "./Modal.module.css";

type Props = {
  children: React.ReactNode, // Informa que irá receber um JSX
  hidden(param: boolean): void
}

export default function Modal({children, hidden}: Props) {
  return (
    <div id='modal' className="hide">
      <div className={Style.fade} onClick={()=>{ hidden(true)}}></div>
      <div className={Style.modal}>
        <h2>Texto Modal</h2>
        {children}
      </div>
    </div>
  )
}