import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();
    useEffect(() => {
        const fetchWorkouts = async () => {
           const response = await fetch('https://workoutbuddymern-ofca.onrender.com/api/workouts', {
               headers: {
                'Authorization': `Bearer ${user.token}`
            },
           })
           const data = await response.json();


           if(response.ok) {
            dispatch({type: 'SET_WORKOUTS', payload: data})
           }
        };

        if (user){
            fetchWorkouts();
        }
    }, [dispatch, user]);


    return (
        <div className="bg-gray-100 h-1/2 px-5 grid grid-cols-8 gap-4">
           <div className="col-span-5" >
            {workouts && workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
            ))}
           </div>

           <WorkoutForm />
        </div>
    )
}

export default Home;