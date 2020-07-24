/* 
 * isochrone.js: Isochrone potential
 */
import { Potential } from './potential'

/**
 * Isochrone potential
 * @extends Potential
 */
class IsochronePotential extends Potential {
    /**
     * Set up a IsochronePotential instance
     * @param {number=} amp - Mass
     * @param {number=} b - Scale length
     * @param {number=} ro - Internal length unit
     * @param {number=} vo - Internal velocity unit
     */
    constructor(amp=1.,b=1.0,ro=8.,vo=220.) {
	super(amp,ro,vo);
	this._b= b/this._ro;
	this._b2= this._b*this._b;
    }

    call(R,z,phi=null,t=0.) {
	return -this._amp/(this._b+Math.sqrt(R*R+z*z+this._b2));
    }

    Rforce(R,z,phi=null,t=0.) {
	let rb= Math.sqrt(R*R+z*z+this._b2);
	return -this._amp/rb*R*Math.pow(this._b+rb,-2);
    }

    zforce(R,z,phi=null,t=0.) {
	let rb= Math.sqrt(R*R+z*z+this._b2);
	return -this._amp/rb*z*Math.pow(this._b+rb,-2);
    }

    phiforce(R,z,phi=null,t=0.) {
	return 0.;
    }
}

export { IsochronePotential }
