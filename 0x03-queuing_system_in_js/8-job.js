/**
 * It exports a function createPushNotificationsJobs for creating jobs
 */
function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }
  jobs.forEach(jobData => {
    const job = queue.create('push_notification_code_3', jobData);
    job.on('complete', (result) => {
      console.log(`Notification job ${job.id} completed`);
    }).on('failed', (err) => {
      console.log(`Notification job ${job.id} failed: ${err.message || err.toString()}`);
    }).on('progress', (progress, data) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    }).save((err) => {
      if (err) {
        console.log(`Error creating notification job: ${err.message || err.toString()}`);
      } else {
        console.log(`Notification job created: ${job.id}`);
      }
    });
  });
}

module.exports = createPushNotificationsJobs;
