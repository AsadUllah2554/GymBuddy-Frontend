import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

import formateDistanceToNow from 'date-fns/formatDistanceToNow'

export default function WorkoutDetails({workout}) {
  const {user} = useAuthContext()

  const {dispatch,setUpdate,setworkoutID} = useWorkoutsContext()
  const handleDelete = async () => {
    if(!user){
      return
    }
    const response = await fetch(`${process.env.SERVER_URL}/api/workouts/${workout._id}` ,{
      method:'DELETE',
      headers:{
        'Authorization':`Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if(response.ok) {
      dispatch({type:'DELETE_WORKOUT',payload:json})
    }
  }

  const handleUpdate = ()=> {
    if(!user){
      return
    }
    setUpdate(true)
    setworkoutID(workout._id)

  }
  return (
    <div className='workout-details'>
        <h4>{workout.title}</h4>
        <p><strong>Load (kg) : </strong> {workout.load}</p>
        <p><strong>Reps : </strong> {workout.reps}</p>
        <p>{formateDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
        <span className='' onClick={handleUpdate}>Update</span>
      <h4 className='material-symbols-outlined' onClick={handleDelete}>Delete</h4>
    </div>
  )
}
