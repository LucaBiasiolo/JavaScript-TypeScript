import express from 'express';
import {User, AppDataSource, Restaurant } from './typeorm';

const app = express();
const port = 8080;
const router = express.Router();

router.get(`/users`, (req,res) =>{
  const userRepository = AppDataSource.getRepository(User)

  userRepository.find().then((users) =>{  
    res.status(200);
    res.json(users)
  }, (error) =>{
    console.log(error);
  })
})

router.get(`/restaurants`, (req,res) =>{
  const restaurantRepository = AppDataSource.getRepository(Restaurant)

  restaurantRepository.find().then((restaurants) =>{
    res.status(200)
    res.json(restaurants)
  }, (error) =>{
    console.log(error)
  })
})

app.use(express.static('public'))

app.use('/dining-review', router)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});