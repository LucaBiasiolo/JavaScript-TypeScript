import express from 'express';
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) =>{
  res.send('Test POST request from client');
})

app.put('/', (req, res) =>{
  res.send('Test PUT request from client');
})

app.delete('/', (req, res) =>{
  res.send('Test DELETE request from client');
})

app.use(express.static('public'))

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});