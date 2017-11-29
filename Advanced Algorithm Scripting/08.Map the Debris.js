
function orbitalPeriod(arr) {
    var GM = 398600.4418;
    var earthRadius = 6367.4447;
    arr.forEach(val => {
      val.orbitalPeriod = Math.round(2 * Math.PI * Math.sqrt(Math.pow(earthRadius + val.avgAlt, 3) / GM));
      delete val.avgAlt;
    });
    return arr;
  }
  
  orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);