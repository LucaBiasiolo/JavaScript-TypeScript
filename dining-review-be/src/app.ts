import express from 'express';
import db from './sqlite';

const app = express();
const port = 8080;
const baseUrl = '/dining-review'

app.get(`${baseUrl}/users`, (req,res) =>{
  db.all("select * from users", (err, rows) =>{
    if (err){
      res.status(500).send('Database error');
    } else{
      res.json(rows);
    }
  })
})

app.get(`${baseUrl}/restaurants`, (req,res) =>{
  db.all("select * from restaurants", (err, rows) =>{
    if (err){
      res.status(500).send('Database error');
    } else{
      res.json(rows);
    }
  })
})

app.use(express.static('public'))

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});