const timeout = 1000;

let locked = false;
const bruteforceProtection = (res) => {
    if (locked) {
        res.status(504)
        res.send("Try again  later");
        return -1;
    }
    locked = true;
    setTimeout(() => {
        locked = false
    }, timeout)
};
module.exports = {bruteforceProtection: bruteforceProtection}
