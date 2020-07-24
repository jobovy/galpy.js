/* 
 * miyamotonagai.js: Miyamoto-Nagai potential
 */
import { Potential } from './potential'

/**
 * Miyamoto-Nagai potential
 * @extends Potential
 */
class MiyamotoNagaiPotential extends Potential {
    /**
     * Set up a MiyamotoNagaiPotential instance
     * @param {number=} amp - Mass
     * @param {number=} a - Scale length
     * @param {number=} b - Scale height
     * @param {number=} ro - Internal length unit
     * @param {number=} vo - Internal velocity unit
     */
    constructor(amp=1.,a=1.,b=0.1,ro=8.,vo=220.) {
	super(amp,ro,vo);
	this._a= a/this._ro;
	this._b= b/this._ro;
	this._b2= this._b*this._b;
    }

    call(R,z,phi=null,t=0.) {
	return -this._amp/Math.sqrt(R*R
		    +Math.pow(this._a+Math.sqrt(z*z+this._b2),2));
    }

    Rforce(R,z,phi=null,t=0.) {
	return this._amp * (-R*Math.pow(R*R
		+Math.pow(this._a+Math.sqrt(z*z+this._b2),2),-1.5));
    }

    zforce(R,z,phi=null,t=0.) {
	let sqrtbz= Math.sqrt(this._b2+z*z);
        let asqrtbz= this._a+sqrtbz;
        return this._amp*(-z*asqrtbz/sqrtbz*
			  Math.pow(R*R+Math.pow(asqrtbz,2),-1.5));
    }

    phiforce(R,z,phi=null,t=0.) {
	return 0.;
    }
}

export { MiyamotoNagaiPotential }
