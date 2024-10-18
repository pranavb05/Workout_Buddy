import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from '../hooks/useLogout'

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"


const Dashboard = () => {
    const { workouts, dispatch } = useWorkoutsContext()

    const {logout} = useLogout()

    const [error, setError] = useState('') 

    const {user} = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const delay = ms => new Promise(res => setTimeout(res, ms));
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts`, {
            headers:{
                'Authorization': `Bearer ${user.token}`
                }
            })
            if (response.status === 401) {
                setError(`Your authorization token has expired or you are not authorized to view this page. You will be logged out in 5 seconds.`)
                await delay(5000)
                logout()
            }
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json.workouts})
            }
        }
        if (user){
            fetchWorkouts()
        }
        
    }, [dispatch, user, setError, logout])


    return ( 
    <div className="dashboard">
        <div className="workouts">
            {workouts && workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
            ))}
            {error && <div className="error">{error}</div>}
        </div>
        <WorkoutForm />
    </div> )
}
 
export default Dashboard