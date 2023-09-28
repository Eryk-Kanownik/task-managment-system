import React from 'react'
import { IPerson, deletePerson } from '../features/people/peopleSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {loadUserToTemporary } from '../features/tasks/tasksSlice';

const Person = ({personId,profileImage,personName}:IPerson) => {
  const people = useAppSelector(state => state.people.people)
  
  const dispatch = useAppDispatch();
  const delPerson = () => {
    dispatch(deletePerson(personId))
  }

  const onDragStart = (e: any) => {
    e.target.classList.add("person--drag")
    dispatch(loadUserToTemporary({personId,profileImage,personName}))
    
  }
  
  const onDragEnd = (e:any) => {
    e.target.classList.remove("person--drag")
    dispatch(loadUserToTemporary(null))
  } 

  return (
    <div className='person' draggable={true} onDragStart={(e) => onDragStart(e)} onDragEnd={(e) => onDragEnd(e)}>
      <div className='person__wrapper'>
        <img className='person__image' src={profileImage}/>
        <h3 className='person__name'>{personName}</h3>
      </div>
      {
        people.map(person => person.personId).indexOf(personId) !== -1 ?
          <h3 className='person__delete' onClick={() => delPerson()}>&times;</h3>
        : ""
      }
      
    </div>
  )
}

export default Person