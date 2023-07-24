import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";


export function DogWalkerEditor({auth, showToast}){
    const {walkerId} = useParams();
    const navigate = useNavigate();

    const [walker,setWalker] = useState(null);
    const [success,setSuccess] = useState("");
    useEffect(()=>{
        axios(`${process.env.REACT_APP_API_URL}/api/walkers/${walkerId}`,{
            method:'get',
            headers:{
                authorization: `Bearer ${auth?.token}`
            }
        }).then((res) =>{
            setWalker(res.data);
        }).catch((err) =>{

        });
    },[walkerId,auth]);

    function editFirstName(evt){
        const newName = evt.target.value;
        setWalker((prevState) =>({
            ...prevState,
            first_name:newName
        }));
    }

    function editLastName(evt){
        const newName = evt.target.value;
        setWalker((prevState) => ({
            ...prevState,
            last_name:newName
        }));
    }

    function editAge(evt){
        const newAge = evt.target.value;
        setWalker((prevState) => ({
            ...prevState,
            age:newAge
        }))
    }

    function saveWalker(evt){
        evt.preventDefault();
        
        //console.log(`Walker age: ${walker.age}`)

        axios(`${process.env.REACT_APP_API_URL}/api/walkers/${walkerId}`,{
            method:'post',
            headers:{
                authorization: `Bearer ${auth?.token}`
            },
            data:{first_name:walker.first_name,last_name:walker.last_name,age:walker.age}
        }).then((res) =>{
            console.log(res.data);
            //setSuccess(res.data);
            showToast('Dog Walker Saved!');
            navigate('/walker/list');
        }).catch((err) =>{
            console.log(err.message);    
            showToast(err.message);
        });

    }

    return(
        <form>
        <section className="gradient-custom">
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white">
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase">Edit Dog Walker</h2>
                     <div className="mb-3">
                        <label htmlFor='txtFirstName' className="form-label">First Name</label>
                        <input type='text' id='txtFirstName' value={walker?.first_name} className="form-control" onChange={(evt) => editFirstName(evt)} />
                     </div>
                     <div className="mb-3">
                        <label htmlFor='txtLastName' className="form-label">Last Name</label>
                        <input type='text' id='txtLastName' value={walker?.last_name} className="form-control" onChange={(evt) => editLastName(evt)} />
                     </div>
                     <div className="mb-3">
                        <label htmlFor='txtAge' className="form-label">Age</label>
                        <input type='text' id='txtAge' value={walker?.age} className="form-control" onChange={(evt) => editAge(evt)} />
                     </div>
                     <div className="mb-3">
                        <button type='submit' className="btn btn-primary btn-lg" onClick={(evt) => saveWalker(evt)}>Save Dog Walker</button>
                     </div>
                     {success && <h4 className="text-success">{success}</h4>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    )
}