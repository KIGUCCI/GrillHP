'use strict';

require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch'); // 追加
const app = express();
const path = require('path');

// .env ファイルで設定したアプリケーションIDを取得する
const applicationId = process.env.APPLICATION_ID;

// 静的ファイルを提供する
app.use(express.static(path.join(__dirname, 'public')));

// CORSを許可するためのミドルウェア
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// 環境変数をクライアントに提供するAPIエンドポイントを作成する
app.get('/api/environment', (req, res) => {
    res.json({ applicationId });
});

// プロキシエンドポイント
app.get('/proxy', async (req, res) => { // async を追加
  const url = req.query.url;
  if (!url) {
    res.status(400).send('URL is required');
    return;
  }
  try {
    const response = await fetch(url); // await を使用してfetchを非同期で実行
    const text = await response.text(); // レスポンスからテキストを取得
    res.send(text); // テキストをクライアントに返す
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ルートリクエストでindex.htmlを返す
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
