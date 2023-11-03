const readline = require("node:readline");
const axios = require("axios");
require('dotenv').config()
const { exec } = require("node:child_process");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const authToken = process.env.AUTH_TOKEN;
const owner = process.env.OWNER;
const repo = 'automating-with-node.js'
let isPushCommandEntered = false;
const prLink = `https://www.github.com/${owner}/${repo}/compare/`;
const aliasPath = "/mnt/c/\"Program Files\"/Google/Chrome/Application/chrome.exe";

function gitAdd(callback=null) {
    exec("git add .", (error, stdout, stderr) => {
        if (error) {
            console.error('Git add operation failed: ', error);
            process.exit(1);
        }

        console.log('Files added to staging area');
        if (callback) {
            callback(); // run another function after git add .
        }
    })
}

function gitCommit(callback=null, msg) {
    exec(`git commit -am \"${msg}\"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`The git commit operation failed: ${error}`);
            return;
        }

        console.log('Files committed');
        if (callback) {
            callback()
        }
    })
}

function promptForCommit() {
    rl.question('Enter your git command:', (input) => {
        if (input[0].trim().toLowerCase() === "a") {
            gitAdd(() => {
                console.log('proceeding to commit process')
                gitCommit(() => {
                    console.log("commit is completed. It is recommended to push commits to a PR using 'gpo' command");
                    promptForCommit();
                }, "notes and files updated!")
            });
        }
         else if (input.includes("gpo")) {
            const branchName = input.replace('gpo ', '').trim();
            const pullRequestLink = prLink + branchName;

            if (pullRequestLink) {
                isPushCommandEntered = true;

                exec(`git push origin ${branchName}`, (error, stdout, stderr) => {
                    if (error) {
                        console.error("Git Push Operation failed: ", error);
                        return;
                    }

                    console.log("git push operation succeeded! Opening link to PR");
                    exec(`${aliasPath} --profile-directory=\"Profile 3\" ${pullRequestLink}`)
                });
      
            } else if(input.toLowerCase[0] === "n" && !input.includes("gpo")){
                console.log('good bye!');
                process.exit(0);
            } else {
                    console.log('Invalid operation, Use --help to see available operations!');
                    promptForCommit();
            }
        }
     })
}


promptForCommit()
  
process.on("SIGINT", () => {
    console.log("good bye!");
    process.exit(0);
})


process.on("SIGTERM", () => {
    console.log("process ended by 3rd party source.");
    process.exit(1);
})