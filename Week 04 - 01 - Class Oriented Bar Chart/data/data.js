let data03 = [];
let table;

function preload() {
    table = loadTable('data/ethereum.csv', 'csv', 'header');
}

function generateData() {
    for (let r = 0; r < table.getRowCount(); r++) {
        data03.push(table.rows[r].obj);
        data03[r].adjustedPrice = float(data03[r].adjustedPrice);
        data03[r].openPrice = float(data03[r].openPrice);
        data03[r].closePrice = float(data03[r].closePrice);
        data03[r].highPrice = float(data03[r].highPrice);
        data03[r].lowPrice = float(data03[r].lowPrice);
        // data03[r].sumRevenue10mUSD = float(data03[r].sumRevenue10mUSD);
    }
}