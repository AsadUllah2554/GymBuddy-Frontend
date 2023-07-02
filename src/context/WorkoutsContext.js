import { createContext,useReducer,useState } from "react";
export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case "SET_WORKOUTS":
            return {
              
                workouts:  action.payload
            }
        case "CREATE_WORKOUT":
            return {
            
                workouts:  [ action.payload,...state.workouts]
            }
            case "UPDATE_WORKOUT":
            return {
                workouts: state.workouts.map(workout => workout._id === action.payload._id ? action.payload : workout)
            }
       case "DELETE_WORKOUT":
        return {
            workouts: state.workouts.filter(workout => workout._id !== action.payload._id)
           
            }
        // case "GET_WORKOUTS":
        //     return {
        //         ...state,
        //         workouts: action.payload
        //     }
        default:
            return state;
    }
}

export const WorkoutsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(workoutsReducer, {workouts:null})

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [update, setUpdate] = useState(false)
    const [workoutID, setworkoutID] = useState()
    const [emptyFields, setEmptyFields] = useState([])

    return (
        <WorkoutsContext.Provider value={{...state,dispatch, title, setTitle,load, setLoad,reps, setReps,
            error, setError,emptyFields, setEmptyFields,workoutID, setworkoutID,update, setUpdate
        }}>
            {children}
        </WorkoutsContext.Provider>)

}