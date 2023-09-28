import React, { useState } from 'react'
import { v4 } from 'uuid'
import { useAppDispatch } from '../../app/hooks'
import { addTask } from '../../features/tasks/tasksSlice'
interface ICreateTaskModal{
    closeModal:Function
}

const CreateTaskModal = ({closeModal}:ICreateTaskModal) => {
  const dispatch = useAppDispatch()
  const [task, setTask] = useState({taskName:"",description:""})

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTask((prev) => ({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }

  const createTask = () => {
    dispatch(addTask(task))
    setTask({
      taskName:"",
      description:""
    })
    closeModal()
  }

  return (
    <>
        <div className='modal__header'>
          <h2>Create Task</h2>
          <h2 className='modal__header__close' onClick={() => closeModal()}>&times;</h2>
        </div>
        <div className='modal__content'>
          <label htmlFor='taskName'>Task  Name</label>
          <input id='taskName' value={task.taskName} name='taskName' type="text" placeholder='Username...' onChange={(e) => onChange(e)}/>
          <label htmlFor='description'>Description</label>
          <textarea rows={3} id='description' value={task.description} name='description' placeholder='Description...' onChange={(e) => onChange(e)}></textarea>
        </div>
        <div className='modal__bottom'>
          <button onClick={() => createTask()}>Create Task</button>
        </div>
    </>
  )
}

export default CreateTaskModal