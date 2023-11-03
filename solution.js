const readline = require('node:readline');
const os = require('node:os');
const { exec, spawn } = require('node:child_process');
const path = require('node:path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function listOptions() {
    console.log("new\t\tcreates a new file in current directory based on name given\n");
    console.log("delete\t\tdeletes a file in current directory based on the name given\n");
    console.log("edit\t\tedits a file in current directory based on the name given\n");
}

function autoCommand() {
    listOptions();
    rl.question('What would you like to do today?\n', (input) => {
        let filename = input.split(" ")[1], command = input.split(" ")[0];

        if (command === "new") {
            exec(`touch ${filename}`, (error, stdout, stderr) => {
                if (error) {
                    console.error('File creation failed: ' + error);
                }

                console.log(`${filename} created successfully`);
            });
        } else if (command === "delete") {
            exec(`rm ${filename}`, (error, stdout, stderr) => {
                if (error) {
                    console.error('File removal failed: ' + error);
                }

                console.log(`${filename} removed successfully`);
            });
        } else if (command === "edit") {


            const vim = spawn(`vim`, ['-u', '~/.vimrc', `${path.join(__dirname, filename)}`], { stdio: 'inherit'});
            vim.on('exit', () => {
                console.log('User is done editing file. Returning to main menu...');
            });
        } else {
            console.log('Please enter a valid command e.g. new app.js');
            autoCommand();
        }
    });
}

autoCommand();

// console.log(path.join(__dirname, filename))


// Event Listeners for terminal based inputs or events

rl.on('SIGSTP', () => {
    console.log('caught SIGSTP');
});

rl.on('SIGCONT', () => {
    // `prompt` will automatically resume the stream
    rl.prompt();
}); 

rl.on('SIGINT', () => {
    console.log("\nUser ended the program... :[");
    process.exit(0);
});

rl.on('SIGTERM', () => {
    console.log('\nProcess was ended abruptly by external process manager... :_[');
    process.exit(0);
});
  
// SIGSTP is the event emitted when a user uses CTRL + Z to pause process and move it to the background. To resume a paused process use `fg` command in shell to 
// resume the process. 