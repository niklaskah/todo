import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import TaskService from "../services/TaskService"
import TaskCard from "./TaskCard"
import Button from '@mui/material/Button';


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
      <TaskCard key={taskid} details={task} user={user} onClick={onDelete} />
    )
  })


  return (

    <div style={{paddingLeft: 10, paddingTop: 10}}>
      <Button component={Link} to="/tasks/add">Add task</Button>
      <ul className="collection">
        {taskItems}
      </ul>
      <Button component={Link} to="/tasks/add">Add task</Button>
    </div>
  );

}

export default Tasks;
