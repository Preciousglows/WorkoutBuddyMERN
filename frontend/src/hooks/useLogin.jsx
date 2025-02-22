import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('https://workoutbuddymern-ofca.onrender.com/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        })
        const data = await response.json();

        if(!response.ok) {
            setIsLoading(false);
            setError(data.error);
        }

        if(response.ok) {
            //save user to local storage
            localStorage.setItem('user', JSON.stringify(data));

            //update auth context
            dispatch({type: 'LOGIN', payload: data});

            setIsLoading(false);
        }

    }

    return { login, isLoading, error };
}