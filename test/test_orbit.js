/*
 * test_orbit.js: tests of the orbit functionality
 */
import chai from 'chai'
let assert = chai.assert;
let expect= chai.expect;

import { potential } from '../src/index'
import { orbit } from '../src/index'

/*
 * Test that energy is conserved during orbit integration
 */
let pots= [
    new potential.MiyamotoNagaiPotential(),
    new potential.IsochronePotential()
];
let times= [0.,10.,301];
let rtol= 1.49012e-8;
let atol= 1.49012e-8;
let default_tol= 1e-5;
let special_tol= {
//    'MiyamotoNagaiPotential': 1e-5,
}

pots.forEach(pot => {
    describe(`Orbit integration in ${pot.constructor.name} potential`, function () {
	let o= new orbit.Orbit([1.,0.1,1.1,0.1,-0.2,0.3]);
	pot.normalize(1.);
	o.integrate(times,pot,rtol=rtol,atol=atol);
	let tol= (`${pot.constructor.name}` in special_tol)
	    ? special_tol[`${pot.constructor.name}`]
	    : default_tol;
	it('Energy conserved', function () {
	    let Energy= o.E(true);
	    assert.isBelow(Energy.mult(1./Energy.mean()).std(),
			   tol,
			   `Energy is not conserved during orbit integration in ${pot.constructor.name}`);
	});
    });
});
