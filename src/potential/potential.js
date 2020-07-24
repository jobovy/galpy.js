/* 
 * potential.js: General potential class and functions to deal with
 *               potentials
 */
/**
 * General class representing a gravitational potential
 */
class Potential {
    /**
     * Set up a Potential instance
     * @param {number=} amp - amplitude of the potential
     * @param {number=} ro - internal length unit
     * @param {number=} vo - internal velocity unit
     */
    constructor(amp=1.,ro=8.,vo=220.) {
	this._amp= amp;
	this._ro= ro;
	this._vo= vo;
    }

    /**
     * Evaluate the potential
     * @param {number} R - Cylindrical Galactocentric radius
     * @param {number} z - Cylindrical Galactocentric height
     * @param {number=} phi - Cylindrical Galactocentric azimuth
     * @param {number=} t - Time
     * @return {number} Value of the potential
     */
    call(R,z,phi=null,t=0.) {
	throw new Error('Potential call not implemented');
    }

    /**
     * Evaluate the cylindrical radial force
     * @param {number} R - Cylindrical Galactocentric radius
     * @param {number} z - Cylindrical Galactocentric height
     * @param {number=} phi - Cylindrical Galactocentric azimuth
     * @param {number=} t - Time
     * @return {number} Value of the cylindrical radial force
     */
    Rforce(R,z,phi=null,t=0.) {
	throw new Error('Potential Rforce not implemented');
    }

    /**
     * Evaluate the cylindrical vertical force
     * @param {number} R - Cylindrical Galactocentric radius
     * @param {number} z - Cylindrical Galactocentric height
     * @param {number=} phi - Cylindrical Galactocentric azimuth
     * @param {number=} t - Time
     * @return {number} Value of the cylindrical vertical force
     */
    zforce(R,z,phi=null,t=0.) {
	throw new Error('Potential zforce not implemented');
    }

    /**
     * Evaluate the cylindrical azimuthal force
     * @param {number} R - Cylindrical Galactocentric radius
     * @param {number} z - Cylindrical Galactocentric height
     * @param {number=} phi - Cylindrical Galactocentric azimuth
     * @param {number=} t - Time
     * @return {number} Value of the cylindrical azimuthal force
     */
    phiforce(R,z,phi=null,t=0.) {
	throw new Error('Potential phiforce not implemented');
    }        
}

/**
 * Evaluate a Potential or Array thereof
 * @param {number} R - Cylindrical Galactocentric radius
 * @param {number} z - Cylindrical Galactocentric height
 * @param {number=} phi - Cylindrical Galactocentric azimuth
 * @param {number=} t - Time
 * @return {number} Value of the potential
 */
function call(Pot,R,z,phi=null,t=0.) {
    return Pot.call(R,z,phi,t);
}

/**
 * Evaluate the cylindrical radial force of a Potential or Array thereof
 * @param {number} R - Cylindrical Galactocentric radius
 * @param {number} z - Cylindrical Galactocentric height
 * @param {number=} phi - Cylindrical Galactocentric azimuth
 * @param {number=} t - Time
 * @return {number} Value of the cylindrical radial force
 */
function Rforce(Pot,R,z,phi=null,t=0.) {
    return Pot.Rforce(R,z,phi,t);
}

/**
 * Evaluate the cylindrical vertical force of a Potential or Array thereof
 * @param {number} R - Cylindrical Galactocentric radius
 * @param {number} z - Cylindrical Galactocentric height
 * @param {number=} phi - Cylindrical Galactocentric azimuth
 * @param {number=} t - Time
 * @return {number} Value of the cylindrical vertical force
 */
function zforce(Pot,R,z,phi=null,t=0.) {
    return Pot.zforce(R,z,phi,t);
}

/**
 * Evaluate the cylindrical azimuthal force of a Potential or Array thereof
 * @param {number} R - Cylindrical Galactocentric radius
 * @param {number} z - Cylindrical Galactocentric height
 * @param {number=} phi - Cylindrical Galactocentric azimuth
 * @param {number=} t - Time
 * @return {number} Value of the cylindrical azimuthal force
 */
function phiforce(Pot,R,z,phi=null,t=0.) {
    return Pot.phiforce(R,z,phi,t);
}

export {
    Potential,
    call,
    Rforce,
    zforce,
    phiforce
}
