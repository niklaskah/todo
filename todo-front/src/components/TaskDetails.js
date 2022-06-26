import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const TaskDetails = () => {
    const params = useParams()
    const taskId = params.Id
    console.log("url param id",params);

    let navigate = useNavigate()

    const [details, setDetails] = useState ([])

    useEffect(() => {
        console.log("edittask details id testi ", taskId);
        axios.get(`http://[::1]:3000/tasks/${taskId}`)
          .then(response => {
            console.log(response);
            setDetails(response.data)
            console.log("details testi", details);
          })
          .catch(error => {
            console.log(error);
          })
        
      }, [])

      const onDelete = () => {
        let taskId = details.id
        axios.delete(`http://[::1]:3000/tasks/${taskId}`)
        .then(response => {
            alert("Tehtävä poistettu")
           navigate("/tasks",  { replace: true })
        })
        .catch(error => console.log(error))
      }

    return(
        <div>
            <br/>
            <Link className="btn grey" to="/tasks">Back</Link>
            <Link className="btn" to={`/tasks/edit/${details.id}`}>EDIT</Link>
            <button onClick={() => onDelete(details.id)} className="btn red">DELETE</button>
            <div className="task" >
            <div>
                <h1>{details.name}</h1>
                <h3>{details.description}</h3>
            </div>
            <div></div>
            <div className="container-taskBottom">
                <div className="itemB">
                    <h5>Start Date: {details.startTime}</h5>
                </div>
                <div className="itemA">
                    <h5>End Date {details.endTime}</h5>
                </div>
            </div>
        </div>
    </div>
    )
}

export default TaskDetails