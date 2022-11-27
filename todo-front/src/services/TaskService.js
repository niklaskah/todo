
const getTasksByUserId = async (user) => {
    let tasks = []
    try {
        tasks = await user.functions.getTasksByUserId()
    } catch (error) {
        console.error(error)
    }
    return tasks
}
const deleteById = async (collection, id) => {
    try {
        const result = await collection.deleteOne({ _id: id })
        return result
    } catch (error) {
        console.error(error)
    }
}
const getById = async (collection, id) => {
    try {
        const result = await collection.findOne({ _id: id })
        return result
    } catch (error) {
        console.error(error)
    }
}

const addTask = async (collection, newTask) => {
    console.log(newTask);
    try {
        const result = await collection.insertOne({
            name: newTask.name,
            description: newTask.description,
            userId: newTask.userId,
            startTime: newTask.startTime,
            endTime: newTask.endTime,
            spentTime: newTask.spentTime
        })
        return result
    } catch (error) {
        console.error(error)
    }
}
const updateSpentTime = async (collection, id, newTime) => {
    try {
        const result = await collection.updateOne(
            { _id: id },
            { $set: { spentTime: newTime } })
        return result
    } catch (error) {
        console.error(error)
    }
}
const updateTask = async (collection, id, newData) => {
    try {
        const result = await collection.updateOne(
            { _id: id },
            { $set: {
                name: newData.name,
                description: newData.description,
                userId: newData.userId,
                startTime: newData.startTime,
                endTime: newData.endTime,
                spentTime: newData.spentTime } })
        return result
    } catch (error) {
        console.error(error)
    }
}
const TaskService = {
    getTasksByUserId,
    deleteById,
    addTask,
    updateSpentTime,
    updateTask,
    getById
}
export default TaskService