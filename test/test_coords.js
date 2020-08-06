/*
 * test_coords.js: tests of the coordinate-transformation utilities
 */
import chai from 'chai'
let assert = chai.assert;
let expect= chai.expect;

import { default as coords } from '../src/util/coords'
import { default as array } from '../src/util/array'

/*
 * Tests of rectangular <-> cylindrical transformation of galpy phase-space
 */
let tol= 1e-8;
let pairs= [
    {'rect': [1.,0.,0.1,0.,1.1,0.2],
     'cyl': [1.,0.,1.1,0.1,0.2,0.]},
    {'rect': [3.,4.,-0.1,-0.4,1.3,-0.2],
     'cyl': [5.,-0.4*3./5.+1.3*4./5.,0.4*4./5.+1.3*3./5.,
	     -0.1,-0.2,Math.atan2(4.,3.)]},
    ];

pairs.forEach(pair => {
    describe('Rectangular to cylindrical conversion of galpy phase-space coordinates', function () {
	it('works as expected',function () {
	    coords.rect_to_cyl_galpy(...pair['rect']).forEach((v,idx) => assert.approximately(v,pair['cyl'][idx],tol,'Rectangular -> cylindrical conversion of galpy phase-space does not act as expected'));
	});
    });
    describe('Cylindrical to rectangular conversion of galpy phase-space coordinates', function () {
	it('works as expected',function () {
	    coords.cyl_to_rect_galpy(...pair['cyl']).forEach((v,idx) => assert.approximately(v,pair['rect'][idx],tol,'Cylindrical -> Rectangular cylindrical conversion of galpy phase-space does not act as expected'));
	});
    });
});

let arrpairs= [
    {'rect': [array.array.from([1.,3.]),
	      array.array.from([0.,4.]),
	      array.array.from([0.1,-0.1]),
	      array.array.from([0.,-0.4]),
	      array.array.from([1.1,1.3]),
	      array.array.from([0.2,-0.2])],
     'cyl': [array.array.from([1.,5.]),
	     array.array.from([0.,-0.4*3./5.+1.3*4./5.]),
	     array.array.from([1.1,0.4*4./5.+1.3*3./5.]),
	     array.array.from([0.1,-0.1]),
	     array.array.from([0.2,-0.2]),
	     array.array.from([0.0,Math.atan2(4.,3.)])]},
    {'rect': [array.array.from([3.]),
	      array.array.from([4.]),
	      array.array.from([-0.1]),
	      array.array.from([-0.4]),
	      array.array.from([1.3]),
	      array.array.from([-0.2])],
     'cyl': [array.array.from([5.]),
	     array.array.from([-0.4*3./5.+1.3*4./5.]),
	     array.array.from([0.4*4./5.+1.3*3./5.]),
	     array.array.from([-0.1]),
	     array.array.from([-0.2]),
	     array.array.from([Math.atan2(4.,3.)])]},
    ];

arrpairs.forEach(pair => {
    describe('Rectangular to cylindrical conversion of galpy phase-space coordinates for arrays', function () {
	it('works as expected',function () {
	    coords.rect_to_cyl_galpy(...pair['rect']).forEach((v,idx) => v.forEach((vv,jdx) => assert.approximately(vv,pair['cyl'][idx][jdx],tol,'Rectangular -> cylindrical conversion of galpy phase-space does not act as expected')));
	});
    });
    describe('Cylindrical to rectangular conversion of galpy phase-space coordinates', function () {
	it('works as expected',function () {
	    coords.cyl_to_rect_galpy(...pair['cyl']).forEach((v,idx) => v.forEach((vv,jdx) => assert.approximately(vv,pair['rect'][idx][jdx],tol,'Cylindrical -> Rectangular cylindrical conversion of galpy phase-space does not act as expected')));
	});
    });
});
