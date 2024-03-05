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

const listener = message => console.log(message);

client.subscribe('holberton school channel', (err) => {
  if (err) {
    console.error('Error subscribing to channel:', err.toString());
    return;
  }
  console.log('Subscribed to "holberton school channel"');
});

client.on('message', (channel, message) => {
  if (channel === 'holberton school channel') {
    if (message === 'KILL_SERVER') {
      client.unsubscribe();
      client.quit();
    } else {
      listener(message);
    }
  }
});
