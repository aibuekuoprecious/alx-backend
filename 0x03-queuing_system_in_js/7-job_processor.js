#!/usr/bin/node
/**
 * This code defines a job processor that listens for job requests and sends notifications based on the job data
 */
import { createQueue } from 'kue';

const blacklist = new Set(['4153518780', '4153518781']); // Using Set for faster lookup

const queue = createQueue();

function sendNotification(phoneNumber, message, job, done) {
  const total = 100;
  function next(p) {
    if (p === 0 || p === total / 2) {
      job.progress(p, total);
      if (p === total / 2) {
        console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
      }
    }
    if (blacklist.has(phoneNumber)) {
      return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    }
    if (p === total) {
      return done();
    }
    return next(p + 1);
  }
  next(0);
}

queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
