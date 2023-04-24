import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    handleFirstNameChange,
    handleLastNameChange,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordConfirmationChange,
    reset,
    error
} from "./SignupSlice";
import { useSignupMutation } from "./auth/auth";


const Signup = () => {
    const [ signup, result ] = useSignupMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { fields } = useSelector(state => state.signup)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (fields.password !== fields.passwordConfirmation) {
            dispatch(error('Password does not match confirmation'))
            return;
        }
        const {
            firstName,
            lastName,
            username,
            email,
            password,
            passwordConfirmation
        } = fields;
        signup({
            firstName,
            lastName,
            email,
            username,
            password,
        })
        dispatch(reset())
        navigate(`/trips`)
    }
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Signup</h5>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Signup__FirstName" className='form-label'>
                            First Name:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`text`}
                            id='Signup__FirstName'
                            value={fields.firstName}
                            onChange={e => dispatch(handleFirstNameChange(e.target.value))}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Signup__LastName" className='form-label'>
                            Last Name:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`text`}
                            id='Signup__LastName'
                            value={fields.lastName}
                            onChange={e => dispatch(handleLastNameChange(e.target.value))}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Signup__username" className='form-label'>
                            Username:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`text`}
                            id='Signup__username'
                            value={fields.username}
                            onChange={e => dispatch(handleUsernameChange(e.target.value))}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Signup__Email" className='form-label'>
                            Email:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`text`}
                            id='Signup__Email'
                            value={fields.email}
                            onChange={e => dispatch(handleEmailChange(e.target.value))}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Signup__password" className='form-label'>
                            Password:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`password`}
                            id='Signup__password'
                            value={fields.password}
                            onChange={e => dispatch(handlePasswordChange(e.target.value))}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Signup__password_confirmation" className='form-label'>
                            Confirm Password:
                        </label>
                        <input
                            className="form-control form-control-sm"
                            type={`password`}
                            id='Signup__password_confirmation'
                            value={fields.passwordConfirmation}
                            onChange={e => dispatch(handlePasswordConfirmationChange(e.target.value))}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;