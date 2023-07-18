import axios from 'axios';
import {useEffect,useState} from 'react';
import _ from 'lodash';
import { DogWalkerItem } from './DogWalkerItem';


export function DogWalkerList({auth}){
    const [dogWalkers,setDogWalkers] = useState(null);
    const [error,setError] = useState("");



    useEffect(() =>{
        axios('http://localhost:5000/api/walkers/list',{
            headers: {authorization: `Bearer ${auth?.token}`},
        }).then((res) =>{
            console.log(res.data);
            setDogWalkers(res.data);
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
                    <div className='col-2'>
                        <DogWalkerItem walker={walker}/>
                    </div>
                ))}
            </div>
        </>
    );
}