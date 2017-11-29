function sym2(arr0, arr1) {
    // merge sorted arrays
    var i = [0, 0];
    var k = 0;
    var res = [];
    while(true) {

        if (i[0] >= arguments[0].length && i[1] >= arguments[1].length)
          break;
        if (i[0] >= arguments[0].length)
          k = 1;
        else if (i[1] >= arguments[1].length)
          k = 0; 
        else if (arguments[0][i[0]] <= arguments[1][i[1]]) { 
          k = 0;
        } else {
          k = 1;
        }  

        // element of merged array      
        var val = arguments[k][i[k]];
      
        var opposite     = arguments[1 - k][i[1 - k]];
        var prevOppisite = arguments[1 - k][i[1 - k] - 1];
        var prev         = arguments[k][i[k] - 1];
      
        if (val !== opposite &&
            val !== prevOppisite &&
            val !== prev
        )
          res.push(arguments[k][i[k]]);
        i[k]++;   
    }
    
    return res;
  }

  function sym() {
      var res = arguments[0];
      res.sort((a, b) => a-b);
      for (var i = 1; i < arguments.length; i++) {
        arguments[i].sort((a, b) => a-b);
        res = sym2(res, arguments[i]);
      }

      return res;
  }
  

sym([1, 2, 3], [5, 2, 1, 4]);