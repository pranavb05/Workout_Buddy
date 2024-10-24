import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import {faRectangleXmark} from '@fortawesome/free-regular-svg-icons'
import {useState} from 'react'
import WorkoutForm from './WorkoutForm'

//date fns

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    const {user} = useAuthContext()
    const [modal, setModal] = useState(false)

    //delete workout function
    const handleDeleteClick = async () => {
        if (!user){
            return
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts/` + workout._id,{
            method:'DELETE', 
            headers:{
                'Authorization': `Bearer ${user.token}`
                }
        })

        const json = await response.json()

        if (response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: json.workout})
            console.log('Workout deleted!')
        }
    }
    //edit workout function
    const toggleModal = () => {
        setModal(!modal)
    }

    //render component
    return (
        <>
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (lbs): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.updatedAt), { addSuffix: true})}</p>
            <span className="edit" onClick={toggleModal}><FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon></span>
            <span className="delete" onClick={handleDeleteClick}><FontAwesomeIcon icon={faTrash} size="lg"/></span>
            
        </div>
        {modal && (
            <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content">
                <WorkoutForm workout={workout} toggleModal={toggleModal}/>
                <span className="close-modal">
                <FontAwesomeIcon icon={faRectangleXmark} size="lg" onClick={toggleModal} />
                </span>
            </div>
          </div>
        )}
        </>
     );
}
 
export default WorkoutDetails;