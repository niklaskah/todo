const TaskList = ({tasks}) => {
    if (tasks.length !== 0) {
    return (
        tasks.map(task => 
        <div className="tasks" key={task.id}>
    <div className="container-tasks">
        <div className="task" >
            <div>
                <h1>{task.name}</h1>
                <h3>{task.description}</h3>
            </div>
            <div></div>
            <div className="container-taskBottom">
                <div className="itemB">
                    <h5>Start Date: {task.startTime}</h5>
                </div>
                <div className="itemA">
                    <h5>End Date {task.endTime}</h5>
                </div>
            </div>
        </div>
    </div>
            </div>
)
    )
} else {
    return (
    <div>
        <h2>Haku ei tuottanut yhtään tulosta </h2>
</div>
    )
}
}

export default TaskList