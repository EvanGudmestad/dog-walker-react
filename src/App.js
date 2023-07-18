
import {Route,Routes, Navigate, useNavigate} from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { DogWalkerList } from './components/DogWalkerList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { NavBar } from './components/NavBar';
import { useState } from 'react';



function App() {
  const [auth,setAuth] = useState(null);

  const navigate = useNavigate();

  function onLogin(auth){
    setAuth(auth);
    navigate('/walker/list');
  }

  return (
    
    <div className="App container d-flex flex-column min-vh-100">
     <header>
      <NavBar />
     </header>
     <main className='flex-grow-1'>
     <Routes>
          <Route path="/" element={<LoginForm onLogin={onLogin} />} />
          <Route path="/walker/list" element={<DogWalkerList auth={auth} />} />
      </Routes>  
      </main>
      <footer>
        <h6 className='text-center'>&copy;2023 Evan Gudmestad - Ranken Technical College</h6>
      </footer>
    </div>
  );
}

export default App;
