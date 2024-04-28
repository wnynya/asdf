'use strict';

import express from './express.mjs';

import http from 'http';

let port = 39080;

http.createServer(express).listen(port, () => {
  console.log(`Server start on port ${port}`);
});
