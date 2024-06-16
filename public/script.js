'use strict';

     document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch( `/proxy?url=https://api.make.dmm.com/models/list/v1?applicationId=${applicationId}&offset=0&limit=10&order=new`, {
            method: 'GET',
            mode: 'cors', // リクエストモードを cors に設定
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
       const modelsData = await response.json();

        const modelsList = document.getElementById('models-list');
        modelsData.models.forEach(model => {
            const modelElement = document.createElement('div');
            modelElement.classList.add('model');
            modelElement.innerHTML = `
                <h2>${model.modelName}</h2>
                <p>モデルID: ${model.modelId}</p>
                <p>モデルステータス: ${model.modelStatusId}</p>
                <p>最安価格: ${model.modelPriceRow} 円 (税抜き)</p>
                <p>最高価格: ${model.modelPriceHigh} 円 (税抜き)</p>
                <p>クリエイター名: ${model.creatorName}</p>
                <p>造形可能商品SKU数: ${model.skuCount}</p>
                <p>オススメ: ${model.recommendedFlg === '1' ? 'ON' : 'OFF'}</p>
                <a href="${model.orderUrl}" target="_blank">注文ページ</a>
                <img src="${model.modelThumbnailUrl}" alt="${model.modelName} thumbnail">
            `;
            modelsList.appendChild(modelElement);
        });
    } catch (error) {
        console.error('通信エラー:', error);
    }
});
