require('dotenv').config({ path: 'variables.env' });
const Queue = require('./lib/Queue');
Queue.process();