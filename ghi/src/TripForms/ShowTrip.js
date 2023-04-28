import { useGetTripQuery } from "../store/tripsApi";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useMemo } from "react";
import { useSpring, animated } from "react-spring";
import "../App.css";

function ShowTrip() {
  const navigate = useNavigate();
  const { id } = useParams();
  let { data: trip, isLoading } = useGetTripQuery(id);

  async function handleUpdate() {
    navigate(`/trips/${trip.id}/update`);
  }

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 300,
    config: { duration: 1000 },
  });

  const stops = useMemo(() => {
    if (trip && trip.stops) {
      return trip.stops;
    }
    return [];
  }, [trip]);

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  if (trip) {
return (
  <>
    <animated.div className="show-trip-background" style={fadeIn}>
      <div className="position-absolute top-0 end-0 mt-4 me-4">
            <Link to="/trips" className="btn btn-lg btn-outline-light me-3">
              Trips
            </Link>
            <div className="position-absolute top-0 end-0 mt-4 me-4"></div>
          </div>
      <div className="container mt-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <h1 id='trip_h1' className="mb-4 text-center" style={{ color: 'white' }}>{trip.name}</h1>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="show-trip-card mb-5">
              <div className="row row-cols-1 row-cols-sm-3 align-items-center">
                {stops.map((stop) => {
                  return (
                    <Card className="mb-3 shadow mr-3 ml-3 stop-card" key={stop.id}>
                      <Card.Img id='stop_img' variant="top" src={stop.picture_url} className="stop-image" />
                      <Card.Body>
                        <Card.Title className="text-center">
                          <Link to={`/trips/${trip.id}/stops/${stop.id}`}>
                            <div className="btn btn-lg btn-outline-light">{stop.name}</div>
                          </Link>
                        </Card.Title>
                        <Card.Text className="text-center">{stop.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            </div>
            <div className="d-flex justify-content-center buttons-container">
              <Link
                to={`/trips/${id}/stops/create`}
                className="btn btn-lg btn-outline-light me-3"
              >
                Add a Stop
              </Link>
              <button onClick={handleUpdate} className="btn btn-lg btn-outline-light me-3">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  </>
);

  } else {
    return "loading";
  }
}

export default ShowTrip;
