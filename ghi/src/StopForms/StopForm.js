import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateStopMutation } from "../store/tripsApi";
import { useParams } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import "../Loginform.css";
import Image from "../Backgrounds/TripperLogo.svg";
import { Link } from "react-router-dom";

function CreateStop() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [createStop, result, isLoading] = useCreateStopMutation(id);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 300,
    config: { duration: 1000 },
  });

  const slideUp = useSpring({
    from: { transform: "translate3d(0,40px,0)", opacity: 0 },
    to: { transform: "translate3d(0,0,0)", opacity: 1 },
    delay: 300,
    config: { duration: 1000 },
  });

  if (isLoading) {
    return (
      <progress className="progress is-primary" max="100"></progress>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let body = {
      name,
      street,
      state,
      city,
      description,
    };
    createStop({ body, id });
    navigate(`/trips/${id}`);
  }


   return (
  <>
      <div className="position-absolute top-0 end-0 mt-4 me-4">
                <Link to="/" className="btn btn-lg btn-outline-light me-3">
                  Home
                </Link>
                <Link to="/trips" className="btn btn-lg btn-outline-light me-3">
                  Trips
                </Link>
                <div className="position-absolute top-0 end-0 mt-4 me-4"></div>
              </div>
    <animated.div className="login-form-container" style={fadeIn}>
      <div className="card login-form-card">
          <animated.img
          src={Image}
          alt="Tripper Logo"
          className="tripper-logo"
          style={slideUp}
        />
        <div className="card-body">
          <h1 className="mb-4 text-center">Create Stop</h1>
          <form id="create-trip-form" onSubmit={handleSubmit}>
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
            <animated.div className="d-grid" style={slideUp}>
              <button
                type="submit"
                className="btn btn-primary elegant-btn bg-navy-blue"
              >
                Create
              </button>
            </animated.div>
          </form>
        </div>
      </div>
    </animated.div>
  </>
);
   }
export default CreateStop;
