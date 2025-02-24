import express from 'express'
import path from 'path'
import __dirname from './util/rootparth.js'
import * as fileHander from './fajlhandler.js'

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

app.get('/users', (req, res) => {
    const users = fileHander.getData();
    res.json(users);
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const users = fileHander.getData();
    if (id > users.length-1 || id < 0){
        return res.json({});
    }
    else{
        res.json(users[id]);
    }
})

app.post('/users', (req, res) => {
    const {firstName, lastName} = req.body;
    if (!firstName || !lastName){
        return res.json({message:"There is no first name nor last name to work with"})
    }
    const newUser = {firstName, lastName}
    users.push(newUser);
    res.json(newUser);
})

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const users = fileHander.getData();
    if (id > users.length -1 || id <0){
        return res.json({message:"User not found"});
    }
    else{
        const {firstName, lastName} = req.body;
        users[id] = {firstName, lastName}
        res.json(users[id]);
    }
})

app.patch('/users/:id', (req, res) => {
    const id = req.params.id;
    const users = fileHander.getData();
    if (id > users.length -1 || id <0){
        return res.json({message:"User not found"});
    }
    else{
        const {firstName, lastName} = req.body;
        users[id] = {firstName: firstName || users[id].firstName,
                     lastName: lastName ||users[id].lastName}
        res.json(users[id]);
    }
})

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const users = fileHander.getData();
    if (id > users.length -1 || id <0){
        return res.json({message:"User not found"});
    }
    else{
        users.splice(id, 1); //id az ahol kezdi és a szám határozza meg, hogy az id-től mennyi elemet töröl
        res.json({message:"User has been successfully deleted"})
    }
})


app.listen(3000, () => {
    console.log(`Server is running on port 3000`)
})