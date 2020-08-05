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
	let Energy= o.E(true);
	let tol= (`${pot.constructor.name}` in special_tol)
	    ? special_tol[`${pot.constructor.name}`]
	    : default_tol;
	it('Energy conserved', function () {
	    assert.isBelow(Energy.mult(1./Energy.mean()).std(),
			   tol,
			   `Energy is not conserved during orbit integration in ${pot.constructor.name}`);
	});
	it('Energy close to initial', function () {
	    assert.approximately(o.E(),Energy.mean(),
			   tol,
			   `Energy does not stay close to initial energy during orbit integration in ${pot.constructor.name}`);
	});
    });
});

/*
 * Test that orbit plotting doesn't work in Node.js
 */
describe('Orbit plotting in Node.js', function () {
    let o= new orbit.Orbit([1.,0.1,1.1,0.1,-0.2,0.3]);
    let pot= new potential.IsochronePotential().normalize(1.);
    o.integrate(times,pot,rtol=rtol,atol=atol);
    it('throws error because it should not work', function () {
	let expected_error= 'Plotting a galpy.js orbit only works in the browser, not in node';
	expect(o.plot).to.throw(expected_error);
    });
});
