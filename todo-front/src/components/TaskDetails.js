import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TaskDetails = () => {
    const params = useParams()
    const taskId = params.Id
    // console.log("url param id",params);

    let navigate = useNavigate()

    const [details, setDetails] = useState ([])

    useEffect(() => {
        // console.log("edittask details id testi ", taskId);
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
            <Box sx={{ minWidth: 275,maxWidth: "md" }}>
            <Card variant="outlined">
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  
                </Typography>
                <Typography variant="h5" component="div">
                {details.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Aloitusaika: {details.startTime} <br/>
                  Lopetusaika: {details.endTime}
                </Typography>
                <Typography variant="body2">
                {details.description}
                </Typography>
              </CardContent>
              <CardActions>
              <Link style={{textDecoration: "none"}} to={`/tasks/${details.id}`}>
                <Button size="small">Muuta</Button>
                </Link>
              </CardActions>
            </Card>
            </Box>
    </div>
    )
}

export default TaskDetails