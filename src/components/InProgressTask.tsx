import React, { useRef } from 'react'
import Task from './Task'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { ITask, changeTaskStatus } from '../features/tasks/tasksSlice'


const status = "in-progress"

const InProgressTask = () => {
  const {draggedTask, tasks} = useAppSelector(state => state.tasks)

  const dispatch = useAppDispatch()
  const inProgressRef = useRef(null)

  const onDragEnter = (e:React.DragEvent) => {
    e.preventDefault()
  }

  const onDragOver = (e:React.DragEvent) => {
    e.preventDefault()
  }

  const onDrop = (e:React.DragEvent) => {
    
    //this is for dragging task
    if(draggedTask !== null){
      let {taskId} = draggedTask!
      dispatch(changeTaskStatus({status,taskId}))
    }
  }

  let t = tasks.filter(task => task.status === status)

  return (
    <div className='finalized-tasks section-default'>
        <div className='section-default__header'>
            <h2>Inprogress Tasks</h2>
        </div>
        <div className='section-default__items' 
          ref={inProgressRef}
          onDragOver={(e) => onDragOver(e)}
          onDragEnter ={(e) => onDragEnter(e)}
          onDrop ={(e) => onDrop(e)}
        >
          {
             t.map((task:ITask,key:React.Key) => <Task key={key} taskId={task.taskId} taskName={task.taskName} description={task.description} people={task.people} status={task.status}/>)
          }
        </div>
    </div>
  )
}

export default InProgressTask