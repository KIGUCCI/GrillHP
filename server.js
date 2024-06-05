'use strict';

const express = require('express');
const fetch = require('node-fetch'); // node-fetch モジュールを追加
const app = express();

app.get('/materials', async (req, res) => {
    const applicationId = process.env.APPLICATION_ID;
    const response = await fetch(`https://api.make.dmm.com/materials/v1?applicationId=${applicationId}`);
    const data = await response.json();

    if (data.resultCode === '200') {
        res.json(data.materials);
    } else {
        res.status(500).json({ error: data.resultMessage });
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});



