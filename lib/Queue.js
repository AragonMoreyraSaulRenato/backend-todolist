const Queue = require('bull');
const redis = require('../config/redis');
const jobs = require('../jobs');

const queues = Object.values(jobs).map(job => ({
   bull: new Queue(job.key, redis),
   name: job.key,
   handle: job.handle,
}));


module.exports = {
   queues,
   add(name, data) {
      const queue = this.queues.find(queue => queue.name === name)
      return queue.bull.add(data);
   },
   process() {
      return this.queues.forEach(queue => {
         queue.bull.process(queue.handle);
         queue.bull.on('failed', (job, error) => {
            console.log('Job falied', queue.hey, job.data);
            console.log(error);
         })
      });
   }
}
