import { useGetTripQuery } from "./store/tripsApi";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';



function ShowTrip() {
    const navigate = useNavigate()

    async function handleUpdate() {
        navigate(`/trips/${trip.id}/update`)
    }

    const { id } = useParams();
    const { data: trip, error, isLoading } = useGetTripQuery(id)

    if (isLoading) {
        return (
            <progress className="progress is-primary" max='100'></progress>
        );
    }
    
    if (trip) {
        console.log('print', trip)
        console.log(trip.stops)
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
            <div className='row row-cols-1 row-cols-sm-3 align-items-center'>
                {trip.stops.map((stop) => {
                    return (
                <Card className= 'mb-3 shadow mr-3 ml-3'key={stop.id}>
                    <Card.Img variant="top" src="https://tinyurl.com/2z4pddmp" />
                    <Card.Body>
                    <Card.Title>{stop.name}</Card.Title>
                    <Card.Text>
                        {stop.description}
                    </Card.Text>
                    </Card.Body>
                </Card>

                    )
                })}
            </div>
            </>
        )
    } else {
        return 'loading'
    }
}

export default ShowTrip;