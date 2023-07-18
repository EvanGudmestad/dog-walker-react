import {NavLink} from 'react-router-dom';

export function NavBar(){
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">Dog Walker App</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/" className='nav-link'>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/walker/list" className='nav-link'>Dog Walker List</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
}