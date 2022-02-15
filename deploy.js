require('dotenv').config();
const execSync = require('child_process').execSync;
const path = require("path");

const resolvedPath = (folder) => path.resolve(folder);

execSync(
    `rsync -avzr --delete --progress ${resolvedPath(process.env.ORIGIN)} ${process.env.TARGET}`,
    {
        stdio: [0, 1, 2]
    });