import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user){
      setError("You must be logged in")
      return
    }
    console.log(title, load, reps);
    const response = await fetch("https://workoutbuddymern-ofca.onrender.com/api/workouts", {
      method: "POST",
      body: JSON.stringify({
        title,
        load,
        reps,
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${user.token}`
      }
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("new workout added", data);
      dispatch({ type: "CREATE_WORKOUT", payload: data });
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col my-5 px-5 col-span-3"
    >
      <h3 className="text-2xl font-bold">Add A New Workout</h3>

      <label htmlFor="">Exercise Title:</label>
        <input
          type="text"
          className={`border py-1 px-2 ${emptyFields.includes('title') ? 'border-error' : ''}`}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

      <label htmlFor="">Loadkg:</label>
      <input
        type="text"
        className={`border py-1 px-2 ${emptyFields.includes('load') ? 'border-error' : ''}`}
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label htmlFor="">Reps:</label>
      <input
        type="text"
        className={`border py-1 px-2 ${emptyFields.includes('reps') ? 'border-error' : ''}`}
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button
        type="submit"
        className="border hover:bg-green-900 bg-primary text-white  mt-4 py-1 px-2"
      >
        Add Workout
      </button>
      {error && <div className="bg-red-100 my-5 font-light rounded-md p-2 border border-error text-error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
