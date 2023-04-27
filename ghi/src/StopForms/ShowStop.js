import { useGetStopQuery } from "../store/tripsApi";
import { useUpdateStopMutation } from "../store/tripsApi";
import { useDeleteStopMutation } from "../store/tripsApi";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import "../Loginform.css";
import React from "react";
import { Link } from "react-router-dom";

function ShowStop() {
  const navigate = useNavigate();
  const { tripId, stopId } = useParams();
  const { data: stop, isLoading } = useGetStopQuery({ tripId, stopId });
  const [updateStop] = useUpdateStopMutation({ tripId, stopId });
  const [deleteStop] = useDeleteStopMutation();

  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
  });

  const slideUp = useSpring({
    from: { transform: "translateY(50px)", opacity: 0 },
    to: { transform: "translateY(0)", opacity: 1 },
    delay: 800,
  });

  async function handleUpdate(e) {
    e.preventDefault();
    let body = {
      name,
      street,
      state,
      city,
      description,
    };
    updateStop({ body, tripId, stopId });
    navigate(`/trips/${tripId}`);
  }

  if (isLoading) {
    console.log(stopId);
    return <progress className="progress is-primary" max="100"></progress>;
  }

  if (stop) {
   return (
    <>
    <div className="position-absolute top-0 end-0 mt-4 me-4">
            <Link to="/" className="btn btn-lg btn-outline-light me-3">
              Home
            </Link>
            <Link to="/trips" className="btn btn-lg btn-outline-light me-3">
              Trips
            </Link>
            <Link to="/trips/:id/stops/create" className="btn btn-lg btn-outline-light">
              Add Stop
            </Link>
            <div className="position-absolute top-0 end-0 mt-4 me-4"></div>
          </div>
      <div className="row">
        <animated.div className="col-md-6 login-form-container" style={fadeIn}>
          <div className="card login-form-card">
            <div className="card-body">
              <h1 className="mb-4 text-center">Stop Details</h1>
              <img
                src={stop.picture_url}
                alt={stop.name}
                className="img-fluid mb-3"
              />
              <h2 className="text-center">{stop.name}</h2>
              <p>{stop.description}</p>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-lg btn-dark custom-btn"
                  onClick={() => {
                    deleteStop({ tripId, stopId });
                    navigate(`/trips/${tripId}`);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </animated.div>
          <animated.div className="col-md-6 login-form-container" style={fadeIn}>
            <div className="card login-form-card">
              <div className="card-body">
                <h1 className="mb-4 text-center">Update Stop</h1>
                <form id="update-stop-form" onSubmit={handleUpdate}>
                  <animated.div className="mb-3" style={slideUp}>
                    <label className="form-label">Name:</label>
                    <input
                      required
                      className="form-control"
                      name="name"
                      id="name"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </animated.div>
                  <animated.div className="mb-3" style={slideUp}>
                    <label className="form-label">Street:</label>
                    <input
                      required
                      className="form-control"
                      name="street"
                      id="street"
                      type="text"
                                        onChange={(e) => setStreet(e.target.value)}
                      value={street}
                    />
                  </animated.div>
                  <animated.div className="mb-3" style={slideUp}>
                    <label className="form-label">State:</label>
                    <input
                      required
                      className="form-control"
                      name="state"
                      id="state"
                      type="text"
                      onChange={(e) => setState(e.target.value)}
                      value={state}
                    />
                  </animated.div>
                  <animated.div className="mb-3" style={slideUp}>
                    <label className="form-label">City:</label>
                    <input
                      required
                      className="form-control"
                      name="city"
                      id="city"
                      type="text"
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                    />
                  </animated.div>
                  <animated.div className="mb-3" style={slideUp}>
                    <label className="form-label">Description:</label>
                    <input
                      required
                      className="form-control"
                      name="description"
                      id="description"
                      type="text"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </animated.div>
                  <animated.div style={slideUp}>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-lg btn-dark border custom-btn">
                            Update
                        </button>
                        </div>
                  </animated.div>
                </form>
              </div>
            </div>
          </animated.div>
        </div>
      </>
    );
  }
}

export default ShowStop;
