import { useState } from "react";
import { useLoginMutation, useGetTokenQuery } from "./auth/auth";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring"; // Import useSpring and animated
import Image from "./TripperLogo.svg";
import "./Loginform.css";


const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [login, { data: post, isLoading, result }] = useLoginMutation();

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
    return <progress className="progress is-primary" max="100"></progress>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
      e.target.reset();
      navigate("/trips");
    } catch (error) {
      console.error("login error: ", error);
    }
  };

  return (
    <animated.div className="login-form-container" style={fadeIn}>
      <div className="card login-form-card">
        <animated.img
          src={Image}
          alt="Tripper Logo"
          className="tripper-logo"
          style={slideUp}
        />
        <div className="card-body">
          <form onSubmit={(e) => handleSubmit(e)}>
            <animated.div className="mb-3" style={slideUp}>
              <label className="form-label">Username:</label>
              <input
                name="username"
                type="text"
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
              />
            </animated.div>
            <animated.div className="mb-3" style={slideUp}>
              <label className="form-label">Password:</label>
              <input
                name="password"
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </animated.div>
            <animated.div className="d-grid" style={slideUp}>
              <button
                type="submit"
                className="btn btn-primary elegant-btn bg-navy-blue"
              >
                Login
              </button>
            </animated.div>
          </form>
        </div>
      </div>
    </animated.div>
  );
};

export default LoginForm;
