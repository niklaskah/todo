import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const AddTask = () => {

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setDetails(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = (event) => {
        const newTask = {
            name: details.name,
            description: details.description
        }
      event.preventDefault();
      console.log(details);
      axios.post(`http://[::1]:3000/tasks`, newTask)
      .then(response => {
        console.log(response);
        alert("Tehtävä lisätty");
        navigate(`/tasks`,  { replace: true })
      }).catch(error => console.log(error))
    }


    let navigate = useNavigate()

    const [details, setDetails] = useState ([])

    return(

        <form onSubmit={handleSubmit}>
        <label>Tehtävän nimi:
        <input 
          type="text" 
          name="name" 
          value={details.name || ""} 
          onChange={handleChange}
        />
        </label>
        <label>Tehtävän kuvaus
          <input 
            type="text" 
            name="description" 
            value={details.description || ""} 
            onChange={handleChange}
          />
          </label>
          <input type="submit" />
      </form>
    )
}

export default AddTask