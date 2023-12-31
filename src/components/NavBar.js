import {NavLink} from 'react-router-dom';

export function NavBar({auth, onLogout}){


  function onClickLogout(evt){
    onLogout();
  }

    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">Dog Walker App</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink to="/" className='nav-link'>Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/walker/list" className='nav-link'>Dog Walker List</NavLink>
                </li>
               </ul>
              <ul className='navbar-nav'>
                {!auth && 
                  <li className="nav-item">
                    <NavLink to="/" className='nav-link'>Login</NavLink>
                  </li>
                }
                {auth &&
                <>
                <li className='nav-item'>
                    <NavLink to="#" className='nav-link'> {auth.email}</NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to='/' onClick={(evt) => onClickLogout(evt)} >Logout</NavLink>
                  </li>
                  </> 
                }
              </ul>
            </div>
          </div>
      </nav>
    )
}