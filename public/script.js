document.addEventListener('DOMContentLoaded', async () => {
    try {
        const environmentResponse = await fetch('/api/environment');
        if (!environmentResponse.ok) {
            throw new Error(`API environment request failed with status ${environmentResponse.status}`);
        }
        const { applicationId } = await environmentResponse.json();

        const response = await fetch(`/proxy?url=https://api.make.dmm.com/materials/v1?applicationId=${applicationId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`API materials request failed with status ${response.status}`);
        }
        const modelsData = await response.json();

        const modelsList = document.getElementById('models-list');
        if (!modelsData.models || modelsData.models.length === 0) {
            throw new Error('No models data available');
        }
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

