const fileSystem = require("fs").promises;
const path = require("path");

const dataPath = path.join(__dirname, "../data/animals.json");

const readData = async () => {
    const data = await fileSystem.readFile(dataPath, "utf-8");
    return JSON.parse(data);
};

const writeData = async (data) => {
   await fileSystem.writeFile(
    dataPath, JSON.stringify(data, null, 2) 

   );
};

module.exports = {
    readData, writeData
}