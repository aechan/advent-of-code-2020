import { exit } from "process";

const execSync = require('child_process').execSync;

const arg = process.argv[2] || exit(-1);

execSync(`node dist/day${arg}/main.js`, {stdio:[0, 1, 2]});
