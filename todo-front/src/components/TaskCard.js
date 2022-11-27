import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import moment from "moment";
import 'moment/locale/fi'
import TaskService from "../services/TaskService"

const StopWatch = (props) => {

  const { details, isActive, setIsActive, time, setTime, collection } = props
  const taskid = details._id.toString()
  const handleStart = () => {
    setIsActive(true);
    console.log("aloitettu tehtävä", details.name);
    console.log(time);
  }

  const handleStop = () => {
    setIsActive(false);
    console.log("lopetettu tehtävä", details.name);
    console.log(time);
    details.spentTime = time
    TaskService.updateSpentTime(collection, details._id, time)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    let interval = null;

    if (isActive === true) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  if (isActive === false) {
    return (
      <Button size="small" onClick={handleStart} >Aloita tehtävä</Button>
    )
  } else {
    return (
      <Button size="small" onClick={handleStop} >Lopeta tehtävä</Button>
    )
  }


}

const TaskCard = (props) => {

  const { details, onClick, user } = props
  const taskid = details._id.toString()
  const mongo = user.mongoClient("mongodb-atlas");
  const collection = mongo.db("todoDB").collection("task");
  moment.locale('fi')
  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState(details.spentTime)
  // console.log("card time ", time);

  return (
    <Box sx={{ minWidth: 275, maxWidth: "md", padding: "5px" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>

          </Typography>
          <Typography variant="h5" component="div">
            {details.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Aloitusaika: {moment(details.startTime).format("dddd, MMMM Do YYYY, h:mm:ss")} <br />
            Lopetusaika: {moment(details.endTime).format("dddd, MMMM Do YYYY, h:mm:ss")}
          </Typography>
          <Typography variant="body2">
            {details.description}
          </Typography>
          <Typography variant="body2">
            Tehtävään käytetty aika: {moment.utc(time).format('HH:mm:ss')}
          </Typography>
        </CardContent>
        <CardActions>
          <Link style={{ textDecoration: "none" }} to={`/tasks/edit/${taskid}`}>
            <Button size="small">Muuta</Button>
          </Link>
          <Button size="small" onClick={() => onClick(details._id)} >Poista</Button>
          <StopWatch details={details} isActive={isActive} setIsActive={setIsActive} time={time} setTime={setTime} collection={collection}></StopWatch>
        </CardActions>
      </Card>
    </Box>
  )


}

export default TaskCard
