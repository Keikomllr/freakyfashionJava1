document.getElementById('loadProducts').addEventListener('click', () => {
    fetch('/admin/products') // サーバーから商品を取得
        .then(response => response.json())
        .then(data => {
            const newProductTable = document.getElementById('newProductTableBody');
            newProductTable.innerHTML = ''; // テーブルの内容をリセット
            
            data.forEach(newProduct => {
                // 新しい<tr>を作成
                const row = document.createElement('tr');

                // <td>を作成して値を設定
                const nameCell = document.createElement('td');
                nameCell.textContent = newProduct.namn;

                const skuCell = document.createElement('td');
                skuCell.textContent = newProduct.sku;

                const amountCell = document.createElement('td');
                amountCell.textContent = newProduct.amount;

                // <tr>に<td>を追加
                row.appendChild(nameCell);
                row.appendChild(skuCell);
                row.appendChild(amountCell);

                 // <table>に<tr>を追加
                 newProductTable.appendChild(row);

                
            });
        })
        .catch(error => console.error('エラー:', error));
});