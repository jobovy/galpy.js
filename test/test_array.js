/*
 * test_array.js: tests of the array class and array functionality
 */
import chai from 'chai'
let assert = chai.assert;
let expect= chai.expect;

import { default as array } from '../src/util/array'

let arr;
/*
 * Tests of the initializations
 */
describe('array.zeros', function () {
    it('should create an array with all zeros', function () {
	array.zeros(10).forEach(v => assert.equal(v,0,'Value in zeros is not equal to zero'));
    });
});

describe('array.ones', function () {
    it('should create an array with all ones', function () {
	array.ones(10).forEach(v => assert.equal(v,1,'Value in ones is not equal to one'));
    });
});

describe('array.ones with multiple dimensions', function () {
    it('should create a multi-dimensional array with all ones', function () {
	array.ones([2,10]).forEach(v => v.forEach(y => assert.equal(y,1,'Value in ones is not equal to one')));
    });
});

describe('array.empty with multiple dimensions', function () {
    it('should create a multi-dimensional array with all nulls', function () {
	array.empty([2,10]).forEach(v => v.forEach(y => assert.equal(y,null,'Value in array.empty is not equal to null')));
    });
});

describe('array.empty', function () {
    it('should create an array with all nulls', function () {
	array.empty(10).forEach(v => assert.equal(v,null,'Value in array.empty is not equal to null'));
    });
});

describe('array.linspace', function () {
    it('should create an array starting at the starting value', function () {
	assert.approximately(array.linspace(0,2,11)[0],0,1e-8,'Starting value of linspace is not equal to start');
    });
    it('should create an array ending at the ending value', function () {
	assert.approximately(array.linspace(0,2,11)[10],2,1e-8,'Ending value of linspace is not equal to end');
    });
    it('should create an array with equal spacing', function () {
	array.linspace(0,2,11).forEach((v,idx,arr) => (idx > 1? assert.approximately(v-arr[idx-1],arr[idx-1]-arr[idx-2],1e-8,'Spacing of linspace array is not constant') : true));
    });
});

describe('array.geomspace', function () {
    it('should create an array starting at the starting value', function () {
	assert.approximately(array.geomspace(1,20,11)[0],1,1e-8,'Starting value of geomspace is not equal to start');
    });
    it('should create an array ending at the ending value', function () {
	assert.approximately(array.geomspace(1,20,11)[10],20,1e-8,'Ending value of geomspace is not equal to end');
    });
    it('should create an array with equal spacing', function () {
	array.geomspace(1,20,11).forEach((v,idx,arr) => (idx > 1? assert.approximately(v/arr[idx-1],arr[idx-1]/arr[idx-2],1e-8,'Spacing of log geomspace array is not constant') : true));
    });
});

/*
 * Tests of casts
 */
describe('array.asArray', function () {
    it('should give an Array', function () {
	arr= array.linspace(0,10,11);
	assert.typeOf(arr.asArray(),'array','array.asArray does not give Array');
	arr.asArray().forEach((v,idx) => assert.equal(v,arr[idx],'array.asArray does not give Array with same values as Array'));
    });
});

/*
 * Tests of the arithmetic
 */
describe('array addition', function () {
    it('zeros + zeros = zeros', function () {
	array.zeros(10).add(array.zeros(10)).forEach(v => assert.equal(v,0,'zeros + zeros != zeros'));
    });
    it('zeros + ones = ones', function () {
	array.zeros(10).add(array.ones(10)).forEach(v => assert.equal(v,1,'zeros + ones != ones'));
    });
    it('ones + ones = 2 * ones', function () {
	array.ones(10).add(array.ones(10)).forEach(v => assert.equal(v,2,'ones + ones != 2 * ones'));
    });
    it('ones + ones + ones = 3 * ones', function () {
	array.ones(10).add(array.ones(10)).add(array.ones(10)).forEach(v => assert.equal(v,3,'ones + ones + ones != 3 * ones'));
    });
});

describe('array scalar addition', function () {
    it('zeros + 0 = zeros', function () {
	array.zeros(10).add(0).forEach(v => assert.equal(v,0,'zeros + 0 != zeros'));
    });
    it('zeros + 1 = 1', function () {
	array.zeros(10).add(1).forEach(v => assert.equal(v,1,'zeros + 1 != ones'));
    });
    it('ones + 1 = 2 * ones', function () {
	array.ones(10).add(1).forEach(v => assert.equal(v,2,'ones + 2 != 2 * ones'));
    });
    it('ones + 1 + ones = 3 * ones', function () {
	array.ones(10).add(1).add(array.ones(10)).forEach(v => assert.equal(v,3,'ones + 1 + ones != 3 * ones'));
    });
});

describe('array multiplication', function () {
    it('zeros * zeros = zeros', function () {
	array.zeros(10).mult(array.zeros(10)).forEach(v => assert.equal(v,0,'zeros * zeros != zeros'));
    });
    it('zeros * ones = zeros', function () {
	array.zeros(10).mult(array.ones(10)).forEach(v => assert.equal(v,0,'zeros * ones != zeros'));
    });
    it('ones * ones = ones', function () {
	array.ones(10).mult(array.ones(10)).forEach(v => assert.equal(v,1,'ones * ones != ones'));
    });
    it('ones * ones * ones = ones', function () {
	array.ones(10).mult(array.ones(10)).mult(array.ones(10)).forEach(v => assert.equal(v,1,'ones * ones * ones != ones'));
    });
});

describe('array scalar multiplication', function () {
    it('zeros * 0 = 0', function () {
	array.zeros(10).mult(0).forEach(v => assert.equal(v,0,'zeros * 0 != zeros'));
    });
    it('zeros * 1 = zeros', function () {
	array.zeros(10).mult(1).forEach(v => assert.equal(v,0,'zeros * 1 != zeros'));
    });
    it('ones * ones = ones', function () {
	array.ones(10).mult(1).forEach(v => assert.equal(v,1,'ones * 1 != ones'));
    });
    it('ones * 1 * ones = ones', function () {
	array.ones(10).mult(1).mult(array.ones(10)).forEach(v => assert.equal(v,1,'ones * 1 * ones != ones'));
    });
});

/*
 * Tests of the math functions
 */
describe('array.cos', function () {
    it('cos(zeros) = ones', function () {
	array.zeros(10).cos().forEach(v => assert.approximately(v,1,1e-8,'cos(zeros) != ones'));
    });
    it('cos(2pi/3) = -1/2 * ones', function () {
	array.ones(10).mult(2.*Math.PI/3.).cos().forEach(v => assert.approximately(v,-0.5,1e-8,'cos(2pi/3) != -0.5'));
    });
});

describe('array.sin', function () {
    it('sin(zeros) = zeros', function () {
	array.zeros(10).sin().forEach(v => assert.approximately(v,0,1e-8,'sin(zeros) != zeros'));
    });
    it('sin(pi/6) = 1/2 * ones', function () {
	array.ones(10).mult(Math.PI/6.).sin().forEach(v => assert.approximately(v,0.5,1e-8,'sin(pi/6) != 0.5'));
    });
});


describe('array.inv', function () {
    it('linspace.inv = 1/linspace', function () {
	arr= array.linspace(1,3,11);
	arr.inv().forEach((v,idx) => assert.approximately(v,1./arr[idx],1e-8,'linspace.inv != 1/linspace'));
    });
});

/*
 * Tests of the reductions
 */
describe('array.amax', function () {
    it('should give the maximum', function () {
	assert.equal(array.linspace(0,3,11).amax(),3,'Maximum of linspace array != end')
    });
});

describe('array.amin', function () {
    it('should give the minimum', function () {
	assert.equal(array.linspace(0,3,11).amin(),0,'Minimum of linspace array != end')
    });
});

describe('array.mean', function () {
    it('mean zeros = 0', function () {
	assert.equal(array.zeros(10).mean(),0,'Mean(zeros) != 0');
    });
    it('mean ones = 1', function () {
	assert.equal(array.ones(10).mean(),1,'Mean(ones) != 1');
    });
    it('mean linspace = expected', function () {
	assert.equal(array.linspace(0,4,8).mean(),2,'Mean(linspace) != expected');
    });
});

describe('array.mean', function () {
    it('std zeros = 0', function () {
	assert.equal(array.zeros(10).std(),0,'std(zeros) != 0');
    });
    it('std ones = 0', function () {
	assert.equal(array.ones(10).std(),0,'std(ones) != 0');
    });
    it('std linspace = expected', function () {
	assert.equal(array.linspace(1,5,3).std(),Math.sqrt(8./3.),'std(linspace) != expected');
    });
});
