#!/usr/bin/node
/**
 * This code handles seat reservations
 */
import { promisify } from 'util';
import { createClient } from 'redis';
import { createQueue } from 'kue';
import express from 'express';

const redisClient = createClient();

redisClient.on('error', (err) => {
  console.error('Redis client not connected to the server:', err.toString());
});

function reserveSeat(number) {
  return promisify(redisClient.SET).call(redisClient, 'available_seats', number);
}

async function getCurrentAvailableSeats() {
  try {
    const seats = await promisify(redisClient.GET).call(redisClient, 'available_seats');
    return seats;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to get available seats');
  }
}

const queue = createQueue();

const app = express();

let reservationEnabled = true;

app.get('/available_seats', async (req, res) => {
  try {
    const seats = await getCurrentAvailableSeats();
    res.json({ numberOfAvailableSeats: seats });
  } catch (err) {
    res.status(500).json(null);
  }
});

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation is blocked' });
  }

  const job = queue.create('reserve_seat', { task: 'reserve a seat' });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  }).on('failed', (err) => {
    console.error(`Seat reservation job ${job.id} failed: ${err.message || err.toString()}`);
  }).save((err) => {
    if (err) {
      return res.json({ status: 'Reservation failed' });
    }
    return res.json({ status: 'Reservation in process' });
  });
});

app.get('/process', (req, res) => {
  res.json({ status: 'Queue processing' });

  queue.process('reserve_seat', async (job, done) => {
    try {
      let availableSeats = await getCurrentAvailableSeats();
      availableSeats = parseInt(availableSeats) - 1;
      await reserveSeat(availableSeats);
      
      if (availableSeats >= 0) {
        if (availableSeats === 0) {
          reservationEnabled = false;
        }
        done();
      } else {
        done(new Error('Not enough seats available'));
      }
    } catch (err) {
      console.error('Failed to process job:', err);
      done(err);
    }
  });
});

app.listen(1245, async () => {
  try {
    await reserveSeat(50);
    console.log('API available on localhost via port 1245');
  } catch (err) {
    console.error('Failed to initialize available seats:', err);
    process.exit(1);
  }

});
