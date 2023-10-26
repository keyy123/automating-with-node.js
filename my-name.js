const args = process.argv.slice(2);
const [name] = args;

if (name === undefined) {
    console.error('no argument given, try this node my-name.js \'meep\'');
    process.exit(0);
}

console.log(name)