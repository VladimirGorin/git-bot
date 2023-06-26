const jsonFile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");
const FILE_PATH = "./data.json";

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


const makeCommit = n => {
    if (n === 0) return simpleGit().push();
    const x = getRandomArbitrary(0, 56)
    const y = getRandomArbitrary(0, 6);
    const DATE = moment().subtract(1, "y").add(1, "d")
        .add(x, "w").add(y, "d").format();

    const data = {
        date: DATE
    }
    console.log(DATE)
    jsonFile.writeFile(FILE_PATH, data, () => {
        simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE }, makeCommit.bind(this, --n))
    });
}

makeCommit(1000);