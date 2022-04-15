const express = require('express')
const port = 3000
const app = express()
app.use(express.json())
const uuid = require('uuid')
const users = []

app.get('/users', (request, response) => {
   response.json(users)
})

app.post('/users', (request, response) => {
    const {name, age} = request.body
    const user = {id:uuid.v4(), name, age}
    users.push(user)
    return response.status(201).json(user)
})

app.put('/users/:id', (request, response) => {
    const {id} = request.params
    let {name, age} = request.body
    const userChange = {id, name, age}
    index = users.findIndex((user) => user.id === id)

    if(index < 0){
        return response.status(404).json({"message":"not found"})
    }

app.delete('/users/:id', (request, response) => {
    const {id} = request.params
    const index = users.findIndex((user) => user.id === id)
    if (index < 0){
        return response.status(404).json({message:"User Not Found"})
    }
    users.splice(index, 1)
    return response.json(users)
})


    users[index] = userChange
    return response.json(users)
})







app.listen(port, () => {
    console.log(`👀 server started on port ${port}`)
})