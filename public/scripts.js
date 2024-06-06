// scripts.js
const appId = process.env.APP_ID;
const apiUrl = `https://api.make.dmm.com/materials/v1?applicationId=${appId}`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.resultCode === '200') {
            const materialsList = document.getElementById('materials-list');
            data.materials.forEach(material => {
                const materialElement = document.createElement('div');
                materialElement.classList.add('material');
                materialElement.innerHTML = `
                    <h2>${material.materialName}</h2>
                    <p>素材ID: ${material.materialId}</p>
                    <p>最小体積: ${material.minVolume} mm3</p>
                    <p>最大体積: ${material.maxVolume} mm3</p>
                    <p>高さ: ${material.maxX} mm</p>
                    <p>幅: ${material.maxY} mm</p>
                    <p>奥行き: ${material.maxZ} mm</p>
                    <img src="${material.materialIconUrl}" alt="${material.materialName} icon">
                `;
                materialsList.appendChild(materialElement);
            });
        } else {
            console.error('APIエラー:', data.resultMessage);
        }
    })
    .catch(error => console.error('通信エラー:', error));
