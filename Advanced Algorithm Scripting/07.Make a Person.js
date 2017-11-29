
var Person = function(firstAndLast) {
    
      var _firstName, _lastName;
      // Complete the method below and implement the others similarly
      this.getFirstName = function() {
          return _firstName;
      };
      
      this.getLastName = function() {
          return _lastName;
      };
  
      this.getFullName = function() {
        return _firstName + ' ' + _lastName;
      };
  
      this.setFirstName = function(first) {
          _firstName = first;
      };
    
      this.setLastName = function(last) {
          _lastName = last;
      };
      this.setFullName = function(firstAndLast){
          var arr = firstAndLast.split(' ');
          _firstName = arr[0];
          _lastName = arr[1];
      };
    
      this.setFullName(firstAndLast);
  };
  
  var bob = new Person('Bob Ross');
  bob.getFullName();