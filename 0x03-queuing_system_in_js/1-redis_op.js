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

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, (err, reply) => {
    if (err) {
      console.error('Error setting value for', schoolName, ':', err.toString());
    } else {
      console.log('Value set for', schoolName);
    }
  });
}

function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, value) => {
    if (err) {
      console.error('Error getting value for', schoolName, ':', err.toString());
    } else {
      console.log(value);
    }
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
