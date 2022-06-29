import React from "react";
import { Link } from "react-router-dom";

const TaskItem = (props) => {
    const {item} = props
    // console.log("task item test ", item);
    return(
        <li className="collection-item">
            <Link to={`/tasks/${item.id}`}>{item.name}</Link>
        </li>
    )
}

export default TaskItem