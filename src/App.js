
import {Route,Routes, Navigate, useNavigate} from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { DogWalkerList } from './components/DogWalkerList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { NavBar } from './components/NavBar';
import { useState, useEffect } from 'react';
import { RegisterForm } from './components/RegisterForm';
import { DogWalkerEditor } from './components/DogWalkerEditor';
import jwt_decode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [auth,setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() =>{
    if(localStorage){
      const storedAuthToken = localStorage.getItem('authToken');
      if(storedAuthToken){
        const authPayload = jwt_decode(storedAuthToken);
        if(authPayload){
          const auth = {
            token:storedAuthToken,
            payload:authPayload,
            email:authPayload.email,
            userId:authPayload._id
          };
          setAuth(auth);
        }
      }
    }
  }, []);

  function onLogin(auth){
    setAuth(auth);
    navigate('/walker/list');

    if(localStorage){
      localStorage.setItem('authToken', auth.token)
    }
  }

  function onLogout(){
    setAuth(null);
  }

  function showToast(message){
    toast(message, {position:'top-right', draggable:true});
  }

  return (
    
    <div className="App container d-flex flex-column min-vh-100">
     <header>
      <NavBar auth={auth} onLogout={onLogout} />
     </header>
     <main className='flex-grow-1'>
      <ToastContainer />
     <Routes>
          <Route path="/" element={<LoginForm onLogin={onLogin} />} />
          <Route path="/walker/list" element={<DogWalkerList auth={auth} />} />
          <Route path="/user/register" element={<RegisterForm onLogin={onLogin} />} />
          <Route path="/walker/:walkerId" element={<DogWalkerEditor auth={auth} showToast={showToast} />} />
      </Routes>  
      </main>
      <footer>
        <h6 className='text-center'>&copy;2023 Evan Gudmestad - Ranken Technical College</h6>
      </footer>
    </div>
  );
}

export default App;
