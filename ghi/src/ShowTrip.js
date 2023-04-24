import { useGetTripQuery } from "./store/tripsApi";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function ShowTrip() {
    const navigate = useNavigate()

    async function handleUpdate() {
        navigate(`/trips/${trip.id}/update`)
    }

    const { id } = useParams();
    const { data: trip, error, isLoading } = useGetTripQuery(id)
    console.log(trip)

    if (isLoading) {
        return (
            <progress className="progress is-primary" max='100'></progress>
        );
    }
    

    return (
        <>
        <h1>Show Trip</h1>
        <h2><Link to={`/trips/${id}/stops/create`}>Add a Stop</Link></h2>
        <button onClick={handleUpdate}>Update</button>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr key={trip.id}>
                    <td>{trip.name}</td>
                    <td>{trip.picture_url}</td>
                    <td>{trip.start_date}</td>
                    <td>{trip.end_date}</td>
                    <td>{trip.description}</td>
                </tr>
            </tbody>
        </table>
        </>
    )
}

export default ShowTrip;