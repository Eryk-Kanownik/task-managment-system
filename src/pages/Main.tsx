import React from 'react'
import CreatedTask from '../components/CreatedTasks'
import InProgressTask from '../components/InProgressTask'
import FinalizedTasks from '../components/FinalizedTasks'
import People from '../components/People'


const Main = () => {
  return (
    <div className='view'>
      <People />
      <CreatedTask />
      <InProgressTask />
      <FinalizedTasks />
    </div>
  )
}

export default Main