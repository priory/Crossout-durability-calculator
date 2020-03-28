/**
 * Sorts the array by the given property name.
 *
 * @param {object[]} o Array of objects.
 * @param {string} dm Property that represents durability per mass.
 * @param {boolean} reverse Whether to reverse the array.
 * @return {array} Returns the sorted array.
 * @author LetMehHealPl0x
 */
function sortArray_(o, prop, reverse) {
  if (typeof reverse != 'boolean') reverse = false;
  
  o.sort(function (a, b) {
    if (a[prop] < b[prop]) return (reverse * 2 - 1); 
    if (a[prop] > b[prop]) return -(reverse * 2 - 1); 
    return 0;
  });
  // o.sort(function (a, b) {return a[prop] - b[prop];});
  // if (reverse) o.reverse();
  return o;
}

/**
 * Convert an object to range.
 *
 * @param {object} o Object.
 * @param {string[]} p Properties to show.
 * @return {range} Returns a range.
 * @author LetMehHealPl0x
 */
function objectToRange_(o, p) {
  var r = [];
  
  for (var i = 0; i < o.length; i++) {
    var a = [];
    for (var j = 0; j < p.length; j++) {
      a.push(o[i][p[j]]);
    }
    r.push(a);
  }
  
  return r;
}

/**
 * Converts range to object.
 * Add extra parameters in f function, e.g: function (p) {p.myParam = 'foo'}.
 * If the required parameters are blank, then that part will be excluded.
 * First row of the range are properties.
 *
 * @param {range} r Range.
 * @param {(p: object) => void} f Function that adds extra parameters to p.
 * @param {string[]} m Required parameters.
 * @return {object} Returns an object form the range.
 * @author LetMehHealPl0x
 */
function rangeToObject_(r, f, m) {
  if (typeof f != 'function') {
    f = function () {};
  };
  
  var o = [];
  
  loop1: 
  for (var i = 1; i < r.length; i++) {
    var p = {};
    var valid = false;
    for (var j = 0; j <r[0].length; j++) {
      if (! isBlank_(r[i][j])) valid = true;
      p[r[0][j]] = r[i][j];
    }
    
    for (var k in m) {
      if (isBlank_(p[m[k]])) continue loop1;
    }
    
    f(p);
    if (valid) o.push(p);
  }
  
  return o;
}

/**
 * Converts a one-dimentional range to a one-dimentional array.
 * Range can either be a cell, horizontal, vertical or already an array.
 *
 * @param {range} r Range.
 * @param {boolean} removeBlank Whether to remove blank cells.
 * @return {string[]} Returns an array of strings.
 * @author LetMehHealPl0x
 */
function rangeTo1DArray_(r, removeBlank) {
  if (typeof removeBlank != 'boolean') removeBlank = true;
  
  var type;
  var a = [];
  
  if (typeof r[0] == 'object') {
    if (r[0].length > 1) type= 'row';
    else type = 'column';
  } else {
    if (typeof r == 'string') type = 'cell';
    if (typeof r == 'object') type = 'array';
  }
  
  switch (type) {
    case 'cell':
      if (removeBlank) {
      if (! isBlank_(r))
        a.push(r);
      } else a.push(r);
      break;
    case 'column':
      for (var i in r) {
        if (removeBlank) {
        if (! isBlank_(r[i][0]))
          a.push(r[i][0]);
        } else a.push(r[i][0]);
      }
      
      break;
    case 'row':
      for (var i in r[0]) {
        if (removeBlank) {
          if (! isBlank_(r[0][i]))
            a.push(r[0][i]);
        } else a.push(r[0][i]);
      }
      
      break;
    case 'array':
      return r;
    default:
      return;
  }
  
  return a;
}

/**
 * Applies conditions which each object must pass.
 * Strings are evaluated like normal JavaScript code.
 * E.g.: ["myPropA > 0 && myPropB < 20", "myPropC == 'foo'"].
 *
 * @param {object} o Object.
 * @param {string[]} c String of conditions.
 * @return {object} Returns the filtered object.
 * @author LetMehHealPl0x
 */
function applyConditions_(o, c) {
  var regex = /\b(?!(?:false|true))\b([a-zA-A$_][0-9a-zA-Z$_]*)(?![0-9a-zA-Z$_]*')/g;
  
  i: for (var i = 0; i < o.length; i++) {
    for (var j = 0; j < c.length; j++) {
      if (! eval(c[j].replace(regex, 'o[' + i + '][\'$1\']'))) {
        o.splice(i, 1);
        i--;
        continue i;
      }
    }
  }
  
  return o;
}

/**
 * Checks if the given value is empty.
 * Number '0' is not empty.
 * Empty string is empty.
 * 
 * @param {any} v Value.
 * @return {bool} returns Whether empty of not.
 */
function isBlank_(v) {
  if (typeof v == 'number') return false;
  else if (v.length > 0) return false;
  return true;
}
