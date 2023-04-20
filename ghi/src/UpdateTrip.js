import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateTripMutation } from "./store/tripsApi";
import { useParams } from 'react-router-dom';


function UpdateTrip() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [pic, setPic] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [description, setDescription] = useState('');

    const [updateTrip, result, isLoading  ] = useUpdateTripMutation(id);

    if (isLoading) {
        return (
            <progress className="progress is-primary" max='100'></progress>
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let body = {
            name,
            pic,
            start,
            end,
            description
        }
        updateTrip({body, id});
        navigate(`/trips/${id}`)
    };



    return (
        <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Update Trip</h1>
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
                  name="pic"
                  id="pic"
                  type="text"
                  onChange={(e) => setPic(e.target.value)}
                  value={pic}
                />
                <label htmlFor="pic">Picture</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  required
                  className="form-control"
                  name="start"
                  id="start"
                  type="text"
                  onChange={(e) => setStart(e.target.value)}
                  value={start}
                />
                <label htmlFor="start">Start Date</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  required
                  className="form-control"
                  name="end"
                  id="end"
                  type="text"
                  onChange={(e) => setEnd(e.target.value)}
                  value={end}
                />
                <label htmlFor="end">End Date</label>
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

export default UpdateTrip;