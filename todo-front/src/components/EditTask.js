import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditTask = () => {

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setDetails(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(details);
      axios.request({
        method:"put",
        url:`http://[::1]:3000/tasks/${details.id}`,
        data: details
      }).then(response => {
        alert("Muutokset tallennettu");
        navigate(`/tasks/${details.id}`,  { replace: true })
      })
    }

    const params = useParams()

    let navigate = useNavigate()

    const [details, setDetails] = useState ([])

    useEffect(() => {
        console.log("task details id testi ", params.id);
        axios.get(`http://[::1]:3000/tasks/${params.id}`)
          .then(response => {
            console.log(response);
            setDetails(response.data)
            console.log("edit details testi", details);
          })
          .catch(error => {
            console.log(error);
          })
        
      }, [])


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

export default EditTask