import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import _ from 'lodash';


export function RegisterForm({onLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("developer");
  const [error,setError] = useState("");
  const [success, setSuccess] = useState("");
  function onClickRegister(evt) {
    evt.preventDefault();
    //console.log('Register Button Clicked');


    let confirmPasswordError = "";
    if(password !== confirmPassword) confirmPasswordError = "Passwords must match";
    if(confirmPasswordError)
    {
        setError(confirmPasswordError);
        return;
    }

    axios('http://localhost:5000/api/users/register',{
        method:'post',
        data:{email,password,role}
    }).then((res) => {
        //setSuccess(`${res.data.message.email} successfully registered`);
        const authPayload = jwt_decode(res.data.message.token);
        const auth = {
            email:email,
            userId: res.data.message.id,
            token: res.data.message.token,
            role: res.data.message.role,
            payload:authPayload
       }
       onLogin(auth);
       
    }).catch((err) =>{
        setSuccess("");
        console.log(err);
        //setError(err.message);
        const resError = err?.response?.data?.error;
        console.log(resError);
        //Server Errors
        if(typeof resError === 'string'){
            setError(resError);
        }
        //Errors from Joi
       else if(resError.details){
            setError(_.map(resError.details, (x) => <div>{x.message}</div>))
        }else{
            setError(err.message);
        }
    });
  }

  return (
    <form>
      <section className="gradient-custom">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    {error && <h3 className="text-danger">{error}</h3>}
                    {success && <h3 className="text-success">{success}</h3>}
                    <h2 className="fw-bold mb-2 text-uppercase">
                      Register New Account
                    </h2>
                    <p className="text-white-50 mb-5">
                      Please enter your email and password!
                    </p>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="txtEmail"
                        className="form-control form-control-lg"
                        onChange={(evt) => setEmail(evt.target.value)}
                      />
                      <label className="form-label" htmlFor="txtEmail">
                        Email
                      </label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="txtPassword"
                        className="form-control form-control-lg"
                        onChange={(evt) => setPassword(evt.target.value)}
                      />
                      <label className="form-label" htmlFor="txtPassword">
                        Password
                      </label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="txtConfirmPassword"
                        className="form-control form-control-lg"
                        onChange={(evt) => setConfirmPassword(evt.target.value)}
                      />
                      <label
                        className="form-label"
                        htmlFor="txtConfirmPassword"
                      >
                        Confirm Password
                      </label>
                    </div>

                    <select
                      className="form-select"
                      aria-label="Default select example" onChange={(evt) => setRole(evt.target.value)}>
                      <option value="developer">Developer</option>
                      <option value="quality analyst">Quality Analyst</option>
                      <option value="business analyst">Business Analyst</option>
                      <option value="product manager">Product Manager</option>
                      <option value="technical manager">Technical Manager</option>
                    </select>

                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      onClick={(evt) => onClickRegister(evt)}
                    >
                      Sign Up
                    </button>

                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white">
                        <i className="fab fa-facebook-f fa-lg"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-google fa-lg"></i>
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="mb-0">
                      Already have an account?{" "}
                      <Link to="/" className="text-white-50 fw-bold">
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}
