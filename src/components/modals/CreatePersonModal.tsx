import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { addPerson } from '../../features/people/peopleSlice';

interface ICreatePersonModal{
    closeModal:Function
}

const CreatePersonModal = ({closeModal}:ICreatePersonModal) => {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState("")

    const createPerson = () => {
        dispatch(addPerson(username))
        closeModal()
        setUsername("")
    }

  return (
    <>
        <div className='modal__header'>
          <h2>Create Person</h2>
          <h2 className='modal__header__close' onClick={() => closeModal()}>&times;</h2>
        </div>
        <div className='modal__content'>
          <label htmlFor='username' >Username</label>
          <input id='username' value={username} type="text" placeholder='Username...' onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className='modal__bottom'>
          <button onClick={() => createPerson()}>Create Person</button>
        </div>
    </>
  )
}

export default CreatePersonModal