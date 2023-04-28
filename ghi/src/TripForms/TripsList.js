import { useGetTripsQuery } from "../store/tripsApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteTripMutation } from "../store/tripsApi";
import Carousel from "react-bootstrap/Carousel";
import "../App.css";
import backgroundImage from '../Backgrounds/Tripslist.svg';
import { useLogoutMutation } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import { useGetTokenQuery } from "../auth/auth";


function TripsList() {
  const { data, error, isLoading } = useGetTripsQuery();
  const [deleteTrip, result] = useDeleteTripMutation();
  const [user, setUser] = useState(null);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const { data: token, isLoading: tokenLoad } = useGetTokenQuery();

  if (!token && !tokenLoad) {
    navigate('/');
    console.error( 'please sign in to view trips.', error)
  }
  
  function handleLogout() {
    try {
      logout();
      navigate ('/');
    } catch (error) {
      console.error( 'logout failed:', error);
      
    }
    }

  if (isLoading) {
    console.log(token)
    return <progress className="progress is-primary" max="100"></progress>;
  }


return (
  <>
    <div className="position-absolute top-0 end-0 mt-4 me-4">
      <Link to="/trips" className="btn btn-lg btn-outline-light me-3">
        Home
      </Link>
      <Link to="/trips/create" className="btn btn-lg btn-outline-light me-3">
        Add Trip
      </Link>
      <button onClick={handleLogout} className="btn btn-lg btn-outline-light">
        Signout
      </button>
    </div>
        <div
          style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '105vh',
}}
    >
   {token && (
        <section className="h-100 gradient-custom-2">
    <div className="container h-100">
      <div className="row h-100">
        <div className="col d-flex justify-content-center align-items-center">
          <div className="card">
            <div
              className="rounded-top text-white d-flex flex-row"
              style={{ backgroundColor: "#000", height: "200px" }}
            >
              <div
                className="ms-4 mt-5 d-flex flex-column"
                style={{ width: "150px" }}
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                  alt="Generic placeholder image"
                  className="img-fluid img-thumbnail mt-4 mb-2"
                  style={{ width: "150px", zIndex: 1 }}
                />
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  data-mdb-ripple-color="dark"
                  style={{ zIndex: 1 }}
                >
                  Edit profile
                </button>
              </div>
              <div className="ms-3" style={{ marginTop: "130px" }}>
                <h5>
                  {token.account.first_name} {token.account.last_name}
                </h5>
                <p>{token.account.email}</p>
              </div>
            </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-90">
                    <div>
                      <p className="mb-1 h5">253</p>
                      <p className="small text-muted mb-0">Photos</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5">1M</p>
                      <p className="small text-muted mb-0">Miles</p>
                    </div>
                    <div>
                      <p className="mb-1 h5">478</p>
                      <p className="small text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div
                      className="p-4"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <p className="font-italic mb-1">Digital Nomad</p>
                      <p className="font-italic mb-1">Lives in New York</p>
                      <p className="font-italic mb-0">Software Engineer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     )}

      <div className="container mt-5">
        <div className="row">
          {data.trips.map((trip) => (
            <div key={trip.id} className="col-md-4">
              <div className="card product-card mb-4">
                <Carousel className="custom-carousel">
                  <Carousel.Item>
                    <img
                        className="carousel_image"
                        src= {trip.picture_url}
                        alt="Trip image"
                      />
                    <Carousel.Caption>
                      <h5>{trip.name}</h5>
                    </Carousel.Caption>
                  </Carousel.Item>
                  {trip.stops &&
                    trip.stops.map((stop) => (
                      <Carousel.Item key={stop.id}>
                        <img
                          className="carousel_image"
                          src={stop.picture_url}
                          alt="Stop image"
                        />
                        <Carousel.Caption>
                          <h5>{stop.name}</h5>
                        </Carousel.Caption>
                      </Carousel.Item>
                    ))}
                </Carousel>
                <div className="card-body">
                  <h5 className="card-text">{trip.name}</h5>
                  <p className="card-text">{trip.description}</p>
                  <p className="card-text">
                    <small className="card-text">
                      Start Date: {trip.start_date}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="card-text">
                      End Date: {trip.end_date}
                    </small>
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link to={`/trips/${trip.id}`} className="btn btn-lg btn-outline-light me-3">
                        View Trip
                      </Link>
                      <button
                        onClick={() => deleteTrip(trip.id)}
                        className="btn btn-lg btn-outline-light me-3"
                      >
                        Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  </>
);
                    }

export default TripsList;
