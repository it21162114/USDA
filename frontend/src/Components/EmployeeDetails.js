import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { notify } from '../utils';
import { GetEmployeeById } from '../api';

function EmployeeDetails() {
    const { id } = useParams();
    const [empDetails, setEmpDetails] = useState({});
    console.log(id);

    const fetchEmpById = async ()=>{
        try{
            const {data} = await GetEmployeeById(id);
            console.log(data);
            setEmpDetails(data);
        } catch(err) {
            notify('Failed to fetch Employee, Try again later', 'Error');
        }
    }

    useEffect(()=>{
        fetchEmpById();
    },[id])
        
    return (
        <div>EmployeeDetails</div>
    )
}

export default EmployeeDetails