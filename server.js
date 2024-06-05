'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

// .env ファイルで設定したアプリケーションIDを取得する
const applicationId = process.env.APPLICATION_ID;

// 静的ファイルを提供する
app.use(express.static(path.join(__dirname, 'public')));

// 環境変数をクライアントに提供するAPIエンドポイントを作成する
app.get('/api/environment', (req, res) => {
    res.json({ applicationId });
});

// ルートリクエストでindex.htmlを返す
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});








