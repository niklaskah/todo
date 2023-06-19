import React, { useEffect, useState } from "react"
import TaskService from "../services/TaskService"
import TaskCard from "./TaskCard"
import FloatingActionAddButton from "./FloatingActionAddButton"
import Grid from '@mui/material/Grid'


const Tasks = ({ user }) => {
  const [tasks, setTasks] = useState([])
  const mongo = user.mongoClient("mongodb-atlas");
  const collection = mongo.db("todoDB").collection("task");
  useEffect(() => {
    TaskService.getTasksByUserId(collection)
      .then(response => {
        setTasks(response)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const onDelete = (id) => {
    console.log("tehtävä id ", id)
    console.log("coll", collection);
    TaskService.deleteById(collection, id)
      .then(response => {
        console.log(response);
        setTasks(tasks.filter(task => task._id !== id))
      })
      .catch(error => console.log(error))
  }

  const taskItems = tasks.map(task => {
    const taskid = task._id.toString()
    return (
      <Grid item xs={2} sm={4} md={4} key={taskid}>
      <TaskCard key={taskid} details={task} user={user} onClick={onDelete} />
    </Grid>
    )
  })


  return (

    <div>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {taskItems}
      </Grid>
      <div style={{
       bottom: 0,
       left: "100%",
       marginLeft: -100,
       position: "fixed"
       }}>
      <FloatingActionAddButton />
    </div>
    </div>
  );

}

export default Tasks;
