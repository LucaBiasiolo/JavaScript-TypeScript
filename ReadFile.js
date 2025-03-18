import { readFile } from 'fs';

let readDataCallback = (err, data) =>{
  if (err){
    console.log(`Something went wrong: ${err}`);
  } else{
    console.log(`Provided file contained: ${data}`);
  }
}

readFile('./fileOne.txt', 'utf-8', readDataCallback)
readFile('./anotherFile.txt', 'utf-8', readDataCallback)
readFile('./finalFile.txt', 'utf-8', readDataCallback)
let secretWord = 'cheeseburgerpizzabagels';