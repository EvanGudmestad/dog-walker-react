import {Link, useNavigate} from 'react-router-dom';

import axios from 'axios';

export function DogWalkerItem({ walker, auth }) {

  const navigate = useNavigate();

  const onDeleteWalker = (evt) =>{
    evt.preventDefault();
    console.log("Delete Walker Clicked");
    

    axios(`http://localhost:5000/api/walkers/${walker._id}`,{
        method:'delete',
        headers:{
          authorization: `Bearer ${auth?.token}`
      }
    }).then((res) =>{
      window.location.reload();
    }).catch((err) =>{
      console.log(err.message);
    })
  }

  return (
    <>
    <form>
      <div className="card">
        <div className="card-header">{walker?.first_name} {walker?.last_name}</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{walker?.email}</li>
          <li className="list-group-item">{walker?.age}</li>
          <li className="list-group-item">{walker?.gender}</li>
          <li className="list-group-item"><Link to={`../walker/${walker?._id}`} walker={walker} className="btn btn-sm btn-info">Edit</Link>
          <button onClick={(evt) => onDeleteWalker(evt)} className="btn btn-sm btn-danger ms-1">Delete</button></li>
        </ul>
      </div>
      </form>
    </>
  );
}
