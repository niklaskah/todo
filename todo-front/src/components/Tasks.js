import React, { useEffect, useState } from "react"
import axios from 'axios'
import TaskItem from "./TaskItem"
import { Link } from "react-router-dom"


const Tasks = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get("http://[::1]:3000/tasks")
      .then(response => {
        console.log(response);
        setTasks(response.data)
        console.log("tasks testi", tasks);
      })
      .catch(error => {
        console.log(error);
      })
    
  }, [])

  const taskItems = tasks.map(task => {
    return (
      <TaskItem key={task.id} item={task}/>
    )
  })

  return (

    <div>
      <h1>TASKS</h1>
      <ul className="collection">
        {taskItems}
      </ul>
      <Link className="btn grey" to="/tasks/add">Lisää tehtävä</Link>
    </div>
  );
}

export default Tasks;
