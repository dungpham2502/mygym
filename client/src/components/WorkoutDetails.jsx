import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../hooks/useAuthContext';

export const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch(`http://localhost:3000/api/workouts/${workout._id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${user.token}` }
        })
        const json = await response.json();
        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Sets: </strong>{workout.sets}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p><strong>Created:</strong> {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
    )
}