const express = require('express') 
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
//const port = 3000

const app = express()
const port = process.env.PORT || 3000
const mongoDB = process.env.MONGODB_URI
const clientOrigin = process.env.CLIENT_ORIGIN || '*' //  Lisätty fallback jos .env puuttuu
const path = require('path')


app.use(cors({ origin: clientOrigin }))
app.use(express.json())
// Palvellaan frontend-kansio "sivu" staattisena
app.use(express.static(path.join(__dirname, 'sivu')))

// cors - allow connection from different domains and ports


// convert json string to json object (from request)

if (!mongoDB) {
  console.error('MONGODB_URI is not defined in .env file')
  process.exit(1)
}

mongoose
  .connect(mongoDB)
  .then(() => console.log('Database connected'))
  .catch((error) => {
    console.error('Database connection error:', error)
    process.exit(1)
  })

// mongo here...
//const mongoose = require('mongoose')
//const mongoDB = 'mongodb+srv://Antti:<salasana>@cluster0.hubx1ew.mongodb.net/Todo-app?retryWrites=true&w=majority&appName=Cluster0'
//mongoose.connect(mongoDB)

//const db = mongoose.connection
//db.on('error', console.error.bind(console, 'connection error:'))
//db.once('open', function() {
//  console.log("Database test connected")
//})

// Mongoose Scheema and Model here...
// scheema
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true } 
})

// model
const Todo = mongoose.model('Todo', todoSchema, 'todos')

// Routes here...
app.post('/todos', async (request, response) => {
  const { text } = request.body
  const todo = new Todo({
    text: text
  })
  const savedTodo = await todo.save()
  response.json(savedTodo)  
})

app.get('/todos', async (request, response) => {
  const todos = await Todo.find({})
  response.json(todos)
})

app.get('/todos/:id', async (request, response) => {
  const todo = await Todo.findById(request.params.id)
  if (todo) response.json(todo)
  else response.status(404).end()
})

app.delete('/todos/:id', async (request, response) => {
  const doc = await Todo.findById(request.params.id);
  if (doc) {
    await doc.deleteOne()
    response.json(doc)
  }
  else response.status(404).end()
})

// Put-reitti lisätty, osa 2
app.put('/todos/:id', async (request, response) => {
    // Haetaan päivityspyynnön runko (request.body), jossa on uusi tehtäväteksti
    const { text } = request.body;

    // Luodaan päivitettävä tehtäväobjekti
    const todo = {
        text: text
    };

    // Etsitään tehtävä tietokannasta ID:n perusteella ja päivitetään sen tiedot
    const filter = { _id: request.params.id }; // Hae tehtävä ID:llä
    const updatedTodo = await Todo.findOneAndUpdate(filter, todo, {
        new: true // Palautetaan päivitetty tehtävä
    });

    // Palautetaan päivitetty tehtävä vastauksena
    response.json(updatedTodo);
});

// Etusivu
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'sivu', 'index.html'))
})


// app listen port 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
