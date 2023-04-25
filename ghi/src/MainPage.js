import React from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import bgImage from "./logo.svg";


function MainPage() {
  const bgStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

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

  return (
    <>
      <animated.div style={{ ...bgStyle, ...fadeIn }}>
        <div className="container text-center">
          <animated.h1 style={slideUp} className="display-2 text-white mb-5">
            Tripper
          </animated.h1>
          <animated.p style={slideUp} className="lead text-white mb-5">
            The Ultimate Platform For All Your Travel Needs!
          </animated.p>
          <animated.div style={slideUp}>
            <Link to="/about" className="btn btn-lg btn-outline-light">
              Get Started
            </Link>
          </animated.div>

          <div className="position-absolute top-0 end-0 mt-4 me-4">
            <Link to="/about" className="btn btn-lg btn-outline-light me-3">
              About
            </Link>
            <Link to="/login" className="btn btn-lg btn-outline-light me-3">
              Login
            </Link>
            <Link to="/signup" className="btn btn-lg btn-outline-light">
              Signup
            </Link>
            <div className="position-absolute top-0 end-0 mt-4 me-4"></div>
          </div>
        </div>
      </animated.div>
    </>
  );
}

export default MainPage;
