#!/usr/bin/node
/**
 * Connect to Redis server via Redis client
 */
import { createClient } from 'redis';

const client = createClient();

client.on('error', err => {
  console.error('Redis client not connected to the server:', err.toString());
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

(async () => {
  try {
    await multiSet();
    await displayHolbertonSchools();
  } catch (error) {
    console.error('Error:', error.toString());
  }
})();

async function multiSet() {
  const MULTI = client.multi();
  MULTI.hset('HolbertonSchools', 'Portland', 50);
  MULTI.hset('HolbertonSchools', 'Seattle', 80);
  MULTI.hset('HolbertonSchools', 'New York', 20);
  MULTI.hset('HolbertonSchools', 'Bogota', 20);
  MULTI.hset('HolbertonSchools', 'Cali', 40);
  MULTI.hset('HolbertonSchools', 'Paris', 2);
  await MULTI.exec();
}

async function displayHolbertonSchools() {
  const hashset = await promisify(client.hgetall).bind(client)('HolbertonSchools');
  console.log(hashset);
}
