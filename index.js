const express = require('express')
const port = 3000
const app = express()
app.use(express.json())
const uuid = require('uuid')
const users = []

const checkUserId = (request, response, next) => {
    const {id} = request.params
    const index = users.findIndex((user) => user.id === id)
    if (index < 0){
        response.status(404).json({Error:"User Not Found"})
    }
    request.userId = id
    request.userIndex = index

    next()
}

app.get('/users', (request, response) => {
   response.json(users)
})

app.post('/users', (request, response) => {
    const {name, age} = request.body
    const user = {id:uuid.v4(), name, age}
    users.push(user)
    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const {name, age} = request.body
    const id = request.userId
    const index = request.userIndex
    const updateUser = {id, name, age}
    users[index] = updateUser

    return response.json(updateUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex
    if (index >= 0){
    users.splice(index, 1)
}
    return response.status(204).json()
})

app.listen(port, () => {
    console.log(`👀 server started on port ${port}`)
})