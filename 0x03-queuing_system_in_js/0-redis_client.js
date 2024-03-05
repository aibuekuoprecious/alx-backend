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
