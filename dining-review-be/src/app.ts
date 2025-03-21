import express from 'express';
import {User, AppDataSource, Restaurant } from './typeorm';

const app = express();
const port = 8080;
const router = express.Router();
const userRepository = AppDataSource.getRepository(User)
const restaurantRepository = AppDataSource.getRepository(Restaurant)

app.use(express.json())

router.get(`/users`, (req,res) =>{

  userRepository.find().then((users) =>{  
    res.status(200);
    res.json(users)
  }, (error) =>{
    console.log(error);
  })
})

router.post('/users', (req, res) =>{
  console.log('Request body: ' + JSON.stringify(req.body))
  userRepository.save(req.body).then( () =>{
    console.log('User saved correctly')
    res.status(200).send();
  }, (reason) =>{
    console.log(reason)
    res.status(500).send();
  })
})

router.get(`/restaurants`, (req,res) =>{

  restaurantRepository.find().then((restaurants) =>{
    res.status(200)
    res.json(restaurants)
  }, (error) =>{
    console.log(error)
  })
})

router.post('/restaurants', (req,res) =>{
  restaurantRepository.save(req.body).then(() =>{
    console.log('Restaurant saved correctly')
    res.status(200).send();
  }, (reason) =>{
    console.error('Error during saving of new restaurant: ' + reason)
    res.status(500).send();
  })
})

app.use(express.static('public'))

app.use('/dining-review', router)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});