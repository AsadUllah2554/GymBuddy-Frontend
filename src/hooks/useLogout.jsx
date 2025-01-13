import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const {dispatch:workoutsDispatch} = useWorkoutsContext();
    const logout = () => {
        localStorage.removeItem('user');
        workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
        dispatch({type: 'LOGOUT'});
        
    }
    return {logout};
}