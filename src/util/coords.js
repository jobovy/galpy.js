/* 
 * coords.js: Utilities for coordinate conversions
 */
import { default as array } from './array'

/**
 * Convert rectangular to cylindrical coordinates
 * @param {number|Array} x - rectangular x coordinate
 * @param {number|Array} y - rectangular y coordinate
 * @param {number|Array} z - rectangular z coordinate
 * @param {number|Array} vx - rectangular vx coordinate
 * @param {number|Array} vy - rectangular vy coordinate
 * @param {number|Array} vz - rectangular vz coordinate
 * @return {Array|array} cylindrical coordinates arranged as [R,vR,vT,z,vz,phi]; this is an Array of numbers for number inputs, or a 2D array with shape [6,N] with the 6 phase-space coordinates arranged in the same way
 */
function rect_to_cyl_galpy (x,y,z,vx,vy,vz) {
    let R,phi,vR,vT;
    if ( typeof x === 'number' ) {   
	R= Math.sqrt(x*x+y*y);
	phi= Math.atan2(y,x);
	vR=  vx * x / R + vy * y / R;
	vT= -vx * y / R + vy * x / R;
	return [R,vR,vT,z,vz,phi];
    } else {
	R= array.array.from(x.mult(x).add(y.mult(y))
			    .map(v => Math.sqrt(v)));
	phi= array.array.from(y.map((v,idx) => Math.atan2(v,x[idx])));
	let cosphi= phi.cos();
	let sinphi= phi.sin();
	vR= vx.mult(x).add(vy.mult(y)).mult(R.inv());
	vT= vx.mult(-1.).mult(y).add(vy.mult(x)).mult(R.inv());
	return array.array.from([R.asArray(),
				 vR.asArray(),
				 vT.asArray(),
				 z.asArray(),
				 vz.asArray(),
				 phi.asArray()]);
    }
}

/**
 * Convert cylindrical to rectangular coordinates
 * @param {number|Array} R - cylindrical radius coordinate
 * @param {number|Array} vR - cylindrical radial velocity coordinate
 * @param {number|Array} vT - cylindrical rotational velocity coordinate
 * @param {number|Array} z - cylindrical z coordinate
 * @param {number|Array} vz - cylindrical vz coordinate
 * @param {number|Array} phi - cylindrical azimuth coordinate
 * @return {Array|array} rectangular coordinates arranged as [x,y,z,vx,vy,vz]; this is an Array of numbers for number inputs, or a 2D array with shape [6,N] with the 6 phase-space coordinates arranged in the same way
 */
function cyl_to_rect_galpy (R,vR,vT,z,vz,phi) {
    let x,y,vx,vy,cosphi,sinphi;
    if ( typeof R === 'number' ) {   
	cosphi= Math.cos(phi);
	sinphi= Math.sin(phi);
	x= R*cosphi;
	y= R*sinphi;
	vx= vR*cosphi-vT*sinphi;
	vy= vR*sinphi+vT*cosphi;
	return [x,y,z,vx,vy,vz];
    } else {
	cosphi= phi.cos();
	sinphi= phi.sin();
	x= R.mult(cosphi);
	y= R.mult(sinphi);
	vx= vR.mult(cosphi).add(vT.mult(sinphi).mult(-1.));
	vy= vR.mult(sinphi).add(vT.mult(cosphi));
	return array.array.from([x.asArray(),
				 y.asArray(),
				 z.asArray(),
				 vx.asArray(),
				 vy.asArray(),
				 vz.asArray()]);
    }
}

export default {
    rect_to_cyl_galpy: rect_to_cyl_galpy,
    cyl_to_rect_galpy: cyl_to_rect_galpy
}
