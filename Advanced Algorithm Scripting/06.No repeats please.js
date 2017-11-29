function nextPermutation(array) {
    
    // Find longest non-increasing suffix
    var i = array.length - 1;
    while (i > 0 && array[i - 1] >= array[i])
        i--;
    // Now i is the head index of the suffix
    
    // Are we at the last permutation already?
    if (i <= 0)
        return false;
    
    // Let array[i - 1] be the pivot
    // Find rightmost element that exceeds the pivot
    var j = array.length - 1;
    while (array[j] <= array[i - 1])
        j--;
    // Now the value array[j] will become the new pivot
    // Assertion: j >= i
    
    // Swap the pivot with j
    var temp = array[i - 1];
    array[i - 1] = array[j];
    array[j] = temp;
    
    // Reverse the suffix
    j = array.length - 1;
    while (i < j) {
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        i++;
        j--;
    }
    
    // Successfully computed the next permutation
    return true;
}

function resArr(arr, str) {

    var res = [];
    for (let ai of arr) {
        res.push(str.charAt(ai));
    }

    return res;
}

function checkRepeats(arr) {
    
    for (var i = 1; i < arr.length; i++) {
        if (arr[i-1] === arr[i]) return true;
    }    
    return false;
}

function permAlone(str) {

    var arr = [];
    for (var i = 0; i < str.length; i++) {
        arr.push(i);
    }

    var res = 0;
    while(true) {
        var tmpArr = resArr(arr, str);
        if (!checkRepeats(tmpArr)) 
            res++;
        if (!nextPermutation(arr)) break;
    }
    return res;
}

permAlone('aab');
