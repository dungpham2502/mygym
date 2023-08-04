import { useEffect, useState } from "react";
import { WorkoutDetails } from "../components/WorkoutDetails";
import { WorkoutForm } from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

export const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    useEffect(() => {
    const fetchWorkout = async () => {
        const response = await fetch('http://localhost:3000/api/workouts/', {
            headers: {'Authorization': `Bearer ${user.token}`}
        });
        const json = await response.json(); 
        console.log(json);

        if (response.ok) {
            dispatch({ type: 'SET_WORKOUTS', payload: json });
        }
    };

        if (user) {
        fetchWorkout()
    };
  }, [dispatch, user]);

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails
                        key={workout._id}
                        workout={workout}
                        />
                ))}
            </div>
            <div>
                <WorkoutForm />
            </div>
        </div>
    )
}

