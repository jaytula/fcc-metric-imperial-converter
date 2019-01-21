/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  function processInput(input) {
    let [numberPart] = input.split(/[a-zA-Z]/)
    let reNum = /^(\d+(\.\d+)?)(\/(\d+(\.\d+)?))?$/
    let reUnit = /(l|gal|mi|km|lbs|kg)$/i
    
    if(!/^\d/.test(input))
      throw new Error('no number')
    if(!reNum.test(numberPart) && !reUnit.test(input))
      throw new Error('invalid number and unit')
    if(!reNum.test(numberPart))
      throw new Error('invalid number')
    if(!reUnit.test(input))
      throw new Error('invalid unit')
    
    let re = /^(\d+(\.\d+)?)(\/(\d+(\.\d+)?))?(l|gal|mi|km|lbs|kg)$/i
    let matched = input.match(re)
    if(!matched) throw new Error('invalid input')
    let [, num, , , divisor, , unit ]  = matched
    num = divisor ? num / divisor : num
    return {num, unit}
  }
  
  this.getNum = function(input) {
    var {num} = processInput(input)
    
    return num;
  };
  
  this.getUnit = function(input) {
    var {unit} = processInput(input)
    
    return unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    return {gal: 'l', l: 'gal', mi: 'km', km: 'mi', lbs : 'kg', kg: 'lbs'}[initUnit.toLowerCase()]

  };

  this.spellOutUnit = function(unit) {
    return {
      gal: 'gallons',
      l: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'}[unit.toLowerCase()]
  };
  
  this.convert = function(initNum, initUnit) {
    initUnit = initUnit.toLowerCase()
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let ratio;
    switch (initUnit) {
      case 'gal': ;
      case 'l': ratio = galToL; break
      case 'lbs': ;
      case 'kg': ratio = lbsToKg; break;
      case 'mi': ;
      case 'km': ratio= miToKm; break;
    } 
    return (['gal', 'lbs', 'mi'].indexOf(initUnit) !== -1) ? initNum * ratio : initNum / ratio
    
    //return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let spelledInitUnit = this.spellOutUnit(initUnit)
    let spelledReturnUnit = this.spellOutUnit(returnUnit)
    return `${initNum} ${spelledInitUnit} converts to ${returnNum.toFixed(5)} ${spelledReturnUnit}`
  };
  
}

module.exports = ConvertHandler;
