#!/usr/bin/node
/**
 * This code defines a job processor that listens for job requests and sends notifications based on the job data
 */
import { createQueue } from 'kue';

const queue = createQueue();

function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

queue.process('push_notification_code', (job, done) => {
  try {
    sendNotification(job.data.phoneNumber, job.data.message);
    done();
  } catch (error) {
    console.error('Error processing job:', error.toString());
    done(error);
  }
});
