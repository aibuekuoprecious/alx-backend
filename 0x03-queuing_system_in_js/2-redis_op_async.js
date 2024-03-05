#!/usr/bin/node
/**
 * Connect to Redis server via Redis client
 */
import { promisify } from 'util';
import { createClient } from 'redis';

const client = createClient();

client.on('error', err => {
  console.error('Redis client not connected to the server:', err.toString());
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

async function setNewSchool(schoolName, value) {
  const SET = promisify(client.set).bind(client);
  try {
    await SET(schoolName, value);
    console.log('Value set for', schoolName);
  } catch (error) {
    console.error('Error setting value for', schoolName, ':', error.toString());
  }
}

async function displaySchoolValue(schoolName) {
  const GET = promisify(client.get).bind(client);
  try {
    const value = await GET(schoolName);
    console.log(value);
  } catch (error) {
    console.error('Error getting value for', schoolName, ':', error.toString());
  }
}

(async () => {
  await displaySchoolValue('Holberton');
  await setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
})();
