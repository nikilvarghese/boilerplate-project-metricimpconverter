const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('Function convertHandler.getNum(input)', function() {
    
    test('convertHandler should correctly read a whole number input.', function() {
      assert.equal(convertHandler.getNum('32L'), 32);
    });
    
    test('convertHandler should correctly read a decimal number input.', function() {
      assert.equal(convertHandler.getNum('32.5L'), 32.5);
    });
    
    test('convertHandler should correctly read a fractional input.', function() {
      assert.equal(convertHandler.getNum('5/2L'), 2.5);
    });
    
    test('convertHandler should correctly read a fractional input with a decimal.', function() {
      assert.equal(convertHandler.getNum('5.4/3L'), 1.8);
    });
    
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function() {
      assert.isNull(convertHandler.getNum('3/2/3L'));
    });
    
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function() {
      assert.equal(convertHandler.getNum('L'), 1);
    });
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('convertHandler should correctly read each valid input unit.', function() {
      let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
      let output = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      input.forEach(function(ele, index) {
        assert.equal(convertHandler.getUnit(ele), output[index]);
      });
    });
    
    test('convertHandler should correctly return an error for an invalid input unit.', function() {
      assert.isNull(convertHandler.getUnit('32g'));
    });
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('convertHandler should return the correct return unit for each valid input unit.', function() {
      let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      let expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
    });
    
  });
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function() {
      let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      let expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('convertHandler should correctly convert gal to L.', function() {
      assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
    });
    
    test('convertHandler should correctly convert L to gal.', function() {
      assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.00001);
    });
    
    test('convertHandler should correctly convert mi to km.', function() {
      assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
    });
    
    test('convertHandler should correctly convert km to mi.', function() {
      assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.00001);
    });
    
    test('convertHandler should correctly convert lbs to kg.', function() {
      assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.00001);
    });
    
    test('convertHandler should correctly convert kg to lbs.', function() {
      assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.00001);
    });
    
  });
  
});