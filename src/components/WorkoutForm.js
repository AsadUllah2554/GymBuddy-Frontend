import React from 'react'

import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

export default function WorkoutForm () {
    const {dispatch,title, setTitle,load, setLoad,reps, setReps,
        error, setError,emptyFields, setEmptyFields,workoutID,update} = useWorkoutsContext()
    // const [title, setTitle] = useState('')
    // const [load, setLoad] = useState('')
    // const [reps, setReps] = useState('')
    // const [error, setError] = useState(null)
    // const [emptyFields, setEmptyFields] = useState([])
    const {user} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!user){
          setError('You must be logged in to add a workout')
          return
        }

        const workout = {title, load, reps}

        if(!update) {
            const response  =  await fetch('https://gymbuddy-797d4ba7ac25.herokuapp.com/api/workouts', {
                method: 'POST',
               headers: {"Content-Type": "application/json",
               'Authorization': `Bearer ${user.token}`},
                body: JSON.stringify(workout)
            })
            const json = await response.json()
    
            if(!response.ok) {
                setError(json.error)
                setEmptyFields(json.emptyFields)
            }
            if(response.ok) {
                setTitle('')
                setLoad('')
                setReps('')
                setError(null)
                setEmptyFields([])
                console.log("New workout added", json)
                dispatch({type:'CREATE_WORKOUT',payload:json})
    
            }

        }

        if(update) {
            console.log("Workout ID", workoutID)
            const response = await fetch(`https://worried-hare-bathing-suit.cyclic.app/api/workouts/${workoutID}`,{
                method:'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(workout)
            })
              const json = await response.json()
              console.log("JSON", json)

              if(!response.ok) {
                setError(json.error)
               // setEmptyFields(json.emptyFields)
            }

              if(response.ok) {
                const latestFetch = await fetch(`https://worried-hare-bathing-suit.cyclic.app/api/workouts/${workoutID}`)
                const newJson = await latestFetch.json()
                console.log(latestFetch)
                console.log(newJson)
                setTitle('')
                setLoad('')
                setReps('')
                setError(null)
                setEmptyFields([])
              console.log("Workout updated", json)
                dispatch({type:'UPDATE_WORKOUT',json})
              }

        }
    }

  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>{!update ? "Add a New Workout" : "Update Workout"}  </h3>
        <label>Exercise Title:</label>
        <input type='text'  value={title} onChange={(e) => setTitle(e.target.value)} 
        className={emptyFields.includes('title') ? 'error' : ''}
        />

        <label>Load (in kg):</label>
        <input type='number'  value={load} onChange={(e) => setLoad(e.target.value)} 
           className={emptyFields.includes('load') ? 'error' : ''}
        />

        <label>Reps:</label>
        <input type='text'  value={reps} onChange={(e) => setReps(e.target.value)}
           className={emptyFields.includes('reps') ? 'error' : ''}
        />

        <button>{!update ? "Add workout" : "Update workout"} </button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}
