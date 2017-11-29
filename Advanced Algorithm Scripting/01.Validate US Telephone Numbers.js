function parenthesesAreBalanced(string) {
    var parentheses = "[]{}()",
      stack = [],
      i, character, bracePosition;
  
    for(i = 0; character = string[i]; i++) {
      bracePosition = parentheses.indexOf(character);
  
      if(bracePosition === -1) {
        continue;
      }
  
      if(bracePosition % 2 === 0) {
        stack.push(bracePosition + 1); // push next expected brace position
      } else {
        if(stack.length === 0 || stack.pop() !== bracePosition) {
          return false;
        }
      }
    }
  
    return stack.length === 0;
  }

function telephoneCheck(str) {
    if (!parenthesesAreBalanced(str)) return false;
    
    if (str.charAt(0) === '-') return false;
    // more than 3 digits in brackets
    var arr = str.match(/\(.*\)/g);
    if (arr && arr[0].length !== 5) return false;
    
    str = str.replace(/\s|-|\(|\)/g, '');
    var idx = str.search(/[^0-9]/);
    if (idx !== -1) return false;
    if (str.length === 11 && str.charAt(0) !== '1') return false;
    if (str.length < 10 || str.length > 11) return false;
    return true;
  }
  

telephoneCheck("555-555-5555");