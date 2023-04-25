import React from "react";
import bgImage from "./logo.svg";
import Image from "./TripperLogo.svg";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import "./about.css";

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
      <animated.img
        src={Image}
        alt="Tripper Logo"
        style={{
          position: "absolute",
          top: "80px",
          left: "80px",
          zIndex: 10,
          ...logoAnimation,
        }}
      />

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
