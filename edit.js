// const readline = require('node:readline');
// const os = require('node:os');
// const { exec, spawn } = require('node:child_process');
// const path = require('node:path');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question('What file do you want to edit?', (filename) => {

//     const editor = spawn('vim', [filename], {
//         stdio: 'inherit',
//         env: {
//             TERM: 'xterm-256color'
//         }
//     });
    
//     editor.on('exit', (code) => {
//         console.log(`Editor process exited with code ${code}`);
//       });
      
// })

const readline = require('node:readline');

const {spawn} = require('child_process');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What file are you editing?\n', (answer) => {
    const vim = spawn('vim', ['-u', 'NONE', `${answer}.js`], {stdio: ['inherit', 'inherit', process.stdout]});


   
})