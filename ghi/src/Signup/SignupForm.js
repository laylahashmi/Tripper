import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Image from "../Backgrounds/TripperLogo.svg";
import {
  handleFirstNameChange,
  handleLastNameChange,
  handleUsernameChange,
  handleEmailChange,
  handlePasswordChange,
  handlePasswordConfirmationChange,
  reset,
  error,
} from "./SignupSlice";
import { useSignupMutation } from "../auth/auth";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

const Signup = () => {
  const [signup, result] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fields } = useSelector((state) => state.signup);

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

    const handleSubmit = (e) => {
    e.preventDefault();
    if (fields.password !== fields.passwordConfirmation) {
        dispatch(error("Password does not match confirmation"));
        return;
    }
    const {
        firstName,
        lastName,
        username,
        email,
        password,
        passwordConfirmation,
    } = fields;
    signup({
        firstName,
        lastName,
        email,
        username,
        password,
    });
    dispatch(reset());
    };

    if (result.isSuccess) {
    navigate("/trips");
    }

  return (
    <>
    <div className="position-absolute top-0 end-0 mt-4 me-4">
      <Link to="/" className="btn btn-lg btn-outline-light me-3">
        Home
      </Link>
    </div>
    <div></div>
        <animated.div className="login-form-container" style={fadeIn}>
        <div className="card login-form-card">
            <animated.img
            src={Image}
            alt="Tripper Logo"
            className="tripper-logo"
            style={slideUp}
            />
            <div className="card-body">
            <form onSubmit={handleSubmit}>
                <animated.div className="mb-3" style={slideUp}>
                <label htmlFor="Signup__FirstName" className="form-label">
                    First Name:
                </label>
                <input
                    className="form-control form-control-sm"
                    type={`text`}
                    id="Signup__FirstName"
                    value={fields.firstName}
                    onChange={(e) =>
                    dispatch(handleFirstNameChange(e.target.value))
                    }
                />
                </animated.div>
                <animated.div className="mb-3" style={slideUp}>
                <label htmlFor="Signup__LastName" className="form-label">
                    Last Name:
                </label>
                <input
                    className="form-control form-control-sm"
                    type={`text`}
                    id="Signup__LastName"
                    value={fields.lastName}
                    onChange={(e) =>
                    dispatch(handleLastNameChange(e.target.value))
                    }
                />
                </animated.div>
                <animated.div className="mb-3" style={slideUp}>
                <label htmlFor="Signup__username" className="form-label">
                    Username:
                </label>
                <input
                    className="form-control form-control-sm"
                    type={`text`}
                    id="Signup__username"
                    value={fields.username}
                    onChange={(e) =>
                    dispatch(handleUsernameChange(e.target.value))
                    }
                />
                </animated.div>
                <animated.div className="mb-3" style={slideUp}>
                <label htmlFor="Signup__Email" className="form-label">
                    Email:
                </label>
                <input
                    className="form-control form-control-sm"
                    type={`text`}
                                id="Signup__Email"
                    value={fields.email}
                    onChange={(e) =>
                    dispatch(handleEmailChange(e.target.value))
                    }
                />
                </animated.div>
                <animated.div className="mb-3" style={slideUp}>
                <label htmlFor="Signup__password" className="form-label">
                    Password:
                </label>
                <input
                    className="form-control form-control-sm"
                    type={`password`}
                    id="Signup__password"
                    value={fields.password}
                    onChange={(e) =>
                    dispatch(handlePasswordChange(e.target.value))
                    }
                />
                </animated.div>
                <animated.div className="mb-3" style={slideUp}>
                <label
                    htmlFor="Signup__password_confirmation"
                    className="form-label"
                >
                    Confirm Password:
                </label>
                <input
                    className="form-control form-control-sm"
                    type={`password`}
                    id="Signup__password_confirmation"
                    value={fields.passwordConfirmation}
                    onChange={(e) =>
                    dispatch(handlePasswordConfirmationChange(e.target.value))
                    }
                />
                </animated.div>
                <animated.div className="d-grid" style={slideUp}>
                <button
                    type="submit"
                    className="btn btn-primary elegant-btn bg-navy-blue"
                >
                    Signup
                </button>
                </animated.div>
            </form>
            </div>
        </div>
        </animated.div>
        </>
    );
    };

export default Signup;
