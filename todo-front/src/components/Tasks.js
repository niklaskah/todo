import React, { useEffect, useState } from "react"
import axios from 'axios'
import TaskList from './TaskList'

const Tasks = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/tasks?filter=%7B%0A%20%20%22offset%22%3A%200%2C%0A%20%20%22limit%22%3A%20100%2C%0A%20%20%22skip%22%3A%200%2C%0A%20%20%22order%22%3A%20%22string%22%2C%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22additionalProp1%22%3A%20%7B%7D%0A%20%20%7D%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22name%22%3A%20true%2C%0A%20%20%20%20%22id%22%3A%20true%2C%0A%20%20%20%20%22description%22%3A%20true%2C%0A%20%20%20%20%22startTime%22%3A%20true%2C%0A%20%20%20%20%22endTime%22%3A%20true%2C%0A%20%20%20%20%22spentTime%22%3A%20true%0A%20%20%7D%0A%7D")
      .then(response => {
        console.log(response);
        setTasks(response.data)
      })
      .catch(error => {
        console.log(error);
      })
    console.log("tasks testi", tasks);
  }, [])

  const taskItems = tasks.map(task => <li key={task.id} className="collection-item">{task.name}</li>)

  return (

    <div className="App">
      <h1>TASKS</h1>
      <TaskList tasks={tasks}></TaskList>
    </div>
  );
}

export default Tasks;
