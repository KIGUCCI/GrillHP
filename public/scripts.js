'use strict';

// dotenv パッケージをインポートして、.env ファイルから環境変数を読み込む
require('dotenv').config();

async function fetchMaterials() {
    // .env ファイルからアプリケーションIDを読み込む
    const applicationId = process.env.APPLICATION_ID;
    
    const response = await fetch(`https://api.make.dmm.com/materials/v1?applicationId=${applicationId}`);
    const data = await response.json();

    if (data.resultCode === '200') {
        displayMaterials(data.materials);
    } else {
        console.error(`Error: ${data.resultMessage}`);
    }
}

function displayMaterials(materials) {
    const materialsList = document.getElementById('materials-list');
    materials.forEach(material => {
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${material.materialId}, Name: ${material.materialName}`;
        materialsList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', fetchMaterials);

