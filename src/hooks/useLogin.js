import { useState } from "react";
import {useAuthContext} from "./useAuthContext";

export const useLogin = () => {

    const [error,setError] = useState(null);
    const [isloading,setIsLoading] = useState(false);
    const {dispatch} = useAuthContext();

    const login = async (email,password) => {
        setIsLoading(true);
        setError(null);
        const response = await fetch('https://gymbuddy-797d4ba7ac25.herokuapp.com/api/user/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
        });
        const json = await response.json();
    
        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
         
        }
        if(response.ok){
     // save the user to local storage // basically storing email, token from userController from backend
          localStorage.setItem('user',JSON.stringify(json));

    // update the context
        dispatch({type: 'LOGIN',payload: json});
        setIsLoading(false);

        }
    }
    return {error,isloading,login};
}