import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const { dispatch: workoutDispatch } = useWorkoutsContext();

  const fetchWorkouts = async (token) => {
    const response = await fetch(`${process.env.SERVER_URL}/api/workouts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      workoutDispatch({ type: "SET_WORKOUTS", payload: json });
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(`${process.env.SERVER_URL}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage // basically storing email, token from userController from backend

      fetchWorkouts(json.token);
      localStorage.setItem("user", JSON.stringify(json));

      // update the context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };
  return { error, isloading, login };
};
