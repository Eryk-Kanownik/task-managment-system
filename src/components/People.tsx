import React, { useState } from 'react'
import Person from './Person'
import CreateTask from './CreateTask'
import {  Modal } from './Modal';
import CreatePersonModal from './modals/CreatePersonModal';
import { useAppSelector } from '../app/hooks';
import { IPerson, addPerson, movePeopleBack } from '../features/people/peopleSlice';
import { changeTaskStatus, removePersonFromTask } from '../features/tasks/tasksSlice';
import { useDispatch } from 'react-redux';

const People = () => {
  const dispatch = useDispatch();
  const people = useAppSelector(state => state.people.people)
  const {draggedPerson, draggedTask} = useAppSelector(state => state.tasks)

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
    if(draggedPerson !== null){
      dispatch(movePeopleBack([draggedPerson]))
      dispatch(removePersonFromTask({taskId:draggedTask?.taskId,personId:draggedPerson.personId}))
      
    }
  }


  return (
    <div className='people section-default'>
        <div className='section-default__header'>
            <h2>Availible People</h2>
        </div>
        <div className='people__items'
            onDragOver={(e) => onDragOver(e)}
            onDragEnter ={(e) => onDragEnter(e)}
            onDrop ={(e) => onDrop(e)}>
            <div className='people__items__people'
            >
              {
                people.map((person:IPerson,key:React.Key) => <Person key={key} personId={person.personId} profileImage={person.profileImage} personName={person.personName}/>)
              }
            </div>
            <CreateTask openModal={openModal} />
        </div>
        <Modal isVisible={isVisible}><CreatePersonModal closeModal={closeModal}/></Modal>
    </div>
  )
}

export default People

function dispatch(arg0: { payload: any; type: "tasks/changeTaskStatus"; }) {
  throw new Error('Function not implemented.');
}
