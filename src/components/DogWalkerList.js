import axios from 'axios';
import {useEffect,useState} from 'react';
import _ from 'lodash';
import { DogWalkerItem } from './DogWalkerItem';



export function DogWalkerList({auth}){
    const [dogWalkers,setDogWalkers] = useState(null);
    const [error,setError] = useState("");



    useEffect(() =>{
        console.log(`${process.env.REACT_APP_API_URL}`);
        axios(`${process.env.REACT_APP_API_URL}/api/walkers/list`,{
            headers: {authorization: `Bearer ${auth?.token}`},
        }).then((res) =>{
            console.log(res.data);
            setDogWalkers(res.data);
            setError("");
        }).catch((err) =>{
            setError(err.message);
        })

    }, [auth]);

    return(
        <>
            <h1>Dog Walker List</h1>
            {error && <h6>{error}</h6>}
            
            {_.isEmpty(dogWalkers) && <div>No items found</div>}
            <div className='row'>
                {_.map(dogWalkers, (walker) => (
                    <div className='col-2' key={walker._id}>
                        <DogWalkerItem walker={walker} auth={auth} />
                    </div>
                ))}
            </div>
        </>
    );
}