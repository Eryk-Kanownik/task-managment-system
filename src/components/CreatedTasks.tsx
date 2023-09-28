import { useState } from 'react'
import Task from './Task'
import CreateTask from './CreateTask'
import { Modal } from './Modal';
import CreateTaskModal from './modals/CreateTaskModal';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ITask, changeTaskStatus } from '../features/tasks/tasksSlice';

const status = "created"

const CreatedTasks = () => {
  const dispatch = useAppDispatch()
  const {tasks, draggedTask, draggedPerson} = useAppSelector(state => state.tasks)
  const [isVisible, setIsVisible] = useState(false);
  
  const openModal = () => {
    setIsVisible(true);
  }

  const closeModal =() => {
    setIsVisible(false)
  }

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
          <h2>Created Tasks</h2>
      </div>
      <div className='section-default__items' 
            onDragOver={(e) => onDragOver(e)}
            onDragEnter ={(e) => onDragEnter(e)}
            onDrop ={(e) => onDrop(e)}
          >
          {
             t.map((task:ITask,key:React.Key) => <Task key={key} taskId={task.taskId} taskName={task.taskName} description={task.description} people={task.people} status={task.status}/>)}
          <CreateTask openModal={openModal}/>
      </div>
      <Modal isVisible={isVisible}><CreateTaskModal closeModal={closeModal}/></Modal>
    </div>
  )
}

export default CreatedTasks