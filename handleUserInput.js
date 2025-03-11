const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Hello There! Enter something: ', (answer) =>{
    console.log('You entered:', answer)
    console.log('Bye!')
    rl.close();
})