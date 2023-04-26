import { useGetTripsQuery } from "./store/tripsApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteTripMutation } from "./store/tripsApi";
import "./App.css";


function TripsList() {
  const [deleteTrip, result] = useDeleteTripMutation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/account`, {
        credentials: "include",
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    };

    fetchUserData();
  }, []);

  const { data, error, isLoading } = useGetTripsQuery();

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  return (
     <>
      {user && (
        <div className="container mt-5">
          <h2 className="mb-4">Profile</h2>
          <div className="profile-card">
            <div className="profile-card-header">
              <h5 className="profile-card-title">{user.username}</h5>
            </div>
            <div className="profile-card-body">
              <p className="profile-card-text">
                {user.first_name} {user.last_name}
              </p>
              <p className="profile-card-text">{user.email}</p>
            </div>
          </div>
        </div>
      )}
      <div className="container mt-5">
        <div className="row">
          {data.trips.map((trip) => (
            <div key={trip.id} className="col-md-4">
              <div className="card product-card mb-4">
                <img
                  src="https://via.placeholder.com/300x200"
                  className="card-img-top"
                  alt="Trip image"
                />
                <div className="card-body">
                  <h5 className="card-title">{trip.name}</h5>
                  <p className="card-text">{trip.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Start Date: {trip.start_date}
                    </small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      End Date: {trip.end_date}
                    </small>
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link to={`/trips/${trip.id}`} className="btn btn-sm btn-outline-primary">
                        View Trip
                      </Link>
                      <button
                        onClick={() => deleteTrip(trip.id)}
                        className="btn btn-sm btn-outline-danger"
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
    </>
  );
}

export default TripsList;
