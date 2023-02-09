const crypto = require("crypto");
const fs = require('fs');


const MAX_MESSAGE_LENGTH = 1024;

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Enter sheets amount: ', amount => {
    generateKeys(amount)
    readline.close();
});

const generateKeys = (amount) => {
    const keys = []
    for (let i = 0; i < amount; i++) {
        keys.push({
            number: i,
            key: generateRealRandomString()
        })
    }
    saveFile(JSON.stringify(keys))
}
const generateRealRandomString = () => {
    let string = ''
    for (let i = 0; i < MAX_MESSAGE_LENGTH; i++) {
        string += String.fromCharCode(crypto.randomInt(0, 65536))
    }
    return string
}
const generateRandomString = (lenght) => {
    const alphabet = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm";
    const shuffled = alphabet.split('').sort(() => 0.5 - Math.random()).join('');
    return shuffled.slice(0, lenght)
}

const saveFile = (content) => {
    const fileName = generateRandomString(20)
    fs.writeFile(`keys/${fileName}.json`, content, err => {
        if (err) {
            console.error(err);
        }
        console.log("Keys were generated")
    });
}