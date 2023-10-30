## OS Module
Goal: Learn how to use the os module to look into the hardware specifications of your machine

### What are the methods of `os` module?

### What ia the `homedir` methods
- `homedir` method (stable in LTS v21) = return your home directory
- ```js 
const os = require(node:os) // require("os");
const homeDir = os.homedir();
```
- homedir() => string
- read [here](https://nodejs.org/api/os.html#oshomedir)

### What is `platform` method?
- `platform` method tell us which OS we are using 
- `const odPlatform = os.platform()`
- platform() => string (aix | darwin | freebsd | linux | openbsd | sunos | win32)
- read [here](https://nodejs.org/api/os.html#osplatform)

### What is `cpus` method?
- `cpus` gives us a object filled with information about our CPU in the PC we're using
- cpus() => Object[] 
- ```js 
[
    {
        model, 
        speed, 
        times: {
            user,
            nice, 
            sys,
            idle, 
            irq   
        }
    }
]
```
- read [here] to see an example here (https://nodejs.org/api/os.html#oscpus). I highly encourage readers to play with the other methods not discussed here!
- We use `cpus` to know how many cores we have and the cpu specs which is very useful for distributed systems to split resources
```js
    const cpuCores = os.cpus();
    const coreCount = cpuCores.length;
    const cpuModel = cpuCores[0].model'
```