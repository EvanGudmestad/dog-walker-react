import "./LoginForm.css";
import axios from "axios";
import { useState } from "react";
import jwt_decode from 'jwt-decode';
import {FaDoorOpen, FaGlasses} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import _ from 'lodash';

export function LoginForm({onLogin}) {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [success,setSuccess] = useState("");
    const [error, setError] = useState("");

    const emailError = !email ? 'Email can not be left blank' :
    !email.includes('@') ? 'Email must include @ sign.' : '';

    const passwordError = !password ? 'Password can not be left blank' :
    password.length < 8 ? 'Password must be at least 8 characers' : '';



    function onSubmitLogin(evt){
        evt.preventDefault();
        console.log(`the email is ${email} and the password is ${password}`);

        if(emailError){
          setError(emailError);
          return;
        }else if(passwordError){
          setError(passwordError);
          return;
        }

        axios(`${process.env.REACT_APP_API_URL}/api/users/login`,{
            method:'post',
            data:{email:email,password:password},
        }).then((res) => {
           setError("");
           setSuccess(`Welcome back ${res.data.message.email}`);
           //console.log(res.data.message.token);
           const authPayload = jwt_decode(res.data.message.token);
          // console.log(authPayload);
          // console.table(authPayload);
           const auth = {
                email:email,
                userId: res.data.message.id,
                token: res.data.message.token,
                role: res.data.message.role,
                payload:authPayload
           }
           //console.table(auth);
           onLogin(auth);
        })
        .catch((err) =>{
            setSuccess(""); 
          //  setError(err.response.data.message)

        //setError(err.message);
        const resError = err?.response?.data?.error;


        //server errors
        if(resError)
        { 
          if (typeof resError === 'string'){
              setError(resError);
          }
          //Errors from Joi
          else if(resError.details){
              setError(_.map(resError.details, (x) => <div>{x.message}</div>))
          }else{
              setError(err.response.data.message);
          }
        }else{
          console.log(err.message);
          setError("Email or password were incorrect");
        }
        //Errors from Joi
        // if(resError.details){
        //     setError(_.map(resError.details, (x) => <div>{x.message}</div>))
        // }else{
        //     setError(err.response.data.message);
        // }

        })
    }

  return (
    <>
      <form>
        <section className="gradient-custom">
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white">
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                      <p className="text-white-50 mb-5">
                        Please enter your email and password! <FaGlasses />
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

                      <p className="small mb-5 pb-lg-2">
                        <a className="text-white-50" href="#!">
                          Forgot password?
                        </a>
                      </p>

                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit" onClick={(evt) => onSubmitLogin(evt)}
                      >
                       <FaDoorOpen /> Login
                      </button>
                      {success && <p className="text-success">{success}</p>}
                      {error && <p className="text-danger">{error}</p>}

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
                        Don't have an account?{" "}
                        <Link to="/user/register" className="text-white-50 fw-bold">
                          Sign Up
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
    </>
  );
}

// export default Login;
