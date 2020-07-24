/*
 * test_potential.js: tests of the potential functionality
 */
import chai from 'chai'
let assert = chai.assert;

import { potential } from '../src/index'

/*
 * Test that derivatives of the potential agree with numerical 
 * derivatives
 */
let pots= [
    new potential.MiyamotoNagaiPotential(),
    new potential.IsochronePotential()
];
let default_tol= 1e-8
let special_tol= {
    'IsochronePotential': 1e-7
}

pots.forEach(pot => {
describe(`${pot.constructor.name} potential`, function () {
    let RphiZt= [1.2,0.3,-0.4,0.];
    let [R,phi,Z,t]= RphiZt;
    let tol= (`${pot.constructor.name}` in special_tol)
	? special_tol[`${pot.constructor.name}`]
	: default_tol;
    it('Rforce = minus d Pot / d R', function () {
	assert.isBelow(Math.abs(potential.Rforce(pot,R,Z,phi,t)
				+pot_gradient(potential.call,pot,
					      RphiZt,1e-8,0)),
		       tol,
		       `${pot.constructor.name} Rforce is not the derivative of the potential wrt R`);
    });
    it('phiforce = minus d Pot / d phi', function () {
	assert.isBelow(Math.abs(potential.phiforce(pot,R,Z,phi,t)
				+pot_gradient(potential.call,pot,
					      RphiZt,1e-8,1)),
		       tol,
		       `${pot.constructor.name} phiforce is not the derivative of the potential wrt phi`);
    });
    it('zforce = minus d Pot / d z', function () {
	assert.isBelow(Math.abs(potential.zforce(pot,R,Z,phi,t)
				+pot_gradient(potential.call,pot,
					      RphiZt,1e-8,2)),
		       tol,
		       `${pot.constructor.name} zforce is not the derivative of the potential wrt z`);
    });
});
});

/*
 * Utility functions
 */
/**
 * Compute a numerical gradient of a potential function as a simple finite difference
 * @param {function} func - Function of which to take the gradient
 * @param {Potential} pot - Potential instance or Array thereof of which to take the gradient
 * @param {Array} RpZt - [R,phi,Z,t] position and time
 * @param {number} dx - Offset to use to compute the finite difference
 * @param {number} idx - dimension over which to compute the gradient}
 * @return {number} Numerical gradient
 */
function pot_gradient(func,Pot,RpZt,dx,idx) {
    let [R,phi,Z,t]= RpZt;
    let newR= R;
    let newphi= phi;
    let newZ= Z;
    if ( idx === 0 ) {
	newR= R+dx;
    } else if ( idx === 1 ) {
	newphi= phi+dx;
    } else {
	newZ= Z+dx;
    }
    return (func(Pot,newR,newZ,newphi,t)-func(Pot,R,Z,phi,t))/dx;
}
