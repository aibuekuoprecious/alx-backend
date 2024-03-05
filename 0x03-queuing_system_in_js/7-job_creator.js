#!/usr/bin/node
/**
 * Track progress and errors with Kue: Create the Job creator
 */
import { createQueue } from 'kue';

const queue = createQueue();

const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account',
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account',
  },
];

jobs.forEach(job => {
  const newJob = queue.create('push_notification_code_2', job);
  newJob
    .on('complete', (result) => {
      console.log(`Notification job ${newJob.id} completed`);
    })
    .on('failed', (err) => {
      console.log(`Notification job ${newJob.id} failed: ${err.message || err.toString()}`);
    })
    .on('progress', (progress, data) => {
      console.log(`Notification job ${newJob.id} ${progress}% complete`);
    })
    .save((err) => {
      if (err) {
        console.error(`Error creating notification job: ${err.message || err.toString()}`);
        return;
      }
      console.log(`Notification job created: ${newJob.id}`);
    });
});
