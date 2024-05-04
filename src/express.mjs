'use strict';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: 104857600 }));

app.use(express.static(path.resolve(__dirname, './public')));

app.get('/error-403', (req, res) => {
  res.status(403).send('FORBIDDEN');
});

app.get('/:key', (req, res) => {
  const boothID = 'testbooth';
  const tableID = 'testTable';
  res.cookie('booth', boothID, {});
  res.cookie('table', tableID, {});
  res.redirect('/');
});

app.all('*', (req, res) => {
  res.status(404).send('404 NOT FOUND');
});

export default app;
