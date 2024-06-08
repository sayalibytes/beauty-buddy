const fs = require('fs');
const path = require('path');

const readJsonFile = (filePath) => {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return null;
  }
};

const writeJsonFile = (filePath, data) => {
  try {
    fs.writeFileSync(path.resolve(__dirname, filePath), JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing JSON file:', error);
  }
};

module.exports = { readJsonFile, writeJsonFile };
