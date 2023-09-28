import React from 'react'

interface ICreateTask{
    openModal:Function
}

const CreateTask = ({openModal}:ICreateTask) => {
  return (
    <div className='create-task' onClick={() => openModal()}><h1>+</h1></div>
  )
}

export default CreateTask