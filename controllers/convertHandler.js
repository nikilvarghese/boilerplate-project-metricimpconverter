function ConvertHandler() {
  
  this.getNum = function(input) {
    if (typeof input !== 'string') return null;
    let firstAlphaIndex = input.search(/[a-zA-Z]/);
    let numStr = (firstAlphaIndex === -1 ? input : input.substring(0, firstAlphaIndex)).trim();
    
    if (numStr === "") {
      return 1;
    }
    
    // Check for double fractions
    if (numStr.split('/').length > 2) {
      return null;
    }
    
    let parts = numStr.split('/');
    if (parts.length === 2) {
      let num = Number(parts[0]);
      let den = Number(parts[1]);
      if (isNaN(num) || isNaN(den) || den === 0) {
        return null;
      }
      return num / den;
    } else if (parts.length === 1) {
      let num = Number(parts[0]);
      if (isNaN(num)) {
        return null;
      }
      return num;
    }
    
    return null;
  };
  
  this.getUnit = function(input) {
    if (typeof input !== 'string') return null;
    let firstAlphaIndex = input.search(/[a-zA-Z]/);
    if (firstAlphaIndex === -1) {
      return null;
    }
    
    let unitStr = input.substring(firstAlphaIndex).trim().toLowerCase();
    
    if (unitStr === 'l') {
      return 'L';
    }
    
    const validUnits = ['gal', 'mi', 'km', 'lbs', 'kg'];
    if (validUnits.includes(unitStr)) {
      return unitStr;
    }
    
    return null;
  };
  
  this.getReturnUnit = function(initUnit) {
    if (!initUnit) return null;
    let unit = initUnit.toLowerCase();
    switch(unit) {
      case 'gal': return 'L';
      case 'l': return 'gal';
      case 'mi': return 'km';
      case 'km': return 'mi';
      case 'lbs': return 'kg';
      case 'kg': return 'lbs';
      default: return null;
    }
  };

  this.spellOutUnit = function(unit) {
    if (!unit) return null;
    let u = unit.toLowerCase();
    switch(u) {
      case 'gal': return 'gallons';
      case 'l': return 'liters';
      case 'mi': return 'miles';
      case 'km': return 'kilometers';
      case 'lbs': return 'pounds';
      case 'kg': return 'kilograms';
      default: return null;
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    if (initNum === null || !initUnit) return null;
    
    let unit = initUnit.toLowerCase();
    let result;
    
    switch(unit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        return null;
    }
    
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if (initNum === null || !initUnit || returnNum === null || !returnUnit) return null;
    let initUnitString = this.spellOutUnit(initUnit);
    let returnUnitString = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };
  
}

module.exports = ConvertHandler;
