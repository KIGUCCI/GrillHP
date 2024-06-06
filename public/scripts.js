'use strict';

document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/environment')
        .then(response => response.json())
        .then(data => {
            const applicationId = data.applicationId;

            // プロキシサーバーを経由してDMMのAPIにアクセス
            const apiUrl = 'https://api.make.dmm.com/materials/v1?applicationId=' + applicationId;
            const proxyUrl = '/proxy?url=' + encodeURIComponent(apiUrl);

            fetch(proxyUrl)
                .then(response => response.json())
                .then(data => {
                    // 取得したデータを処理する
                    if (data.resultCode === '200') {
                        const materials = data.materials;
                        // 素材一覧を表示するための処理を記述する
                        displayMaterials(materials);
                    } else {
                        console.error('APIエラー:', data.resultMessage);
                    }
                })
                .catch(error => {
                    console.error('エラー:', error);
                });
        })
        .catch(error => {
            console.error('APIエラー:', error);
        });

    function displayMaterials(materials) {
        const materialList = document.getElementById('material-list');
        materials.forEach(material => {
            const listItem = document.createElement('li');
            listItem.textContent = `${material.materialName} (ID: ${material.materialId})`;
            materialList.appendChild(listItem);
        });
    }
});

