#!/usr/bin/node
/**
 * This code manages the stock of products
 */
import { promisify } from 'util';
import { createClient } from 'redis';
import express from 'express';

const redisClient = createClient();

redisClient.on('error', (err) => {
  console.error('Redis client not connected to the server:', err.toString());
});

const listProducts = [
  {
    id: 1, name: 'Suitcase 250', price: 50, stock: 4,
  },
  {
    id: 2, name: 'Suitcase 450', price: 100, stock: 10,
  },
  {
    id: 3, name: 'Suitcase 650', price: 350, stock: 2,
  },
  {
    id: 4, name: 'Suitcase 1050', price: 550, stock: 5,
  },
];

function transform(product) {
  return {
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock,
  };
}

function getItemById(id) {
  const product = listProducts.find(item => item.id === id);
  return product ? transform(product) : {};
}

function getItems() {
  return listProducts.map(transform);
}

async function reserveStockById(itemId) {
  const currentStock = await getCurrentReservedStockById(itemId);
  if (currentStock < getItemById(itemId).initialAvailableQuantity) {
    const SET = promisify(redisClient.SET).bind(redisClient);
    await SET(`item.${itemId}`, currentStock + 1);
    return true;
  }
  return false;
}

async function getCurrentReservedStockById(itemId) {
  const GET = promisify(redisClient.GET).bind(redisClient);
  const stock = await GET(`item.${itemId}`);
  return stock ? parseInt(stock) : 0;
}

const app = express();

app.get('/list_products', (req, res) => {
  res.json(getItems());
});

app.get('/list_products/:itemId', async (req, res) => {
  const itemId = Number(req.params.itemId);
  const item = getItemById(itemId);
  if (Object.keys(item).length > 0) {
    const stock = await getCurrentReservedStockById(itemId);
    item.currentQuantity = item.initialAvailableQuantity - stock;
    return res.json(item);
  }
  return res.json({ status: 'Product not found' });
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = Number(req.params.itemId);
  const success = await reserveStockById(itemId);
  if (success) {
    return res.json({ status: 'Reservation confirmed', itemId });
  }
  return res.json({ status: 'Not enough stock available', itemId });
});

async function clearRedisStock() {
  const SET = promisify(redisClient.SET).bind(redisClient);
  await Promise.all(listProducts.map(item => SET(`item.${item.id}`, 0)));
}

app.listen(1245, async () => {
  await clearRedisStock();
  console.log('API available on localhost via port 1245');
});
