import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateTripMutation } from "../store/tripsApi";
import { useParams } from 'react-router-dom';
import { useSpring, animated } from "react-spring";
import Image from "../Backgrounds/TripperLogo.svg";
import { Link } from "react-router-dom";




function UpdateTrip() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [pic, setPic] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [description, setDescription] = useState('');

    const [updateTrip, result, isLoading  ] = useUpdateTripMutation(id);


  const fadeIn = useSpring({
  from: { opacity: 0 },
  to: { opacity: 1 },
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
  <div className="position-absolute top-0 end-0 mt-4 me-4">
            <Link to="/" className="btn btn-lg btn-outline-light me-3">
              Home
            </Link>
            <Link to="/trips" className="btn btn-lg btn-outline-light me-3">
              Trips
            </Link>
            <Link to="/trips/create" className="btn btn-lg btn-outline-light">
              Create Trip
            </Link>
            <div className="position-absolute top-0 end-0 mt-4 me-4"></div>
          </div>
    <div className="row">
      <animated.div className="col-md-6 login-form-container" style={fadeIn}>
        <div className="card login-form-card">
               <animated.img
                  src={Image}
                  alt="Tripper Logo"
                  className="tripper-logo"
                  style={slideUp}
                />
          <div className="card-body">
            <h1 className="mb-4 text-center">Update Trip</h1>
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
              <div className="d-grid gap-2 mt-3">
                <button className="btn btn-lg btn-dark outline-light">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </animated.div>
    </div>
  </>
);
}

export default UpdateTrip;
