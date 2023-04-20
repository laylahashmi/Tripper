import { useState } from "react";
import { useLoginMutation, useGetTokenQuery } from "./auth/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [
      login,
      { data: post, isLoading, result },
    ] = useLoginMutation();

  if (isLoading) {
        return (
            <progress className="progress is-primary" max='100'></progress>
        );
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await login({username, password});
    e.target.reset();
    navigate('/trips');
    } catch (error) {
      console.error("login error: ", error);
    }
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">Login</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              name="username"
              type="text"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;