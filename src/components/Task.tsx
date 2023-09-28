import React, { useState } from 'react'
import Person from './Person';
import { ITask, addPersonToCreatedTask, changeTaskStatus, loadTaskToTemporary, removeTask } from '../features/tasks/tasksSlice';
import { IPerson, addPerson, deletePerson, movePeopleBack } from '../features/people/peopleSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const Task = ({taskId,taskName,description,people,status}:ITask) => {
    const dispatch = useAppDispatch()
    const draggedUser = useAppSelector(state => state.tasks.draggedPerson)
    const [isFold,setIsFold] = useState(false);

    const fold = () => {
        setIsFold(prev => !prev)
    }

    const onDragStart = (e:any) => {
        dispatch(loadTaskToTemporary({taskId,taskName,description,people}))
        e.target.classList.add("task--drag")
    }

    const onDragEnter = (e:React.DragEvent) => {
        e.preventDefault()

    }
    
    const onDragOver = (e:React.DragEvent) => {
        e.preventDefault()
    }
    
    const onDragEnd = (e:any) => {
        dispatch(loadTaskToTemporary(null))
        e.target.classList.remove("task--drag")
    }

    const onDrop = (e:React.DragEvent) => {
        dispatch(addPersonToCreatedTask({taskId,draggedUser}))
        dispatch(deletePerson(draggedUser?.personId))
    }

    //split users and remove task
    const deleteTask = () => {
        dispatch(movePeopleBack(people))
        dispatch(removeTask(taskId))
    }

    const finishTask = () => {
        dispatch(changeTaskStatus({status:"finalized",taskId}))
    }

  return (
    <div className='task' onClick={() => fold()} draggable="true" onDragStart={(e) => onDragStart(e)} onDragEnd={(e) => onDragEnd(e)}>
        <div className='task__header'>
            <h3>{taskName}</h3>
        </div>
        <div className={`task__info ${ isFold ? "task__info--unfold" : ""}`}>
            <div className='task__info__description'>
                {description}
            </div>
            <h3 className="task__info__header">Appended Users:</h3>
            <div className='task__info__people' onDragEnter={(e) => onDragEnter(e)} onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e)}>
                {
                    people?.length > 0 ? people.map((person:IPerson, key:React.Key) =>  <Person key={key} personId={person.personId} profileImage={person.profileImage} personName={person.personName}/>) : "No people appended"
                }
            </div>
            <div className='task__bottom'>
                <button className='btn--delete' onClick={() => deleteTask()}>Delete Task</button>
                {
                    status !== "finalized" ? <button className='btn--finish' onClick={() => finishTask()}>Finish Task</button> : ""
                } 
            </div>
        </div>
    </div>
  )
}

export default Task