/* 
 * ode.js: ODE solvers
 */
import  { default as array } from './array'
/**
 * Leapfrog integrate an ODE
 * @param {function} func - force function F(y,t)
 * @param {Array} yo - initial condition [q1,q2...,p1,p2...]
 * @param {Array} t - time to integrate for as [tstart,tend,nt=2]
 * @param {number=} rtol - relative tolerance
 * @param {number=} tol - absolute tolerance
 * @return {Array} y(time) with shape [phase-space dim,nt]
 */
function leapfrog(func,yo,t,rtol=1.49012e-12,atol=1.49012e-12) {
    let [tstart,tend,nt=2]= t;
    let qo= yo.slice(0,Math.ceil(yo.length/2));
    let po= yo.slice(Math.ceil(yo.length/2),yo.length);;
    let tcurrent= tstart;
    let out= array.empty([yo.length,nt]);
    _leapfrog_store(out,0,qo,po);   
    let dt= (tend-tstart)/(nt-1);
    let init_dt= dt;
    dt= _leapfrog_estimate_step(func,qo,po,dt,tcurrent,rtol,atol);
    let ndt= Math.ceil(init_dt/dt);
    for (let ii= 1; ii < nt; ii++) {
	qo= _leapfrog_leapq(qo,po,dt/2.);
	for (let jj=0; jj < ndt; jj++) {
	    po= _leapfrog_leapp(po,dt,func(qo,tcurrent+dt/2.));
	    qo= _leapfrog_leapq(qo,po,dt);
	    tcurrent= tcurrent+dt;
	}
	qo= _leapfrog_leapq(qo,po,-dt/2.);
	_leapfrog_store(out,ii,qo,po);
    }
    return out;
}

function _leapfrog_leapq(q,p,dt) {
    return q.add(p.mult(dt));
}
function _leapfrog_leapp(p,dt,force) {
    return p.add(force.mult(dt));
}
function _leapfrog_store(out,ii,qo,po) {
    for (let jj=0; jj < qo.length; jj++)
	out[jj][ii]= qo[jj];
    for (let jj=0; jj < po.length; jj++)
	out[qo.length+jj][ii]= po[jj];
}

function _leapfrog_estimate_step(func,qo,po,dt,tcurrent,rtol,atol) {
    let init_dt= dt;
    let scale= (array.ones(qo.length).mult(qo.amax()).concat(
	array.ones(po.length).mult(po.amax())))
	.mult(rtol).add(atol);
    scale= scale.inv();
    let err= 2.;
    dt= 2.*dt;
    let q12, p12, p11, q11, ptmp, qtmp, delta;
    while ( err > 1. && init_dt/dt < 10000. ) {
	//Do one leapfrog step with step dt and one with dt/2.
	// dt
        q12= _leapfrog_leapq(qo,po,dt/2.);
	p11= _leapfrog_leapp(po,dt,func(q12,tcurrent+dt/2.));
        q11= _leapfrog_leapq(q12,p11,dt/2.);
	// dt/2
        q12= _leapfrog_leapq(qo,po,dt/4.);
        ptmp= _leapfrog_leapp(po,dt/2.,func(q12,tcurrent+dt/4.));
        qtmp= _leapfrog_leapq(q12,ptmp,dt/2.);
        p12= _leapfrog_leapp(ptmp,dt/2.,func(qtmp,tcurrent+3.*dt/4));
        q12= _leapfrog_leapq(qtmp,p12,dt/4.);
	// Norm
	delta= q11.add(q12.mult(-1.)).concat(p11.add(p12.mult(-1.)));
	err= Math.sqrt(delta.mult(scale).mult(delta).mult(scale).mean());
        dt/= 2.;
    }
    return dt;
}

export {
    leapfrog
}
