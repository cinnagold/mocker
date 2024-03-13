const fs = require("fs");
const path = require("path");
const { config } = require("./config");

function saveToCSV(filename, data) {
  const headers = Object.keys(data[0]);
  const filteredHeaders = headers.filter((header) => !header.startsWith("_"));
  const headerRow = filteredHeaders.join(",") + "\n";
  const dataRows = data
    .map((row) => filteredHeaders.map((header) => row[header]).join(","))
    .join("\n");
  const csv = headerRow + dataRows;
  writeFile(filename, csv);
}

function writeFile(filename, data, opt) {
  const dir = path.dirname(filename);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filename, data, opt);
}

function deleteFile(filename) {
  fs.access(filename, fs.constants.F_OK, (err) => {
    if (err) {
        return; //File doesn't exist. Ignore silently
    }

    fs.unlink(filename, (err) => {
        if (err) {
            console.error(`Error deleting file: ${err}`);
        }
    });
});
}

module.exports = { saveToCSV, writeFile, deleteFile };
