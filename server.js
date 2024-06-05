'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path'); 

// .env ファイルで設定したアプリケーションIDを取得する
const applicationId = process.env.APPLICATION_ID;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // index.htmlを返す
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

