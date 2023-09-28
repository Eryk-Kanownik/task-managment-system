import React from 'react'

interface IModal{
  isVisible:boolean
  children:React.ReactNode
}

export const Modal = ({isVisible,children}:IModal) => {
  return (
    <div className={`modal-wrapper ${isVisible ? "modal-wrapper--show": ""}`}>
      <div className='modal'>
        {children}
      </div>
    </div>
  )
}
