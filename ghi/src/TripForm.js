import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateTripMutation } from "./store/tripsApi";
import Image from "./TripperLogo.svg"; // Import the TripperLogo.svg
import "./Loginform.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function TripForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [pic, setPic] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [description, setDescription] = useState('');
  const [createTrip, result] = useCreateTripMutation();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createTrip({ name, pic, start, end, description });
    } catch (error) {
      console.log(error);
    }
};

  if (result.isSuccess) {
    navigate('/trips');
  }

  return (
    <>
      <div className="login-form-container">
        <div className="card login-form-card">
          <img src={Image} alt="Tripper Logo" className="tripper-logo" />
          <div className="card-body">
            <form id="create-trip-form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input
                  required
                  className="form-control"
                  name="name"
                  id="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pic">Picture</label>
                <input
                  required
                  className="form-control"
                  name="pic"
                  id="pic"
                  type="text"
                  onChange={(e) => setPic(e.target.value)}
                  value={pic}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="start">Start Date</label>
                <input
                  required
                  className="form-control"
                  name="start"
                  id="start"
                  type="text"
                  onChange={(e) => setStart(e.target.value)}
                  value={start}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="end">End Date</label>
                <input
                  required
                  className="form-control"
                  name="end"
                  id="end"
                  type="text"
                  onChange={(e) => setEnd(e.target.value)}
                  value={end}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <input
                  required
                  className="form-control"
                  name="description"
                  id="description"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary elegant-btn bg-navy-blue">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripForm;
