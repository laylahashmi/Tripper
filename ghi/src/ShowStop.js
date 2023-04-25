import { useGetStopQuery } from "./store/tripsApi";
import { useUpdateStopMutation } from "./store/tripsApi";
import { useDeleteStopMutation } from "./store/tripsApi";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';


function ShowStop() {
    const navigate = useNavigate();
    const { tripId, stopId } = useParams();
    const { data: stop, isLoading } = useGetStopQuery({tripId, stopId});
    const [ updateStop ] = useUpdateStopMutation({tripId, stopId});
    const [ deleteStop ] = useDeleteStopMutation();

    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');

    async function handleUpdate(e) {
        e.preventDefault();
        let body = {
            name,
            street,
            state,
            city,
            description
        }
        updateStop({body, tripId, stopId});
        navigate(`/trips/${tripId}`)
    }

    if (isLoading) {
        console.log(stopId);
        return (
            <progress className="progress is-primary" max='100'></progress>
        );
    }
    
    if (stop) {
        // console.log('stop', stop)
        return (
            <>
                <Card className= 'mb-3 shadow mr-3 ml-3 mx-auto'key={stop.id}>
                    <Card.Img variant="top" src="https://tinyurl.com/2z4pddmp" />
                    <Card.Body>
                    <Card.Title>{stop.name}</Card.Title>
                    <Card.Text>
                        {stop.description}
                    </Card.Text>
                    </Card.Body>
                </Card>
                <button onClick={() => {deleteStop({tripId, stopId});
                    navigate(`/trips/${tripId}`)}}>Delete</button>
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Update Stop</h1>
                            <form id="create-trip-form" onSubmit={handleUpdate}>
                                <div className="form-floating mb-3">
                                    <input
                                    required
                                    className="form-control"
                                    name="name"
                                    id="name"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    />
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                    required
                                    className="form-control"
                                    name="street"
                                    id="street"
                                    type="text"
                                    onChange={(e) => setStreet(e.target.value)}
                                    value={street}
                                    />
                                    <label htmlFor="street">Street</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                    required
                                    className="form-control"
                                    name="state"
                                    id="state"
                                    type="text"
                                    onChange={(e) => setState(e.target.value)}
                                    value={state}
                                    />
                                    <label htmlFor="state">State</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                    required
                                    className="form-control"
                                    name="city"
                                    id="city"
                                    type="text"
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                    />
                                    <label htmlFor="city">City</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                    required
                                    className="form-control"
                                    name="description"
                                    id="description"
                                    type="text"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    />
                                    <label htmlFor="description">Description</label>
                                </div>
                                <button className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default ShowStop;