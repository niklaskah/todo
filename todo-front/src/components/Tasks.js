import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import UserService from "../services/UserService"
import TaskService from "../services/TaskService"
import TaskCard from "./TaskCard";
import { isLoggedIn } from "../services/UserService"


const Tasks = ({setLoginStatus}) => {
  const [tasks, setTasks] = useState([])
  const [user, setUser] = useState("")

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('user'))
    if (local == null) {
      console.log("user tokenia ei lötynyt");
      setLoginStatus(false)
    } else {
      UserService.checkUserToken(local.token)
        .then(response => {
          console.log(response)
          setUser(response)
          console.log("then set user ", user);
          return response
        }
        )
        .then((response) => {
          console.log("returned user ", response);
          TaskService.getTasksByUserId(response)
            .then(response => {
              console.log("tasks by id response ", response);
              setTasks(response)
              console.log("tasks testi", tasks);
            })
            .catch(error => {
              console.log(error);
            })
        }
        )
        .catch(error => {
          console.log(error);
        })
    }
    console.log("user testi ", user);
    setLoginStatus(true)
  }, [])

  const onDelete = (id) => {
    TaskService.deleteById(id)
    .then(response => {
      alert("Tehtävä poistettu")
      setTasks(tasks.filter(task => task.id !== id))
  })
  .catch(error => console.log(error))
  }

  const taskItems = tasks.map(task => {
    return (
      <TaskCard key={task.id} details={task} userId={user} onClick={onDelete} />
    )
  })

  if (isLoggedIn() === false) {
    return <h1>Kirjaudu sisään nähdäksesi tehtävälistan</h1>
  } else {
    return (

      <div>
        <h1>Tehtävälista</h1>
        <ul className="collection">
          {taskItems}
        </ul>
        <Link className="btn grey" to="/tasks/add">Lisää tehtävä</Link>
      </div>
    );
  }


}

export default Tasks;
