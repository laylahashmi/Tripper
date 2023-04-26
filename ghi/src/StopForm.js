import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateStopMutation } from "./store/tripsApi";
import { useParams } from "react-router-dom";

function CreateStop() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [createStop, result, isLoading] = useCreateStopMutation(id);

    if (isLoading) {
        return (
            <progress className="progress is-primary" max='100'></progress>
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let body = {
            name,
            street,
            state,
            city,
            description
        }
        createStop({body, id});
        navigate(`/trips/${id}`)
    }

    return (
        <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create Stop</h1>
            <form id="create-trip-form" onSubmit={handleSubmit}>
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
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </>
    )
}

export default CreateStop;