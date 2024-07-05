import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({workout}) => {
    const {dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();
    const handleClick = async () => {
        if(!user){
            return
        }
        const response = await fetch(`https://workoutbuddymern-ofca.onrender.com/api/workouts/${workout._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const data = await response.json();

        if(response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: data})
        }
    }
    
    return (
        <div className="bg-white p-10 my-5 flex justify-between items-center">
            <div>
                <h4 className="text-primary text-xl font-bold">{workout.title}</h4>
                <p> <span className="font-bold">Load (kg):</span> {workout.load}</p>
                <p><span className="font-bold">Reps :</span> {workout.reps}</p>
                <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            </div>
            
            <div className="cursor-pointer hover:bg-error bg-gray-100 text-center rounded-full px-2 py-1">
                <span onClick={handleClick} className="material-symbols-outlined">delete</span>
            </div>
        </div>
    )
}

export default WorkoutDetails;