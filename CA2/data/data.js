let ethereum = [];
let table;

function preload() {
    table = loadTable('data/ethereum.csv', 'csv', 'header');
}

function generateData() {
    for (let r = 0; r < table.getRowCount(); r++) {
        ethereum.push(table.rows[r].obj);
        ethereum[r].adjustedPrice = float(ethereum[r].adjustedPrice);
        ethereum[r].openPrice = float(ethereum[r].openPrice);
        ethereum[r].closePrice = float(ethereum[r].closePrice);
        ethereum[r].highPrice = float(ethereum[r].highPrice);
        ethereum[r].lowPrice = float(ethereum[r].lowPrice);
        // ethereum[r].sumRevenue10mUSD = float(ethereum[r].sumRevenue10mUSD);
    }
}