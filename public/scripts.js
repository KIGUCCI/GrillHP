'use strict';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/proxy');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const materialsData = await response.json();

        if (materialsData.status === 'OK') { // ここで修正
            const materialsList = document.getElementById('materials-list');
            materialsData.materials.forEach(material => {
                const materialElement = document.createElement('div');
                materialElement.classList.add('material');
                materialElement.innerHTML = `
                    <h2>${material.materialName}</h2>
                    <p>素材ID: ${material.materialId}</p>
                    <p>最小体積: ${material.minVolume} mm³</p>
                    <p>最大体積: ${material.maxVolume} mm³</p>
                    <p>高さ: ${material.maxX} mm</p>
                    <p>幅: ${material.maxY} mm</p>
                    <p>奥行き: ${material.maxZ} mm</p>
                    <img src="${material.materialIconUrl}" alt="${material.materialName} icon">
                `;
                materialsList.appendChild(materialElement);
            });
        } else {
            console.error('APIエラー:', materialsData.resultMessage); // ここで修正
        }
    } catch (error) {
        console.error('通信エラー:', error);
    }
});
