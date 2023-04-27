import React from "react";
import bgImage from "./Backgrounds/Tripslist.svg";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";


function About() {
  const bgStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const logoAnimation = useSpring({
    from: { transform: "translate3d(-50%, -50%, 0) scale(0.5)", opacity: 0 },
    to: { transform: "translate3d(-50%, -50%, 0) scale(1)", opacity: 1 },
    delay: 300,
    config: { duration: 1000 },
  });

  return (
    <>
      <div style={bgStyle}>
        <div className="container text-center">
          <h2 className="display-3 text-white mb-5">About Tripper</h2>
          <p className="lead text-white mb-5">
            Tripper is the ultimate platform for all your travel needs. We
            provide an easy-to-use service that helps you plan, organize, and
            share your trips with friends and family. With Tripper, you can
            discover new destinations, create personalized itineraries, and
            track your travel memories all in one place.
          </p>
          <p className="lead text-white mb-5">
            Our Mission At Tripper, our mission is to revolutionize the way people travel by providing
            a comprehensive and user-friendly platform that simplifies the journey from inspiration to destination.
            We are dedicated to empowering travelers by offering personalized experiences, fostering connections with fellow explorers, and promoting responsible tourism.
            Our commitment to innovation and passion for exploration drives us to continuously enhance our platform, ensuring that Tripper remains the ultimate travel companion for every adventure.
          </p>
          <div className="position-absolute top-0 end-0 mt-4 me-4">
            <Link to="/login" className="btn btn-lg btn-outline-light me-3">
              Login
            </Link>
            <Link to="/signup" className="btn btn-lg btn-outline-light">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
