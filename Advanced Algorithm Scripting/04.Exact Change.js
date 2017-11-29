function convertDrawer(cid) {
    var res = [];
    for (var bill of cid) {
        var record = {name: bill[0], sum: 100*bill[1]};
        if (record.name == "PENNY")
           record.value = 1;
        else if (record.name == "NICKEL")
           record.value = 5;
        else if (record.name == "DIME")
           record.value = 10;
        else if (record.name == "QUARTER")
           record.value = 25;
        else if (record.name == "ONE")
           record.value = 100;
        else if (record.name == "FIVE")
           record.value = 500;
        else if (record.name == "TEN")
           record.value = 1000;
        else if (record.name == "TWENTY")
           record.value = 2000;
        else if (record.name == "ONE HUNDRED")
           record.value = 10000;

        record.qty = Math.round(record.sum / record.value, 0);   
        res.push(record); 
    }

    res.sort( (a, b) => b.value - a.value );
    return res;
}

function checkCashRegister(price, cash, cid) {
    // Here is your change, ma'am.
    cid = convertDrawer(cid);

    var i = 0;
    var change = 100*cash - 100*price;
    var funds = cid.reduce( (sum, value) => sum + value.sum, 0);
    if (change === funds) return "Closed";
    if (change > funds) return "Insufficient Funds";

    var res = [];
    while(true) {

        var qty = Math.trunc(change / cid[i].value);
        if (qty > 0) {
            qty = Math.min(qty, cid[i].qty);
            var value = qty * cid[i].value;
            res.push([cid[i].name, value/100]);
            change -= value;
        }

        i++;
        if (change === 0 || i === cid.length) break;

    }

    if (change !== 0) return "Insufficient Funds";
    return res;
  }
  
// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.10],
// ["QUARTER", 4.25],
// ["ONE", 90.00],
// ["FIVE", 55.00],
// ["TEN", 20.00],
// ["TWENTY", 60.00],
// ["ONE HUNDRED", 100.00]]

checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);
