const { readFileSync } = require('fs');
const { deserialize } = require('v8');


const buf = readFileSync(__dirname + '/../index/costs.v8');
const index = deserialize(buf);

console.error(index)
