const TaskList = ({tasks}) => {
    if (tasks.length !== 0) {
    return (
        tasks.map(task => 
        <div className="tasks">
    <div className="container-tasks">
        <div class="task" key={task.id}>
            <div>
                <h1>{task.name}</h1>
                <h3>{task.description}</h3>
            </div>
            <div></div>
            <div class="container-taskBottom">
                <div class="itemB">
                    <h5>Start Date: {task.startDate}</h5>
                </div>
                <div class="itemA">
                    <h5>End Date {task.endDate}</h5>
                </div>
            </div>
        </div>
    </div>
            </div>
)
    )
} else {
    <div>
    <p>
        <h2 style="text-align: center;">Haku ei tuottanut yhtään tulosta :/</h2>
    </p>
</div>
}
}

export default TaskList