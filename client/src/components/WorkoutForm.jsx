import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

export const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState(0);
    const [reps, setReps] = useState(0);
    const [sets, setSets] = useState(0);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return;
        }

        const workout = {
            title,
            load,
            reps,
            sets
        }
        const response = await fetch('http://localhost:3000/api/workouts/', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}` 
            }
        })
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        } else {
            setTitle('');
            setReps(0);
            setSets(0);
            setLoad(0);
            setError(null);
            console.log('New workout added', json);
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return (
        <form className="create-workout" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label htmlFor="">Exercise Name:</label>
            <input
                type="text"
                onChange={(event) => setTitle(event.target.value)}
                value = {title}
            />

            <label htmlFor="">Load (in KG):</label>
            <input
                type="number"
                onChange={(event) => setLoad(event.target.value)}
                value = {load}
            />

            <label htmlFor="">Sets</label>
            <input
                type="number"
                onChange={(event) => setSets(event.target.value)}
                value = {sets}
            />

            <label htmlFor="">Reps</label>
            <input
                type="number"
                onChange={(event) => setReps(event.target.value)}
                value = {reps}
            />

            <button type="submit">Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}