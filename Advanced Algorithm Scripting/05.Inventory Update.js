function updateInventory(arr1, arr2) {
    for (var rec of arr2) {
        var curRec = arr1.find(val => val[1] === rec[1]);
        if (curRec)
           curRec[0] += rec[0];
        else
           arr1.push(rec);
    }

    arr1.sort( (a, b) => a[1] > b[1]);
    return arr1;
}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

updateInventory(curInv, newInv);