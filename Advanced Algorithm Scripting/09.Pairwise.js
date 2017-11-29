function getPairs(arr, arg) {
    var pairs = [];
    var usedIndexes = new Set;
    for (var i = 0; i < arr.length; i++) {
        
        if (usedIndexes.has(i)) continue;
        
        for (var j = i+1; j < arr.length; j++)
        if (arr[i] + arr[j] === arg) {

            if (usedIndexes.has(j)) continue;

            pairs.push([i, j]);
            usedIndexes.add(i);
            usedIndexes.add(j);
          
            break;          
        }
    }    
    
    return pairs;
  }

  function pairwise(arr, arg) {  
      var pairs = getPairs(arr, arg);
      var res = pairs.reduce((sum, val) => sum + val[0] + val[1], 0);
      return res;
  }    

pairwise([1,4,2,3,0,5], 7);
