'use strict';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/proxy', {
            method: 'GET',
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
                <img src="${model.modelThumbnailUrl}" alt="${model.modelName} thumbnail">
            `;

            modelElement.addEventListener('click', () => {
                if (modelElement.classList.contains('expanded')) {
                    modelElement.classList.remove('expanded');
                    modelElement.innerHTML = `
                        <h2>${model.modelName}</h2>
                        <img src="${model.modelThumbnailUrl}" alt="${model.modelName} thumbnail">
                    `;
                } else {
                    modelElement.classList.add('expanded');
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
                }
            });

            modelsList.appendChild(modelElement);
        });

        // スライド機能の追加
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        let scrollPosition = 0;

        nextButton.addEventListener('click', () => {
            const modelWidth = modelsList.querySelector('.model').clientWidth + 20; // 各モデルの幅＋マージン
            const visibleModels = Math.floor(modelsList.clientWidth / modelWidth);
            const maxScroll = (modelWidth * (modelsData.models.length - visibleModels));
            scrollPosition = Math.min(scrollPosition + modelWidth * visibleModels, maxScroll);
            modelsList.style.transform = `translateX(-${scrollPosition}px)`;
        });

        prevButton.addEventListener('click', () => {
            const modelWidth = modelsList.querySelector('.model').clientWidth + 20; // 各モデルの幅＋マージン
            const visibleModels = Math.floor(modelsList.clientWidth / modelWidth);
            scrollPosition = Math.max(scrollPosition - modelWidth * visibleModels, 0);
            modelsList.style.transform = `translateX(-${scrollPosition}px)`;
        });

    } catch (error) {
        console.error('通信エラー:', error);
    }
});
