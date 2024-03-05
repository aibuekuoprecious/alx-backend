/**
 * This code contains tests for the createPushNotificationsJobs function
 */
import { createQueue } from 'kue';
import chai from 'chai';
import sinon from 'sinon';
import createPushNotificationsJobs from './8-job';

const expect = chai.expect;

const queue = createQueue();

const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account',
  },
];

describe('createPushNotificationsJobs', () => {
  beforeEach(() => {
    sinon.spy(console, 'log');
  });

  before(() => {
    queue.testMode.enter();
  });

  afterEach(() => {
    sinon.restore();
    queue.testMode.clear();
  });

  after(() => {
    queue.testMode.exit();
  });

  it('should throw an error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs(1, queue)).to.throw(Error, /Jobs is not an array/);
  });

  it('should throw an error if queue is not a valid kue', function() {
    expect(() => createPushNotificationsJobs(jobs, "")).to.throw();
  });

  it('should create jobs', () => {
    createPushNotificationsJobs(jobs, queue);
    const createdJob = queue.testMode.jobs[0];
    expect(createdJob.type).to.equal('push_notification_code_3');
    expect(createdJob.data).to.eql(jobs[0]);
    expect(console.log.calledWith(`Notification job created: ${createdJob.id}`)).to.be.true;
  });

  it('should report job progress', (done) => {
    createPushNotificationsJobs(jobs, queue);
    const createdJob = queue.testMode.jobs[0];
    createdJob.on('progress', () => {
      expect(console.log.calledWith(`Notification job ${createdJob.id} 50% complete`)).to.be.true;
      done();
    });
    createdJob.emit('progress', 50, 100);
  });

  it('should report job failure', (done) => {
    createPushNotificationsJobs(jobs, queue);
    const createdJob = queue.testMode.jobs[0];
    createdJob.on('failed', () => {
      expect(console.log.calledWith(`Notification job ${createdJob.id} failed: job failed!`)).to.be.true;
      done();
    });
    createdJob.emit('failed', new Error('job failed!'));
  });

  it('should report job completion', (done) => {
    createPushNotificationsJobs(jobs, queue);
    const createdJob = queue.testMode.jobs[0];
    createdJob.on('complete', () => {
      expect(console.log.calledWith(`Notification job ${createdJob.id} completed`)).to.be.true;
      done();
    });
    createdJob.emit('complete', true);
  });
});
